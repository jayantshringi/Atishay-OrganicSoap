// src/components/Header.jsx

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!token);
    setIsAdmin(role === 'admin');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50 shadow-subtle">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-poppins font-bold text-primary flex items-center gap-2 group">
          <span className="text-2xl p-1.5 bg-primary/10 rounded-xl group-hover:scale-105 transition-transform">🌿</span>
          <span className="tracking-tight text-charcoal">Soap<span className="text-secondary">Co</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-7 items-center text-sm font-medium">
          <Link href="/" className="text-charcoal hover:text-primary transition-colors">
            Home
          </Link>
          <a href="#bestsellers" className="text-charcoal hover:text-primary transition-colors">
            Best Sellers
          </a>
          <a href="#ingredients" className="text-charcoal hover:text-primary transition-colors">
            Ingredients
          </a>
          <a href="#how-it-works" className="text-charcoal hover:text-primary transition-colors">
            How It Works
          </a>
          <Link href="/faq" className="text-charcoal hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="text-charcoal hover:text-primary transition-colors">
            Contact
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-3 ml-2">
              <Link
                href="/dashboard"
                className="text-primary font-semibold hover:text-primary-dark transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5"
              >
                Dashboard
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-secondary font-bold hover:underline transition-colors px-2 py-1"
                >
                  🛡️ Admin
                </Link>
              )}
              <Link
                href="/questionnaire"
                className="bg-primary text-cream px-4 py-2 rounded-lg font-poppins font-semibold text-xs hover:bg-primary-dark transition-all shadow-subtle"
              >
                Take Quiz
              </Link>
              <button
                onClick={handleLogout}
                className="bg-status-error/10 text-status-error border border-status-error/20 px-3 py-1.5 rounded-lg hover:bg-status-error hover:text-white transition-all text-xs font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Link
                href="/login"
                className="text-charcoal hover:text-primary transition-colors px-3 py-1.5 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-primary text-cream px-5 py-2.5 rounded-lg font-poppins font-semibold text-xs hover:bg-primary-dark transition-all shadow-subtle hover:shadow-medium"
              >
                Sign Up
              </Link>
              <Link
                href="/questionnaire"
                className="bg-secondary text-charcoal px-4 py-2.5 rounded-lg font-poppins font-bold text-xs hover:bg-secondary-hover transition-all shadow-subtle"
              >
                Take Quiz ✨
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle Navigation Menu"
          className="md:hidden text-2xl text-primary p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-primary/10 p-5 flex flex-col gap-3 shadow-medium animate-in slide-in-from-top duration-200">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-charcoal py-2 font-medium">
            Home
          </Link>
          <a href="#bestsellers" onClick={() => setMobileMenuOpen(false)} className="text-charcoal py-2 font-medium">
            Best Sellers
          </a>
          <a href="#ingredients" onClick={() => setMobileMenuOpen(false)} className="text-charcoal py-2 font-medium">
            Ingredients
          </a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-charcoal py-2 font-medium">
            How It Works
          </a>
          <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-charcoal py-2 font-medium">
            FAQ
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-charcoal py-2 font-medium">
            Contact
          </Link>
          <Link
            href="/questionnaire"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-primary text-cream py-2.5 text-center rounded-lg font-poppins font-bold text-sm shadow-subtle my-1"
          >
            Take the Skin Quiz ✨
          </Link>
          {isLoggedIn ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-primary/10">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-primary py-2 font-semibold">
                Customer Dashboard
              </Link>
              {isAdmin && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-secondary py-2 font-bold">
                  🛡️ Admin Portal
                </Link>
              )}
              <button onClick={handleLogout} className="text-left text-status-error py-2 font-semibold">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-primary/10">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-charcoal py-2 font-medium">
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-secondary text-charcoal py-2.5 text-center rounded-lg font-poppins font-bold text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
