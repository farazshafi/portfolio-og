import React from 'react';
import { X, Menu } from 'lucide-react';

export function Navbar({ isMenuOpen, setIsMenuOpen }) {
    return (
        <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="logo">FARAZ SHAFI</div>

            {/* Mobile Menu Toggle */}
            <button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Navigation Menu"
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <a href="#hero" onClick={() => setIsMenuOpen(false)}>Intro</a>
                <a href="#work" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#skills" onClick={() => setIsMenuOpen(false)}>Stack</a>
                <a href="#resume" onClick={() => setIsMenuOpen(false)}>Resume</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
        </nav>
    );
}

export default React.memo(Navbar);
