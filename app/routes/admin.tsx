import { useState } from "react";
import { data, Form } from "react-router";

import type { Route } from "./+types/admin";
import { requireAdminUser } from "../lib/admin.server";
import { downloadFile } from "../lib/download";
import { createSupabaseServerClient } from "../lib/supabase.server";

type LeadRow = {
  id: string;
  email: string;
  whatsapp: string | null;
  source: string;
  created_at: string;
  updated_at: string;
};

export function meta({}: Route.MetaArgs) {
  return [{ title: "Admin Leads | The Fred Bites" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await requireAdminUser(request);
  const supabase = createSupabaseServerClient(request, headers);
  const { data: leads, error } = await supabase
    .from("waitlist_leads")
    .select("id, email, whatsapp, source, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load waitlist leads: ${error.message}`);
  }

  return data(
    {
      user: { email: user.email ?? "" },
      leads: (leads ?? []) as LeadRow[],
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

export default function Admin({ loaderData }: Route.ComponentProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  async function handleDownloadLeads() {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      await downloadFile("/admin/leads.csv", "the-fred-bites-leads.csv");
    } catch {
      setDownloadError("No se pudo descargar el CSV.");
    } finally {
      setIsDownloading(false);
    }
  }

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
              <div className="max-w-2xl">
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
                  Waitlist
                  <br />
                  Control Room.
                </h1>

                <div className="mt-5 h-px w-28 bg-[#d9d9d7]/18" />

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#d9d9d7]/60 sm:text-[15px]">
                  Sesion activa como {loaderData.user.email}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
                <a
                  href="/admin/surveys"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-fuchsia-300/26 bg-fuchsia-300/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-100 transition hover:bg-fuchsia-300/18"
                >
                  Ver Surveys
                </a>
                <button
                  type="button"
                  onClick={() => void handleDownloadLeads()}
                  disabled={isDownloading}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/32 bg-cyan-300/12 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100 transition hover:bg-cyan-300/20"
                >
                  {isDownloading ? "Descargando..." : "Descargar CSV"}
                </button>
                <Form action="/admin/logout" method="post">
                  <button
                    type="submit"
                    className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border border-white/14 bg-white/6 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9d9d7] transition hover:bg-white/10 sm:w-auto"
                  >
                    Logout
                  </button>
                </Form>
              </div>
            </div>

            {downloadError ? (
              <p className="relative mt-4 text-sm text-rose-200">
                {downloadError}
              </p>
            ) : null}
          </div>

          <section className="relative bg-[linear-gradient(180deg,rgba(236,232,226,0.98)_0%,rgba(224,218,210,0.95)_100%)] text-[#0a0a0a]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_40%)]"
            />

            {loaderData.leads.length === 0 ? (
              <div className="relative px-6 py-16 text-center sm:px-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#3a3a3a]/50">
                  Waitlist
                </p>
                <p className="mt-4 text-sm text-[#3a3a3a]">
                  Aun no hay leads registrados.
                </p>
              </div>
            ) : (
              <div className="relative overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-[0.28em] text-[#3a3a3a]/58">
                      <th className="border-b border-black/8 px-5 py-4 font-medium sm:px-6">
                        Email
                      </th>
                      <th className="border-b border-black/8 px-5 py-4 font-medium sm:px-6">
                        WhatsApp
                      </th>
                      <th className="border-b border-black/8 px-5 py-4 font-medium sm:px-6">
                        Source
                      </th>
                      <th className="border-b border-black/8 px-5 py-4 font-medium sm:px-6">
                        Created
                      </th>
                      <th className="border-b border-black/8 px-5 py-4 font-medium sm:px-6">
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loaderData.leads.map((lead, index) => (
                      <tr
                        key={lead.id}
                        className="align-top transition hover:bg-black/[0.035]"
                      >
                        <td
                          className={`px-5 py-4 text-[#0a0a0a] sm:px-6 ${index !== 0 ? "border-t border-black/6" : ""}`}
                        >
                          <span className="font-medium">{lead.email}</span>
                        </td>
                        <td
                          className={`px-5 py-4 text-[#3a3a3a] sm:px-6 ${index !== 0 ? "border-t border-black/6" : ""}`}
                        >
                          {lead.whatsapp ?? "—"}
                        </td>
                        <td
                          className={`px-5 py-4 text-[#3a3a3a] sm:px-6 ${index !== 0 ? "border-t border-black/6" : ""}`}
                        >
                          <span className="inline-flex rounded-full border border-black/8 bg-white/45 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#3a3a3a]">
                            {lead.source}
                          </span>
                        </td>
                        <td
                          className={`px-5 py-4 text-[#3a3a3a] sm:px-6 ${index !== 0 ? "border-t border-black/6" : ""}`}
                        >
                          {formatDate(lead.created_at)}
                        </td>
                        <td
                          className={`px-5 py-4 text-[#3a3a3a] sm:px-6 ${index !== 0 ? "border-t border-black/6" : ""}`}
                        >
                          {formatDate(lead.updated_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
