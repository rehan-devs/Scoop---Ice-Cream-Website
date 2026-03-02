'use client';

import { useState, useRef, FormEvent } from 'react';
import { gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';

type InquiryType = 'General' | 'Catering' | 'Private Events' | 'Wholesale' | 'Feedback' | 'Other';

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  eventDate: string;
  guestCount: string;
  message: string;
  honeypot: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'General',
    eventDate: '',
    guestCount: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const showConditionalFields =
    formData.inquiryType === 'Catering' || formData.inquiryType === 'Private Events';

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (!validate()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        if (buttonRef.current) {
          gsap.fromTo(
            buttonRef.current,
            { scale: 0.95 },
            { scale: 1, duration: 0.3, ease: 'back.out(2)' }
          );
        }
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'General',
          eventDate: '',
          guestCount: '',
          message: '',
          honeypot: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses =
    'w-full bg-transparent border-b border-chocolate/20 focus:border-accent-pink py-3 font-body text-chocolate placeholder:text-chocolate/30 outline-none transition-colors duration-300';

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="font-body text-xs uppercase tracking-[0.1em] text-chocolate-light mb-2 block">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`${inputClasses} ${errors.name ? 'border-red-400' : ''}`}
          />
          {errors.name && (
            <p className="font-body text-xs text-red-400 mt-2">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="font-body text-xs uppercase tracking-[0.1em] text-chocolate-light mb-2 block">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`${inputClasses} ${errors.email ? 'border-red-400' : ''}`}
          />
          {errors.email && (
            <p className="font-body text-xs text-red-400 mt-2">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="phone" className="font-body text-xs uppercase tracking-[0.1em] text-chocolate-light mb-2 block">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="inquiryType" className="font-body text-xs uppercase tracking-[0.1em] text-chocolate-light mb-2 block">
            Inquiry Type
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className={`${inputClasses} bg-cream cursor-pointer`}
          >
            {(['General', 'Catering', 'Private Events', 'Wholesale', 'Feedback', 'Other'] as InquiryType[]).map(
              (type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Conditional Fields */}
      <div
        className="conditional-field grid grid-cols-1 md:grid-cols-2 gap-8"
        data-visible={showConditionalFields ? 'true' : 'false'}
      >
        <div>
          <label htmlFor="eventDate" className="font-body text-xs uppercase tracking-[0.1em] text-chocolate-light mb-2 block">
            Event Date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="guestCount" className="font-body text-xs uppercase tracking-[0.1em] text-chocolate-light mb-2 block">
            Guest Count
          </label>
          <input
            id="guestCount"
            name="guestCount"
            type="number"
            value={formData.guestCount}
            onChange={handleChange}
            placeholder="Approx. guests"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="font-body text-xs uppercase tracking-[0.1em] text-chocolate-light mb-2 block">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what's on your mind..."
          className={`${inputClasses} resize-none ${errors.message ? 'border-red-400' : ''}`}
        />
        {errors.message && (
          <p className="font-body text-xs text-red-400 mt-2">{errors.message}</p>
        )}
      </div>

      <MagneticButton>
        <button
          ref={buttonRef}
          type="submit"
          disabled={status === 'loading'}
          className={`inline-flex items-center justify-center px-10 py-4 rounded-full font-body text-sm uppercase tracking-[0.1em] transition-all duration-300 min-w-[200px] ${
            status === 'success'
              ? 'bg-accent-mint text-chocolate'
              : status === 'error'
              ? 'bg-red-400 text-white'
              : 'bg-chocolate text-cream hover:bg-chocolate-rich'
          }`}
        >
          {status === 'loading' && (
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {status === 'idle' && 'Send Message'}
          {status === 'loading' && 'Sending...'}
          {status === 'success' && 'Sent! 🍦'}
          {status === 'error' && 'Try Again'}
        </button>
      </MagneticButton>

      {status === 'success' && (
        <p className="font-body text-sm text-accent-mint">
          Thank you! We&apos;ll get back to you within 24 hours.
        </p>
      )}
    </form>
  );
}