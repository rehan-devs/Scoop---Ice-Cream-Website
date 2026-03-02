'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function IceCreamCone() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  const coneGeometry = useMemo(() => {
    return new THREE.ConeGeometry(0.7, 2.0, 32, 1, true);
  }, []);

  const scoopGeometries = useMemo(() => {
    const createScoop = (radius: number) => {
      const geo = new THREE.SphereGeometry(radius, 32, 32);
      const positions = geo.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        const noise =
          Math.sin(x * 4) * 0.03 +
          Math.cos(y * 3) * 0.02 +
          Math.sin(z * 5) * 0.025;
        positions.setXYZ(
          i,
          x + noise * x * 0.3,
          y + noise * y * 0.2,
          z + noise * z * 0.3
        );
      }
      positions.needsUpdate = true;
      geo.computeVertexNormals();
      return geo;
    };
    return [createScoop(0.62), createScoop(0.58), createScoop(0.55)];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const pointer = state.pointer;
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;

    targetRotation.current.y = mouse.current.x * 0.4; 
    targetRotation.current.x = -mouse.current.y * 0.25; 

    groupRef.current.rotation.y +=
      (targetRotation.current.y + state.clock.elapsedTime * 0.1 - groupRef.current.rotation.y) * 0.08; // Was 0.05
    groupRef.current.rotation.x +=
      (targetRotation.current.x - groupRef.current.rotation.x) * 0.08; 

    const targetPosX = mouse.current.x * 0.15;
    const targetPosY = mouse.current.y * 0.1;
    groupRef.current.position.x += (targetPosX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (-0.5 + targetPosY - groupRef.current.position.y) * 0.05;

    const breathe = Math.sin(state.clock.elapsedTime * 1.5) * 0.008 + 1;
    groupRef.current.scale.setScalar(0.65 * breathe);
  });

  const scoopColors: [string, string, string] = ['#F5DEB3', '#E8A0BF', '#5C3D2E'];
  const scoopPositions: [number, number, number][] = [
    [0, 0.8, 0],
    [0.12, 1.45, 0.05],
    [-0.08, 2.0, -0.05],
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.12}>
      <group ref={groupRef} position={[0, -0.5, 0]} scale={0.65}>
        {/* Cone */}
        <mesh geometry={coneGeometry} position={[0, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
          <meshStandardMaterial color="#C4956A" roughness={0.8} metalness={0.05} />
        </mesh>

        {/* Cone rim */}
        <mesh position={[0, 0.45, 0]}>
          <torusGeometry args={[0.50, 0.07, 16, 32]} />
          <meshStandardMaterial color="#D4A574" roughness={0.7} />
        </mesh>

        {/* Scoops */}
        {scoopGeometries.map((geo, i) => (
          <mesh key={i} geometry={geo} position={scoopPositions[i]}>
            <meshPhysicalMaterial
              color={scoopColors[i]}
              roughness={0.65}
              metalness={0.0}
              clearcoat={0.1}
              clearcoatRoughness={0.8}
            />
          </mesh>
        ))}

        {/* Drips */}
        {[0, 1, 2].map((i) => {
          const angle = (i / 3) * Math.PI * 2;
          const x = Math.cos(angle) * 0.48;
          const z = Math.sin(angle) * 0.48;
          return (
            <mesh key={`drip-${i}`} position={[x, 0.5 - i * 0.12, z]}>
              <capsuleGeometry args={[0.05, 0.2, 4, 8]} />
              <meshPhysicalMaterial
                color={scoopColors[i]}
                roughness={0.6}
                clearcoat={0.2}
              />
            </mesh>
          );
        })}

        {/* Sprinkles */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          const r = Math.random() * 0.25 + 0.08;
          const colors = ['#E8A0BF', '#A8D8B9', '#7B8CDE', '#FFB347', '#D4A574'];
          return (
            <mesh
              key={`sprinkle-${i}`}
              position={[
                Math.cos(angle) * r - 0.08,
                2.2 + Math.random() * 0.12,
                Math.sin(angle) * r - 0.04,
              ]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <capsuleGeometry args={[0.015, 0.06, 4, 4]} />
              <meshStandardMaterial color={colors[i % colors.length]} roughness={0.5} />
            </mesh>
          );
        })}

        {/* Cherry */}
        <mesh position={[0, 2.35, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial color="#CC2244" roughness={0.3} clearcoat={0.8} />
        </mesh>
        {/* Cherry stem */}
        <mesh position={[0.02, 2.5, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.008, 0.012, 0.16, 8]} />
          <meshStandardMaterial color="#2D5016" roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

export default function IceCreamScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.8, 8], fov: 28 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 3]} intensity={1.2} color="#FFF5E8" />
        <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#E8D5FF" />
        <pointLight position={[0, 0, 4]} intensity={0.3} color="#FFE0C0" />
        <IceCreamCone />
        <Environment preset="studio" environmentIntensity={0.3} />
      </Suspense>
    </Canvas>
  );
}