import { createSupabaseAdminClient } from "../lib/supabase.server";

function getCronSecret() {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    throw new Error("CRON_SECRET is required");
  }

  return secret;
}

export async function loader({ request }: { request: Request }) {
  const authHeader = request.headers.get("Authorization");

  if (authHeader !== `Bearer ${getCronSecret()}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("waitlist_leads")
    .select("id", { count: "exact", head: true })
    .limit(1);

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, checkedAt: new Date().toISOString() });
}
