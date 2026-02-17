"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Cloud } from "@react-three/drei";
import * as THREE from "three";
import Building from "./Building";

// ── Floating Particles ──
function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyanC = new THREE.Color("#00f5ff");
    const magC = new THREE.Color("#ff006e");
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      const c = Math.random() > 0.55 ? cyanC : magC;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.01;
    const posArr = mesh.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += 0.01;
      if (posArr[i * 3 + 1] > 30) posArr[i * 3 + 1] = 0;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ── Ground plane with grid ──
function Ground() {
  return (
    <group>
      {/* Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#060910" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Grid overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[200, 200, 40, 40]} />
        <meshStandardMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
      {/* Reflective puddles */}
      {[
        [-5, 3],
        [8, -6],
        [-12, 8],
        [15, 2],
        [3, -14],
      ].map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, z]}>
          <circleGeometry args={[0.8 + Math.random() * 1.2, 12]} />
          <meshStandardMaterial
            color="#00c8ff"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}
      {/* Road markings */}
      {[-2, -1, 0, 1, 2].map((i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[i * 0.4, 0.015, 0]}
        >
          <planeGeometry args={[0.06, 60]} />
          <meshStandardMaterial
            color="#ffe600"
            emissive="#ffe600"
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Holographic billboard ──
function Billboard({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(clock.getElapsedTime() * 2.5) * 0.4;
    }
  });
  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 6]} />
        <meshStandardMaterial color="#334455" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Screen */}
      <mesh ref={ref} position={[0, 4.2, 0]}>
        <boxGeometry args={[2.5, 1.4, 0.05]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 4.2, 0]}>
        <boxGeometry args={[2.6, 1.5, 0.04]} />
        <meshStandardMaterial
          color="#ff006e"
          emissive="#ff006e"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
    </group>
  );
}

// ── Flying vehicle ──
function FlyingCar() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.sin(t * 0.3) * 25;
    ref.current.position.z = Math.cos(t * 0.3) * 25;
    ref.current.position.y = 12 + Math.sin(t * 0.7) * 2;
    ref.current.rotation.y = -t * 0.3 + Math.PI / 2;
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.2, 0.3, 0.5]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Thruster glow */}
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.3]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={3}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── City layout data ──
const BUILDINGS = [
  // Front row — medium
  {
    pos: [-12, 0, -8],
    w: 2.5,
    d: 2,
    h: 12,
    col: "#00f5ff",
    acc: "#ff006e",
    v: "tower",
  },
  {
    pos: [-8, 0, -6],
    w: 3,
    d: 2.5,
    h: 18,
    col: "#ff006e",
    acc: "#00f5ff",
    v: "antenna",
  },
  {
    pos: [-4, 0, -7],
    w: 2,
    d: 1.8,
    h: 9,
    col: "#00f5ff",
    acc: "#ffe600",
    v: "block",
  },
  {
    pos: [0, 0, -8],
    w: 4,
    d: 3,
    h: 22,
    col: "#ff006e",
    acc: "#00f5ff",
    v: "stepped",
  },
  {
    pos: [5, 0, -7],
    w: 2.5,
    d: 2,
    h: 14,
    col: "#00f5ff",
    acc: "#ff006e",
    v: "antenna",
  },
  {
    pos: [9, 0, -6],
    w: 3,
    d: 2.5,
    h: 10,
    col: "#ffe600",
    acc: "#ff006e",
    v: "block",
  },
  {
    pos: [13, 0, -8],
    w: 2,
    d: 1.8,
    h: 16,
    col: "#ff006e",
    acc: "#00f5ff",
    v: "tower",
  },
  // Back row — tall
  {
    pos: [-16, 0, -18],
    w: 3,
    d: 2.5,
    h: 28,
    col: "#00f5ff",
    acc: "#ff006e",
    v: "antenna",
  },
  {
    pos: [-10, 0, -16],
    w: 4,
    d: 3,
    h: 35,
    col: "#ff006e",
    acc: "#00f5ff",
    v: "stepped",
  },
  {
    pos: [-4, 0, -18],
    w: 3,
    d: 2.5,
    h: 20,
    col: "#00f5ff",
    acc: "#ffe600",
    v: "tower",
  },
  {
    pos: [2, 0, -16],
    w: 5,
    d: 4,
    h: 42,
    col: "#ff006e",
    acc: "#00f5ff",
    v: "stepped",
  },
  {
    pos: [9, 0, -18],
    w: 3.5,
    d: 3,
    h: 26,
    col: "#ffe600",
    acc: "#ff006e",
    v: "antenna",
  },
  {
    pos: [15, 0, -16],
    w: 3,
    d: 2.5,
    h: 32,
    col: "#00f5ff",
    acc: "#ff006e",
    v: "tower",
  },
  // Left wing
  {
    pos: [-20, 0, -10],
    w: 2.5,
    d: 2,
    h: 16,
    col: "#ff006e",
    acc: "#00f5ff",
    v: "block",
  },
  {
    pos: [-22, 0, -16],
    w: 3,
    d: 2.5,
    h: 24,
    col: "#00f5ff",
    acc: "#ffe600",
    v: "antenna",
  },
  // Right wing
  {
    pos: [20, 0, -10],
    w: 2.5,
    d: 2,
    h: 18,
    col: "#00f5ff",
    acc: "#ff006e",
    v: "tower",
  },
  {
    pos: [22, 0, -16],
    w: 3,
    d: 2.5,
    h: 22,
    col: "#ff006e",
    acc: "#00f5ff",
    v: "stepped",
  },
] as const;

