import React from 'react';
import SkillCategory from '../skills/SkillCategory';

export function SkillsSection({ skillCategories }) {
    return (
        <section id="skills">
            <div className="section-header">
                <span className="section-number">02</span>
                <h2>Technical Ecosystem</h2>
            </div>
            <div
                className="skills-grid"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}
            >
                {skillCategories.map((cat, i) => (
                    <SkillCategory key={cat.id || i} {...cat} index={i} />
                ))}
            </div>
        </section>
    );
}

export default React.memo(SkillsSection);
