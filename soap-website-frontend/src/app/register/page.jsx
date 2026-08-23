// src/app/register/page.jsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
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
      setError(err.response?.data?.error || 'Registration failed. Please check your network connection or backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-extra p-8 sm:p-10 shadow-large border border-primary/15">
        <div className="text-center mb-8">
          <span className="text-4xl p-2 bg-primary/10 rounded-2xl inline-block">🌿</span>
          <h1 className="text-3xl font-poppins font-bold text-charcoal mt-3">
            Create Account
          </h1>
          <p className="text-sm text-charcoal-light font-inter mt-1">
            Join SoapCo for tailored organic skincare crafted for your skin
          </p>
        </div>

        {error && (
          <div className="bg-status-error/10 border border-status-error/30 text-status-error px-4 py-3 rounded-large text-sm mb-6 font-inter">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Priyanshu Sharma"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-sm font-inter text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

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
              className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-sm font-inter text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
              Phone Number (10 digits)
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-sm font-inter text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-sm font-inter text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-sm font-inter text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-cream py-3.5 rounded-large font-poppins font-bold text-base hover:bg-primary-dark transition-all shadow-medium hover:shadow-large disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Account...' : 'Create Account & Start Quiz'}
          </button>
        </form>

        <p className="text-center text-sm text-charcoal-light font-inter mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
