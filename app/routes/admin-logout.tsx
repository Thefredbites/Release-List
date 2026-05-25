import { redirect } from "react-router";

import type { Route } from "./+types/admin-logout";
import { createSupabaseServerClient } from "../lib/supabase.server";

export async function action({ request }: Route.ActionArgs) {
  const headers = new Headers();
  const supabase = createSupabaseServerClient(request, headers);

  await supabase.auth.signOut();

  throw redirect("/admin/login", { headers });
}

export default function AdminLogout() {
  return null;
}
