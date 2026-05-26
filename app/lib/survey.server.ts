import {
  BUY_OPTIONS,
  CHOCOLATE_ROWS,
  PRICE_OPTIONS,
  STRAWBERRY_ROWS,
  SURVEY_SCALE_OPTIONS,
  type BuyIntent,
  type PriceRange,
  type SanitizedSurveyInput,
  type SurveyFieldErrors,
  type SurveyFormValues,
  type SurveyMatrix,
  type SurveyScale,
  type SurveySubmissionResult,
} from "./survey";
import {
  getClientIp,
  hashIpAddress,
  isSpamTrapTriggered,
  normalizeWhatsapp,
} from "./waitlist.server";

export type {
  SanitizedSurveyInput,
  SurveyFieldErrors,
  SurveyFormValues,
  SurveyMatrix,
  SurveySubmissionResult,
};

const LONG_TEXT_MAX_LENGTH = 2000;
const SHORT_TEXT_MAX_LENGTH = 320;

function cleanText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function readMatrix(
  formData: FormData,
  prefix: string,
  rows: readonly string[],
) {
  return rows.reduce<Partial<Record<string, string>>>((acc, row, index) => {
    const value = formData.get(`${prefix}-${index}`);
    if (typeof value === "string" && value.trim()) {
      acc[row] = value.trim();
    }
    return acc;
  }, {});
}

function isValidScale(value: string): value is SurveyScale {
  return SURVEY_SCALE_OPTIONS.includes(value as SurveyScale);
}

function normalizeMatrix(
  matrix: Partial<Record<string, string>>,
  rows: readonly string[],
) {
  const filledEntries = rows
    .map((row) => [row, matrix[row]] as const)
    .filter((entry) => typeof entry[1] === "string");

  const hasAnyAnswers = filledEntries.length > 0;
  const isComplete = filledEntries.length === rows.length;
  const hasOnlyValidValues = filledEntries.every((entry) => isValidScale(entry[1]!));

  if (!hasAnyAnswers) {
    return { hasAnyAnswers, isComplete: false, isValid: true, data: null };
  }

  if (!isComplete || !hasOnlyValidValues) {
    return { hasAnyAnswers, isComplete, isValid: false, data: null };
  }

  return {
    hasAnyAnswers,
    isComplete,
    isValid: true,
    data: Object.fromEntries(filledEntries) as SurveyMatrix,
  };
}

export function validateSurveyInput(formData: FormData): {
  data?: SanitizedSurveyInput;
  fieldErrors?: SurveyFieldErrors;
  values: SurveyFormValues;
} {
  const nutritionNeeds = cleanText(formData.get("nutrition-needs"));
  const improvements = cleanText(formData.get("improvements"));
  const buyIntent = cleanText(formData.get("buy-intent"));
  const priceRange = cleanText(formData.get("price-range"));
  const nextFlavor = cleanText(formData.get("next-flavor"));
  const supporterEmail = cleanText(formData.get("supporter-email"));
  const supporterWhatsapp = cleanText(formData.get("supporter-whatsapp"));
  const strawberryRatings = readMatrix(formData, "strawberry", STRAWBERRY_ROWS);
  const chocolateRatings = readMatrix(formData, "chocolate", CHOCOLATE_ROWS);

  const values: SurveyFormValues = {
    nutritionNeeds,
    improvements,
    buyIntent,
    priceRange,
    nextFlavor,
    supporterEmail,
    supporterWhatsapp,
    strawberryRatings: strawberryRatings as SurveyFormValues["strawberryRatings"],
    chocolateRatings: chocolateRatings as SurveyFormValues["chocolateRatings"],
  };

  const fieldErrors: SurveyFieldErrors = {};

  if (!nutritionNeeds) {
    fieldErrors.nutritionNeeds =
      "Cuéntanos qué es lo que más buscas de tu alimentación deportiva.";
  } else if (nutritionNeeds.length > LONG_TEXT_MAX_LENGTH) {
    fieldErrors.nutritionNeeds = "Tu respuesta es demasiado larga.";
  }

  const normalizedStrawberry = normalizeMatrix(strawberryRatings, STRAWBERRY_ROWS);
  const normalizedChocolate = normalizeMatrix(chocolateRatings, CHOCOLATE_ROWS);

  if (!normalizedStrawberry.isValid || !normalizedChocolate.isValid) {
    fieldErrors.matrix =
      "Si empiezas una matriz, complétala antes de enviar la encuesta.";
  } else if (!normalizedStrawberry.data && !normalizedChocolate.data) {
    fieldErrors.matrix =
      "Completa al menos una de las dos matrices: Fresa o Chocolate.";
  }

  if (!improvements) {
    fieldErrors.improvements = "Cuéntanos qué mejorarías o cambiarías.";
  } else if (improvements.length > LONG_TEXT_MAX_LENGTH) {
    fieldErrors.improvements = "Tu respuesta es demasiado larga.";
  }

  if (!BUY_OPTIONS.includes(buyIntent as BuyIntent)) {
    fieldErrors.buyIntent = "Selecciona si comprarías el producto.";
  }

  if (!PRICE_OPTIONS.includes(priceRange as PriceRange)) {
    fieldErrors.priceRange = "Selecciona el rango de precio que pagarías.";
  }

  if (!nextFlavor) {
    fieldErrors.nextFlavor = "Escribe otro sabor que te gustaría probar.";
  } else if (nextFlavor.length > SHORT_TEXT_MAX_LENGTH) {
    fieldErrors.nextFlavor = "Ese sabor es demasiado largo.";
  }

  if (supporterEmail) {
    const normalizedEmail = supporterEmail.toLowerCase();
    if (normalizedEmail.length > SHORT_TEXT_MAX_LENGTH) {
      fieldErrors.supporterEmail = "Ese correo es demasiado largo.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      fieldErrors.supporterEmail = "Ingresa un correo valido.";
    }
  }

  let normalizedWhatsapp: string | null = null;
  if (supporterWhatsapp) {
    normalizedWhatsapp = normalizeWhatsapp(supporterWhatsapp);
    if (!normalizedWhatsapp) {
      fieldErrors.supporterWhatsapp =
        "Ingresa un numero de Mexico de 10 digitos.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values };
  }

  return {
    data: {
      nutritionNeeds,
      strawberryRatings: normalizedStrawberry.data,
      chocolateRatings: normalizedChocolate.data,
      improvements,
      buyIntent: buyIntent as BuyIntent,
      priceRange: priceRange as PriceRange,
      nextFlavor,
      supporterEmail: supporterEmail || null,
      supporterWhatsapp: normalizedWhatsapp,
    },
    values,
  };
}

export { getClientIp, hashIpAddress, isSpamTrapTriggered };
