import { data } from "react-router";

import type { Route } from "./+types/admin-surveys";
import { requireAdminUser } from "../lib/admin.server";
import type { SurveyMatrix } from "../lib/survey";
import { createSupabaseServerClient } from "../lib/supabase.server";

type SurveyRow = {
  id: number;
  nutrition_needs: string;
  strawberry_ratings: SurveyMatrix | null;
  chocolate_ratings: SurveyMatrix | null;
  improvements: string;
  buy_intent: string;
  price_range: string;
  next_flavor: string;
  supporter_email: string | null;
  supporter_whatsapp: string | null;
  created_at: string;
};

export function meta({}: Route.MetaArgs) {
  return [{ title: "Admin Surveys | The Fred Bites" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await requireAdminUser(request);
  const supabase = createSupabaseServerClient(request, headers);
  const { data: surveys, error } = await supabase
    .from("survey_responses")
    .select(
      "id, nutrition_needs, strawberry_ratings, chocolate_ratings, improvements, buy_intent, price_range, next_flavor, supporter_email, supporter_whatsapp, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load survey responses: ${error.message}`);
  }

  return data(
    {
      user: { email: user.email ?? "" },
      surveys: (surveys ?? []) as SurveyRow[],
    },
    { headers },
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function renderMatrix(matrix: SurveyMatrix | null) {
  if (!matrix) {
    return "No respondido";
  }

  return Object.entries(matrix)
    .map(([label, value]) => `${label}: ${value}`)
    .join(" • ");
}

export default function AdminSurveys({ loaderData }: Route.ComponentProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4efe8] text-[#0a0a0a]">
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
        <section className="overflow-hidden rounded-[30px] border border-black/10 bg-[#0a0a0a] text-[#d9d9d7] shadow-[0_26px_90px_rgba(10,10,10,0.18)]">
          <div className="relative border-b border-white/10 px-5 py-6 sm:px-8 sm:py-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.10),_transparent_32%)]"
            />
            <div className="grain-layer" aria-hidden="true" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <img
                    src="/isotipo.png"
                    alt="The Fred Bites"
                    className="h-8 w-8 object-contain invert brightness-[1.9]"
                  />
                  <span className="text-[10px] uppercase tracking-[0.34em] text-[#d9d9d7]/48">
                    The Fred Bites Admin
                  </span>
                </div>
                <h1 className="mt-5 font-[Bowlby_One] text-[clamp(2.35rem,5vw,4.8rem)] leading-[0.92] tracking-[-0.04em] text-[#d9d9d7]">
                  Survey
                  <br />
                  Responses.
                </h1>
                <div className="mt-5 h-px w-28 bg-[#d9d9d7]/18" />
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#d9d9d7]/60 sm:text-[15px]">
                  Sesión activa como {loaderData.user.email}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
                <a
                  href="/admin/surveys.csv"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/32 bg-cyan-300/12 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100 transition hover:bg-cyan-300/20"
                >
                  Descargar CSV
                </a>
                <a
                  href="/admin"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white/6 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9d9d7] transition hover:bg-white/10"
                >
                  Ver Waitlist
                </a>
              </div>
            </div>
          </div>

          <section className="relative bg-[linear-gradient(180deg,rgba(236,232,226,0.98)_0%,rgba(224,218,210,0.95)_100%)] text-[#0a0a0a]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_40%)]"
            />

            <div className="relative px-4 py-5 sm:px-6 sm:py-6">
              {loaderData.surveys.length === 0 ? (
                <div className="rounded-[26px] border border-black/8 bg-white/60 px-6 py-16 text-center text-sm text-[#3a3a3a] shadow-[0_12px_40px_rgba(10,10,10,0.05)]">
                  Aún no hay respuestas del survey.
                </div>
              ) : (
                <div className="grid gap-4">
                  {loaderData.surveys.map((survey) => (
                    <article
                      key={survey.id}
                      className="rounded-[26px] border border-black/8 bg-white/60 p-5 shadow-[0_12px_40px_rgba(10,10,10,0.05)] backdrop-blur sm:p-6"
                    >
                      <div className="flex flex-col gap-3 border-b border-black/8 pb-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-[#3a3a3a]/52">
                            Survey #{survey.id}
                          </p>
                          <h2 className="mt-2 text-lg font-medium text-[#0a0a0a]">
                            {survey.buy_intent} • {survey.price_range}
                          </h2>
                        </div>
                        <div className="text-sm text-[#3a3a3a]">
                          {formatDate(survey.created_at)}
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        <div className="space-y-4">
                          <section>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-[#3a3a3a]/50">
                              Necesidad principal
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#0a0a0a]">
                              {survey.nutrition_needs}
                            </p>
                          </section>
                          <section>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-[#3a3a3a]/50">
                              Qué mejoraría
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#0a0a0a]">
                              {survey.improvements}
                            </p>
                          </section>
                          <section>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-[#3a3a3a]/50">
                              Siguiente sabor
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#0a0a0a]">
                              {survey.next_flavor}
                            </p>
                          </section>
                          <section>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-[#3a3a3a]/50">
                              Correo Early Supporter
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#0a0a0a]">
                              {survey.supporter_email || "No dejó correo"}
                            </p>
                          </section>
                          <section>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-[#3a3a3a]/50">
                              WhatsApp Early Supporter
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#0a0a0a]">
                              {survey.supporter_whatsapp || "No dejó WhatsApp"}
                            </p>
                          </section>
                        </div>

                        <div className="space-y-4">
                          <section>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-[#3a3a3a]/50">
                              Fresa
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#0a0a0a]">
                              {renderMatrix(survey.strawberry_ratings)}
                            </p>
                          </section>
                          <section>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-[#3a3a3a]/50">
                              Chocolate
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#0a0a0a]">
                              {renderMatrix(survey.chocolate_ratings)}
                            </p>
                          </section>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
