import React from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Github, ExternalLink, Radio } from 'lucide-react';

export function ProjectCard({ project, index, onSelect, onRequestLive }) {
    const { title, description, tags, image, github, liveUrl } = project;
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { damping: 20 });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="project-card"
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    x.set(e.clientX - (rect.left + rect.width / 2));
                    y.set(e.clientY - (rect.top + rect.height / 2));
                }}
                onMouseLeave={() => { x.set(0); y.set(0); }}
                onClick={onSelect}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d", cursor: 'pointer' }}
            >
                <div
                    className="project-image-container"
                    style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: "translateZ(50px)" }}
                >
                    {liveUrl && (
                        <div className="live-badge">
                            <span className="pulse-dot"></span> Live
                        </div>
                    )}
                    <div className="project-overlay">
                        <div className="project-links">
                            <a href={github} target="_blank" rel="noreferrer" title="Source Code" onClick={(e) => e.stopPropagation()}>
                                <Github size={24} />
                            </a>
                            {liveUrl ? (
                                <button
                                    className="icon-link-btn"
                                    title="Go Live"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRequestLive(project);
                                    }}
                                >
                                    <Radio size={24} color="#00ff88" />
                                </button>
                            ) : (
                                <ExternalLink size={24} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="project-content" style={{ transform: "translateZ(30px)" }}>
                    <div className="project-tags">
                        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>

                    {liveUrl && (
                        <div style={{ marginTop: '20px' }}>
                            <button
                                className="btn-live-card"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRequestLive(project);
                                }}
                            >
                                <Radio size={16} /> Live Demo
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default React.memo(ProjectCard);
