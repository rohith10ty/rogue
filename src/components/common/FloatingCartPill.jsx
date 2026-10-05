import React, { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';

export const FloatingCartPill = ({ onNavigate }) => {
  const { totalItemsCount, subtotal, cart } = useCart();
  const pillRef = useRef(null);
  const prevCount = useRef(totalItemsCount);

  useEffect(() => {
    if (pillRef.current) {
      if (prevCount.current === 0 && totalItemsCount > 0) {
        // Smooth spring entrance from the right viewport
        gsap.fromTo(pillRef.current, 
          { x: 220, opacity: 0, scale: 0.8 }, 
          { x: 0, opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.5)" }
        );
      } else if (totalItemsCount === 0) {
        gsap.to(pillRef.current, {
          x: 220,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in"
        });
      }
      prevCount.current = totalItemsCount;
    }
  }, [totalItemsCount]);

  if (totalItemsCount === 0) return null;

  const recentItems = cart.slice(-3);

  return (
    <div 
      id="floating-cart-pill"
      ref={pillRef}
      className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-[90] cursor-pointer"
      style={{ willChange: 'transform', bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))' }}
    >
      <button
        onClick={() => onNavigate('cart')}
        style={{ borderRadius: '9999px' }}
        className="group relative flex items-center space-x-3.5 bg-[#0e0e0e] text-white px-3.5 py-2 border border-white/20 shadow-2xl hover:border-[#D4AF37] hover:scale-105 transition-all duration-300 cursor-pointer select-none"
        aria-label="View Cart"
      >
        {/* Left Side: Circular Avatar Slot (Where garment flies into) */}
        <div 
          id="pill-thumbnail-slot"
          className="flex items-center -space-x-2.5 flex-shrink-0"
        >
          {recentItems.length > 0 ? (
            recentItems.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                style={{ borderRadius: '9999px' }}
                className="w-7 h-7 overflow-hidden border border-white/40 bg-white p-0.5 shadow-sm flex items-center justify-center relative z-10"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))
          ) : (
            <div 
              style={{ borderRadius: '9999px' }}
              className="w-7 h-7 bg-white/15 flex items-center justify-center text-white"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Center: Title & Count / Subtotal */}
        <div className="flex flex-col items-start pr-1 text-left">
          <span className="text-[12px] font-medium text-white leading-tight tracking-tight">
            View Bag
          </span>
          <span className="text-[10px] text-white/60 font-mono tracking-normal leading-tight">
            {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} • <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
          </span>
        </div>

        {/* Right Side: Circular Chevron Button */}
        <div 
          style={{ borderRadius: '9999px' }}
          className="w-6 h-6 bg-white/15 group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center text-white/90 transition-colors flex-shrink-0"
        >
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </button>
    </div>
  );
};
