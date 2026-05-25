import { useActionData, useNavigation } from "react-router";

import type { Route } from "./+types/home";
import { createSupabaseAdminClient } from "../lib/supabase.server";
import {
  formatReserveCodeFromPosition,
  getClientIp,
  hashIpAddress,
  isSpamTrapTriggered,
  type WaitlistSubmissionResult,
  validateWaitlistInput,
} from "../lib/waitlist.server";
import { WaitlistPage } from "../features/waitlist/WaitlistPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Fred Bites — Anotate en la lista" },
    {
      name: "description",
      content:
        "La tanda n°01 de The Fred Bites sale pronto. Acceso anticipado, precio de fundadores y un aviso cuando esté lista.",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  if (isSpamTrapTriggered(formData)) {
    return {
      ok: true,
      message: "Te avisaremos cuando salga el drop.",
      reserveCode: "000",
    } satisfies WaitlistSubmissionResult;
  }

  const validation = validateWaitlistInput(formData);
  if (!validation.data) {
    return {
      ok: false,
      fieldErrors: validation.fieldErrors ?? {},
      values: validation.values,
    } satisfies WaitlistSubmissionResult;
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const ipHash = hashIpAddress(getClientIp(request));

  if (ipHash) {
    const windowStart = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count, error: rateLimitError } = await supabaseAdmin
      .from("waitlist_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", windowStart);

    if (rateLimitError) {
      throw new Error(`Failed to enforce rate limit: ${rateLimitError.message}`);
    }

    if ((count ?? 0) >= 5) {
      return {
        ok: false,
        fieldErrors: {
          form: "Haz una pausa de unos minutos antes de volver a intentarlo.",
        },
        values: validation.values,
      } satisfies WaitlistSubmissionResult;
    }

    const { error: attemptError } = await supabaseAdmin
      .from("waitlist_rate_limits")
      .insert({ ip_hash: ipHash });

    if (attemptError) {
      throw new Error(`Failed to persist rate-limit attempt: ${attemptError.message}`);
    }
  }

  const { data: savedLead, error } = await supabaseAdmin
    .from("waitlist_leads")
    .upsert(
      {
        email: validation.data.email,
        email_normalized: validation.data.emailNormalized,
        whatsapp: validation.data.whatsapp,
        source: "website_waitlist",
        submitted_ip_hash: ipHash,
      },
      { onConflict: "email_normalized" },
    )
    .select("id")
    .single();

  if (error) {
    return {
      ok: false,
      fieldErrors: {
        form: "No pudimos guardar tu lugar. Intenta otra vez en unos segundos.",
      },
      values: validation.values,
    } satisfies WaitlistSubmissionResult;
  }

  const { data: orderedLeads, error: orderingError } = await supabaseAdmin
    .from("waitlist_leads")
    .select("id")
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });

  if (orderingError || !savedLead) {
    return {
      ok: false,
      fieldErrors: {
        form: "Guardamos tu registro, pero no pudimos calcular tu lugar. Intenta otra vez en unos segundos.",
      },
      values: validation.values,
    } satisfies WaitlistSubmissionResult;
  }

  const waitlistPosition =
    orderedLeads.findIndex((lead) => lead.id === savedLead.id) + 1;

  if (waitlistPosition <= 0) {
    return {
      ok: false,
      fieldErrors: {
        form: "Guardamos tu registro, pero no pudimos recuperar tu lugar. Intenta otra vez en unos segundos.",
      },
      values: validation.values,
    } satisfies WaitlistSubmissionResult;
  }

  return {
    ok: true,
    message: "Ya quedaste en la lista. Te avisaremos cuando salga la batch n°01.",
    reserveCode: formatReserveCodeFromPosition(waitlistPosition),
  } satisfies WaitlistSubmissionResult;
}

export default function Home() {
  const submission = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <WaitlistPage
      submission={submission}
      isSubmitting={navigation.state === "submitting"}
    />
  );
}
