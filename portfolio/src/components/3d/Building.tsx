'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface BuildingProps {
  position: [number, number, number]
  width: number
  depth: number
  height: number
  color: string
  accentColor: string
  variant?: 'tower' | 'block' | 'stepped' | 'antenna'
}

// ── Window Grid geometry helper ──
function WindowGrid({ width, height, depth, color }: { width: number; height: number; depth: number; color: string }) {
  const cols = Math.floor(width * 2)
  const rows = Math.floor(height * 1.5)

  const windows = useMemo(() => {
    const positions: { x: number; y: number; z: number; lit: boolean; face: 'front' | 'back' | 'left' | 'right' }[] = []
    const wSpacing = width / (cols + 1)
    const hSpacing = height / (rows + 1)

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const lit = Math.random() > 0.35
        const y = -height / 2 + hSpacing * (r + 1)
        // Front & Back
        const x = -width / 2 + wSpacing * (c + 1)
        positions.push({ x, y, z: depth / 2 + 0.01, lit, face: 'front' })
        positions.push({ x, y, z: -(depth / 2 + 0.01), lit: Math.random() > 0.35, face: 'back' })
      }
    }
    // Side windows
    const dCols = Math.floor(depth * 2)
    const dSpacing = depth / (dCols + 1)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < dCols; c++) {
        const lit = Math.random() > 0.4
        const y = -height / 2 + hSpacing * (r + 1)
        const z = -depth / 2 + dSpacing * (c + 1)
        positions.push({ x: width / 2 + 0.01,  y, z, lit, face: 'right' })
        positions.push({ x: -(width / 2 + 0.01), y, z, lit: Math.random() > 0.4, face: 'left' })
      }
    }
    return positions
  }, [width, height, depth, cols, rows])

  return (
    <>
      {windows.map((w, i) => (
        <mesh key={i} position={[w.x, w.y, w.z]}
          rotation={w.face === 'left' || w.face === 'right' ? [0, Math.PI / 2, 0] : [0, 0, 0]}>
          <planeGeometry args={[0.12, 0.18]} />
          <meshStandardMaterial
            color={w.lit ? color : '#111820'}
            emissive={w.lit ? color : '#000'}
            emissiveIntensity={w.lit ? (Math.random() > 0.8 ? 2.5 : 1.2) : 0}
            transparent opacity={w.lit ? 0.95 : 0.6}
          />
        </mesh>
      ))}
    </>
  )
}

// ── Antenna on rooftop ──
function Antenna({ height, color }: { height: number; color: string }) {
  const lightRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.material instanceof THREE.MeshStandardMaterial &&
        ((lightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
          Math.sin(clock.getElapsedTime() * 2) * 0.5 + 1.5)
    }
  })
  return (
    <group position={[0, height / 2, 0]}>
      {/* Shaft */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.035, 0.8, 6]} />
        <meshStandardMaterial color="#334" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Blinker */}
      <mesh ref={lightRef} position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
      {/* Dish */}
      <mesh position={[0.15, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.12, 0.01, 0.04, 12, 1, true]} />
        <meshStandardMaterial color="#445566" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ── Neon strip on building edge ──
function NeonStrip({ width, height, depth, color }: { width: number; height: number; depth: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.8 + Math.sin(clock.getElapsedTime() * 1.5) * 0.3
    }
  })
  return (
    <group>
      {/* Vertical edge strips */}
      {[[-width / 2, 0, depth / 2], [width / 2, 0, depth / 2]].map((pos, i) => (
        <mesh key={i} ref={i === 0 ? ref : undefined} position={pos as [number, number, number]}>
          <boxGeometry args={[0.03, height * 0.9, 0.03]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Horizontal roof strip */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width + 0.1, 0.04, depth + 0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
    </group>
  )
}

// ── Main Building ──
export default function Building({
  position, width, depth, height, color, accentColor, variant = 'tower'
}: BuildingProps) {

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0a0e1a'),
    metalness: 0.3,
    roughness: 0.7,
    envMapIntensity: 0.5,
  }), [])

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.9,
    roughness: 0.1,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.4,
  }), [accentColor])

  // Stepped building geometry
  if (variant === 'stepped') {
    const tiers = [
      { w: width, d: depth, h: height * 0.5, y: 0 },
      { w: width * 0.75, d: depth * 0.75, h: height * 0.3, y: height * 0.5 },
      { w: width * 0.5,  d: depth * 0.5,  h: height * 0.2, y: height * 0.8 },
    ]
    return (
      <group position={position}>
        {tiers.map((t, i) => (
          <group key={i} position={[0, t.y, 0]}>
            <mesh position={[0, t.h / 2, 0]} material={bodyMat}>
              <boxGeometry args={[t.w, t.h, t.d]} />
            </mesh>
            <WindowGrid width={t.w} height={t.h} depth={t.d} color={color} />
            <NeonStrip width={t.w} height={t.h} depth={t.d} color={accentColor} />
          </group>
        ))}
        <Antenna height={tiers[2].h} color={color} />
      </group>
    )
  }

  return (
    <group position={position}>
      {/* Main body */}
      <mesh position={[0, height / 2, 0]} material={bodyMat} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
      </mesh>

      {/* Facade panels — horizontal bands */}
      {Array.from({ length: Math.floor(height / 2) }).map((_, i) => (
        <mesh key={i} position={[0, i * 2 + 0.5, depth / 2 + 0.01]} material={accentMat}>
          <boxGeometry args={[width - 0.1, 0.04, 0.02]} />
        </mesh>
      ))}

      {/* Windows */}
      <WindowGrid width={width} height={height} depth={depth} color={color} />

      {/* Neon strips */}
      <NeonStrip width={width} height={height} depth={depth} color={accentColor} />

      {/* Antenna */}
      {variant === 'antenna' && <Antenna height={height} color={color} />}

      {/* Roof details */}
      <mesh position={[0, height + 0.05, 0]} material={accentMat}>
        <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
      </mesh>
    </group>
  )
}
