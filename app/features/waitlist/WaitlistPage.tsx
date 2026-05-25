import { Form } from "react-router";

import type { WaitlistSubmissionResult } from "../../lib/waitlist.server";

const MARQUEE_ITEMS = [
  "Sample n°01",
  "Coming soon",
  "Alta proteína",
  "Para los que saben",
  "Lista de lanzamiento abierto",
];

type WaitlistPageProps = {
  submission?: WaitlistSubmissionResult;
  isSubmitting: boolean;
};

export function WaitlistPage({ submission, isSubmitting }: WaitlistPageProps) {
  const formState = submission?.ok ? "done" : "idle";
  const fieldErrors = !submission?.ok ? submission?.fieldErrors : undefined;
  const values = !submission?.ok ? submission?.values : undefined;

  return (
    <>
    {/* ── Static background (fixed, no scroll) ── */}
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: `
          radial-gradient(ellipse 70% 60% at -5% -5%, rgba(103,232,249,0.55) 0%, transparent 60%),
          radial-gradient(ellipse 65% 55% at 105% 108%, rgba(244,114,182,0.55) 0%, transparent 60%),
          #ffffff
        `,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* ── Decorative SVG top-right ── */}
      <img
        src="/decorative_topright_pink.svg"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "clamp(280px, 30vw, 480px)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ── Decorative SVG bottom-left ── */}
      <img
        src="/decorative_bottomleft_blue.svg"
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "clamp(260px, 28vw, 440px)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ── Logo — top-left del fondo, fuera del ancho del card ── */}
      <a
        href="#"
        aria-label="The Fred Bites"
        style={{
          position: "absolute",
          top: 16,
          left: 20,
          textDecoration: "none",
          zIndex: 20,
        }}
      >
        <img
          src="/isotipo.png"
          alt="The Fred Bites"
          style={{ width: 28, height: 28, objectFit: "contain", display: "block" }}
        />
      </a>
    </div>

    {/* ── Scrollable layer ── */}
    <div style={{ position: "fixed", inset: 0, overflowY: "auto", zIndex: 10 }}>
      <div className="scroll-inner" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "16px 20px 20px", minHeight: "100%" }}>

      {/* ── Card 1: Waitlist (dark) ── */}
      <div
        className="card-1"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1440,
          height: "calc(100svh - 48px)",
          flexShrink: 0,
          borderRadius: 14,
          overflow: "hidden",
          background: "#0a0a0a",
          fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
      {/* Animated grain texture */}
      <div className="grain-layer" aria-hidden="true" />

      {/* Edge vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          background:
            "radial-gradient(80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* ─────────────────────────────────────────────
          Content stack: header / body / footer
      ───────────────────────────────────────────── */}
      <div
        className="content-stack"
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Body: left brand panel + right form panel ── */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
          className="md-body"
        >
          {/* Mobile-only hero */}
          <div
            className="mobile-hero"
            style={{ flexShrink: 0, padding: "28px 24px 24px", position: "relative", display: "none" }}
          >
            {/* Eyebrow */}
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(217,217,215,0.38)", marginBottom: 12 }}>
              <span style={{ width: 16, height: 1, background: "rgba(217,217,215,0.25)", display: "inline-block" }} />
              Batch n°01 — Coming soon
            </span>

            {/* Title */}
            <div style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(52px, 14vw, 76px)", lineHeight: 0.88, letterSpacing: "-0.025em", color: "#d9d9d7", marginBottom: 16 }}>
              Bite<br />First.
            </div>

            {/* Separator + tagline */}
            <div style={{ width: 40, height: 1, background: "rgba(217,217,215,0.15)", marginBottom: 12 }} />
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(217,217,215,0.42)", margin: "0 0 24px" }}>
              Para el antojo entre comidas, rápido, portable.
            </p>

            {/* Imágenes */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["/empaque1.webp", "/empaque2.webp"].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`The Fred Bites — presentation 0${i + 1}`}
                  style={{ width: 110, height: "auto", objectFit: "contain", display: "block" }}
                />
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { value: "+30g", detail: "proteína / 100g" },
                { value: "0g", detail: "azúcares añadidos" },
                { value: "270", detail: "calorías / 100g" },
                { value: "✦", detail: "colágeno & magnesio" },
              ].map(({ value, detail }) => (
                <div key={detail} style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
                  <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: 15, lineHeight: 1, color: "#d9d9d7", letterSpacing: "-0.01em" }}>
                    {value}
                  </span>
                  <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(217,217,215,0.38)" }}>
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Desktop row ── */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
            }}
          >
            {/* Left panel — dark editorial side (hidden mobile) */}
            <div
              className="left-panel"
              style={{
                flex: "0 0 58%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                padding: "36px 52px 36px 44px",
                overflow: "hidden",
              }}
            >
              {/* "01" watermark — decorative background number */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: "-4vw",
                  bottom: "-2vw",
                  fontFamily: "'Bowlby One', 'Arial Black', sans-serif",
                  fontSize: "42vw",
                  fontWeight: 900,
                  color: "rgba(217,217,215,0.03)",
                  lineHeight: 0.82,
                  letterSpacing: "-0.04em",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                01
              </div>

              {/* Vertical "BATCH — 01" text on right edge */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: 18,
                  top: "50%",
                  transform: "translateY(-50%) rotate(180deg)",
                  writingMode: "vertical-rl" as const,
                  fontSize: 9,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "rgba(217,217,215,0.18)",
                  userSelect: "none",
                }}
              >
                BATCH — 01
              </div>

              {/* Top eyebrow */}
              <div
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 1,
                    background: "rgba(217,217,215,0.25)",
                    display: "inline-block",
                  }}
                />
              </div>

              {/* Main typographic lockup */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  paddingTop: 24,
                  paddingBottom: 12,
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Bowlby One', 'Arial Black', sans-serif",
                    fontSize: "clamp(48px, 6.2vw, 90px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.025em",
                    color: "#d9d9d7",
                    margin: 0,
                  }}
                >
                  Bite
                  <br />
                  First.
                </h1>

                {/* Thin rule */}
                <div
                  style={{
                    marginTop: 18,
                    width: "55%",
                    height: 1,
                    background: "rgba(217,217,215,0.15)",
                  }}
                />

                <p
                  style={{
                    marginTop: 14,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "rgba(217,217,215,0.45)",
                    maxWidth: 320,
                  }}
                >
                  Para el antojo entre comidas, rápido, portable.
                </p>

                {/* Product preview */}
                <div className="mt-5 flex gap-3 items-start">
                  {/* Images */}
                  <div className="flex gap-2 shrink-0">
                    {[
                      { src: "/empaque1.webp", label: "Fresa" },
                      { src: "/empaque2.webp", label: "Chocolate" },
                    ].map(({ src, label }) => (
                      <div key={src} className="flex flex-col items-center gap-2 shrink-0">
                        <img
                          src={src}
                          alt={`The Fred Bites — ${label}`}
                          className="w-50 h-auto block"
                        />
                        <span
                          style={{
                            fontFamily: "'Bowlby One', 'Arial Black', sans-serif",
                            fontSize: 14,
                            letterSpacing: "0.02em",
                            color: "#d9d9d7",
                            lineHeight: 1,
                          }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Product info */}
                  <div className="flex flex-col gap-2 pt-1 shrink-0">
                    {[
                      { value: "+30g", detail: "proteína / 100g" },
                      { value: "0g", detail: "azúcares añadidos" },
                      { value: "260", detail: "calorías / 100g" },
                      { value: "✦", detail: "colágeno & magnesio" },
                    ].map(({ value, detail }) => (
                      <div key={detail} className="flex items-baseline gap-1.5">
                        <span className="font-[Bowlby_One] text-[13px] leading-none tracking-tight text-[#d9d9d7]">
                          {value}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[#d9d9d7]/40">
                          {detail}
                        </span>
                      </div>
                    ))}

                    {/* Mood descriptors */}
                    <div
                      style={{
                        marginTop: 14,
                        paddingTop: 12,
                        borderTop: "1px solid rgba(217,217,215,0.12)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Bowlby One', 'Arial Black', sans-serif",
                          fontSize: 15,
                          letterSpacing: "-0.01em",
                          color: "#d9d9d7",
                          lineHeight: 1.1,
                        }}
                      >
                        Natural
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          lineHeight: 1.4,
                          color: "rgba(217,217,215,0.7)",
                          fontStyle: "italic",
                        }}
                      >
                        Delicioso
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          lineHeight: 1.4,
                          color: "rgba(217,217,215,0.5)",
                          fontStyle: "italic",
                        }}
                      >
                        Crujiente y suave
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom brand row */}
              <div
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <img
                  src="/logotipo.png"
                  alt="The Fred Bites"
                  style={{
                    height: 48,
                    opacity: 0.80,
                    filter: "invert(1) brightness(1.8)",
                  }}
                />
                <span
                  style={{
                    width: 1,
                    height: 18,
                    background: "rgba(217,217,215,0.80)",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(217,217,215,0.80)",
                  }}
                >
                  Est. 2025
                </span>
              </div>
            </div>

            {/* Right panel — form side */}
            <div
              className="right-panel"
              style={{
                flex: 1,
                backgroundImage: "url('/silver.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                padding: "0 48px",
                position: "relative",
              }}
            >
              {/* Overlay to keep form legible over the texture */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(225, 224, 222, 0.52)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              {formState === "idle" ? (
                <div
                  key="idle"
                  className="fade-up"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    paddingTop: 40,
                    paddingBottom: 32,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Eyebrow */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 18,
                    }}
                  >
                    
                  </div>

                  {/* Headline */}
                  <h2
                    style={{
                      fontFamily: "'Bowlby One', 'Arial Black', sans-serif",
                      fontSize: "clamp(34px, 3.6vw, 54px)",
                      lineHeight: 1.0,
                      letterSpacing: "-0.02em",
                      color: "#0a0a0a",
                      margin: "0 0 10px",
                    }}
                  >
                    Únete a la comunidad.
                  </h2>

                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "#3a3a3a",
                      marginBottom: 28,
                      maxWidth: 340,
                    }}
                  >
                    La batch n°01 sale pronto. Un mensaje al lanzar, precio de founders — así de simple.
                  </p>

                  {/* Form */}
                  <Form
                    method="post"
                    noValidate
                    style={{ display: "flex", flexDirection: "column", gap: 10 }}
                  >
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        border: 0,
                      }}
                    />
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="wl-email"
                        style={{
                          display: "block",
                          fontSize: 10,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "#f1f0ee",
                          marginBottom: 6,
                        }}
                      >
                        Email
                      </label>
                      <input
                        id="wl-email"
                        type="email"
                        name="email"
                        defaultValue={values?.email ?? ""}
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                        className={`wl-input${fieldErrors?.email ? " wl-input--error" : ""}`}
                      />
                      {fieldErrors?.email ? (
                        <p
                          style={{
                            marginTop: 8,
                            fontSize: 12,
                            lineHeight: 1.4,
                            color: "#8d3116",
                          }}
                        >
                          {fieldErrors.email}
                        </p>
                      ) : null}
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label
                        htmlFor="wl-whatsapp"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 10,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "#f1f0ee",
                          marginBottom: 6,
                        }}
                      >
                        WhatsApp
                        <span
                          style={{
                            background: "rgba(10,10,10,0.1)",
                            borderRadius: 999,
                            padding: "2px 9px",
                            fontSize: 9,
                            letterSpacing: "0.14em",
                            fontWeight: 500,
                          }}
                        >
                          Opcional
                        </span>
                      </label>
                      <input
                        id="wl-whatsapp"
                        type="tel"
                        name="whatsapp"
                        defaultValue={values?.whatsapp ?? ""}
                        placeholder="5512345678"
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength={10}
                        className={`wl-input wl-input--transparent${fieldErrors?.whatsapp ? " wl-input--error" : ""}`}
                      />
                      {fieldErrors?.whatsapp ? (
                        <p
                          style={{
                            marginTop: 8,
                            fontSize: 12,
                            lineHeight: 1.4,
                            color: "#8d3116",
                          }}
                        >
                          {fieldErrors.whatsapp}
                        </p>
                      ) : null}
                    </div>

                    {fieldErrors?.form ? (
                      <div
                        style={{
                          borderRadius: 12,
                          border: "1px solid rgba(141, 49, 22, 0.18)",
                          background: "rgba(141, 49, 22, 0.08)",
                          padding: "10px 12px",
                          fontSize: 12,
                          lineHeight: 1.5,
                          color: "#7b250a",
                        }}
                      >
                        {fieldErrors.form}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="wl-submit"
                      style={{ marginTop: 6 }}
                    >
                      <span>{isSubmitting ? "Guardando..." : "Apúntame"}</span>
                      <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
                    </button>
                  </Form>

                  {/* Trust row */}
                  <div
                    style={{
                      display: "flex",
                      gap: 18,
                      flexWrap: "wrap",
                      marginTop: 20,
                      paddingTop: 18,
                      borderTop: "1px solid rgba(10,10,10,0.1)",
                    }}
                  >
                    {["Zero spam", "Un email al lanzar", "Limited run"].map(
                      (item) => (
                        <span
                          key={item}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 10,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#3a3a3a",
                          }}
                        >
                          <span
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: "#0a0a0a",
                              display: "inline-block",
                            }}
                          />
                          {item}
                        </span>
                      )
                    )}
                  </div>

                </div>
              ) : (
                <div
                  key="done"
                  className="fade-up"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    paddingTop: 40,
                    paddingBottom: 32,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bowlby One', 'Arial Black', sans-serif",
                      fontSize: "clamp(52px, 5.8vw, 84px)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.025em",
                      color: "#0a0a0a",
                      marginBottom: 22,
                    }}
                  >
                    Ya
                    <br />
                    estás.
                  </div>

                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#3a3a3a",
                      marginBottom: 28,
                      maxWidth: 340,
                    }}
                  >
                    {submission?.ok
                      ? submission.message
                      : "Te avisaremos cuando batch n°01 salga."}
                  </p>

                  <div
                    style={{
                      display: "inline-flex",
                      border: "1px solid rgba(10,10,10,0.14)",
                      borderRadius: 999,
                      padding: "12px 20px",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#0a0a0a",
                      width: "fit-content",
                      alignItems: "center",
                      gap: 10,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(240,236,230,0.94) 52%, rgba(225,219,212,0.88) 100%)",
                      boxShadow:
                        "0 14px 34px rgba(10,10,10,0.12), inset 0 1px 0 rgba(255,255,255,0.72)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    ✦ Lugar reservado · n°{submission?.ok ? submission.reserveCode : "000"}
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Footer marquee ── */}
        <footer
          style={{
            flexShrink: 0,
            overflow: "hidden",
            borderTop: "1px solid rgba(217,217,215,0.08)",
            background: "rgba(10,10,10,0.7)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, i) => (
              <span key={i} className="marquee-item">
                {text}
              </span>
            ))}
          </div>
        </footer>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        /* ── Desktop ── */
        @media (min-width: 768px) {
          .mobile-hero { display: none !important; }
          .left-panel  { display: flex !important; }
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          /* Outer wrapper: menos padding en mobile */
          .scroll-inner {
            padding: 8px 10px 10px !important;
            gap: 8px !important;
          }

          /* Cards: crecen con el contenido, min-height de una pantalla */
          .card-1 {
            height: auto !important;
            min-height: calc(100svh - 28px) !important;
            overflow: clip !important;
            border-radius: 10px !important;
          }
          .card-2 {
            border-radius: 10px !important;
          }

          /* Content stack: altura automática en mobile */
          .content-stack {
            height: auto !important;
            flex: 1 !important;
          }

          /* md-body */
          .md-body {
            flex: 1 !important;
            min-height: auto !important;
          }

          /* Paneles */
          .left-panel  { display: none !important; }
          .mobile-hero { display: flex !important; flex-direction: column; }

          /* Formulario: ocupa el espacio restante, sin scroll propio */
          .right-panel {
            padding-left: 20px !important;
            padding-right: 20px !important;
            overflow: hidden !important;
          }

          /* md-body: column en mobile ya está, aseguramos flex correcto */
          .md-body {
            flex-direction: column !important;
            overflow: hidden;
          }
        }

        /* ── Bento mobile ── */
        @media (max-width: 767px) {
          /* Card 2: crece con el contenido, sin clipping */
          .card-2 {
            height: auto !important;
            min-height: calc(100svh - 28px) !important;
            overflow: clip !important;
            border-radius: 10px !important;
          }

          /* Centrador: altura auto, top, padding compacto */
          .bento-centerer {
            height: auto !important;
            align-items: flex-start !important;
            padding: 14px !important;
          }

          /* Grid: 2 columnas, alturas automáticas */
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: none !important;
            gap: 8px !important;
          }

          /* Reset grid positions para que el flujo sea automático */
          .bc-a, .bc-b, .bc-c, .bc-d, .bc-e,
          .bc-f, .bc-g, .bc-h, .bc-i, .bc-j {
            grid-column: auto !important;
            grid-row: auto !important;
          }

          /* A — hero: ancho completo, altura mínima cómoda */
          .bc-a { grid-column: 1 / 3 !important; min-height: 160px; }

          /* B + C — stats lado a lado, altura fija */
          .bc-b, .bc-c { min-height: 110px; }

          /* D — kcal: ancho completo */
          .bc-d { grid-column: 1 / 3 !important; min-height: 80px; }

          /* E — colágeno: ancho completo */
          .bc-e { grid-column: 1 / 3 !important; min-height: 80px; }

          /* F + G — proceso y misión: lado a lado */
          .bc-f, .bc-g { min-height: 90px; }

          /* H — filosofía: ancho completo */
          .bc-h { grid-column: 1 / 3 !important; min-height: 90px; }

          /* I + J — para quién y tagline: lado a lado */
          .bc-i, .bc-j { min-height: 90px; }
        }

        /* ── Pantallas muy bajas (landscape mobile) ── */
        @media (max-height: 600px) {
          .mobile-hero { padding-top: 16px !important; padding-bottom: 12px !important; }
          .left-panel  { padding-top: 16px !important; padding-bottom: 16px !important; }
          .right-panel { padding-top: 0 !important; }
        }
      `}</style>
      </div>

      {/* ── Card 2: Product info (silver.jpg) ── */}
      <div
        className="card-2"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1440,
          height: "calc(100svh - 48px)",
          flexShrink: 0,
          borderRadius: 14,
          overflow: "hidden",
          backgroundImage: "url('/silver.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {/* Overlay */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.45)" }}
        />

        {/* Centrado vertical */}
        <div className="bento-centerer" style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "center", padding: 40 }}>

        {/* Bento grid */}
        <div
          className="bento-grid"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "160px 120px 100px 90px",
            gap: 10,
            fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {/* A */}
          <div className="bc-a" style={{ gridColumn: "1 / 3", gridRow: "1 / 3", background: "radial-gradient(ellipse at 110% -10%, rgba(105,210,227,0.45) 0%, transparent 55%), radial-gradient(ellipse at -10% 110%, rgba(238,74,129,0.35) 0%, transparent 55%), #f1f0ee", borderRadius: 10, padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)", marginBottom: 14 }}>The Fred Bites — Batch n°01</span>
            <h2 style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(34px, 3.6vw, 58px)", lineHeight: 0.9, letterSpacing: "-0.025em", color: "#0a0a0a", margin: "0 0 14px" }}>
              Snack<br />diferente.
            </h2>
            <p style={{ fontSize: 12, lineHeight: 1.65, color: "rgba(10,10,10,0.55)", maxWidth: 300, margin: 0 }}>
              Nació para demostrar que comer bien puede ser delicioso. Un dulce proteico, hecho a mano, con ingredientes que tu cuerpo reconoce.
            </p>
          </div>

          {/* B */}
          <div className="bc-b" style={{ gridColumn: "3", gridRow: "1", background: "radial-gradient(ellipse at 50% 120%, rgba(1,71,186,0.5) 0%, transparent 65%), #f1f0ee", borderRadius: 10, padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Proteína / 100g</span>
            <div>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(36px, 3.2vw, 52px)", lineHeight: 1, letterSpacing: "-0.03em", color: "#0a0a0a", display: "block" }}>+30g</span>
              <span style={{ fontSize: 10, color: "rgba(10,10,10,0.4)", letterSpacing: "0.1em" }}>Alto en proteína real</span>
            </div>
          </div>

          {/* C */}
          <div className="bc-c" style={{ gridColumn: "4", gridRow: "1", background: "radial-gradient(ellipse at -10% -10%, rgba(238,74,129,0.45) 0%, transparent 60%), #f1f0ee", borderRadius: 10, padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Azúcares añadidos</span>
            <div>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(36px, 3.2vw, 52px)", lineHeight: 1, letterSpacing: "-0.03em", color: "#0a0a0a", display: "block" }}>0g</span>
              <span style={{ fontSize: 10, color: "rgba(10,10,10,0.4)", letterSpacing: "0.1em" }}>Sin picos de glucosa</span>
            </div>
          </div>

          {/* D */}
          <div className="bc-d" style={{ gridColumn: "3 / 5", gridRow: "2", background: "radial-gradient(ellipse at 0% 50%, rgba(105,210,227,0.4) 0%, transparent 60%), #f1f0ee", borderRadius: 10, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)", display: "block", marginBottom: 8 }}>Calorías / 100g</span>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(28px, 2.8vw, 44px)", lineHeight: 1, letterSpacing: "-0.03em", color: "#0a0a0a" }}>270 kcal</span>
            </div>
            <p style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(10,10,10,0.5)", maxWidth: 160, margin: 0 }}>
              Energía real sin comprometer tu día ni tu salud.
            </p>
          </div>

          {/* E */}
          <div className="bc-e" style={{ gridColumn: "1 / 3", gridRow: "3", background: "radial-gradient(ellipse at 110% 110%, rgba(242,120,200,0.5) 0%, transparent 55%), #f1f0ee", borderRadius: 10, padding: "18px 24px", display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: 28, color: "rgba(238,74,129,0.8)", lineHeight: 1, flexShrink: 0 }}>✦</span>
            <div>
              <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)", display: "block", marginBottom: 3 }}>Ingredientes funcionales</span>
              <span style={{ fontSize: 14, color: "#0a0a0a", fontWeight: 500, letterSpacing: "-0.01em" }}>Colágeno & Magnesio</span>
              <span style={{ fontSize: 10, color: "rgba(10,10,10,0.45)", display: "block", marginTop: 2 }}>Para lo que tu cuerpo necesita cada día.</span>
            </div>
          </div>

          {/* F */}
          <div className="bc-f" style={{ gridColumn: "3", gridRow: "3", background: "radial-gradient(ellipse at 50% -20%, rgba(137,171,228,0.55) 0%, transparent 65%), #f1f0ee", borderRadius: 10, padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Proceso</span>
            <div>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: 17, color: "#0a0a0a", letterSpacing: "-0.01em", display: "block" }}>Handmade</span>
              <span style={{ fontSize: 10, color: "rgba(10,10,10,0.4)", letterSpacing: "0.06em" }}>Lotes pequeños · Est. 2025</span>
            </div>
          </div>

          {/* G */}
          <div className="bc-g" style={{ gridColumn: "4", gridRow: "3", background: "radial-gradient(ellipse at 110% 50%, rgba(238,74,129,0.4) 0%, transparent 60%), #f1f0ee", borderRadius: 10, padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Misión</span>
            <div>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: 17, color: "#0a0a0a", letterSpacing: "-0.01em", display: "block" }}>Bite well.</span>
              <span style={{ fontSize: 10, color: "rgba(10,10,10,0.4)", letterSpacing: "0.06em" }}>Sin sacrificar el sabor</span>
            </div>
          </div>

          {/* H */}
          <div className="bc-h" style={{ gridColumn: "1 / 3", gridRow: "4", background: "radial-gradient(ellipse at 0% 50%, rgba(105,210,227,0.3) 0%, transparent 55%), #f1f0ee", borderRadius: 10, padding: "16px 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 5 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Por qué The Fred Bites</span>
            <p style={{ fontSize: 11, lineHeight: 1.65, color: "rgba(10,10,10,0.55)", margin: 0 }}>
              Creemos que un snack puede ser funcional, delicioso y honesto al mismo tiempo. Sin ingredientes que no reconoces, sin promesas vacías — solo producto bien hecho.
            </p>
          </div>

          {/* I */}
          <div className="bc-i" style={{ gridColumn: "3", gridRow: "4", background: "radial-gradient(ellipse at 110% 50%, rgba(242,120,200,0.35) 0%, transparent 60%), #f1f0ee", borderRadius: 10, padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 5 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Para quién</span>
            <p style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(10,10,10,0.55)", margin: 0 }}>
              Para quien entrena, trabaja duro o simplemente quiere comer mejor sin complicarse la vida.
            </p>
          </div>

          {/* J */}
          <div className="bc-j" style={{ gridColumn: "4", gridRow: "4", background: "radial-gradient(ellipse at 0% 0%, rgba(105,210,227,0.35) 0%, transparent 55%), radial-gradient(ellipse at 110% 110%, rgba(238,74,129,0.35) 0%, transparent 55%), #f1f0ee", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(12px, 1.3vw, 17px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "rgba(10,10,10,0.45)", textAlign: "center" as const }}>
              "Feel good.<br/>Bite first."
            </span>
          </div>
        </div>
        </div>
      </div>

      </div>
    </div>
    </>
  );
}
