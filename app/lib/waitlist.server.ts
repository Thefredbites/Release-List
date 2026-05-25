import { createHash } from "node:crypto";

export type WaitlistFieldErrors = {
  email?: string;
  whatsapp?: string;
  form?: string;
};

export type WaitlistFormValues = {
  email: string;
  whatsapp: string;
};

export type WaitlistSubmissionResult =
  | {
      ok: true;
      message: string;
      reserveCode: string;
    }
  | {
      ok: false;
      fieldErrors: WaitlistFieldErrors;
      values: WaitlistFormValues;
    };

export type SanitizedWaitlistInput = {
  email: string;
  emailNormalized: string;
  whatsapp: string | null;
};

const EMAIL_MAX_LENGTH = 320;
const E164_REGEX = /^\+[1-9]\d{7,14}$/;
const RESERVE_POSITION_OFFSET = 79;

function cleanEmail(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanWhatsapp(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateWaitlistInput(formData: FormData): {
  data?: SanitizedWaitlistInput;
  fieldErrors?: WaitlistFieldErrors;
  values: WaitlistFormValues;
} {
  const rawEmail = cleanEmail(formData.get("email"));
  const rawWhatsapp = cleanWhatsapp(formData.get("whatsapp"));
  const values = { email: rawEmail, whatsapp: rawWhatsapp };
  const fieldErrors: WaitlistFieldErrors = {};

  const emailNormalized = rawEmail.toLowerCase();
  if (!emailNormalized) {
    fieldErrors.email = "Ingresa tu email.";
  } else if (emailNormalized.length > EMAIL_MAX_LENGTH) {
    fieldErrors.email = "Ese email es demasiado largo.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalized)) {
    fieldErrors.email = "Ingresa un email valido.";
  }

  let whatsapp: string | null = null;
  if (rawWhatsapp) {
    whatsapp = normalizeWhatsapp(rawWhatsapp);
    if (!whatsapp) {
      fieldErrors.whatsapp = "Usa formato internacional, por ejemplo +5215512345678.";
    }
  }

  if (fieldErrors.email || fieldErrors.whatsapp) {
    return { fieldErrors, values };
  }

  return {
    data: {
      email: rawEmail,
      emailNormalized,
      whatsapp,
    },
    values,
  };
}

export function normalizeWhatsapp(value: string) {
  const compact = value.replace(/[\s().-]/g, "");
  const normalized = compact.startsWith("00") ? `+${compact.slice(2)}` : compact;

  if (!E164_REGEX.test(normalized)) {
    return null;
  }

  return normalized;
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    null
  );
}

export function hashIpAddress(ipAddress: string | null) {
  if (!ipAddress) {
    return null;
  }

  return createHash("sha256").update(ipAddress).digest("hex");
}

export function formatReserveCodeFromPosition(position: number) {
  return String(position + RESERVE_POSITION_OFFSET).padStart(3, "0");
}

export function isSpamTrapTriggered(formData: FormData) {
  const company = formData.get("company");
  return typeof company === "string" && company.trim().length > 0;
}
