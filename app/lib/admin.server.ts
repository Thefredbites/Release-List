import { redirect } from "react-router";

import { createSupabaseServerClient } from "./supabase.server";

export async function getAuthenticatedUser(request: Request, headers?: Headers) {
  const authHeaders = headers ?? new Headers();
  const supabase = createSupabaseServerClient(request, authHeaders);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { user: null, headers: authHeaders };
  }

  return { user, headers: authHeaders };
}

export async function isAdminUser(
  request: Request,
  headers: Headers,
  userId: string,
) {
  const supabase = createSupabaseServerClient(request, headers);
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to verify admin access: ${error.message}`);
  }

  return Boolean(data);
}

export async function requireAdminUser(request: Request) {
  const headers = new Headers();
  const { user } = await getAuthenticatedUser(request, headers);

  if (!user) {
    throw redirect("/admin/login", {
      headers,
    });
  }

  const allowed = await isAdminUser(request, headers, user.id);

  if (!allowed) {
    throw redirect("/admin/login?error=unauthorized", {
      headers,
    });
  }

  return { user, headers };
}
