// src/app/login/page.jsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/services/api';
import { Leaf, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', formData.email);
        if (response.data.name) {
          localStorage.setItem('userName', response.data.name);
        }
        if (response.data.role) {
          localStorage.setItem('userRole', response.data.role);
        }
      }
      if (response.data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-extra shadow-large border border-primary/15 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Brand Storytelling (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-primary to-primary-dark p-8 text-cream flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-large bg-white/20 flex items-center justify-center text-cream">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-poppins font-bold text-xl tracking-tight text-cream">
                Soap<span className="text-secondary">Co</span>
              </span>
            </Link>

            <div className="space-y-2 pt-4">
              <span className="text-[10px] font-poppins font-bold uppercase tracking-widest text-secondary-light bg-white/10 px-2.5 py-1 rounded-full inline-block">
                Personalized Skincare
              </span>
              <h2 className="text-2xl font-poppins font-bold leading-snug">
                Welcome back to your tailored skincare journey.
              </h2>
              <p className="text-xs text-cream/80 font-inter leading-relaxed">
                Log in to review your saved organic recipes, track active deliveries, or re-order your favorite custom soap bar.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/15 space-y-2">
            <div className="flex items-center gap-2 text-xs font-inter text-cream/90">
              <ShieldCheck className="w-4 h-4 text-secondary-light shrink-0" />
              <span>100% Allergen Safe &amp; Dermatologist Tested</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form (7 cols) */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-2xl font-poppins font-bold text-charcoal">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-charcoal-light font-inter mt-1">
              Enter your registered email and password to access your dashboard
            </p>
          </div>

          {error && (
            <div className="bg-status-error/10 border border-status-error/30 text-status-error px-4 py-3 rounded-large text-xs font-inter">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-inter">
            <div>
              <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
            </div>

            <div>
              <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-4 pr-10 py-3 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-cream py-3.5 rounded-large font-poppins font-bold text-xs sm:text-sm hover:bg-primary-hover transition-all shadow-medium hover:shadow-large disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-95 mt-2"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Signing In...' : 'Sign In to Account'}</span>
            </button>
          </form>

          <div className="border-t border-cream-dark pt-4 text-center space-y-2">
            <p className="text-xs text-charcoal-light font-inter">
              Do not have an account?{' '}
              <Link href="/register" className="text-primary font-bold hover:underline">
                Create an account
              </Link>
            </p>
            <p className="text-xs text-charcoal-light font-inter">
              Want to try the quiz first?{' '}
              <Link href="/questionnaire" className="text-secondary font-bold hover:underline">
                Take Skin Quiz →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
