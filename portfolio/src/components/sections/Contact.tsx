"use client";

import { useLang } from "@/lib/lang";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export default function Contact() {
  const { t } = useLang();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = {
    background: "var(--glass)",
    border: "1px solid var(--glass-border)",
    padding: "13px 16px",
    color: "var(--text)",
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    width: "100%",
    clipPath:
      "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const contactLinks = [
    {
      icon: "✉",
      label: "ruan.espindola17@gmail.com",
      href: "mailto:ruan.espindola17@gmail.com",
    },
    {
      icon: "◈",
      label: "linkedin.com/in/ruancarlos",
      href: "https://www.linkedin.com/in/ruan-carlos-espindola-da-silva-626b86183/",
    },
    {
      icon: "◈",
      label: "github.com/ruancarlos",
      href: "https://github.com/Ruan-Init",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-start"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Left */}
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
              {t("Vamos conversar", "Let's talk")}
            </span>
          </div>
          <h2 className="font-orbitron text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-white leading-none">
            <span
              className="text-[#00f5ff]"
              style={{ textShadow: "0 0 20px #00f5ff" }}
            >
              {t("Entre", "Get In")}
            </span>{" "}
            {t("em Contato", "Touch")}
          </h2>
        </div>

        <p
          style={{
            fontSize: "0.98rem",
            color: "var(--text-dim)",
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: 36,
          }}
        >
          {t(
            "Aberto a novas oportunidades, projetos freelance e colaborações criativas. Se você tem uma ideia que quer ver ganhar vida, vamos falar.",
            "Open to new opportunities, freelance projects and creative collaborations. If you have an idea you want to bring to life, let's talk.",
          )}
        </p>

        <div className="flex flex-col gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-hover
              className="flex items-center gap-4 text-[0.75rem] text-[color:var(--text-dim)] font-sharetech p-3 border border-[color:var(--glass-border)]"
              style={{
                fontFamily: "Share Tech Mono, monospace",
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                transition: "all 0.3s",
              }}
            >
              <span>{link.icon}</span> {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5">
        {[
          {
            label: t("// Nome", "// Name"),
            type: "text",
            placeholder: "Ruan Carlos",
          },
          {
            label: "// E-mail",
            type: "email",
            placeholder: "ruan.espindola17@gmail.com",
          },
        ].map((f) => (
          <div key={f.label} className="flex flex-col gap-2">
            <label
              className="text-[0.62rem] text-[color:var(--text-dim)] tracking-wider"
              style={{ fontFamily: "Share Tech Mono, monospace" }}
            >
              {f.label}
            </label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#00f5ff";
                e.target.style.boxShadow = "0 0 20px rgba(0,245,255,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--glass-border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label
            className="text-[0.62rem] text-[color:var(--text-dim)] tracking-wider"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            {t("// Mensagem", "// Message")}
          </label>
          <textarea
            placeholder="..."
            style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
            onFocus={(e) => {
              e.target.style.borderColor = "#00f5ff";
              e.target.style.boxShadow = "0 0 20px rgba(0,245,255,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--glass-border)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          data-hover
          onClick={() => setSent(true)}
          className="px-9 py-3 text-[#050810] font-orbitron text-[0.72rem] font-extrabold tracking-wider uppercase"
          style={{
            background: sent ? "#ff006e" : "#00f5ff",
            clipPath:
              "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 30px rgba(0,245,255,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          {sent
            ? t("✓ Enviado!", "✓ Sent!")
            : t("Enviar Mensagem", "Send Message")}
        </button>
      </div>
    </section>
  );
}
