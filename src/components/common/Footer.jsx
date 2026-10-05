import React, { useState } from 'react';
import { Tooltip } from './Tooltip';
import { ArrowRight, Check, Globe, Sparkles, Compass, Share2 } from 'lucide-react';

export const Footer = ({ onSelectCategory, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#1A1A1A] text-[#F9F8F6] border-t border-[#1A1A1A] z-20 pt-20 pb-12 overflow-hidden">
      {/* Subtle gold accent top line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-40" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F9F8F6]/10">
          
          {/* Col 1: Brand & Atelier Origin (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="font-serif text-3xl font-extrabold tracking-[0.25em] text-[#F9F8F6] block">
                ROGUE
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase font-mono block mt-1">
                Haute Atelier & Structural Tailoring
              </span>
            </div>

            <p className="text-xs text-[#EBE5DE]/70 leading-relaxed max-w-sm font-sans">
              Rogue stands as a sanctuary of architectural minimalism. We engineer heavyweight garments from ancestral natural fibers to transcend the ephemeral churn of fashion.
            </p>

            <div className="pt-2 text-[10px] font-mono tracking-widest text-[#EBE5DE]/50 space-y-1">
              <p>ATELIER: 18 PLACE VENDÔME, 75001 PARIS</p>
              <p>STUDIO: OMOTESANDO 4-CHOME, TOKYO</p>
            </div>
          </div>

          {/* Col 2: Curated Silhouettes (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37]">
              Silhouettes
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EBE5DE]/80">
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('Outerwear')} 
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-300"
                >
                  Heavy Outerwear
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('Shirts')} 
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-300"
                >
                  Sartorial Shirts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('T-Shirts')} 
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-300"
                >
                  320GSM Atelier Tees
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('Trousers')} 
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-300"
                >
                  Japanese Selvedge Denim
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('Trousers')} 
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-300"
                >
                  Pleated Ecru Trousers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Concierge & Client Relations (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37]">
              Client Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EBE5DE]/80">
              <li>
                <button onClick={() => onNavigate && onNavigate('dashboard')} className="hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-300">
                  Client Executive Dashboard
                </button>
              </li>
              <li>
                <span className="hover:text-[#D4AF37] cursor-pointer">Bespoke Alteration Concierge</span>
              </li>
              <li>
                <span className="hover:text-[#D4AF37] cursor-pointer">Archival Garment Care Guide</span>
              </li>
              <li>
                <span className="hover:text-[#D4AF37] cursor-pointer">Climate-Neutral Global Courier</span>
              </li>
              <li>
                <span className="hover:text-[#D4AF37] cursor-pointer">Private Salon Appointments</span>
              </li>
            </ul>
          </div>

          {/* Col 4: VIP Gazette & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37]">
              Atelier Gazette
            </h4>
            <p className="text-xs text-[#EBE5DE]/70 leading-relaxed font-sans">
              Receive private invitations to limited-edition batch drops, private lookbooks, and runway releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter VIP Correspondence Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#F9F8F6]/30 px-0 py-2.5 text-xs text-[#F9F8F6] placeholder:font-serif placeholder:italic placeholder:text-[#EBE5DE]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="btn-gold-slide w-full h-11 bg-[#F9F8F6] text-[#1A1A1A] hover:text-[#1A1A1A] text-[10px] uppercase tracking-[0.25em] font-medium"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Join Atelier Registry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              {subscribed && (
                <div className="text-[10px] font-mono text-[#D4AF37] flex items-center space-x-1 animate-fadeIn">
                  <Check className="w-3 h-3" />
                  <span>Invitation registered. Welcome to Rogue Atelier.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Metadata & Social Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-[10px] font-mono tracking-widest text-[#EBE5DE]/60 uppercase">
          <div>
            © {new Date().getFullYear()} ROGUE ATELIER GROUP. ALL ARCHITECTURAL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-6">
            <Tooltip content="Atelier Lookbook Dispatch" position="top">
              <a href="#instagram" className="hover:text-[#D4AF37] transition-colors flex items-center space-x-1">
                <Share2 className="w-4 h-4 stroke-[1.5]" />
                <span>Dispatch</span>
              </a>
            </Tooltip>
            <Tooltip content="Paris • Milan • Tokyo Salon Coordinates" position="top">
              <a href="#global" className="hover:text-[#D4AF37] transition-colors flex items-center space-x-1">
                <Compass className="w-4 h-4 stroke-[1.5]" />
                <span>Ateliers</span>
              </a>
            </Tooltip>
            <span className="text-[#D4AF37]">VOL. 04 / EDITION 300</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
