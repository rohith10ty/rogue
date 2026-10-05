import React, { useState } from 'react';
import { HangerCollection } from '../components/collection/HangerCollection';
import { products, editorialLookbooks, pressTestimonials, luxuryServices, faqs } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Tooltip } from '../components/common/Tooltip';
import { 
  ArrowRight, 
  Plus, 
  Minus, 
  Star
} from 'lucide-react';

export const LandingPage = ({ onQuickView, onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeLookbookIndex, setActiveLookbookIndex] = useState(0);

  const tshirts = products.filter(p => p.category === 'T-Shirts');
  const hoodiesAndSweatshirts = products.filter(p => p.category === 'Outerwear' || p.category === 'Sweatshirts');
  const shirts = products.filter(p => p.category === 'Shirts');
  const pants = products.filter(p => p.category === 'Trousers');

  const activeLookbook = editorialLookbooks[activeLookbookIndex];

  return (
    <div className="min-h-screen">
      
      {/* 1. HERO SECTION (5-Photo Editorial Collage Mosaic) */}
      <section className="relative h-screen min-h-[580px] max-w-[1400px] mx-auto pt-16 md:pt-20 lg:pt-22 pb-0 flex flex-col justify-between border-x border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 overflow-hidden">
        
        {/* Subtle Architectural Lines in Background */}
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12" aria-hidden="true">
          <div className="w-px h-full bg-[#1A1A1A]/10 dark:bg-[#F9F8F6]/10" />
          <div className="w-px h-full bg-[#1A1A1A]/10 dark:bg-[#F9F8F6]/10 hidden md:block" />
          <div className="w-px h-full bg-[#1A1A1A]/10 dark:bg-[#F9F8F6]/10 hidden md:block" />
          <div className="w-px h-full bg-[#1A1A1A]/10 dark:bg-[#F9F8F6]/10" />
        </div>

        {/* Hero Content: flex-1 min-h-0 fills available vertical height */}
        <div className="relative z-10 px-6 md:px-12 py-1 md:py-2 flex-1 min-h-0 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
            
            {/* Left Column: 2 Words Per Line, Compact & Clean (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-2.5 sm:space-y-3.5 pr-0 lg:pr-2">
              
              {/* Minimalist Eyebrow */}
              <div className="flex items-center space-x-3">
                <span className="w-8 h-px bg-[#1A1A1A] dark:bg-[#F9F8F6]" />
                <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] text-[#6C6863] dark:text-[#9E9A93]">
                  EST. 2026
                </span>
              </div>

              {/* Headline with 2 words per line */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] lg:text-[3.2rem] xl:text-[3.6rem] font-normal leading-[1.02] tracking-tight text-[#1A1A1A] dark:text-[#F9F8F6]">
                Transform the<br />
                way your<br />
                silhouette speaks
              </h1>

              {/* Compact Narrative */}
              <p className="text-xs md:text-sm text-[#6C6863] dark:text-[#9E9A93] leading-relaxed max-w-md font-sans">
                An architectural atelier creating timeless heavyweight essentials from uncompromised natural fibers, French terry, and Japanese raw denim.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-0.5 sm:pt-1">
                <button
                  onClick={() => {
                    const el = document.getElementById('collection-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-gold-slide h-10 md:h-11 px-6 md:px-7 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium shadow-sm transition-all cursor-pointer"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Explore Collections</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('login')}
                  className="h-10 md:h-11 px-5 md:px-6 border border-[#1A1A1A] dark:border-[#F9F8F6] hover:bg-[#1A1A1A] hover:text-[#F9F8F6] dark:hover:bg-[#F9F8F6] dark:hover:text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium transition-colors text-[#1A1A1A] dark:text-[#F9F8F6]"
                >
                  Sign In
                </button>
              </div>

            </div>

            {/* Right Column: 5-Photo Editorial Mosaic (6 Cols) */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="w-full max-w-[480px] lg:max-w-[520px] xl:max-w-[560px] flex flex-col space-y-2 sm:space-y-2.5">
                
                {/* Top Row: 3 Images */}
                <div className="grid grid-cols-12 gap-2 sm:gap-2.5 h-[110px] sm:h-[125px] md:h-[135px]">
                  
                  {/* Top Left: Red Graphic Tee (Full Image View) (5 cols) */}
                  <div 
                    onClick={() => onQuickView(products.find(p => p.id === 'crimson-atelier-tee'))}
                    className="col-span-5 p-1 bg-white dark:bg-[#1A1A1A] border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 shadow-sm cursor-pointer group overflow-hidden"
                  >
                    <div className="w-full h-full overflow-hidden bg-white dark:bg-[#1A1A1A] flex items-center justify-center">
                      <img
                        src="/products/hero/hero_top_3.webp"
                        alt="Crimson Graphic Tee"
                        className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Top Middle: Black Typography Tee Back View (Full Fit) (3 cols) */}
                  <div 
                    onClick={() => onQuickView(products.find(p => p.id === 'nocturne-black-tee'))}
                    className="col-span-3 p-1 bg-white dark:bg-[#1A1A1A] border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 shadow-sm cursor-pointer group overflow-hidden"
                  >
                    <div className="w-full h-full overflow-hidden bg-white dark:bg-[#1A1A1A] flex items-center justify-center">
                      <img
                        src="/products/hero/hero_top_2.webp"
                        alt="Nocturne Carbon Tee Back"
                        className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Top Right: Colorblock Hooded Sweatshirt Model (Full Fit) (4 cols) */}
                  <div 
                    onClick={() => onQuickView(products.find(p => p.id === 'drop-shoulder-pullover'))}
                    className="col-span-4 p-1 bg-white dark:bg-[#1A1A1A] border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 shadow-sm cursor-pointer group overflow-hidden"
                  >
                    <div className="w-full h-full overflow-hidden bg-white dark:bg-[#1A1A1A] flex items-center justify-center">
                      <img
                        src="/products/hero/hero_top_1.webp"
                        alt="Hooded Colorblock Pullover"
                        className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                </div>

                {/* Bottom Row: 2 Images */}
                <div className="grid grid-cols-12 gap-2 sm:gap-2.5 h-[170px] sm:h-[195px] md:h-[220px]">
                  
                  {/* Bottom Left: Blue Structured Hoodie (Full Model View) (5 cols) */}
                  <div 
                    onClick={() => onQuickView(products.find(p => p.id === 'monolith-hoodie'))}
                    className="col-span-5 p-1 bg-white dark:bg-[#1A1A1A] border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 shadow-sm cursor-pointer group overflow-hidden"
                  >
                    <div className="w-full h-full overflow-hidden bg-white dark:bg-[#1A1A1A] flex items-center justify-center">
                      <img
                        src="/products/hoodie 1/7Ge1RzLc_2db4d4c6790b49d49145f9082fde3a93.webp"
                        alt="Monolith Structured Hoodie Model"
                        className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Bottom Right: Perfect Saffron Collar & Embroidery Close-Up (7 cols) */}
                  <div 
                    onClick={() => onQuickView(products.find(p => p.id === 'saffron-overshirt'))}
                    className="col-span-7 p-1 bg-white dark:bg-[#1A1A1A] border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 shadow-sm cursor-pointer group overflow-hidden"
                  >
                    <div className="w-full h-full overflow-hidden bg-[#EBE5DE]/30">
                      <img
                        src="/products/yellow shirt/85e030751dc94cf7bdddea6801f127d4.webp"
                        alt="Saffron Heavy Canvas & Sartorial Craft"
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 2. STAT COUNTER 4-COLUMN BAR (flex-shrink-0 with Top and Bottom Enclosing Lines) */}
        <div className="flex-shrink-0 relative z-10 border-y border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 bg-[#F9F8F6]/95 dark:bg-[#121212]/95 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/15 dark:divide-[#F9F8F6]/15">
            
            <div className="py-2.5 px-3 sm:py-3.5 sm:px-4 text-center space-y-0.5">
              <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] dark:text-[#F9F8F6] block font-light leading-none">
                480<span className="text-[#D4AF37] italic font-serif">k+</span>
              </span>
              <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.2em] uppercase text-[#6C6863] dark:text-[#9E9A93] block">
                Grams Peak Terry
              </span>
            </div>

            <div className="py-2.5 px-3 sm:py-3.5 sm:px-4 text-center space-y-0.5">
              <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] dark:text-[#F9F8F6] block font-light leading-none">
                99.99<span className="text-[#D4AF37] italic font-serif">%</span>
              </span>
              <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.2em] uppercase text-[#6C6863] dark:text-[#9E9A93] block">
                Organic GOTS Fiber
              </span>
            </div>

            <div className="py-2.5 px-3 sm:py-3.5 sm:px-4 text-center space-y-0.5">
              <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] dark:text-[#F9F8F6] block font-light leading-none">
                24<span className="text-[#D4AF37] italic font-serif">/</span>7
              </span>
              <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.2em] uppercase text-[#6C6863] dark:text-[#9E9A93] block">
                VIP Atelier Concierge
              </span>
            </div>

            <div className="py-2.5 px-3 sm:py-3.5 sm:px-4 text-center space-y-0.5">
              <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] dark:text-[#F9F8F6] block font-light leading-none">
                300<span className="text-[#D4AF37] italic font-serif">+</span>
              </span>
              <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.2em] uppercase text-[#6C6863] dark:text-[#9E9A93] block">
                Limited Edition Runs
              </span>
            </div>

          </div>
        </div>

      </section>

      <HangerCollection onQuickView={onQuickView} />

      {/* 3. CRAFTSMANSHIP & STORY SECTION */}
      <section id="philosophy-section" className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-x border-b border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.1] text-[#1A1A1A] dark:text-[#F9F8F6]">
              Experience the future of <span className="italic text-[#D4AF37]">architectural tailoring</span> with our unified, bespoke atelier.
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-4 text-[#6C6863] dark:text-[#9E9A93] text-sm md:text-base leading-relaxed">
            <p className="drop-cap">
              Rogue centralizes garment creation into one disciplined atelier, eliminating ephemeral trends to focus on sculptural form, structural drape, and enduring heirloom materials. By pairing Japanese shuttle looms with Italian tailoring, we empower your wardrobe with permanent presence.
            </p>
            <p className="text-xs sm:text-sm">
              Designed with permanence in mind, each piece adapts seamlessly to your silhouette, ensuring proportions never falter over decades of wear.
            </p>
          </div>

        </div>
      </section>

      {/* 4. PRODUCT CATALOG — SECTIONED SEQUENTIALLY */}
      <section id="collection-section" className="py-12 md:py-16 px-4 md:px-8 max-w-[1360px] mx-auto border-x border-b border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 space-y-12 md:space-y-16">
        
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-px bg-[#D4AF37]" />
              <span className="text-[9.5px] font-mono uppercase tracking-[0.25em] text-[#6C6863] dark:text-[#9E9A93]">
                CURATED ARCHIVE
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] dark:text-[#F9F8F6]">
              The *Atelier* Collection
            </h2>
            <p className="text-[11px] text-[#6C6863] dark:text-[#9E9A93] font-mono">
              {products.length} Silhouettes • Arranged by Garment Architecture
            </p>
          </div>
        </div>

        {/* 1. T-SHIRTS */}
        <div id="t-shirts-section" className="space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-[#D4AF37]">01</span>
              <h3 className="font-serif text-lg md:text-xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                Heavyweight T-Shirts & Essentials
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C6863] dark:text-[#9E9A93]">
              {tshirts.length} Pieces
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5 md:gap-4">
            {tshirts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p, idx) => onQuickView(p, idx)}
              />
            ))}
          </div>
        </div>

        {/* 2. HOODIES & SWEATSHIRTS */}
        <div id="hoodies-section" className="space-y-4 pt-4 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-[#D4AF37]">02</span>
              <h3 className="font-serif text-lg md:text-xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                Hoodies & Sweatshirts
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C6863] dark:text-[#9E9A93]">
              {hoodiesAndSweatshirts.length} Pieces
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5 md:gap-4">
            {hoodiesAndSweatshirts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p, idx) => onQuickView(p, idx)}
              />
            ))}
          </div>
        </div>

        {/* 3. SHIRTS */}
        <div id="shirts-section" className="space-y-4 pt-4 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-[#D4AF37]">03</span>
              <h3 className="font-serif text-lg md:text-xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                Shirts & Overshirts
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C6863] dark:text-[#9E9A93]">
              {shirts.length} Pieces
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5 md:gap-4">
            {shirts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p, idx) => onQuickView(p, idx)}
              />
            ))}
          </div>
        </div>

        {/* 4. ALL PANTS & TROUSERS */}
        <div id="pants-section" className="space-y-4 pt-4 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-[#D4AF37]">04</span>
              <h3 className="font-serif text-lg md:text-xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                Pants & Trousers
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C6863] dark:text-[#9E9A93]">
              {pants.length} Pieces
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5 md:gap-4">
            {pants.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p, idx) => onQuickView(p, idx)}
              />
            ))}
          </div>
        </div>

      </section>

      {/* 5. EDITORIAL LOOKBOOK SPREADS */}
      <section id="lookbook-section" className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-x border-b border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block mb-1">
              VISUAL CHRONICLES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] dark:text-[#F9F8F6]">
              The Editorial *Spreads*
            </h2>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            {editorialLookbooks.map((lb, idx) => (
              <button
                key={lb.id}
                onClick={() => setActiveLookbookIndex(idx)}
                className={`text-[10px] font-mono tracking-widest uppercase px-3.5 py-1.5 border transition-all ${
                  activeLookbookIndex === idx
                    ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#D4AF37]/10'
                    : 'border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[#6C6863] dark:text-[#9E9A93] hover:border-[#D4AF37]'
                }`}
              >
                Vol. 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#EBE5DE]/40 dark:bg-[#1A1A1A] shadow-lg border border-[#1A1A1A]/10">
            <img
              src={activeLookbook.image}
              alt={activeLookbook.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
              {activeLookbook.date}
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-[#1A1A1A] dark:text-[#F9F8F6]">
              {activeLookbook.title}
            </h3>
            <p className="text-xs md:text-sm text-[#6C6863] dark:text-[#9E9A93] leading-relaxed">
              {activeLookbook.subtitle}
            </p>

            <div className="p-3 bg-[#EBE5DE]/30 dark:bg-[#1A1A1A]/60 border-l-2 border-[#D4AF37] space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#6C6863] dark:text-[#9E9A93] block">
                Featured Silhouettes:
              </span>
              <ul className="text-xs space-y-0.5 text-[#1A1A1A] dark:text-[#F9F8F6] font-medium">
                {activeLookbook.itemsFeatured.map((item, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span className="text-[#D4AF37]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ATELIER SERVICES */}
      <section id="services-section" className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-x border-b border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15">
        <div className="space-y-2 mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block">
            CLIENT SERVICES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] dark:text-[#F9F8F6]">
            The *Standard* of Care
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {luxuryServices.map((srv) => (
            <div
              key={srv.id}
              className="p-6 border-t border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 bg-transparent hover:bg-white/40 dark:hover:bg-[#1A1A1A]/40 transition-all space-y-3"
            >
              <span className="font-serif text-2xl font-light text-[#D4AF37] block">
                {srv.number}
              </span>
              <h3 className="font-serif text-lg text-[#1A1A1A] dark:text-[#F9F8F6]">
                {srv.title}
              </h3>
              <p className="text-xs text-[#6C6863] dark:text-[#9E9A93] leading-relaxed">
                {srv.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PRESS & CRITICS */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-x border-b border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15">
        <div className="space-y-2 mb-10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block">
            CRITICAL ACCLAIM
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] dark:text-[#F9F8F6]">
            From the *Gazette*
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pressTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 border-l-2 border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 hover:border-[#D4AF37] bg-white/30 dark:bg-[#1A1A1A]/30 transition-all space-y-4"
            >
              <div className="flex space-x-1 text-[#D4AF37]">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                ))}
              </div>

              <p className="font-serif text-base italic text-[#1A1A1A] dark:text-[#F9F8F6] leading-snug">
                "{t.quote}"
              </p>

              <div className="flex items-center space-x-3 pt-3 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
                <div className="w-10 h-10 overflow-hidden border border-[#1A1A1A]/15 flex-shrink-0">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-semibold text-[#1A1A1A] dark:text-[#F9F8F6]">
                    {t.author}
                  </h4>
                  <span className="text-[9px] font-mono tracking-wider uppercase text-[#D4AF37] block">
                    {t.publication}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1100px] mx-auto">
        <div className="space-y-2 mb-10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block">
            ATELIER GUIDELINES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] dark:text-[#F9F8F6]">
            Frequently Asked *Inquiries*
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between group focus:outline-none"
                >
                  <span className="font-serif text-base md:text-lg text-[#1A1A1A] dark:text-[#F9F8F6] group-hover:text-[#D4AF37] pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 flex items-center justify-center border transition-all ${
                    isOpen 
                      ? 'border-[#D4AF37] text-[#D4AF37] rotate-90' 
                      : 'border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[#6C6863]'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#6C6863] dark:text-[#9E9A93] leading-relaxed border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
