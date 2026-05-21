import { useState } from "react";

const MARQUEE_ITEMS = [
  "Batch n°01",
  "Ya mero",
  "Small run",
  "Handmade",
  "Pa' los que mastican",
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
    <div
      style={{
        position: "fixed",
        inset: 0,
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
        {/* ── Header ── */}
        <header
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            padding: "16px 28px",
            borderBottom: "1px solid rgba(217,217,215,0.08)",
          }}
        >
          {/* Isotipo */}
          <a
            href="#"
            aria-label="The Fred Bites"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "#d9d9d7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            <img
              src="/isotipo.png"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </a>

          <span
            style={{
              marginLeft: 12,
              fontSize: 11,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(217,217,215,0.55)",
            }}
          >
            The Fred Bites
          </span>

        </header>

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
              Batch n°01 — Ya mero
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
              Bite
              <br />
              first.
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
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(217,217,215,0.38)",
                  }}
                >
                  Batch n°01 — Ya mero
                </span>
              </div>

              {/* Main typographic lockup */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingBottom: 12,
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Bowlby One', 'Arial Black', sans-serif",
                    fontSize: "clamp(72px, 10.8vw, 158px)",
                    lineHeight: 0.88,
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
                    marginTop: 28,
                    width: "55%",
                    height: 1,
                    background: "rgba(217,217,215,0.15)",
                  }}
                />

                <p
                  style={{
                    marginTop: 20,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "rgba(217,217,215,0.45)",
                    maxWidth: 320,
                  }}
                >
                  Small batches. Handmade. Pa' los que sí mastican de verdad.
                </p>
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
                    <span
                      style={{
                        width: 20,
                        height: 1.5,
                        background: "#1a1a1a",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "#3a3a3a",
                      }}
                    >
                      La release list
                    </span>
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
                    Te avisamos cuando la batch n°01 esté ready. De paso, cuéntale a alguien que mastique de verdad.
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
  );
}
