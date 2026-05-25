import { data, Form } from "react-router";

import type { Route } from "./+types/admin";
import { requireAdminUser } from "../lib/admin.server";
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
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.16),_transparent_36%),linear-gradient(180deg,#0c0c0c_0%,#171717_100%)] px-6 py-8 text-stone-100">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-stone-400">
              The Fred Bites Admin
            </p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">
              Waitlist Leads
            </h1>
            <p className="mt-2 text-sm text-stone-300">
              Sesion activa como {loaderData.user.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/leads.csv"
              className="rounded-2xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-300/20"
            >
              Descargar CSV
            </a>
            <Form action="/admin/logout" method="post">
              <button
                type="submit"
                className="cursor-pointer rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-100 transition hover:bg-white/10"
              >
                Logout
              </button>
            </Form>
          </div>
        </header>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur">
          {loaderData.leads.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-stone-300">
              Aun no hay leads registrados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-white/6 text-[11px] uppercase tracking-[0.22em] text-stone-400">
                  <tr>
                    <th className="px-5 py-4 font-medium">Email</th>
                    <th className="px-5 py-4 font-medium">WhatsApp</th>
                    <th className="px-5 py-4 font-medium">Source</th>
                    <th className="px-5 py-4 font-medium">Created</th>
                    <th className="px-5 py-4 font-medium">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {loaderData.leads.map((lead) => (
                    <tr key={lead.id} className="align-top text-stone-100">
                      <td className="px-5 py-4">{lead.email}</td>
                      <td className="px-5 py-4 text-stone-300">
                        {lead.whatsapp ?? "—"}
                      </td>
                      <td className="px-5 py-4 text-stone-300">{lead.source}</td>
                      <td className="px-5 py-4 text-stone-300">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-5 py-4 text-stone-300">
                        {formatDate(lead.updated_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
