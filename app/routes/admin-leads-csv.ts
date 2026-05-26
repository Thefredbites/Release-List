import type { Route } from "./+types/admin-leads-csv";
import { requireAdminUser } from "../lib/admin.server";
import { toCsvRow } from "../lib/csv.server";
import { createSupabaseServerClient } from "../lib/supabase.server";

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = await requireAdminUser(request);
  const supabase = createSupabaseServerClient(request, headers);
  const { data, error } = await supabase
    .from("waitlist_leads")
    .select("email, whatsapp, source, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to export waitlist leads: ${error.message}`);
  }

  const rows = [
    toCsvRow(["email", "whatsapp", "source", "created_at", "updated_at"]),
    ...(data ?? []).map((lead) =>
      toCsvRow([
        lead.email,
        lead.whatsapp,
        lead.source,
        lead.created_at,
        lead.updated_at,
      ]),
    ),
  ];

  headers.set("Content-Type", "text/csv; charset=utf-8");
  headers.set("Content-Disposition", 'attachment; filename="the-fred-bites-leads.csv"');

  return new Response(rows.join("\n"), { headers });
}