export default function CityScene() {
  const { scene } = useThree();

  return (
    <>
      {/* Scene fog */}
      <fog attach="fog" args={["#050810", 30, 100]} />

      {/* Ambient */}
      <ambientLight intensity={0.15} color="#0a1a2a" />

      {/* Directional neon lights */}
      <directionalLight
        position={[10, 30, 10]}
        color="#00f5ff"
        intensity={0.8}
        castShadow
      />
      <directionalLight
        position={[-10, 20, -5]}
        color="#ff006e"
        intensity={0.6}
      />
      <directionalLight position={[0, 5, 20]} color="#ffffff" intensity={0.3} />

      {/* Point lights for street-level neon glow */}
      <pointLight
        position={[0, 2, 5]}
        color="#00f5ff"
        intensity={8}
        distance={20}
      />
      <pointLight
        position={[-8, 3, 3]}
        color="#ff006e"
        intensity={6}
        distance={18}
      />
      <pointLight
        position={[8, 3, 3]}
        color="#ffe600"
        intensity={4}
        distance={15}
      />
      <pointLight
        position={[0, 8, -10]}
        color="#00f5ff"
        intensity={10}
        distance={30}
      />

      {/* Stars */}
      <Stars
        radius={80}
        depth={40}
        count={3000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Ground */}
      <Ground />

      {/* Buildings */}
      {BUILDINGS.map((b, i) => (
        <Building
          key={i}
          position={b.pos as [number, number, number]}
          width={b.w}
          depth={b.d}
          height={b.h}
          color={b.col}
          accentColor={b.acc}
          variant={b.v as any}
        />
      ))}

      {/* Billboards */}
      <Billboard position={[-6, 0, -2]} />
      <Billboard position={[6, 0, -3]} />
      <Billboard position={[-14, 0, -5]} />

      {/* Flying vehicles */}
      <FlyingCar />

      {/* Particles */}
      <Particles count={300} />

      {/* Volumetric-ish clouds (low, foggy) */}
      <Cloud
        position={[-20, 18, -30]}
        opacity={0.08}
        speed={0.2}
        width={30}
        depth={5}
        segments={8}
      />
      <Cloud
        position={[20, 22, -35]}
        opacity={0.06}
        speed={0.15}
        width={25}
        depth={4}
        segments={6}
      />
    </>
  );
}
