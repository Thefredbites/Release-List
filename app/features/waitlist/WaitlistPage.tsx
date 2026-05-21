import { useState } from "react";

const MARQUEE_ITEMS = [
  "Batch n°01",
  "Coming soon",
  "Small run",
  "Handmade",
  "For those who know",
  "Release list open",
];

type FormState = "idle" | "done";

export function WaitlistPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ticket, setTicket] = useState("042");
  const [emailError, setEmailError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 1000);
      return;
    }
    const n = String(Math.floor(20 + Math.random() * 180)).padStart(3, "0");
    setTicket(n);
    setFormState("done");
  }

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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "16px 20px 20px", minHeight: "100%" }}>

      {/* ── Card 1: Waitlist (dark) ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1440,
          height: "calc(100vh - 48px)",
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
          {/* Mobile-only compact hero strip */}
          <div
            className="mobile-hero"
            style={{
              flexShrink: 0,
              padding: "28px 24px 24px",
              position: "relative",
              overflow: "hidden",
              display: "none",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(217,217,215,0.4)",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 1,
                  background: "rgba(217,217,215,0.3)",
                  display: "inline-block",
                }}
              />
              Batch n°01 — Coming soon
            </span>
            <div
              style={{
                fontFamily: "'Bowlby One', 'Arial Black', sans-serif",
                fontSize: "clamp(52px, 14vw, 80px)",
                lineHeight: 0.9,
                letterSpacing: "-0.025em",
                color: "#d9d9d7",
              }}
            >
              Snack
              <br />
              The Magic.
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
                  Snack
                  <br />
                  The Magic.
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
                  Small batches. Handmade. For those who know their food.
                </p>

                {/* Product preview */}
                <div className="mt-5 flex gap-3 items-start">
                  {/* Images */}
                  <div className="flex gap-2 shrink-0">
                    {["/empaque1.png", "/empaque2.png"].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`The Fred Bites — presentation 0${i + 1}`}
                        className="w-50 h-auto block"
                      />
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
                    height: 26,
                    opacity: 0.2,
                    filter: "invert(1) brightness(1.8)",
                  }}
                />
                <span
                  style={{
                    width: 1,
                    height: 18,
                    background: "rgba(217,217,215,0.18)",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(217,217,215,0.22)",
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
                backgroundImage: "url('/silver.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
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
                  backdropFilter: "blur(2px)",
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
                    justifyContent: "center",
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
                    Entra al drop.
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
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    style={{ display: "flex", flexDirection: "column", gap: 10 }}
                  >
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="wl-email"
                        style={{
                          display: "block",
                          fontSize: 10,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "#1a1a1a",
                          marginBottom: 6,
                        }}
                      >
                        Email
                      </label>
                      <input
                        id="wl-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                        className={`wl-input${emailError ? " wl-input--error" : ""}`}
                      />
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
                          color: "#1a1a1a",
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
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+1 555 000 0000"
                        autoComplete="tel"
                        className="wl-input wl-input--transparent"
                      />
                    </div>

                    <button
                      type="submit"
                      className="wl-submit"
                      style={{ marginTop: 6 }}
                    >
                      <span>Apúntame</span>
                      <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
                    </button>
                  </form>

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

                  {/* Bottom logotipo */}
                  <div style={{ marginTop: "auto", paddingTop: 28 }}>
                    <img
                      src="/logotipo.png"
                      alt=""
                      aria-hidden="true"
                      style={{ height: 20, opacity: 0.15 }}
                    />
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
                    justifyContent: "center",
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
                    We'll notify you when batch n°01 is ready. Share it with someone who'd appreciate it.
                  </p>

                  <span
                    style={{
                      display: "inline-block",
                      border: "1.5px solid #0a0a0a",
                      borderRadius: 999,
                      padding: "10px 22px",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#0a0a0a",
                      width: "fit-content",
                    }}
                  >
                    Lugar reservado · n°{ticket}
                  </span>

                  <div style={{ marginTop: "auto", paddingTop: 28 }}>
                    <img
                      src="/logotipo.png"
                      alt=""
                      aria-hidden="true"
                      style={{ height: 20, opacity: 0.15 }}
                    />
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
        @media (max-width: 767px) {
          .left-panel  { display: none !important; }
          .mobile-hero { display: flex !important; flex-direction: column; }
          .right-panel { padding-left: 24px !important; padding-right: 24px !important; }
        }
        @media (min-width: 768px) {
          .mobile-hero { display: none !important; }
          .left-panel  { display: flex !important; }
        }
        @media (max-height: 680px) {
          .left-panel { padding-top: 20px !important; padding-bottom: 20px !important; }
          .right-panel { padding-top: 0 !important; }
        }
      `}</style>
      </div>

      {/* ── Card 2: Product info (silver.jpg) ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1440,
          height: "calc(100vh - 48px)",
          flexShrink: 0,
          borderRadius: 14,
          overflow: "hidden",
          backgroundImage: "url('/silver.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {/* Overlay */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.7)", backdropFilter: "blur(3px)" }}
        />

        {/* Centrado vertical */}
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "center", padding: 40 }}>

        {/* Bento grid */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "160px 120px 100px 90px",
            gap: 10,
            fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {/* A — Hero (col 1-2, row 1-2) */}
          <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3", background: "rgba(217,217,215,0.05)", border: "1px solid rgba(217,217,215,0.08)", borderRadius: 10, padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(217,217,215,0.3)", marginBottom: 14 }}>The Fred Bites — Batch n°01</span>
            <h2 style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(34px, 3.6vw, 58px)", lineHeight: 0.9, letterSpacing: "-0.025em", color: "#d9d9d7", margin: "0 0 14px" }}>
              Snack<br />diferente.
            </h2>
            <p style={{ fontSize: 12, lineHeight: 1.65, color: "rgba(217,217,215,0.38)", maxWidth: 300, margin: 0 }}>
              Nació para demostrar que comer bien puede ser delicioso. Un dulce proteico, hecho a mano, con ingredientes que tu cuerpo reconoce.
            </p>
          </div>

          {/* B — Proteína (col 3, row 1) */}
          <div style={{ gridColumn: "3", gridRow: "1", background: "rgba(217,217,215,0.06)", border: "1px solid rgba(217,217,215,0.08)", borderRadius: 10, padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(217,217,215,0.3)" }}>Proteína / 100g</span>
            <div>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(36px, 3.2vw, 52px)", lineHeight: 1, letterSpacing: "-0.03em", color: "#d9d9d7", display: "block" }}>+30g</span>
              <span style={{ fontSize: 10, color: "rgba(217,217,215,0.25)", letterSpacing: "0.1em" }}>Alto en proteína real</span>
            </div>
          </div>

          {/* C — Azúcares (col 4, row 1) */}
          <div style={{ gridColumn: "4", gridRow: "1", background: "rgba(217,217,215,0.06)", border: "1px solid rgba(217,217,215,0.08)", borderRadius: 10, padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(217,217,215,0.3)" }}>Azúcares añadidos</span>
            <div>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(36px, 3.2vw, 52px)", lineHeight: 1, letterSpacing: "-0.03em", color: "#d9d9d7", display: "block" }}>0g</span>
              <span style={{ fontSize: 10, color: "rgba(217,217,215,0.25)", letterSpacing: "0.1em" }}>Sin picos de glucosa</span>
            </div>
          </div>

          {/* D — Kcal (col 3-4, row 2) */}
          <div style={{ gridColumn: "3 / 5", gridRow: "2", background: "rgba(217,217,215,0.04)", border: "1px solid rgba(217,217,215,0.08)", borderRadius: 10, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(217,217,215,0.3)", display: "block", marginBottom: 8 }}>Calorías / 100g</span>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(28px, 2.8vw, 44px)", lineHeight: 1, letterSpacing: "-0.03em", color: "#d9d9d7" }}>270 kcal</span>
            </div>
            <p style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(217,217,215,0.28)", maxWidth: 160, margin: 0 }}>
              Energía real sin comprometer tu día ni tu salud.
            </p>
          </div>

          {/* E — Colágeno & Magnesio (col 1-2, row 3) */}
          <div style={{ gridColumn: "1 / 3", gridRow: "3", background: "rgba(217,217,215,0.05)", border: "1px solid rgba(217,217,215,0.08)", borderRadius: 10, padding: "18px 24px", display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: 28, color: "rgba(217,217,215,0.4)", lineHeight: 1, flexShrink: 0 }}>✦</span>
            <div>
              <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(217,217,215,0.3)", display: "block", marginBottom: 3 }}>Ingredientes funcionales</span>
              <span style={{ fontSize: 14, color: "#d9d9d7", fontWeight: 500, letterSpacing: "-0.01em" }}>Colágeno & Magnesio</span>
              <span style={{ fontSize: 10, color: "rgba(217,217,215,0.25)", display: "block", marginTop: 2 }}>Para lo que tu cuerpo necesita cada día.</span>
            </div>
          </div>

          {/* F — Proceso (col 3, row 3) */}
          <div style={{ gridColumn: "3", gridRow: "3", background: "rgba(217,217,215,0.05)", border: "1px solid rgba(217,217,215,0.08)", borderRadius: 10, padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(217,217,215,0.3)" }}>Proceso</span>
            <div>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: 17, color: "#d9d9d7", letterSpacing: "-0.01em", display: "block" }}>Handmade</span>
              <span style={{ fontSize: 10, color: "rgba(217,217,215,0.25)", letterSpacing: "0.06em" }}>Lotes pequeños · Est. 2025</span>
            </div>
          </div>

          {/* G — Misión (col 4, row 3) */}
          <div style={{ gridColumn: "4", gridRow: "3", background: "rgba(217,217,215,0.05)", border: "1px solid rgba(217,217,215,0.08)", borderRadius: 10, padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(217,217,215,0.3)" }}>Misión</span>
            <div>
              <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: 17, color: "#d9d9d7", letterSpacing: "-0.01em", display: "block" }}>Bite well.</span>
              <span style={{ fontSize: 10, color: "rgba(217,217,215,0.25)", letterSpacing: "0.06em" }}>Sin sacrificar el sabor</span>
            </div>
          </div>

          {/* H — Filosofía (col 1-2, row 4) */}
          <div style={{ gridColumn: "1 / 3", gridRow: "4", background: "rgba(217,217,215,0.04)", border: "1px solid rgba(217,217,215,0.06)", borderRadius: 10, padding: "16px 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 5 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(217,217,215,0.25)" }}>Por qué The Fred Bites</span>
            <p style={{ fontSize: 11, lineHeight: 1.65, color: "rgba(217,217,215,0.32)", margin: 0 }}>
              Creemos que un snack puede ser funcional, delicioso y honesto al mismo tiempo. Sin ingredientes que no reconoces, sin promesas vacías — solo producto bien hecho.
            </p>
          </div>

          {/* I — Para quién (col 3, row 4) */}
          <div style={{ gridColumn: "3", gridRow: "4", background: "rgba(217,217,215,0.04)", border: "1px solid rgba(217,217,215,0.06)", borderRadius: 10, padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 5 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(217,217,215,0.25)" }}>Para quién</span>
            <p style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(217,217,215,0.32)", margin: 0 }}>
              Para quien entrena, trabaja duro o simplemente quiere comer mejor sin complicarse la vida.
            </p>
          </div>

          {/* J — Tagline (col 4, row 4) */}
          <div style={{ gridColumn: "4", gridRow: "4", background: "rgba(217,217,215,0.04)", border: "1px solid rgba(217,217,215,0.06)", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Bowlby One', 'Arial Black', sans-serif", fontSize: "clamp(12px, 1.3vw, 17px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "rgba(217,217,215,0.22)", textAlign: "center" as const }}>
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
