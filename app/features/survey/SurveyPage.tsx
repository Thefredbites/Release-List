import { Form } from "react-router";

import type {
  SurveyFormValues,
  SurveySubmissionResult,
} from "../../lib/survey";
import {
  BUY_OPTIONS,
  CHOCOLATE_ROWS,
  PRICE_OPTIONS,
  STRAWBERRY_ROWS,
  SURVEY_SCALE_OPTIONS,
} from "../../lib/survey";

const PERFORMANCE_NEEDS = [
  "Más proteína real",
  "Menos azúcar",
  "Mejor sabor",
  "Más saciedad",
  "Más practicidad para llevar",
  "Ingredientes más limpios",
];

type SurveyPageProps = {
  submission?: SurveySubmissionResult;
  isSubmitting: boolean;
};

type MatrixQuestionProps = {
  title: string;
  rows: readonly string[];
  namePrefix: string;
  values?: Partial<Record<string, string>>;
};

function MatrixQuestion({
  title,
  rows,
  namePrefix,
  values,
}: MatrixQuestionProps) {
  return (
    <section className="overflow-hidden rounded-[26px] border border-black/8 bg-white/60 shadow-[0_12px_40px_rgba(10,10,10,0.05)] backdrop-blur">
      <div className="border-b border-black/6 px-5 py-5 sm:px-6">
        <h3 className="text-lg font-medium italic text-[#0a0a0a] sm:text-[22px]">
          {title}
        </h3>
      </div>

      <div className="px-3 py-3 sm:px-5 sm:py-5">
        <div>
          <div className="grid grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] gap-1 px-1 pb-2 sm:gap-2 sm:px-3">
            <div />
            {SURVEY_SCALE_OPTIONS.map((option) => (
              <div
                key={option}
                className="px-1 text-center text-[11px] leading-4 font-medium text-[#0a0a0a] sm:px-2 sm:text-sm sm:leading-5"
              >
                {option}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {rows.map((row, rowIndex) => (
              <div
                key={row}
                className="grid grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] items-center gap-1 rounded-[18px] bg-[#f6f3ee] px-2 py-3 sm:gap-2 sm:px-3"
              >
                <div className="pr-2 text-[12px] leading-5 font-medium text-[#0a0a0a] sm:pr-3 sm:text-[15px]">
                  {row}
                </div>
                {SURVEY_SCALE_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center justify-center rounded-[14px] px-1 py-2 sm:px-2"
                  >
                    <input
                      type="radio"
                      name={`${namePrefix}-${rowIndex}`}
                      value={option}
                      defaultChecked={values?.[row] === option}
                      className="h-4 w-4 accent-[#0a0a0a] sm:h-5 sm:w-5"
                    />
                    <span className="sr-only">{`${row}: ${option}`}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChoicePill({
  label,
  name,
  value,
  required = false,
  defaultChecked = false,
}: {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  defaultChecked?: boolean;
}) {
  return (
    <label className="group relative cursor-pointer">
      <input
        className="peer sr-only"
        type="radio"
        name={name}
        value={value}
        required={required}
        defaultChecked={defaultChecked}
      />
      <span className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white/70 px-4 py-3 text-sm font-medium text-[#0a0a0a] transition peer-checked:border-black peer-checked:bg-[#0a0a0a] peer-checked:text-[#f4efe8] group-hover:bg-white">
        {label}
      </span>
    </label>
  );
}

function BenefitIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-[#d9d9d7]">
      {children}
    </span>
  );
}

function defaultValues(submission?: SurveySubmissionResult): SurveyFormValues | undefined {
  if (!submission || submission.ok) {
    return undefined;
  }

  return submission.values;
}

export function SurveyPage({ submission, isSubmitting }: SurveyPageProps) {
  const values = defaultValues(submission);
  const fieldErrors = submission && !submission.ok ? submission.fieldErrors : undefined;

  return (
    <main className="relative overflow-hidden bg-[#f4efe8] text-[#0a0a0a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 48% at 8% 6%, rgba(103,232,249,0.26) 0%, transparent 62%), radial-gradient(ellipse 50% 44% at 92% 10%, rgba(244,114,182,0.18) 0%, transparent 62%), linear-gradient(180deg, #faf6f0 0%, #efe8de 100%)",
        }}
      />
      <img
        src="/decorative_topright_pink.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-[min(34vw,420px)] opacity-75"
      />
      <img
        src="/decorative_bottomleft_blue.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[min(32vw,380px)] opacity-75"
      />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="overflow-hidden rounded-[30px] border border-black/10 bg-[#0a0a0a] text-[#d9d9d7] shadow-[0_26px_90px_rgba(10,10,10,0.14)]">
          <div className="relative px-5 py-8 sm:px-8 sm:py-10">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.10),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.10),_transparent_32%)]"
            />
            <div className="grain-layer" aria-hidden="true" />

            <div className="relative max-w-3xl">
              <span className="text-[10px] uppercase tracking-[0.34em] text-[#d9d9d7]/48">
                The Fred Bites Survey
              </span>
              <h1 className="mt-5 font-[Bowlby_One] text-[clamp(2.7rem,8vw,5.2rem)] leading-[0.9] tracking-[-0.05em] text-[#d9d9d7]">
                Product
                <br />
                Feedback.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#d9d9d7]/60 sm:text-[15px]">
                Ayúdanos a afinar el producto con feedback claro sobre sabor,
                percepción y precio.
              </p>
            </div>
          </div>

          <div className="relative bg-[linear-gradient(180deg,rgba(239,234,227,0.98)_0%,rgba(229,223,214,0.96)_100%)] px-4 py-5 sm:px-6 sm:py-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.42),_transparent_40%)]"
            />

            {submission?.ok ? (
              <div className="relative rounded-[26px] border border-black/8 bg-white/60 px-6 py-14 text-center shadow-[0_12px_40px_rgba(10,10,10,0.05)] backdrop-blur sm:px-10">
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#3a3a3a]/52">
                  Survey enviado
                </p>
                <h2 className="mt-4 font-[Bowlby_One] text-[clamp(2.2rem,6vw,4rem)] leading-[0.92] tracking-[-0.04em] text-[#0a0a0a]">
                  Gracias por
                  <br />
                  compartir.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[#3a3a3a]">
                  {submission.message}
                </p>
              </div>
            ) : (
              <Form method="post" className="relative space-y-5">
                <section className="rounded-[26px] border border-black/8 bg-white/60 px-5 py-5 shadow-[0_12px_40px_rgba(10,10,10,0.05)] backdrop-blur sm:px-6">
                  <label className="block">
                    <span className="text-lg font-medium italic text-[#0a0a0a] sm:text-[22px]">
                      ¿Qué es lo que más necesitas o deseas de tu alimentación
                      deportiva? <span className="text-[#8d3116]">*</span>
                    </span>
                    <textarea
                      name="nutrition-needs"
                      required
                      rows={5}
                      defaultValue={values?.nutritionNeeds ?? ""}
                      className="mt-5 w-full rounded-[20px] border border-black/10 bg-white/72 px-4 py-4 text-sm text-[#0a0a0a] outline-none transition placeholder:text-[#3a3a3a]/35 focus:border-black/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(10,10,10,0.05)]"
                      placeholder="Cuéntanos qué buscas: más proteína, mejor sabor, practicidad, ingredientes limpios, saciedad, etc."
                    />
                  </label>
                  {fieldErrors?.nutritionNeeds ? (
                    <p className="mt-3 text-sm text-[#8d3116]">
                      {fieldErrors.nutritionNeeds}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {PERFORMANCE_NEEDS.map((item) => (
                      <span
                        key={item}
                        className="inline-flex rounded-full border border-black/8 bg-[#f7f3ed] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#3a3a3a]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="rounded-[26px] border border-dashed border-black/10 bg-white/36 px-5 py-4 text-sm leading-6 text-[#3a3a3a] backdrop-blur sm:px-6">
                  Completa Fresa o Chocolate. Si probaste ambos, puedes llenar ambas
                  matrices.
                </div>

                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-px w-px overflow-hidden opacity-0 pointer-events-none"
                />

                <MatrixQuestion
                  title="Que te parece el producto que acabas de probar? (Fresa)"
                  rows={STRAWBERRY_ROWS}
                  namePrefix="strawberry"
                  values={values?.strawberryRatings}
                />

                <MatrixQuestion
                  title="Que te parece el producto que acabas de probar? (Chocolate)"
                  rows={CHOCOLATE_ROWS}
                  namePrefix="chocolate"
                  values={values?.chocolateRatings}
                />

                {fieldErrors?.matrix ? (
                  <div className="rounded-[20px] border border-[#8d3116]/18 bg-[#8d3116]/8 px-4 py-3 text-sm text-[#7b250a]">
                    {fieldErrors.matrix}
                  </div>
                ) : null}

                <section className="rounded-[26px] border border-black/8 bg-white/60 px-5 py-5 shadow-[0_12px_40px_rgba(10,10,10,0.05)] backdrop-blur sm:px-6">
                  <label className="block">
                    <span className="text-lg font-medium italic text-[#0a0a0a] sm:text-[22px]">
                      ¿Qué mejorarías o cambiarías de este producto?{" "}
                      <span className="text-[#8d3116]">*</span>
                    </span>
                    <textarea
                      name="improvements"
                      required
                      rows={5}
                      defaultValue={values?.improvements ?? ""}
                      className="mt-5 w-full rounded-[20px] border border-black/10 bg-white/72 px-4 py-4 text-sm text-[#0a0a0a] outline-none transition placeholder:text-[#3a3a3a]/35 focus:border-black/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(10,10,10,0.05)]"
                      placeholder="Háblanos de sabor, textura, dulzor, empaque, ingredientes o cualquier ajuste que harías."
                    />
                  </label>
                  {fieldErrors?.improvements ? (
                    <p className="mt-3 text-sm text-[#8d3116]">
                      {fieldErrors.improvements}
                    </p>
                  ) : null}
                </section>

                <section className="rounded-[26px] border border-black/8 bg-white/60 px-5 py-5 shadow-[0_12px_40px_rgba(10,10,10,0.05)] backdrop-blur sm:px-6">
                  <h3 className="text-lg font-medium italic text-[#0a0a0a] sm:text-[22px]">
                    Comprarias este producto?{" "}
                    <span className="text-[#8d3116]">*</span>
                  </h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {BUY_OPTIONS.map((option, index) => (
                      <ChoicePill
                        key={option}
                        label={option}
                        name="buy-intent"
                        value={option}
                        required={index === 0}
                        defaultChecked={values?.buyIntent === option}
                      />
                    ))}
                  </div>
                  {fieldErrors?.buyIntent ? (
                    <p className="mt-3 text-sm text-[#8d3116]">
                      {fieldErrors.buyIntent}
                    </p>
                  ) : null}
                </section>

                <section className="rounded-[26px] border border-black/8 bg-white/60 px-5 py-5 shadow-[0_12px_40px_rgba(10,10,10,0.05)] backdrop-blur sm:px-6">
                  <h3 className="text-lg font-medium italic text-[#0a0a0a] sm:text-[22px]">
                    Cuanto pagarias por el producto? (200g = 25 bites){" "}
                    <span className="text-[#8d3116]">*</span>
                  </h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {PRICE_OPTIONS.map((option, index) => (
                      <ChoicePill
                        key={option}
                        label={option}
                        name="price-range"
                        value={option}
                        required={index === 0}
                        defaultChecked={values?.priceRange === option}
                      />
                    ))}
                  </div>
                  {fieldErrors?.priceRange ? (
                    <p className="mt-3 text-sm text-[#8d3116]">
                      {fieldErrors.priceRange}
                    </p>
                  ) : null}
                </section>

                <section className="rounded-[26px] border border-black/8 bg-white/60 px-5 py-5 shadow-[0_12px_40px_rgba(10,10,10,0.05)] backdrop-blur sm:px-6">
                  <label className="block">
                    <span className="text-lg font-medium italic text-[#0a0a0a] sm:text-[22px]">
                      Que otro sabor te gustaria del producto?{" "}
                      <span className="text-[#8d3116]">*</span>
                    </span>
                    <input
                      type="text"
                      name="next-flavor"
                      required
                      defaultValue={values?.nextFlavor ?? ""}
                      className="mt-5 w-full rounded-[20px] border border-black/10 bg-white/72 px-4 py-4 text-sm text-[#0a0a0a] outline-none transition placeholder:text-[#3a3a3a]/35 focus:border-black/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(10,10,10,0.05)]"
                      placeholder="Matcha, peanut butter, coco, vainilla, moka..."
                    />
                  </label>
                  {fieldErrors?.nextFlavor ? (
                    <p className="mt-3 text-sm text-[#8d3116]">
                      {fieldErrors.nextFlavor}
                    </p>
                  ) : null}
                </section>

                <section className="overflow-hidden rounded-[26px] border border-black/8 bg-[#0a0a0a] text-[#d9d9d7] shadow-[0_18px_50px_rgba(10,10,10,0.08)]">
                  <div className="px-5 py-6 sm:px-6">
                    <p className="text-[10px] uppercase tracking-[0.34em] text-[#d9d9d7]/46">
                      Early Supporter List
                    </p>
                    <h3 className="mt-4 font-[Bowlby_One] text-[clamp(2rem,5vw,3.4rem)] leading-[0.94] tracking-[-0.04em] text-[#d9d9d7]">
                      Join
                      <br />
                      the launch.
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-[#d9d9d7]/60">
                      Únete a la lista de Early Supporters para el lanzamiento del
                      producto y recibe:
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-[#d9d9d7]/78">
                        <BenefitIcon>
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                            <line x1="7" y1="7" x2="7.01" y2="7" />
                          </svg>
                        </BenefitIcon>
                        <p className="mt-4">Descuentos exclusivos para Early Supporters</p>
                      </div>
                      <div className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-[#d9d9d7]/78">
                        <BenefitIcon>
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 12 20 22 4 22 4 12" />
                            <rect x="2" y="7" width="20" height="5" />
                            <line x1="12" y1="22" x2="12" y2="7" />
                            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                          </svg>
                        </BenefitIcon>
                        <p className="mt-4">Un Early Supporter Gift Package</p>
                      </div>
                      <div className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-[#d9d9d7]/78">
                        <BenefitIcon>
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                            <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                          </svg>
                        </BenefitIcon>
                        <p className="mt-4">
                          Acceso anticipado a nuevos lanzamientos y eventos
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.24em] text-[#d9d9d7]/56">
                          Tu correo
                        </span>
                        <div className="relative mt-3">
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#d9d9d7]/42">
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 6h16v12H4z" />
                              <path d="m4 8 8 6 8-6" />
                            </svg>
                          </span>
                          <input
                            type="email"
                            name="supporter-email"
                            defaultValue={values?.supporterEmail ?? ""}
                            className="w-full rounded-[18px] border border-white/12 bg-white/10 py-4 pl-12 pr-4 text-sm text-[#f4efe8] outline-none transition placeholder:text-[#d9d9d7]/32 focus:border-white/28 focus:bg-white/12"
                            placeholder="nombre@email.com"
                          />
                        </div>
                        {fieldErrors?.supporterEmail ? (
                          <p className="mt-3 text-sm text-[#ffb9a6]">
                            {fieldErrors.supporterEmail}
                          </p>
                        ) : null}
                      </label>

                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.24em] text-[#d9d9d7]/56">
                          WhatsApp
                          <span className="ml-2 rounded-full bg-white/8 px-2 py-1 text-[9px] tracking-[0.14em] text-[#d9d9d7]/60">
                            Opcional
                          </span>
                        </span>
                        <div className="relative mt-3">
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-xs tracking-[0.12em] text-[#d9d9d7]/42">
                            +52
                          </span>
                          <input
                            type="tel"
                            name="supporter-whatsapp"
                            defaultValue={values?.supporterWhatsapp ?? ""}
                            inputMode="numeric"
                            maxLength={10}
                            className="w-full rounded-[18px] border border-white/12 bg-white/10 py-4 pl-14 pr-4 text-sm text-[#f4efe8] outline-none transition placeholder:text-[#d9d9d7]/32 focus:border-white/28 focus:bg-white/12"
                            placeholder="5512345678"
                          />
                        </div>
                        {fieldErrors?.supporterWhatsapp ? (
                          <p className="mt-3 text-sm text-[#ffb9a6]">
                            {fieldErrors.supporterWhatsapp}
                          </p>
                        ) : null}
                      </label>
                    </div>
                  </div>
                </section>

                {fieldErrors?.form ? (
                  <div className="rounded-[20px] border border-[#8d3116]/18 bg-[#8d3116]/8 px-4 py-3 text-sm text-[#7b250a]">
                    {fieldErrors.form}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[#3a3a3a]">
                    La encuesta ahora guarda respuestas reales en la tabla de
                    survey.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f4efe8] transition hover:bg-[#242424] disabled:cursor-wait disabled:opacity-70"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar feedback"}
                  </button>
                </div>
              </Form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
