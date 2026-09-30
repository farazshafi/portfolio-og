import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Rig() {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, camera.position.z), 0.05);
        camera.lookAt(0, 0, 0);
    });
}

export function InteractiveBackground() {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#7000ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
                <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
                <Rig />
                <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
                    <Sphere args={[1.5, 64, 64]} position={[3, -1, -2]}>
                        <MeshDistortMaterial color="#200040" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
                    </Sphere>
                </Float>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <mesh position={[-3, 2, -3]}>
                        <octahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color="#7000ff" wireframe />
                    </mesh>
                </Float>
            </Canvas>
        </div>
    );
}

export default React.memo(InteractiveBackground);
