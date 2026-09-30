import React from 'react';
import { motion } from 'framer-motion';

export function ContactSection() {
    return (
        <section id="contact" className="contact-section">
            <motion.div
                className="contact-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
            >
                <span className="section-number">Available for New Challenges</span>
                <h2>Let's Connect</h2>
                <p>Based in Kerala, India. Open to remote opportunities and high-impact engineering roles.</p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
                    <a href="mailto:farazshafiofficial@gmail.com" className="btn-outline">
                        Email Me
                    </a>
                    <a
                        href="https://www.linkedin.com/in/farazshafi/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline"
                    >
                        LinkedIn
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

export default React.memo(ContactSection);
