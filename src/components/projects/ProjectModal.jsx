import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Radio } from 'lucide-react';

export function ProjectModal({ project, onClose, onRequestLive }) {
    if (!project) return null;

    return (
        <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose} aria-label="Close modal">
                    <X size={24} />
                </button>
                <div className="modal-grid">
                    <div className="modal-image" style={{ backgroundImage: `url(${project.image})` }}></div>
                    <div className="modal-info">
                        <div className="project-tags">
                            {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                        </div>
                        <h2>{project.title}</h2>
                        <p className="modal-desc">{project.longDescription}</p>
                        <div className="features-list">
                            <h3>Key Features</h3>
                            {project.features.map((feature, i) => (
                                <div key={i} className="feature-item">
                                    <CheckCircle2 size={18} color="var(--accent-color)" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '40px', flexWrap: 'wrap' }}>
                            <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline" style={{ marginTop: 0 }}>
                                Source Code
                            </a>
                            {project.liveUrl && (
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        onClose();
                                        onRequestLive(project);
                                    }}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <Radio size={18} /> Live Demo
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default React.memo(ProjectModal);
