// src/app/contact/page.jsx

'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  Clock,
  MapPin,
} from 'lucide-react';

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
    <div className="max-w-4xl mx-auto my-10 sm:my-14 px-4 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 flex items-center gap-1.5 w-fit mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          Personal Skincare Consultation
        </span>
        <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
          Contact the Atishay Specialists
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-light font-inter max-w-md mx-auto">
          Have a question regarding custom formulations, allergen safety, or delivery? We are here to help.
        </p>
      </div>

      {/* Info Channels Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-extra border border-primary/15 shadow-subtle flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-large bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Email Support</span>
            <a href="mailto:support@atishay.com" className="text-xs font-poppins font-bold text-charcoal hover:text-primary">
              support@atishay.com
            </a>
          </div>
        </div>

        <div className="bg-white p-5 rounded-extra border border-primary/15 shadow-subtle flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-large bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Response Time</span>
            <span className="text-xs font-poppins font-bold text-charcoal">
              Under 24 Hours
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-extra border border-primary/15 shadow-subtle flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-large bg-secondary/15 flex items-center justify-center text-secondary-dark shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Direct Consultation</span>
            <span className="text-xs font-poppins font-bold text-secondary-dark">
              WhatsApp Available
            </span>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {submitted && (
        <div className="bg-status-success/15 border border-status-success/40 text-primary-darker px-6 py-4 rounded-extra text-xs font-poppins font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />
          <span>Thank you for reaching out! Your message has been logged and our skincare team will reply within 24 hours.</span>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-white rounded-extra p-6 sm:p-10 shadow-large border border-primary/15">
        <form onSubmit={handleSubmit} className="space-y-4 font-inter text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Radhika Sen"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
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
                className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
            </div>

            <div>
              <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
                Consultation Topic
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm font-poppins text-charcoal focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              >
                <option value="general">General Skincare Consultation</option>
                <option value="order">Order Tracking &amp; Delivery</option>
                <option value="allergy">Allergen &amp; Botanical Advice</option>
                <option value="feedback">Custom Formulation Feedback</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
              Your Message
            </label>
            <textarea
              name="message"
              placeholder="Describe your skin concern or question in detail..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-xs sm:text-sm font-inter text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-cream py-3.5 rounded-large font-poppins font-bold text-xs sm:text-sm hover:bg-primary-hover transition-all shadow-medium hover:shadow-large flex items-center justify-center gap-2 active:scale-95 mt-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Message to Skincare Team</span>
          </button>
        </form>
      </div>
    </div>
  );
}
