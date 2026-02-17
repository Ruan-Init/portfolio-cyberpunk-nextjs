'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import CityScene from './CityScene'

function CityCanvasInner() {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        toneMapping: 1, // ReinhardToneMapping
        toneMappingExposure: 0.9,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 8, 22]} fov={65} near={0.1} far={200} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.25}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.4}
        target={[0, 4, -8]}
        makeDefault
      />

      <Suspense fallback={null}>
        <CityScene />
      </Suspense>
    </Canvas>
  )
}

// Client-only (no SSR) — Three.js needs window
export default dynamic(() => Promise.resolve(CityCanvasInner), { ssr: false })
