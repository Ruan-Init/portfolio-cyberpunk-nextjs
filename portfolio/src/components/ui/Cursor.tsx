'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    let raf: number
    let hovering = false

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const animate = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      if (dotRef.current) {
        dotRef.current.style.left  = `${mx - 6}px`
        dotRef.current.style.top   = `${my - 6}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx - 18}px`
        ringRef.current.style.top  = `${ry - 18}px`
      }
      raf = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      hovering = true
      dotRef.current?.style.setProperty('transform', 'scale(2.5)')
      if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px' }
    }
    const onLeave = () => {
      hovering = false
      dotRef.current?.style.setProperty('transform', 'scale(1)')
      if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px' }
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          width: 12, height: 12,
          background: '#00f5ff',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease',
          mixBlendMode: 'screen',
          boxShadow: '0 0 18px #00f5ff, 0 0 36px #00f5ff',
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: 36, height: 36,
          border: '1px solid rgba(0,245,255,0.45)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </>
  )
}
