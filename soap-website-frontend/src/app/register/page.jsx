// src/app/register/page.jsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { authAPI } from '@/services/api';
import { Leaf, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight, UserPlus, Check } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', formData.name);
      }

      router.push('/questionnaire');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isPasswordStrong = formData.password.length >= 8;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-extra shadow-large border border-primary/15 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Brand Storytelling (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-primary to-primary-dark p-8 text-cream flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/30 bg-cream/95 group-hover:scale-105 transition-transform duration-300 shadow-md shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Atishay"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-xl tracking-tight text-cream leading-none">
                  ATISHAY
                </span>
                <span className="text-[8.5px] font-inter uppercase tracking-widest text-secondary-light font-semibold mt-1">
                  Bespoke Organic Soaps
                </span>
              </div>
            </Link>

            <div className="space-y-2 pt-4">
              <span className="text-[10px] font-poppins font-bold uppercase tracking-widest text-secondary-light bg-white/10 px-2.5 py-1 rounded-full inline-block">
                Start Your Routine
              </span>
              <h2 className="text-2xl font-poppins font-bold leading-snug">
                Join Atishay for tailored organic skincare.
              </h2>
              <p className="text-xs text-cream/80 font-inter leading-relaxed">
                Unlock your personalized formula profile, save custom recipes, and receive fresh artisan batches delivered to your doorstep.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/15 space-y-2 font-inter text-xs text-cream/90">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary-light shrink-0" />
              <span>Free 2-minute clinical diagnostic</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary-light shrink-0" />
              <span>100% Allergen exclusion guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Side: Register Form (7 cols) */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-2xl font-poppins font-bold text-charcoal">
              Create Your Customer Account
            </h1>
            <p className="text-xs text-charcoal-light font-inter mt-1">
              Join Atishay to begin your personalized formulation
            </p>
          </div>

          {error && (
            <div className="bg-status-error/10 border border-status-error/30 text-status-error px-4 py-3 rounded-large text-xs font-inter">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 font-inter">
            <div>
              <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Radhika Sen"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-4 pr-10 py-2.5 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
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

            <div>
              <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-cream py-3.5 rounded-large font-poppins font-bold text-xs sm:text-sm hover:bg-primary-hover transition-all shadow-medium hover:shadow-large disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-95 mt-3"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'Creating Account...' : 'Create Account & Start Quiz'}</span>
            </button>
          </form>

          <p className="text-center text-xs text-charcoal-light font-inter pt-2 border-t border-cream-dark">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
