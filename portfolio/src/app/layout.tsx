import type { Metadata } from 'next'
import '../styles/globals.css'
import { LangProvider } from '@/lib/lang'

export const metadata: Metadata = {
  title: 'Ruan Carlos — Frontend Developer',
  description: 'Portfolio cyberpunk de desenvolvedor frontend com habilidades em React, Next.js e Three.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
