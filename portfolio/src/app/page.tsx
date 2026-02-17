'use client'

import dynamic from 'next/dynamic'
import Cursor    from '@/components/ui/Cursor'
import Navbar    from '@/components/ui/Navbar'
import Divider   from '@/components/ui/Divider'
import Footer    from '@/components/ui/Footer'
import Hero       from '@/components/sections/Hero'
import About      from '@/components/sections/About'
import Skills     from '@/components/sections/Skills'
import Projects   from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact    from '@/components/sections/Contact'

// City canvas — client only, no SSR
const CityCanvas = dynamic(() => import('@/components/3d/CityCanvas'), { ssr: false })

export default function Home() {
  return (
    <>
      {/* Custom cursor */}
      <Cursor />

      {/* 3D City background — fixed, full screen */}
      <CityCanvas />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <Experience />
        <Divider />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
