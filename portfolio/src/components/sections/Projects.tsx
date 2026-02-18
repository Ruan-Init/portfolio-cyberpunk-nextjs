"use client";

import { useLang } from "@/lib/lang";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    num: "001",
    icon: "🌐",
    badge: "WEB APP",
    bg: "linear-gradient(135deg,#0a0f1e,#0d1a2e,#0a1525)",
    title: "NeoFinance Dashboard",
    pt: "Dashboard financeiro com visualização de dados em tempo real, gráficos interativos e tema customizável.",
    en: "Financial dashboard with real-time data visualization, interactive charts and a customizable theme.",
    tags: ["NEXT.JS", "TYPESCRIPT", "D3.JS"],
  },
  {
    num: "002",
    icon: "🎮",
    badge: "3D / WebGL",
    bg: "linear-gradient(135deg,#1a0a1e,#2a0d2e,#1a0525)",
    title: "CyberWorld 3D",
    pt: "Experiência 3D interativa em WebGL com navegação em primeira pessoa por uma cidade futurista.",
    en: "Interactive WebGL 3D experience with first-person navigation through a futuristic city.",
    tags: ["THREE.JS", "REACT", "GSAP"],
  },
  {
    num: "003",
    icon: "🤖",
    badge: "AI / MOBILE",
    bg: "linear-gradient(135deg,#0a1a0e,#0d2a16,#051a0a)",
    title: "AIssistant App",
    pt: "App mobile com IA integrada para análise de código e sugestões de refatoração em tempo real.",
    en: "Mobile app with integrated AI for code analysis and real-time refactoring suggestions.",
    tags: ["REACT NATIVE", "OPENAI", "EXPO"],
  },
];

function ProjectCard({
  p,
  index,
  visible,
}: {
  p: (typeof projects)[0];
  index: number;
  visible: boolean;
}) {
  const { t } = useLang();

  return (
    <div
      data-hover
      style={{
        background: "var(--glass)",
        border: "1px solid var(--glass-border)",
        clipPath:
          "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
        overflow: "hidden",
        transition: "all 0.45s",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 0.15}s`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(0,245,255,0.4)";
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 30px 60px rgba(0,245,255,0.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--glass-border)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Thumb */}
      <div
        style={{
          height: 170,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: p.bg,
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,245,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.05) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          style={{
            fontSize: "3.5rem",
            opacity: 0.65,
            position: "relative",
            zIndex: 1,
          }}
        >
          {p.icon}
        </div>
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            fontFamily: "Share Tech Mono, monospace",
            fontSize: "0.58rem",
            padding: "4px 10px",
            background: "rgba(255,0,110,0.15)",
            border: "1px solid #ff006e",
            color: "#ff006e",
            letterSpacing: 2,
          }}
        >
          {p.badge}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 26 }}>
        <div
          style={{
            fontFamily: "Share Tech Mono, monospace",
            fontSize: "0.62rem",
            color: "var(--text-dim)",
            letterSpacing: 3,
            marginBottom: 8,
          }}
        >
          // {p.num}
        </div>
        <div
          style={{
            fontFamily: "Orbitron, monospace",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 12,
          }}
        >
          {p.title}
        </div>
        <p
          style={{
            fontSize: "0.92rem",
            color: "#d0d0d0",
            lineHeight: 1.7,
            marginBottom: 18,
            fontWeight: 400,
            letterSpacing: "0.2px",
          }}
        >
          {t(p.pt, p.en)}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 18,
          }}
        >
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "0.58rem",
                padding: "3px 9px",
                background: "rgba(0,245,255,0.06)",
                border: "1px solid rgba(0,245,255,0.2)",
                color: "#00f5ff",
                letterSpacing: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["Live Demo", "GitHub"].map((l) => (
            <a
              key={l}
              href="#"
              data-hover
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "0.62rem",
                color: "#00f5ff",
                textDecoration: "none",
                letterSpacing: 2,
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff006e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#00f5ff")}
            >
              ◈ {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="projects"
      ref={ref}
      style={{ position: "relative", zIndex: 10, padding: "120px 60px 80px" }}
    >
      <div style={{ marginBottom: 70 }}>
        <div
          style={{
            fontFamily: "Share Tech Mono, monospace",
            fontSize: "0.62rem",
            color: "#ff006e",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              width: 40,
              height: 1,
              background: "#ff006e",
              display: "inline-block",
            }}
          />
          {t("Portfólio", "Portfolio")}
        </div>
        <h2
          style={{
            fontFamily: "Orbitron, monospace",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#00f5ff", textShadow: "0 0 20px #00f5ff" }}>
            {t("Projetos", "Projects")}
          </span>{" "}
          {t("Selecionados", "Selected")}
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 30,
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.num} p={p} index={i} visible={inView} />
        ))}
      </div>
    </section>
  );
}
