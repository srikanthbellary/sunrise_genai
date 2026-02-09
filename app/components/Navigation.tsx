'use client';

import { useState } from 'react';

const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#products', label: 'Products' },
    { href: '#locations', label: 'Locations' },
    { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/30">
            <div className="container mx-auto px-4 md:px-6 py-3">
                {/* Top Line - Brand Name Centered */}
                <div className="text-center mb-2">
                    <a
                        href="#hero"
                        className="text-neon-orange font-bold text-lg md:text-xl tracking-widest gen-ai-font"
                        style={{ textShadow: '0 0 10px #FF6B35, 0 0 20px #FF6B35, 0 0 30px #FF6B35' }}
                    >
                        SUNRISE GEN AI
                    </a>
                </div>

                {/* Bottom Line - Desktop Navigation Centered */}
                <div className="hidden md:flex justify-center items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="nav-link text-xs hover:text-neon-orange transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile - Hamburger Button Centered */}
                <div className="md:hidden flex justify-center">
                    <button
                        onClick={toggleMenu}
                        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-6 h-0.5 bg-neon-cyan transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-neon-cyan transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-neon-cyan transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                        />
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pt-3' : 'max-h-0'
                        }`}
                >
                    <div className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className="nav-link text-sm py-3 hover:bg-neon-cyan/10 rounded-lg transition-colors text-center"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
