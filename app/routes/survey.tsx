import { useActionData, useNavigation } from "react-router";

import type { Route } from "./+types/survey";
import { SurveyPage } from "../features/survey/SurveyPage";
import type { SurveySubmissionResult } from "../lib/survey";
import { createSupabaseAdminClient } from "../lib/supabase.server";
import {
  getClientIp,
  hashIpAddress,
  isSpamTrapTriggered,
  validateSurveyInput,
} from "../lib/survey.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Survey | The Fred Bites" },
    {
      name: "description",
      content:
        "Encuesta de sabor y percepcion de producto para The Fred Bites. Comparte tu feedback sobre Fresa y Chocolate.",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  if (isSpamTrapTriggered(formData)) {
    return {
      ok: true,
      message: "Gracias por compartir tu feedback.",
    } satisfies SurveySubmissionResult;
  }

  const validation = validateSurveyInput(formData);

  if (!validation.data) {
    return {
      ok: false,
      fieldErrors: validation.fieldErrors ?? {},
      values: validation.values,
    } satisfies SurveySubmissionResult;
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const ipHash = hashIpAddress(getClientIp(request));

  if (ipHash) {
    const windowStart = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count, error: rateLimitError } = await supabaseAdmin
      .from("survey_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", windowStart);

    if (rateLimitError) {
      throw new Error(`Failed to enforce survey rate limit: ${rateLimitError.message}`);
    }

    if ((count ?? 0) >= 5) {
      return {
        ok: false,
        fieldErrors: {
          form: "Haz una pausa de unos minutos antes de volver a enviar otra respuesta.",
        },
        values: validation.values,
      } satisfies SurveySubmissionResult;
    }

    const { error: attemptError } = await supabaseAdmin
      .from("survey_rate_limits")
      .insert({ ip_hash: ipHash });

    if (attemptError) {
      throw new Error(`Failed to persist survey rate-limit attempt: ${attemptError.message}`);
    }
  }

  const { error } = await supabaseAdmin.from("survey_responses").insert({
    nutrition_needs: validation.data.nutritionNeeds,
    strawberry_ratings: validation.data.strawberryRatings,
    chocolate_ratings: validation.data.chocolateRatings,
    improvements: validation.data.improvements,
    buy_intent: validation.data.buyIntent,
    price_range: validation.data.priceRange,
    next_flavor: validation.data.nextFlavor,
    supporter_email: validation.data.supporterEmail,
    supporter_whatsapp: validation.data.supporterWhatsapp,
    submitted_ip_hash: ipHash,
    source: "website_survey",
  });

  if (error) {
    return {
      ok: false,
      fieldErrors: {
        form: "No pudimos guardar tu respuesta. Intenta otra vez en unos segundos.",
      },
      values: validation.values,
    } satisfies SurveySubmissionResult;
  }

  return {
    ok: true,
    message:
      "Gracias por compartir tu feedback. Ya guardamos tu respuesta del survey.",
  } satisfies SurveySubmissionResult;
}

export default function Survey() {
  const submission = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <SurveyPage
      submission={submission}
      isSubmitting={navigation.state === "submitting"}
    />
  );
}
