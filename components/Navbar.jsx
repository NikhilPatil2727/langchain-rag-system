'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
    <rect width="28" height="28" rx="8" fill="url(#logoGrad)" />
    <path d="M8 14L12 10L16 14L20 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 18L12 14L16 18L20 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
        <stop stopColor="#6366f1" />
        <stop offset="1" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="w-3 h-3 sm:w-3.5 sm:h-3.5">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#050507]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="flex-shrink-0"
              >
                <Logo />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="text-xs sm:text-sm md:text-[15px] font-bold text-white tracking-tight">
                  PaperInsight
                </span>
                <span className="text-[7px] sm:text-[8px] md:text-[10px] text-gray-500 font-mono tracking-wider uppercase">
                  Simple AI Assistant
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/" active={pathname === '/'}>Home</NavLink>
              <NavLink href="/#features" active={false}>Features</NavLink>
              <NavLink href="/#how-it-works" active={false}>How it Works</NavLink>
            </nav>

            {/* Mobile Menu Button - Visible on mobile/tablet */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/[0.06] active:bg-white/[0.1]"
              style={{ color: 'var(--text-secondary)' }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-14 left-0 right-0 z-40 md:hidden"
              style={{
                background: 'rgba(5,5,7,0.98)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                maxHeight: 'calc(100vh - 3.5rem)',
                overflowY: 'auto',
              }}
            >
              <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
                <MobileNavLink href="/" active={pathname === '/'} onClick={() => setMobileOpen(false)}>
                  Home
                </MobileNavLink>
                <MobileNavLink href="/#features" active={false} onClick={() => setMobileOpen(false)}>
                  Features
                </MobileNavLink>
                <MobileNavLink href="/#how-it-works" active={false} onClick={() => setMobileOpen(false)}>
                  How it Works
                </MobileNavLink>


              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Desktop Navigation Link
function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className="relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-white"
      style={{
        color: active ? 'white' : 'rgba(255,255,255,0.6)',
        background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {children}
    </Link>
  );
}

// Mobile Navigation Link
function MobileNavLink({ href, active, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 rounded-lg text-sm font-medium transition-all active:scale-[0.98]"
      style={{
        color: active ? 'white' : 'rgba(255,255,255,0.6)',
        background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
      }}
    >
      {children}
    </Link>
  );
}