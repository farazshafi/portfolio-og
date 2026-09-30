import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Download, Hand, Grab } from 'lucide-react';

export function CustomCursor({ cursorState }) {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const isHovering = cursorState === 'hover';
    const isGrabbing = cursorState === 'grabbing';
    const isDownloading = cursorState === 'download';

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener('pointermove', moveCursor);
        window.addEventListener('pointerdown', moveCursor);
        return () => {
            window.removeEventListener('pointermove', moveCursor);
            window.removeEventListener('pointerdown', moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className={`custom-cursor ${(isHovering || isGrabbing || isDownloading) ? 'hovering' : ''}`}
            style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
            animate={{
                scale: (isHovering || isGrabbing || isDownloading) ? 1.8 : 1,
                borderColor: (isHovering || isGrabbing || isDownloading) ? '#00ffff' : '#7000ff',
                backgroundColor: (isHovering || isGrabbing || isDownloading) ? 'rgba(0, 255, 255, 0.1)' : 'rgba(112, 0, 255, 0)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <AnimatePresence>
                {(isHovering || isGrabbing || isDownloading) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="cursor-icon"
                    >
                        {isDownloading ? <Download size={18} color="#00ff88" /> :
                            isGrabbing ? <Hand size={18} color="#00ffff" /> :
                                <Grab size={18} color="#00ffff" />}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default React.memo(CustomCursor);
