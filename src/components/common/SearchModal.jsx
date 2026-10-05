import React, { useState, useEffect } from 'react';
import { products } from '../../data/products';
import { Search, X, Layers, ArrowRight } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle search
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['all', 'Outerwear', 'Shirts', 'T-Shirts', 'Trousers'];

  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesQuery = query === '' || 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-[#1A1A1A]/85 dark:bg-[#121212]/90 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#F9F8F6] dark:bg-[#1A1A1A] border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/20 shadow-2xl z-10 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-5 border-b border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#D4AF37] stroke-[1.5]" />
          <input
            type="text"
            placeholder="Search silhouettes, materials, SKU, or editorial volume..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm md:text-base font-serif text-[#1A1A1A] dark:text-[#F9F8F6] placeholder:font-serif placeholder:italic placeholder:text-[#6C6863] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#6C6863] hover:text-[#D4AF37] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-3 bg-[#EBE5DE]/30 dark:bg-[#121212]/60 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#6C6863] mr-2">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border-transparent'
                  : 'border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[#6C6863] dark:text-[#9E9A93] hover:border-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#6C6863] dark:text-[#9E9A93]">
              <p className="font-serif italic text-base">No pieces matched your inquiry.</p>
              <p className="text-xs font-mono tracking-wider mt-1">Refine your keyword search or browse by category.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="flex items-center justify-between p-3 border border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 hover:border-[#D4AF37] hover:bg-[#EBE5DE]/20 dark:hover:bg-[#121212]/50 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-16 bg-[#EBE5DE]/30 overflow-hidden border border-[#1A1A1A]/10 flex-shrink-0">
                    <img
                      src={item.images[0]?.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-[9px] font-mono tracking-[0.2em] uppercase text-[#6C6863] dark:text-[#9E9A93]">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span className="text-[#D4AF37]">{item.images.length} Perspectives</span>
                    </div>
                    <h4 className="font-serif text-base text-[#1A1A1A] dark:text-[#F9F8F6] group-hover:text-[#D4AF37] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#6C6863] dark:text-[#9E9A93] italic font-serif">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-right">
                  <div>
                    <span className="font-serif text-base font-semibold text-[#1A1A1A] dark:text-[#F9F8F6] block">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#6C6863] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer meta */}
        <div className="p-3 bg-[#EBE5DE]/20 dark:bg-[#121212]/80 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-[#6C6863] dark:text-[#9E9A93]">
          <span>Press ESC to dismiss</span>
          <span>ROGUE Luxury Search Engine</span>
        </div>

      </div>
    </div>
  );
};
