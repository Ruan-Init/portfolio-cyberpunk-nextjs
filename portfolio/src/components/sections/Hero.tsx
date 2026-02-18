"use client";

import { useLang } from "@/lib/lang";
import { useEffect, useRef } from "react";

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  // Parallax on mouse move
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 12;
      const dy = (e.clientY / window.innerHeight - 0.5) * 6;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-20 md:py-0"
    >
      <div ref={ref as any} className="transition-transform duration-100">
        {/* Label */}
        <div
          className="mb-6 animate-fadeUp"
          style={{ fontFamily: "Share Tech Mono, monospace", letterSpacing: 6 }}
        >
          <span className="text-[0.7rem] text-[#ff006e] uppercase">
            // {t("desenvolvedor frontend", "frontend developer")}
          </span>{" "}
          <span className="inline-block animate-blink">▮</span>
        </div>

        {/* Title */}
        <h1
          className="mb-8 leading-[0.9] animate-fadeUp"
          style={{
            fontFamily: "Orbitron, monospace",
            fontWeight: 900,
            fontSize: "clamp(3rem, 8vw, 7rem)",
          }}
        >
          <span className="glitch block text-[#00f5ff]">RUAN</span>
          <span className="block" style={{ color: "#ff006e" }}>
            CARLOS
          </span>
          <span
            className="block"
            style={{
              background: "linear-gradient(90deg, #00f5ff, #ff006e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DEVELOPER
          </span>
        </h1>

        {/* Sub */}
        <p className="text-sm sm:text-base md:text-lg lg:text-[1.15rem] text-[#d0d0d0] max-w-[560px] leading-[1.8] sm:leading-[1.8] md:leading-[1.9] font-normal tracking-wide animate-fadeUp" style={{ letterSpacing: "0.3px" }}>
          {t("4 anos", "4 years") === "4 anos" ? (
            <>
              <strong style={{ color: "#00f5ff", fontWeight: 600 }}>
                4 anos
              </strong>{" "}
              construindo interfaces que não só funcionam — elas{" "}
              <strong style={{ color: "#00f5ff", fontWeight: 600 }}>
                impressionam
              </strong>
              . Especialista em React, Next.js e experiências 3D que ninguém
              esquece.
            </>
          ) : (
            <>
              <strong style={{ color: "#00f5ff", fontWeight: 600 }}>
                4 years
              </strong>{" "}
              building interfaces that don't just work — they{" "}
              <strong style={{ color: "#00f5ff", fontWeight: 600 }}>
                impress
              </strong>
              . Specialist in React, Next.js and 3D experiences no one forgets.
            </>
          )}
        </p>

        {/* CTAs */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-5 animate-fadeUp">
          <a
            href="#projects"
            data-hover
            className="w-full sm:w-auto inline-block px-6 sm:px-9 py-2 sm:py-3 bg-[#00f5ff] text-[#050810] font-orbitron text-xs sm:text-[0.72rem] font-extrabold tracking-wider uppercase text-center"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff006e";
              e.currentTarget.style.boxShadow = "0 0 30px #ff006e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#00f5ff";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {t("Ver Projetos", "See Projects")}
          </a>
          <a
            href="#contact"
            data-hover
            className="w-full sm:w-auto inline-block px-6 sm:px-9 py-2 sm:py-3 border border-[#00f5ff] text-[#00f5ff] font-orbitron text-xs sm:text-[0.72rem] font-extrabold tracking-wider uppercase text-center"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,245,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,245,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {t("Falar Comigo", "Get In Touch")}
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden md:flex absolute right-6 lg:right-16 bottom-16 md:bottom-20 flex-col gap-4 md:gap-6 animate-fadeUp">
        {[
          { n: "12+", l: t("Projetos", "Projects") },
          { n: "4Y", l: t("Experiência", "Experience") },
          { n: "∞", l: t("Café", "Coffee") },
        ].map((s) => (
          <div key={s.n} style={{ textAlign: "right" }}>
            <div className="text-right">
              <div
                className="text-lg sm:text-xl md:text-[2.5rem] font-extrabold text-[#00f5ff] leading-none"
                style={{ textShadow: "0 0 20px #00f5ff" }}
              >
                {s.n}
              </div>
              <div className="text-[0.5rem] sm:text-[0.6rem] text-[color:var(--text-dim)] tracking-widest uppercase">
                {s.l}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeUp">
        <div className="text-[0.6rem] text-[color:var(--text-dim)] tracking-[4px]">
          SCROLL
        </div>
        <div
          className="w-[1px] h-10"
          style={{
            background: "linear-gradient(to bottom, #00f5ff, transparent)",
            animation: "scanline 2s linear infinite",
          }}
        />
      </div>
    </section>
  );
}
