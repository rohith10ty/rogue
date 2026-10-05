import React, { useState } from 'react';
import { Tooltip } from '../components/common/Tooltip';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

export const LoginPage = ({ onLoginSuccess, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
    agreeTerms: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const validateForm = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errs.email = 'Atelier client identifier or email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid corporate or personal email address.';
    }

    if (!formData.password) {
      errs.password = 'Security key / password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Security key must contain at least 6 characters.';
    }

    if (activeTab === 'register') {
      if (!formData.name.trim()) {
        errs.name = 'Full client title and legal name is required.';
      }
      if (formData.password !== formData.confirmPassword) {
        errs.confirmPassword = 'Confirmation security key does not match.';
      }
      if (!formData.agreeTerms) {
        errs.agreeTerms = 'Please acknowledge the Atelier terms of discretion.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFeedbackSuccess('');

    setTimeout(() => {
      setIsSubmitting(false);
      const userName = formData.name || formData.email.split('@')[0];
      setFeedbackSuccess(
        activeTab === 'login'
          ? `Welcome back, ${userName}. VIP Atelier Session Activated.`
          : `Atelier Membership registered for ${userName}. Welcome.`
      );

      setTimeout(() => {
        onLoginSuccess({
          name: userName,
          email: formData.email,
          role: 'VIP Member'
        });
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-[85vh] pt-20 md:pt-24 pb-12 px-4 md:px-8 max-w-[1200px] mx-auto flex items-center justify-center">
      
      <div className="w-full max-w-4xl border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 bg-white/60 dark:bg-[#1A1A1A] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Column: High-Fashion Editorial Imagery (5 Cols) */}
        <div className="md:col-span-5 relative hidden md:flex flex-col justify-between p-8 bg-[#121212] text-[#F9F8F6] overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img
              src="/products/hoodie 1/7Ge1RzLc_2db4d4c6790b49d49145f9082fde3a93.webp"
              alt="Rogue Atelier Editorial"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Brand Tag */}
          <div className="relative z-10 space-y-0.5">
            <span className="font-serif text-2xl font-extrabold tracking-[0.25em] text-[#F9F8F6] block">
              ROGUE
            </span>
            <span className="text-[8px] tracking-[0.3em] text-[#D4AF37] uppercase font-mono block">
              Client Terminal
            </span>
          </div>

          {/* Quote */}
          <div className="relative z-10 space-y-2.5 my-auto">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <p className="font-serif text-base italic leading-relaxed text-[#EBE5DE]">
              "Architectural form, ancestral natural fibers, and deliberate restraint."
            </p>
            <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase block">
              — Place Vendôme Bureau
            </span>
          </div>

          {/* Security Note */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center space-x-2 text-[9px] font-mono text-[#EBE5DE]/60 uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>256-Bit Encrypted Client Portal</span>
          </div>
        </div>

        {/* Right Column: Clean Compact Form (7 Cols) */}
        <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-between space-y-6">
          
          <div>
            {/* Tab Selector */}
            <div className="flex border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 mb-6">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setErrors({});
                  setFeedbackSuccess('');
                }}
                className={`pb-2.5 text-xs uppercase font-mono tracking-[0.2em] transition-all relative ${
                  activeTab === 'login'
                    ? 'text-[#1A1A1A] dark:text-[#F9F8F6] font-bold'
                    : 'text-[#6C6863] dark:text-[#9E9A93] hover:text-[#D4AF37]'
                }`}
              >
                Sign In
                {activeTab === 'login' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]" />
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('register');
                  setErrors({});
                  setFeedbackSuccess('');
                }}
                className={`pb-2.5 ml-6 text-xs uppercase font-mono tracking-[0.2em] transition-all relative ${
                  activeTab === 'register'
                    ? 'text-[#1A1A1A] dark:text-[#F9F8F6] font-bold'
                    : 'text-[#6C6863] dark:text-[#9E9A93] hover:text-[#D4AF37]'
                }`}
              >
                Private Membership
                {activeTab === 'register' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]" />
                )}
              </button>
            </div>

            {/* Title */}
            <div className="space-y-1 mb-6">
              <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                {activeTab === 'login' ? 'Client Access' : 'Create Atelier Account'}
              </h2>
              <p className="text-xs text-[#6C6863] dark:text-[#9E9A93] font-serif italic">
                {activeTab === 'login' 
                  ? 'Enter credentials to manage your curated wardrobe & bespoke orders.'
                  : 'Join the private registry for limited batch drops.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {activeTab === 'register' && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#6C6863] dark:text-[#9E9A93] block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Alexander Hastings"
                    className="w-full bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-0 py-2 text-xs text-[#1A1A1A] dark:text-[#F9F8F6] placeholder:font-serif placeholder:italic placeholder:text-[#6C6863] focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.name && (
                    <span className="text-[9px] font-mono text-red-500 block">{errors.name}</span>
                  )}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#6C6863] dark:text-[#9E9A93] block">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. client@rogueatelier.com"
                  className="w-full bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-0 py-2 text-xs text-[#1A1A1A] dark:text-[#F9F8F6] placeholder:font-serif placeholder:italic placeholder:text-[#6C6863] focus:outline-none focus:border-[#D4AF37]"
                />
                {errors.email && (
                  <span className="text-[9px] font-mono text-red-500 block">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#6C6863] dark:text-[#9E9A93]">
                    Security Key / Password *
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-0 py-2 pr-8 text-xs text-[#1A1A1A] dark:text-[#F9F8F6] placeholder:font-serif placeholder:italic placeholder:text-[#6C6863] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-2 text-[#6C6863] hover:text-[#D4AF37] p-1"
                    aria-label="Toggle Password Visibility"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[9px] font-mono text-red-500 block">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password (Register only) */}
              {activeTab === 'register' && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#6C6863] dark:text-[#9E9A93] block">
                    Confirm Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-0 py-2 text-xs text-[#1A1A1A] dark:text-[#F9F8F6] placeholder:font-serif placeholder:italic placeholder:text-[#6C6863] focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.confirmPassword && (
                    <span className="text-[9px] font-mono text-red-500 block">{errors.confirmPassword}</span>
                  )}
                </div>
              )}

              {/* Options */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 cursor-pointer text-xs text-[#6C6863] dark:text-[#9E9A93]">
                  <input
                    type="checkbox"
                    checked={activeTab === 'login' ? formData.rememberMe : formData.agreeTerms}
                    onChange={(e) => {
                      if (activeTab === 'login') {
                        setFormData({ ...formData, rememberMe: e.target.checked });
                      } else {
                        setFormData({ ...formData, agreeTerms: e.target.checked });
                      }
                    }}
                    className="accent-[#D4AF37] w-3.5 h-3.5"
                  />
                  <span className="text-[10px] font-mono uppercase tracking-wider">
                    {activeTab === 'login' ? 'Remember Terminal' : 'Agree to Terms'}
                  </span>
                </label>
              </div>

              {/* Success Feedback */}
              {feedbackSuccess && (
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center space-x-2 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{feedbackSuccess}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold-slide w-full h-11 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-medium shadow-md transition-all mt-2"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{activeTab === 'login' ? 'Authorize Client Session' : 'Complete Registration'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

            </form>
          </div>

          {/* Bottom helper */}
          <div className="pt-2 text-center">
            <button
              onClick={() => onNavigate('landing')}
              className="text-[10px] font-mono text-[#6C6863] dark:text-[#9E9A93] hover:text-[#D4AF37] uppercase tracking-wider"
            >
              ← Return to Collection
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
