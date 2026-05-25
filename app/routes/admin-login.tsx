import { data, Form, redirect, useActionData, useNavigation } from "react-router";

import type { Route } from "./+types/admin-login";
import { isAdminUser } from "../lib/admin.server";
import { createSupabaseServerClient } from "../lib/supabase.server";

type LoginActionData = {
  error?: string;
  email?: string;
};

export function meta({}: Route.MetaArgs) {
  return [{ title: "Admin Login | The Fred Bites" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const queryError =
    url.searchParams.get("error") === "unauthorized"
      ? "Tu usuario no tiene acceso al panel."
      : null;

  const headers = new Headers();
  const supabase = createSupabaseServerClient(request, headers);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && (await isAdminUser(request, headers, user.id))) {
    throw redirect("/admin", { headers });
  }

  return data({ error: queryError }, { headers });
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const emailEntry = formData.get("email");
  const passwordEntry = formData.get("password");
  const email = typeof emailEntry === "string" ? emailEntry.trim() : "";
  const password = typeof passwordEntry === "string" ? passwordEntry : "";

  if (!email || !password) {
    return {
      error: "Ingresa email y password.",
      email,
    } satisfies LoginActionData;
  }

  const headers = new Headers();
  const supabase = createSupabaseServerClient(request, headers);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error: "No pudimos iniciar sesion con esos datos.",
      email,
    } satisfies LoginActionData;
  }

  throw redirect("/admin", { headers });
}

export default function AdminLogin({ loaderData }: Route.ComponentProps) {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const error = actionData?.error ?? loaderData.error;
  const defaultEmail = actionData?.email ?? "";

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-10 text-stone-50">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <section className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/6 p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.32em] text-stone-400">
            The Fred Bites Admin
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-stone-50">
            Login
          </h1>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            Acceso privado para revisar leads y descargar el CSV.
          </p>
          {error ? (
            <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          ) : null}
          <Form method="post" className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-stone-400">
                Email
              </span>
              <input
                type="email"
                name="email"
                defaultValue={defaultEmail}
                autoComplete="email"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-stone-50 outline-none transition focus:border-cyan-300/60"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-stone-400">
                Password
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-stone-50 outline-none transition focus:border-cyan-300/60"
                required
              />
            </label>
            <button
              type="submit"
              disabled={navigation.state === "submitting"}
              className="w-full rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-950 transition hover:bg-cyan-200 disabled:cursor-wait disabled:opacity-70"
            >
              {navigation.state === "submitting" ? "Entrando..." : "Entrar"}
            </button>
          </Form>
        </section>
      </div>
    </main>
  );
}
