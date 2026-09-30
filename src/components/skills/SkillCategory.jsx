import React from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Code, Globe, Database, Rocket } from 'lucide-react';

export function SkillCategory({ title, skills, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { damping: 20 });

    return (
        <motion.div
            className="skill-category-3d"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - (rect.left + rect.width / 2));
                y.set(e.clientY - (rect.top + rect.height / 2));
            }}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
        >
            <div className="skill-card-inner" style={{ transform: "translateZ(20px)" }}>
                <div className="skill-icon-3d" style={{ transform: "translateZ(60px)", marginBottom: '20px' }}>
                    {index === 0 && <Code size={40} color="var(--accent-color)" />}
                    {index === 1 && <Globe size={40} color="#00ffff" />}
                    {index === 2 && <Database size={40} color="var(--accent-color)" />}
                    {index === 3 && <Rocket size={40} color="#00ffff" />}
                </div>
                <h3 style={{ transform: "translateZ(40px)", fontSize: '1.5rem', marginBottom: '20px' }}>{title}</h3>
                <div className="skills-tags-3d" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', transform: "translateZ(30px)" }}>
                    {skills.map((skill) => (
                        <motion.span key={skill} className="skill-pill-3d" whileHover={{ scale: 1.1, translateZ: 20 }}>
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default React.memo(SkillCategory);
