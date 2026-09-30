import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function DraggablePDF({ onDrop, onStateChange }) {
    const meshRef = useRef();
    const { viewport } = useThree();
    const { scene } = useGLTF('/document-3d/scene.gltf');

    const restingPos = useMemo(() => {
        if (viewport.width < 5) return [0, viewport.height / 4, 0]; // Centered in top box for mobile
        return [-viewport.width / 4, 0, 0]; // Centered in left box for desktop
    }, [viewport.width, viewport.height]);

    const [pos, setPos] = useState(restingPos);
    const [isDragging, setIsDragging] = useState(false);

    // Sync resting position when window resizes
    useEffect(() => {
        if (!isDragging) setPos(restingPos);
    }, [restingPos, isDragging]);

    // Responsive scale: smaller on mobile, larger on desktop
    const scale = viewport.width < 5 ? 0.3 : 0.8;

    // Clone the scene so we can modify it without affecting other instances (if any)
    const model = useMemo(() => scene.clone(), [scene]);

    useFrame((state) => {
        if (!meshRef.current) return;
        if (!isDragging) {
            // Subtle float animation when not being dragged
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1 + pos[1];
        }
    });

    return (
        <group>
            <primitive
                object={model}
                ref={meshRef}
                position={pos}
                rotation={[70, Math.PI / 1, -50]} // Rotate to make it vertical
                scale={[scale, scale, scale]}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    e.target.setPointerCapture(e.pointerId);
                    setIsDragging(true);
                    onStateChange('grabbing');
                }}
                onPointerMove={(e) => {
                    if (isDragging) {
                        // Use R3F's normalized pointer coordinates (-1 to 1)
                        const x = e.pointer.x;
                        const y = e.pointer.y;

                        const newX = (x * viewport.width) / 2;
                        const newY = (y * viewport.height) / 2;
                        setPos([newX, newY, 0]);

                        // Responsive threshold check
                        const isOverDropZone = viewport.width < 5
                            ? newY < -viewport.height / 10  // Mobile: Dragged down
                            : newX > viewport.width / 10;   // Desktop: Dragged right

                        if (isOverDropZone) {
                            onStateChange('download');
                        } else {
                            onStateChange('grabbing');
                        }
                    }
                }}
                onPointerUp={(e) => {
                    if (!isDragging) return;
                    e.target.releasePointerCapture(e.pointerId);
                    setIsDragging(false);

                    const isOverDropZone = viewport.width < 5
                        ? pos[1] < -viewport.height / 10
                        : pos[0] > viewport.width / 10;

                    if (isOverDropZone) {
                        onDrop();
                    }
                    setPos(restingPos); // Snap back to zone center
                    onStateChange('hover');
                }}
                onPointerOver={() => onStateChange('hover')}
                onPointerOut={() => onStateChange('default')}
                cursor="grab"
            />
        </group>
    );
}

// Pre-load GLTF asset for smooth rendering
useGLTF.preload('/document-3d/scene.gltf');

export default React.memo(DraggablePDF);
