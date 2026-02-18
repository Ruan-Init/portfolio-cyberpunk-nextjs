"use client";

import { useLang } from "@/lib/lang";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { t } = useLang();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 min-h-screen px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Text */}
      <div>
        <div className="mb-12">
          <div
            className="flex items-center gap-3 mb-4"
            style={{
              fontFamily: "Share Tech Mono, monospace",
              letterSpacing: 6,
            }}
          >
            <span className="w-10 h-px bg-[#ff006e] inline-block" />
            <span className="text-[0.62rem] text-[#ff006e] uppercase">
              {t("Sobre mim", "About me")}
            </span>
          </div>
          <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-white leading-none">
            {t("Quem ", "Who ")}
            <span
              className="text-[#00f5ff]"
              style={{ textShadow: "0 0 20px #00f5ff" }}
            >
              {t("sou eu", "I Am")}
            </span>
          </h2>
        </div>

        {[
          t(
            "Sou um desenvolvedor frontend com paixão por criar experiências únicas na web. Acredito que todo pixel importa e que uma boa interface deve fazer o usuário sentir algo.",
            "I'm a frontend developer with a passion for creating unique web experiences. I believe every pixel matters and that a great interface should make users feel something.",
          ),
          t(
            "Nos últimos 4 anos, trabalhei em projetos que vão de dashboards corporativos a aplicações criativas, sempre trazendo qualidade técnica e atenção visual para tudo que faço.",
            "Over the last 4 years, I've worked on projects ranging from corporate dashboards to creative applications, always bringing technical quality and visual care to everything I do.",
          ),
          t(
            "Quando não estou codando, estou explorando novas tecnologias, contribuindo para open source ou tentando bater meu recorde de café no dia.",
            "When I'm not coding, I'm exploring new technologies, contributing to open source, or trying to beat my personal coffee record for a workday.",
          ),
        ].map((text, i) => (
          <p
            key={i}
            className="text-base sm:text-lg md:text-[1.05rem] leading-[1.8] md:leading-[1.9] text-[#e0e0e0] mb-6 font-normal"
            style={{ letterSpacing: "0.3px" }}
          >
            {text}
          </p>
        ))}
      </div>

      {/* Visual */}
      <div className="relative h-[400px] flex items-center justify-center">
        {/* Avatar frame */}
        <div className="w-[260px] h-[260px] relative">
          <div
            className="absolute -inset-0.5"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #ff006e, #ffe600)",
              clipPath:
                "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
              animation: "pulse-slow 3s ease-in-out infinite",
            }}
          />
          <div
            className="absolute inset-2 bg-[#0a0f1e] flex items-center justify-center text-[#00f5ff]"
            style={{
              clipPath:
                "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
              fontFamily: "Orbitron, monospace",
              fontSize: "4.5rem",
              textShadow: "0 0 40px #00f5ff",
            }}
          >
            JS
          </div>
        </div>

        {/* Floating tags */}
        {[
          { label: "React.js", top: "8%", left: "-5%", delay: "0s" },
          { label: "Next.js", top: "18%", right: "-5%", delay: "0.5s" },
          { label: "Three.js", bottom: "28%", left: "-5%", delay: "1s" },
          { label: "TypeScript", bottom: "8%", right: "-5%", delay: "1.5s" },
        ].map((tag) => (
          <div
            key={tag.label}
            className="absolute text-[#00f5ff]"
            style={{
              top: tag.top as any,
              left: tag.left as any,
              bottom: (tag as any).bottom,
              right: (tag as any).right,
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "0.62rem",
              letterSpacing: 2,
              border: "1px solid rgba(0,245,255,0.2)",
              padding: "4px 10px",
              background: "var(--glass)",
              animation: `float 3s ease-in-out ${tag.delay} infinite`,
            }}
          >
            {tag.label}
          </div>
        ))}

        {/* Orbit ring */}
        <div
          className="absolute w-[320px] h-[320px] rounded-full"
          style={{
            border: "1px solid rgba(0,245,255,0.1)",
            animation: "spin 20s linear infinite",
          }}
        />
        <div
          className="absolute w-[360px] h-[360px] rounded-full"
          style={{
            border: "1px dashed rgba(255,0,110,0.08)",
            animation: "spin 30s linear infinite reverse",
          }}
        />
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-slow { 0%,100%{opacity:1} 50%{opacity:0.6} }
      `}</style>
    </section>
  );
}
