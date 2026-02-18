"use client";

import { useLang } from "@/lib/lang";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer
      className="relative z-10 text-center py-6 md:py-9 border-t px-4 sm:px-6"
      style={{ borderTopColor: "rgba(0,245,255,0.1)" }}
    >
      <p
        className="text-[0.55rem] sm:text-[0.58rem] md:text-[0.62rem] text-[color:var(--text-dim)] tracking-[2px] sm:tracking-[3px]"
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
