// src/components/Header.jsx

'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Sparkles,
  ShieldCheck,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  ClipboardList,
} from 'lucide-react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    setIsLoggedIn(!!token);
    setIsAdmin(role === 'admin');
    setUserName(name || '');
    setUserEmail(email || '');
  }, [pathname]);

  // Click outside to close user dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserDropdownOpen(false);
    router.push('/');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Best Sellers', href: '/#bestsellers' },
    { label: 'Ingredients', href: '/#ingredients' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-cream-light/90 backdrop-blur-xl border-b border-primary/10 sticky top-0 z-50 transition-all shadow-subtle">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-large bg-primary/15 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary group-hover:text-cream transition-all duration-300 shadow-inner-light">
            <Leaf className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </div>
          <span className="font-poppins font-bold text-xl tracking-tight text-charcoal">
            Soap<span className="text-secondary font-extrabold">Co</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-1 py-1 text-sm font-poppins transition-colors ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-charcoal-light hover:text-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions / Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/questionnaire"
            className="flex items-center gap-1.5 bg-primary text-cream px-4 py-2 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition-all shadow-subtle hover:shadow-medium active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary-light animate-pulse" />
            <span>Take Skin Quiz</span>
          </Link>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-large bg-white/80 hover:bg-white border border-primary/15 text-charcoal font-poppins font-semibold text-xs transition shadow-subtle"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary-dark font-bold flex items-center justify-center text-[10px]">
                  {userName ? userName[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
                <span className="max-w-[100px] truncate">{userName || 'Account'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-charcoal-muted transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-extra shadow-large border border-primary/15 py-2 z-50"
                  >
                    <div className="px-4 py-2.5 border-b border-cream-dark">
                      <p className="font-poppins font-bold text-xs text-charcoal truncate">{userName || 'Customer'}</p>
                      <p className="text-[11px] text-charcoal-light font-inter truncate">{userEmail || 'user@soapco.com'}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-poppins text-charcoal hover:bg-cream/60 transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-primary" />
                        <span>Order History & Formulations</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-poppins text-secondary-dark font-bold hover:bg-secondary/10 transition"
                        >
                          <ShieldCheck className="w-4 h-4 text-secondary" />
                          <span>Admin Portal</span>
                        </Link>
                      )}

                      <Link
                        href="/questionnaire"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-poppins text-charcoal hover:bg-cream/60 transition"
                      >
                        <ClipboardList className="w-4 h-4 text-primary" />
                        <span>New Skin Diagnostic</span>
                      </Link>
                    </div>

                    <div className="border-t border-cream-dark pt-1 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-poppins font-semibold text-status-error hover:bg-status-error/10 transition text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-poppins font-semibold text-charcoal hover:text-primary px-3 py-2 transition"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="text-xs font-poppins font-bold bg-white text-primary border border-primary/25 hover:bg-cream px-3.5 py-2 rounded-large transition shadow-subtle"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          aria-label="Toggle Navigation Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-large bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu with Backdrop Blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide Down Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 bg-cream-light border-b border-primary/15 shadow-large p-5 z-50 md:hidden space-y-4"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-large font-poppins text-sm font-medium transition ${
                      pathname === link.href
                        ? 'bg-primary/15 text-primary font-bold'
                        : 'text-charcoal hover:bg-cream'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-primary/10 space-y-2">
                <Link
                  href="/questionnaire"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-cream py-3 rounded-large font-poppins font-bold text-sm shadow-medium"
                >
                  <Sparkles className="w-4 h-4 text-secondary-light" />
                  <span>Start Skin Diagnostic Quiz</span>
                </Link>

                {isLoggedIn ? (
                  <div className="space-y-2 pt-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2.5 px-3 rounded-large font-poppins text-sm font-semibold bg-white border border-primary/15 text-primary text-center"
                    >
                      Customer Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2.5 px-3 rounded-large font-poppins text-sm font-bold bg-secondary/15 border border-secondary/30 text-secondary-dark text-center"
                      >
                        🛡️ Admin Portal
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 text-center text-status-error font-poppins font-semibold text-sm hover:bg-status-error/10 rounded-large transition"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 text-center font-poppins font-semibold text-sm bg-white border border-primary/15 rounded-large text-charcoal"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 text-center font-poppins font-bold text-sm bg-secondary text-charcoal rounded-large shadow-subtle"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
