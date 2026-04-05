'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/biblioteca', label: 'Biblioteca' },
  { href: '/estudios-biblicos', label: 'Estudios Bíblicos' },
  { href: '/musica', label: 'Música' },
  { href: '/contactanos', label: 'Contáctanos' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl font-normal italic tracking-wide text-black select-none"
          >
            Mega Zoé
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-sm tracking-widest uppercase transition-colors duration-200 pb-1 ${
                  isActive ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
                }`}
                style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.7rem', letterSpacing: '0.12em' }}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#c9a96e]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-black p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-md">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm tracking-widest uppercase py-2 border-b border-gray-100 last:border-0 transition-colors ${
                  isActive ? 'text-black font-bold' : 'text-gray-500'
                }`}
                style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.7rem', letterSpacing: '0.12em' }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
