import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import ProjectCard from '../projects/ProjectCard';

export function ProjectsSection({ projects, onSelectProject, onRequestLive }) {
    return (
        <section id="work" className="section-dark">
            <div className="section-header">
                <span className="section-number">01</span>
                <h2>Production Artifacts</h2>
            </div>
            <div className="projects-grid">
                {projects.map((proj, i) => (
                    <ProjectCard
                        key={proj.id || i}
                        project={proj}
                        index={i}
                        onSelect={() => onSelectProject(proj)}
                        onRequestLive={(p) => onRequestLive(p)}
                    />
                ))}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="see-more-card"
                >
                    <div className="see-more-inner">
                        <Rocket size={40} className="rocket-icon" />
                        <h3>Exploring More?</h3>
                        <p>I have +4 more specialized projects on my GitHub repositories.</p>
                        <a
                            href="https://github.com/farazshafi?tab=repositories"
                            target="_blank"
                            rel="noreferrer"
                            className="see-more-btn"
                        >
                            See More Architecture <ArrowRight size={18} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default React.memo(ProjectsSection);
