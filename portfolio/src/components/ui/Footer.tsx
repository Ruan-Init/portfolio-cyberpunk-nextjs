"use client";

import { useLang } from "@/lib/lang";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer
      className="hidden md:block relative z-10 text-center py-9 border-t"
      style={{ borderTopColor: "rgba(0,245,255,0.1)" }}
    >
      <p
        className="text-[0.62rem] text-[color:var(--text-dim)] tracking-[3px]"
        style={{ fontFamily: "Share Tech Mono, monospace" }}
      >
        {t("desenvolvido por ", "developed by ")}
        <span className="text-[#00f5ff]">Ruan Carlos</span>
        {" - "}
        {t("todos os direitos reservados", "all rights reserved")}
        {" - "}
        <span className="text-[#00f5ff]">2026</span>
      </p>
    </footer>
  );
}
