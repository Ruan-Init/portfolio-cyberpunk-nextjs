"use client";

import { useLang } from "@/lib/lang";
import { useInView } from "react-intersection-observer";

const experiences = [
  {
    date: { pt: "09/2025 — Presente", en: "09/2025 — Present" },
    role: { pt: "Desenvolvedor Frontend", en: "Front-End Developer" },
    company: "Babu",
    desc: {
      pt: "Criação de layouts funcionais e visualmente consistentes, alinhados às necessidades operacionais do PMS. Desenvolvimento de CRUDs (Create, Read, Update, Delete) garantindo eficiência e estabilidade dos módulos do sistema. Contribuição direta para a expansão e melhoria contínua das ferramentas internas.",
      en: "Development of functional and visually consistent layouts aligned with PMS operational needs. Implementation of CRUD operations ensuring module efficiency and stability. Direct contribution to the expansion and continuous improvement of internal tools.",
    },
    techs: ["React", "TypeScript", "UI/UX", "PMS"],
  },
  {
    date: { pt: "09/2023 — 01/2024", en: "09/2023 — 01/2024" },
    role: { pt: "Técnico de Suporte N1", en: "Support Technician Level 1" },
    company: "Hepta Tecnologia",
    desc: {
      pt: "Especialização em suporte a usuários com foco em instalação de aplicativos e correção de erros em estações de trabalho. Excelência no atendimento ao cliente, proporcionando suporte personalizado e conduzindo treinamentos práticos para potencializar autonomia dos usuários. Agilidade na resolução de problemas com diagnósticos precisos.",
      en: "Specialized user support with focus on application installation and workstation error correction. Excellence in customer service providing personalized support and conducting practical training. Agility in problem-solving with precise diagnostics.",
    },
    techs: [
      "Suporte Técnico",
      "Diagnóstico",
      "Treinamento",
      "Atendimento ao Cliente",
    ],
  },
  {
    date: { pt: "08/2023 — 09/2023", en: "08/2023 — 09/2023" },
    role: { pt: "Técnico de Suporte N2", en: "Support Technician Level 2" },
    company: "Sonda",
    desc: {
      pt: "Arquiteto de soluções para desafios tecnológicos com foco em suporte direto aos usuários. Instalação de aplicativos e resolução de questões operacionais em estações de trabalho, assegurando continuidade dos processos. Expertise em atendimento personalizado, treinamentos práticos e identificação de erros com soluções eficientes.",
      en: "Technology solution architect focused on direct user support. Application installation and operational workstation issue resolution ensuring process continuity. Expertise in personalized service, practical training, and efficient error correction.",
    },
    techs: [
      "Suporte Técnico",
      "Soluções Tecnológicas",
      "Diagnóstico",
      "Treinamento",
    ],
  },
  {
    date: { pt: "03/2015 — 10/2021", en: "03/2015 — 10/2021" },
    role: { pt: "Assistente de RH", en: "HR Assistant" },
    company: "Hepta Tecnologia",
    desc: {
      pt: "Atuação sólida em Recursos Humanos com experência em rotinas administrativas. Vivência em recrutamento e seleção, admissão e desligamento de colaboradores, controle de documentação e apoio à folha de pagamento. Suporte às lideranças e ao departamento pessoal, garantindo conformidade com políticas internas e legislação trabalhista.",
      en: "Solid HR experience with expertise in administrative routines. Experience in recruitment and selection, employee onboarding and offboarding, documentation control and payroll support. Support to leadership and personnel department ensuring compliance with internal policies and labor legislation.",
    },
    techs: ["RH", "Recrutamento", "Administração", "Conformidade"],
  },
  {
    date: { pt: "03/2012 — 02/2014", en: "03/2012 — 02/2014" },
    role: { pt: "Menor Aprendiz", en: "Apprentice" },
    company: "Caixa Seguradora",
    desc: {
      pt: "Primeiro emprego trabalhando na área de TI aos seguros, adquirindo conhecimento fundamental em operações de suporte técnico e procedimentos administrativos no contexto de uma grande corporação.",
      en: "First job in the IT department of an insurance company, acquiring foundational knowledge in technical support operations and administrative procedures within a major corporation.",
    },
    techs: ["TI", "Suporte Técnico", "Administração"],
  },
];

export default function Experience() {
  const { t } = useLang();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="experience"
      ref={ref}
      style={{ 
        position: "relative", 
        zIndex: 10, 
        padding: "60px 16px 60px 16px" 
      }}
      className="sm:px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24"
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
          {t("Carreira", "Career")}
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
            {t("Experiência", "Experience")}
          </span>{" "}
          {t("Profissional", "Professional")}
        </h2>
      </div>

      {/* Timeline */}
      <div 
        style={{ position: "relative" }}
        className="md:pl-16 lg:pl-20"
      >
        {/* Timeline line - hidden on mobile */}
        <div
          className="hidden md:block"
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 1,
            background:
              "linear-gradient(to bottom, #00f5ff, #ff006e, transparent)",
          }}
        />

        {experiences.map((exp, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              marginBottom: 60,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-20px)",
              transition: `opacity 0.7s ease ${i * 0.2}s, transform 0.7s ease ${i * 0.2}s`,
            }}
          >
            {/* Diamond node - hidden on mobile */}
            <div
              className="hidden md:block"
              style={{
                position: "absolute",
                left: -64,
                top: 8,
                width: 10,
                height: 10,
                border: "2px solid #00f5ff",
                background: "#050810",
                transform: "rotate(45deg)",
                boxShadow: "0 0 12px #00f5ff",
              }}
            />

            <div
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "0.55rem",
                color: "#ff006e",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
              className="sm:text-[0.62rem]"
            >
              {t(exp.date.pt, exp.date.en)}
            </div>

            <div
              style={{
                fontFamily: "Orbitron, monospace",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 4,
              }}
              className="text-sm sm:text-base md:text-[1.05rem]"
            >
              {t(exp.role.pt, exp.role.en)}
            </div>

            <div
              style={{ color: "#00f5ff", marginBottom: 14 }}
              className="text-sm sm:text-base md:text-[1rem]"
            >
              {exp.company}
            </div>

            <p
              style={{
                color: "var(--text-dim)",
                lineHeight: 1.6,
                fontWeight: 300,
                maxWidth: 580,
              }}
              className="text-xs sm:text-sm md:text-[0.92rem]"
            >
              {t(exp.desc.pt, exp.desc.en)}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 14,
              }}
            >
              {exp.techs.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "Share Tech Mono, monospace",
                    color: "var(--text-dim)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "2px 6px",
                    letterSpacing: 1,
                  }}
                  className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.58rem]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
