import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingM = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Auto rotation
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Mouse interaction
      const mouse = state.mouse;
      meshRef.current.rotation.z = mouse.x * 0.3;
      meshRef.current.position.x = mouse.x * 0.5;
      meshRef.current.position.y = mouse.y * 0.3;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.8}
    >
      <Center>
        <Text3D
          ref={meshRef}
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={1.2}
          height={0.3}
          curveSegments={12}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
          receiveShadow
        >
          M
          <MeshWobbleMaterial
            color={hovered ? "#00ff88" : "#0ea5e9"}
            factor={hovered ? 0.6 : 0.1}
            speed={hovered ? 2 : 0.5}
            roughness={0.1}
            metalness={0.8}
            emissive={hovered ? "#004d2a" : "#001a33"}
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Center>
    </Float>
  );
};

const GlowingRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -0.5]}>
      <torusGeometry args={[2, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={0.2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

export const Scene3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
        <directionalLight
          position={[0, 0, 5]}
          intensity={0.5}
          color="#ffffff"
          castShadow
        />
        
        <FloatingM />
        <GlowingRing />
        
        {/* Particle effect */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={100}
              array={new Float32Array(
                Array.from({ length: 300 }, () => (Math.random() - 0.5) * 10)
              )}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color="#22d3ee"
            transparent
            opacity={0.6}
            sizeAttenuation
          />
        </points>
      </Canvas>
    </div>
  );
};