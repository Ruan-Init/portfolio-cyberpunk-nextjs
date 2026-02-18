"use client";

import { useLang } from "@/lib/lang";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", pt: "Sobre", en: "About" },
  { href: "#skills", pt: "Skills", en: "Skills" },
  { href: "#projects", pt: "Projetos", en: "Projects" },
  { href: "#experience", pt: "Experiência", en: "Experience" },
  { href: "#contact", pt: "Contato", en: "Contact" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        padding: "12px 0",
        transition: "all 0.3s",
        background: scrolled
          ? "rgba(5,8,16,0.95)"
          : "linear-gradient(to bottom, rgba(5,8,16,0.95), transparent)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,245,255,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <div
          style={{
            fontFamily: "Orbitron, monospace",
            fontWeight: 900,
            letterSpacing: 3,
          }}
          className="text-[#00f5ff] text-sm sm:text-base md:text-lg"
        >
          DEV<span className="text-[#ff006e]">_</span>PORT
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-hover
                className="text-[0.72rem] text-[color:var(--text-dim)] uppercase tracking-wider"
                style={{ fontFamily: "Share Tech Mono, monospace" }}
              >
                {t(link.pt, link.en)}
              </a>
            </li>
          ))}
        </ul>

        {/* Lang Toggle */}
        <div className="flex items-center border border-[rgba(0,245,255,0.2)] overflow-hidden">
          {(["pt", "en"] as const).map((l) => (
            <button
              key={l}
              data-hover
              onClick={() => setLang(l)}
              className={`px-2 sm:px-3 py-1 text-[0.6rem] sm:text-[0.68rem] md:text-[0.72rem] ${lang === l ? "bg-[#00f5ff] text-[#050810] font-bold" : "text-[color:var(--text-dim)]"}`}
              style={{ fontFamily: "Share Tech Mono, monospace" }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
