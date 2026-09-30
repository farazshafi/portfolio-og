import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { CheckCircle2, Rocket } from 'lucide-react';
import DraggablePDF from '../3d/DraggablePDF';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { LoadingFallback } from '../common/LoadingFallback';

export function ResumeSection() {
    const [isDropped, setIsDropped] = useState(false);
    const lastDownloadTime = useRef(0);

    const handleDownload = () => {
        const now = Date.now();
        if (now - lastDownloadTime.current < 2000) return; // 2s debounce
        lastDownloadTime.current = now;

        const link = document.createElement('a');
        link.href = '/faraz-shafi-resume.pdf';
        link.download = 'Faraz_Shafi_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsDropped(true);
        setTimeout(() => setIsDropped(false), 2000);
    };

    return (
        <section id="resume" className="resume-section">
            <div className="section-header">
                <span className="section-number">03</span>
                <h2>Professional Path</h2>
            </div>
            <div className="resume-grid" style={{ position: 'relative' }}>
                <div className="resume-visual-bg">
                    <div className="resume-3d-container-v2">
                        <div className="drag-hint">DRAG RESUME TO DOWNLOAD</div>
                    </div>
                    <div className={`download-zone ${isDropped ? 'success' : ''}`}>
                        <div className="zone-content">
                            <motion.div
                                animate={isDropped ? { scale: [1, 1.2, 1], rotate: [0, 360, 0] } : { y: [0, -10, 0] }}
                                transition={{ repeat: isDropped ? 0 : Infinity, duration: 2 }}
                            >
                                {isDropped ? (
                                    <CheckCircle2 size={80} color="#00ff88" />
                                ) : (
                                    <Rocket size={80} color="var(--accent-color)" />
                                )}
                            </motion.div>
                            <h3>{isDropped ? 'Downloading...' : 'Drop Zone'}</h3>
                            <p>Ready for impact? Drag the 3D resume here.</p>
                        </div>
                        <div className="zone-glow"></div>
                    </div>
                </div>

                <div className="resume-canvas-overlay">
                    <ErrorBoundary fallback={<LoadingFallback message="3D Canvas preview disabled" height="300px" />}>
                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <React.Suspense fallback={null}>
                                <DraggablePDF onDrop={handleDownload} />
                            </React.Suspense>
                            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                        </Canvas>
                    </ErrorBoundary>
                </div>
            </div>
        </section>
    );
}

export default React.memo(ResumeSection);
