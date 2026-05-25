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
    <main className="relative min-h-screen overflow-hidden bg-[#f4efe8] px-4 py-6 text-[#0a0a0a] sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 48% at 8% 6%, rgba(103,232,249,0.32) 0%, transparent 62%), radial-gradient(ellipse 50% 44% at 92% 10%, rgba(244,114,182,0.22) 0%, transparent 62%), linear-gradient(180deg, #f8f4ef 0%, #ebe4da 100%)",
        }}
      />
      <img
        src="/decorative_topright_pink.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-[min(34vw,420px)] opacity-80"
      />
      <img
        src="/decorative_bottomleft_blue.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[min(32vw,380px)] opacity-80"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center">
        <section className="w-full max-w-[980px] overflow-hidden rounded-[30px] border border-black/10 bg-[#0a0a0a] text-[#d9d9d7] shadow-[0_26px_90px_rgba(10,10,10,0.18)]">
          <div className="grid min-h-[680px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative hidden overflow-hidden border-r border-white/10 px-8 py-10 lg:flex lg:flex-col">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.10),_transparent_32%)]"
              />
              <div className="grain-layer" aria-hidden="true" />

              <div className="relative flex items-center gap-3">
                <img
                  src="/isotipo.png"
                  alt="The Fred Bites"
                  className="h-8 w-8 object-contain invert brightness-[1.9]"
                />
                <span className="text-[10px] uppercase tracking-[0.34em] text-[#d9d9d7]/48">
                  The Fred Bites Admin
                </span>
              </div>

              <div className="relative mt-10">
                <h1 className="font-[Bowlby_One] text-[clamp(3rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.04em] text-[#d9d9d7]">
                  Private
                  <br />
                  Access.
                </h1>
                <div className="mt-5 h-px w-24 bg-[#d9d9d7]/18" />
                <p className="mt-5 max-w-sm text-sm leading-6 text-[#d9d9d7]/58">
                  Acceso privado para revisar leads.
                </p>
              </div>
            </div>

            <div className="relative bg-[linear-gradient(180deg,rgba(236,232,226,0.98)_0%,rgba(224,218,210,0.95)_100%)] px-6 py-8 text-[#0a0a0a] sm:px-8 sm:py-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_40%)]"
              />

              <div className="relative mx-auto flex h-full w-full max-w-md flex-col justify-center">
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#3a3a3a]/50 lg:hidden">
                  The Fred Bites Admin
                </p>
                <h2 className="mt-4 font-[Bowlby_One] text-[clamp(2.4rem,8vw,4rem)] leading-[0.92] tracking-[-0.04em] text-[#0a0a0a] lg:mt-0">
                  Login
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#3a3a3a]">
                  Acceso privado para revisar leads.
                </p>

                {error ? (
                  <div className="mt-5 rounded-[20px] border border-[#8d3116]/18 bg-[#8d3116]/8 px-4 py-3 text-sm text-[#7b250a]">
                    {error}
                  </div>
                ) : null}

                <Form method="post" className="mt-7 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-[#3a3a3a]/58">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      defaultValue={defaultEmail}
                      autoComplete="email"
                      className="w-full rounded-[18px] border border-black/10 bg-white/72 px-4 py-3 text-sm text-[#0a0a0a] outline-none transition placeholder:text-[#3a3a3a]/35 focus:border-black/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(10,10,10,0.05)]"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-[#3a3a3a]/58">
                      Password
                    </span>
                    <input
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      className="w-full rounded-[18px] border border-black/10 bg-white/72 px-4 py-3 text-sm text-[#0a0a0a] outline-none transition focus:border-black/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(10,10,10,0.05)]"
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={navigation.state === "submitting"}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0a0a0a] px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d9d9d7] transition hover:bg-[#242424] disabled:cursor-wait disabled:opacity-70"
                  >
                    {navigation.state === "submitting" ? "Entrando..." : "Entrar"}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
