// src/app/account/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  MapPin,
  Package,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/Spinner';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, loading, updateProfile, logout } = useAuth();

  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Address state
  const [addresses, setAddresses] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001'
  });

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login?redirect=/account');
    }
    if (user) {
      setNameInput(user.name || '');
      setPhoneInput(user.phone || '');
      setEmailInput(user.email || '');
      setAddresses(user.addresses || [
        {
          id: 'addr_1',
          fullName: user.name || 'Priya Mehta',
          phone: user.phone || '9876543210',
          addressLine1: 'Flat 402, Lotus Residency, MG Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400001',
          isDefault: true
        }
      ]);
    }
  }, [user, isLoggedIn, loading, router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateProfile({
      name: nameInput,
      phone: phoneInput
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.addressLine1 || !newAddr.fullName) return;

    const added = {
      id: `addr_${Date.now()}`,
      ...newAddr
    };
    setAddresses([added, ...addresses]);
    setShowAddAddress(false);
    setNewAddr({
      fullName: '',
      phone: '',
      addressLine1: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001'
    });
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" text="Loading account profile..." />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-dark pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-poppins font-extrabold text-charcoal">
            Customer Profile &amp; Settings
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-inter mt-1">
            Manage your personal skincare profile, default shipping addresses, and past orders.
          </p>
        </div>

        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 bg-primary text-cream px-5 py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-subtle"
        >
          <Package className="w-4 h-4" />
          <span>View My Orders</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Profile Edit Form */}
        <div className="bg-white rounded-extra p-6 sm:p-8 border border-primary/15 shadow-subtle space-y-6">
          <h2 className="font-poppins font-bold text-lg text-charcoal flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <span>Profile Details</span>
          </h2>

          {saveSuccess && (
            <div className="p-3 bg-status-success/10 border border-status-success/30 rounded-large text-xs text-status-success font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary text-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                Email Address (Read-only)
              </label>
              <input
                type="email"
                disabled
                value={emailInput}
                className="w-full px-3.5 py-2 text-xs font-inter rounded-large bg-cream/80 border border-cream-dark text-charcoal-muted cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="9876543210"
                className="w-full px-3.5 py-2 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary text-charcoal"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-cream py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-subtle"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Right: Address Book */}
        <div className="lg:col-span-2 bg-white rounded-extra p-6 sm:p-8 border border-primary/15 shadow-subtle space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-poppins font-bold text-lg text-charcoal flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Saved Shipping Addresses</span>
            </h2>

            <button
              type="button"
              onClick={() => setShowAddAddress(!showAddAddress)}
              className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-primary hover:underline"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Address</span>
            </button>
          </div>

          {/* New Address Form */}
          {showAddAddress && (
            <form onSubmit={handleAddAddress} className="p-4 bg-cream rounded-xl border border-primary/20 space-y-3">
              <h4 className="font-poppins font-bold text-xs text-charcoal uppercase tracking-wider">
                New Address Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Recipient Name"
                  required
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="px-3 py-2 text-xs font-inter rounded-large bg-white border border-primary/20"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="px-3 py-2 text-xs font-inter rounded-large bg-white border border-primary/20"
                />
                <input
                  type="text"
                  placeholder="Street Address Line"
                  required
                  value={newAddr.addressLine1}
                  onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })}
                  className="sm:col-span-2 px-3 py-2 text-xs font-inter rounded-large bg-white border border-primary/20"
                />
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="px-3 py-2 text-xs font-inter rounded-large bg-white border border-primary/20"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  required
                  value={newAddr.postalCode}
                  onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                  className="px-3 py-2 text-xs font-inter rounded-large bg-white border border-primary/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAddress(false)}
                  className="px-3 py-1.5 text-xs font-poppins font-semibold text-charcoal-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-cream px-4 py-1.5 rounded-large text-xs font-poppins font-bold"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          {/* Addresses List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-cream/50 p-4 rounded-xl border border-primary/15 relative space-y-2"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-poppins font-bold text-xs text-charcoal">{addr.fullName}</h4>
                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="text-charcoal-muted hover:text-status-error p-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-charcoal-light font-inter leading-relaxed">
                  {addr.addressLine1}<br />
                  {addr.city}, {addr.state} ({addr.postalCode})<br />
                  Phone: {addr.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
