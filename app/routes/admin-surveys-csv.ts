import type { Route } from "./+types/admin-surveys-csv";
import { requireAdminUser } from "../lib/admin.server";
import { toCsvRow } from "../lib/csv.server";
import { createSupabaseServerClient } from "../lib/supabase.server";

function serializeMatrix(value: unknown) {
  return value ? JSON.stringify(value) : "";
}

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = await requireAdminUser(request);
  const supabase = createSupabaseServerClient(request, headers);
  const { data, error } = await supabase
    .from("survey_responses")
    .select(
      "nutrition_needs, strawberry_ratings, chocolate_ratings, improvements, buy_intent, price_range, next_flavor, supporter_email, supporter_whatsapp, source, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to export survey responses: ${error.message}`);
  }

  const rows = [
    toCsvRow([
      "nutrition_needs",
      "strawberry_ratings",
      "chocolate_ratings",
      "improvements",
      "buy_intent",
      "price_range",
      "next_flavor",
      "supporter_email",
      "supporter_whatsapp",
      "source",
      "created_at",
    ]),
    ...(data ?? []).map((survey) =>
      toCsvRow([
        survey.nutrition_needs,
        serializeMatrix(survey.strawberry_ratings),
        serializeMatrix(survey.chocolate_ratings),
        survey.improvements,
        survey.buy_intent,
        survey.price_range,
        survey.next_flavor,
        survey.supporter_email,
        survey.supporter_whatsapp,
        survey.source,
        survey.created_at,
      ]),
    ),
  ];

  headers.set("Content-Type", "text/csv; charset=utf-8");
  headers.set("Content-Disposition", 'attachment; filename="the-fred-bites-surveys.csv"');

  return new Response(rows.join("\n"), { headers });
}

export default function AdminSurveysCsv() {
  return null;
}
