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
    <header className="bg-white/90 backdrop-blur-md border-b border-amber-900/10 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-poppins font-bold text-primary flex items-center gap-2">
          <span className="text-3xl">🧼</span>
          <span className="tracking-tight">Soap<span className="text-accent">Co</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-medium">
          <Link href="/" className="text-text hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/faq" className="text-text hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="text-text hover:text-primary transition-colors">
            Contact
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-text hover:text-primary transition-colors">
                Dashboard
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-accent font-bold hover:underline transition-colors">
                  🛡️ Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500/10 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-text hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-accent text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-accent-hover transition-all font-semibold text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle Navigation Menu"
          className="md:hidden text-2xl text-primary p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200 shadow-lg">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-text py-2">
            Home
          </Link>
          <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-text py-2">
            FAQ
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-text py-2">
            Contact
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-text py-2">
                Dashboard
              </Link>
              {isAdmin && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-accent py-2 font-bold">
                  🛡️ Admin Portal
                </Link>
              )}
              <button onClick={handleLogout} className="text-left text-red-500 py-2 font-semibold">
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-text py-2">
                Login
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="bg-accent text-white py-2.5 text-center rounded-lg font-bold">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
