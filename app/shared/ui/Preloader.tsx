import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;
const FADE_MS = 400;

export function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setPhase("out"), DURATION_MS);
    const removeTimer = window.setTimeout(
      () => setPhase("gone"),
      DURATION_MS + FADE_MS + 50,
    );
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        background: `
          radial-gradient(ellipse 70% 60% at -5% -5%, rgba(103,232,249,0.55) 0%, transparent 60%),
          radial-gradient(ellipse 65% 55% at 105% 108%, rgba(244,114,182,0.55) 0%, transparent 60%),
          #ffffff
        `,
        opacity: phase === "out" ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease-out`,
        pointerEvents: phase === "out" ? "none" : "auto",
      }}
    >
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
          animation: "preloader-fade-tr 700ms ease-out both",
        }}
      />
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
          animation: "preloader-fade-bl 700ms ease-out both",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/logotipo.png"
          alt="The Fred Bites"
          style={{
            width: "min(40vw, 260px)",
            height: "auto",
            animation: "preloader-fade-logo 800ms ease-out 150ms both",
          }}
        />
      </div>
      <style>{`
        @keyframes preloader-fade-tr {
          from { opacity: 0; transform: translate(20px, -20px); }
          to   { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes preloader-fade-bl {
          from { opacity: 0; transform: translate(-20px, 20px); }
          to   { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes preloader-fade-logo {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default Preloader;
