import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export function HeroSection() {
    return (
        <section id="hero">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="hero-text"
            >
                <span className="hero-eyebrow">FULL-STACK ENGINEER</span>
                <h1 className="hero-title">
                    Engineering <br /> <span className="text-gradient">Scalable Systems</span>
                </h1>
                <p className="hero-description">
                    years of hands on experience building production-ready applications with React, Node.js, and a focus on architecture and performance.
                </p>
                <div className="hero-cta">
                    <button
                        className="btn-primary"
                        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        View Projects
                    </button>
                    <div className="social-links">
                        <a href="https://github.com/farazshafi/" target="_blank" rel="noreferrer" title="GitHub">
                            <Github size={28} className="social-icon" />
                        </a>
                        <a href="https://www.linkedin.com/in/farazshafi/" target="_blank" rel="noreferrer" title="LinkedIn">
                            <Linkedin size={28} className="social-icon" />
                        </a>
                        <a href="mailto:farazshafiofficial@gmail.com" title="Email">
                            <Mail size={28} className="social-icon" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default React.memo(HeroSection);
