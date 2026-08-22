// src/app/contact/page.jsx

'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="max-w-3xl mx-auto my-12 px-4 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-poppins font-bold uppercase tracking-wider text-accent">Get In Touch</span>
        <h1 className="text-4xl font-poppins font-bold text-primary">
          Contact SoapCo Team
        </h1>
        <p className="text-base text-text-muted max-w-md mx-auto">
          Have a question about your order, ingredients, or skin concerns? Send us a message below.
        </p>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl text-sm font-medium text-center animate-in fade-in">
          🎉 Thank you for reaching out! Your message has been received and our skincare team will reply within 24 hours.
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-900/10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-primary mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Radhika Sen"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-primary mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-primary mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-primary mb-1">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-white"
              >
                <option value="general">General Inquiry</option>
                <option value="order">Order Tracking / Issue</option>
                <option value="allergy">Allergy & Ingredient Question</option>
                <option value="feedback">Feedback & Suggestions</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-primary mb-1">Your Message</label>
            <textarea
              name="message"
              placeholder="Tell us how we can assist you..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-3.5 rounded-xl font-poppins font-bold text-base hover:bg-accent-hover transition-all shadow-md mt-2"
          >
            Send Message →
          </button>
        </form>
      </div>
    </div>
  );
}
