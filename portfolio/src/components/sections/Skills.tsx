'use client'

import { useLang } from '@/lib/lang'
import { useInView } from 'react-intersection-observer'

const SKILLS = {
  frontend: [
    { name: 'React / Next.js', pct: 90 },
    { name: 'TypeScript',      pct: 82 },
    { name: 'CSS / Tailwind',  pct: 88 },
    { name: 'Three.js / WebGL',pct: 65 },
  ],
  tools: [
    { name: 'Git / GitHub',    pct: 85 },
    { name: 'Figma',           pct: 75 },
    { name: 'Node.js / APIs',  pct: 70 },
    { name: 'Testing / Jest',  pct: 60 },
  ],
}

function SkillBar({ name, pct, visible }: { name: string; pct: number; visible: boolean }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.78rem', color: 'var(--text)' }}>{name}</span>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.68rem', color: '#ff006e' }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #00f5ff, #ff006e)',
          width: `${pct}%`,
          transformOrigin: 'left',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.5s ease',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', right: 0, top: -1,
            width: 6, height: 5, background: '#ff006e',
            boxShadow: '0 0 8px #ff006e',
          }} />
        </div>
      </div>
    </div>
  )
}

function SkillCategory({ title, skills, visible }: { title: string; skills: typeof SKILLS.frontend; visible: boolean }) {
  return (
    <div
      data-hover
      style={{
        background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: 30,
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
        transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,245,255,0.07)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = '#00f5ff'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px rgba(0,245,255,0.1)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'var(--glass)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--glass-border)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'none'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Top border accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: 'linear-gradient(90deg, #00f5ff, transparent)' }} />
      <div style={{
        fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', color: '#00f5ff',
        letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24,
      }}>{title}</div>
      {skills.map(s => <SkillBar key={s.name} name={s.name} pct={s.pct} visible={visible} />)}
    </div>
  )
}

export default function Skills() {
  const { t } = useLang()
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  const softSkills = [
    { name: t('Comunicação', 'Communication'),        pct: 92 },
    { name: t('Resolução de Problemas', 'Problem Solving'), pct: 88 },
    { name: t('Trabalho em Equipe', 'Teamwork'),       pct: 90 },
    { name: t('Aprendizado Contínuo', 'Continuous Learning'), pct: 95 },
  ]

  return (
    <section
      id="skills"
      ref={ref}
      style={{ position: 'relative', zIndex: 10, padding: '120px 60px 80px' }}
    >
      <div style={{ marginBottom: 70 }}>
        <div style={{
          fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem',
          color: '#ff006e', letterSpacing: 6, textTransform: 'uppercase',
          marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 40, height: 1, background: '#ff006e', display: 'inline-block' }} />
          Stack
        </div>
        <h2 style={{
          fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 900, color: '#fff', lineHeight: 1,
        }}>
          {t('Minhas ', 'My ')}
          <span style={{ color: '#00f5ff', textShadow: '0 0 20px #00f5ff' }}>Skills</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 24 }}>
        <SkillCategory title="// Frontend"  skills={SKILLS.frontend} visible={inView} />
        <SkillCategory title={`// ${t('Ferramentas', 'Tools')}`} skills={SKILLS.tools}    visible={inView} />
        <SkillCategory title="// Soft Skills" skills={softSkills}  visible={inView} />
      </div>
    </section>
  )
}
