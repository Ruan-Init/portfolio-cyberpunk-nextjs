'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'pt' | 'en'

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (pt: string, en: string) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'pt',
  setLang: () => {},
  t: (pt) => pt,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')
  const t = (pt: string, en: string) => (lang === 'pt' ? pt : en)
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
