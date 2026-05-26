export const SURVEY_SCALE_OPTIONS = [
  "No me gustó",
  "Más o menos",
  "Me gustó",
  "Me encantó",
] as const;

export const STRAWBERRY_ROWS = [
  "Sabor",
  "Cantidad Proteína (31-35g)",
  "Sin Sellos (Excesos)",
  "Apariencia",
] as const;

export const CHOCOLATE_ROWS = [
  "Sabor",
  "Cantidad Proteína",
  "Sin Sellos (Excesos)",
  "Apariencia",
] as const;

export const BUY_OPTIONS = ["Sí", "Quizás", "No"] as const;

export const PRICE_OPTIONS = [
  "$90-$110 MXN",
  "$110-$130 MXN",
  "$130-$150 MXN",
  "$150-$170 MXN",
] as const;

export type SurveyScale = (typeof SURVEY_SCALE_OPTIONS)[number];
export type BuyIntent = (typeof BUY_OPTIONS)[number];
export type PriceRange = (typeof PRICE_OPTIONS)[number];
export type SurveyMatrix = Record<string, SurveyScale>;

export type SurveyFieldErrors = {
  nutritionNeeds?: string;
  matrix?: string;
  improvements?: string;
  buyIntent?: string;
  priceRange?: string;
  nextFlavor?: string;
  supporterEmail?: string;
  supporterWhatsapp?: string;
  form?: string;
};

export type SurveyFormValues = {
  nutritionNeeds: string;
  improvements: string;
  buyIntent: string;
  priceRange: string;
  nextFlavor: string;
  supporterEmail: string;
  supporterWhatsapp: string;
  strawberryRatings: Partial<Record<(typeof STRAWBERRY_ROWS)[number], string>>;
  chocolateRatings: Partial<Record<(typeof CHOCOLATE_ROWS)[number], string>>;
};

export type SurveySubmissionResult =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      fieldErrors: SurveyFieldErrors;
      values: SurveyFormValues;
    };

export type SanitizedSurveyInput = {
  nutritionNeeds: string;
  strawberryRatings: SurveyMatrix | null;
  chocolateRatings: SurveyMatrix | null;
  improvements: string;
  buyIntent: BuyIntent;
  priceRange: PriceRange;
  nextFlavor: string;
  supporterEmail: string | null;
  supporterWhatsapp: string | null;
};
