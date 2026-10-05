import React, { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { Tooltip } from './Tooltip';
import { Heart, Check, Plus, AlertCircle } from 'lucide-react';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeRequiredPrompt, setSizeRequiredPrompt] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);

  const isWishlisted = wishlist.includes(product.id);
  const images = product.images || [];
  const currentImg = images[activeImageIdx] || images[0] || {};

  // Slowly showcase all item angles side by side on hover (no zoom)
  React.useEffect(() => {
    if (!isHovered || images.length <= 1) {
      setActiveImageIdx(0);
      return;
    }

    const timer = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % images.length);
    }, 1250);

    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  const handleSizeClick = (sz, e) => {
    e.stopPropagation();
    setSelectedSize(sz);
    setSizeRequiredPrompt(false);
  };

  const handleAddAction = (e) => {
    e.stopPropagation();
    if (isAdded) return;
    if (!selectedSize) {
      setSizeRequiredPrompt(true);
      setTimeout(() => {
        setSizeRequiredPrompt(false);
      }, 2500);
      return;
    }

    const rect = imageRef.current ? imageRef.current.getBoundingClientRect() : e.currentTarget.getBoundingClientRect();
    addToCart(product, selectedSize, 1, currentImg?.url, rect);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white dark:bg-[#161616] border border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-md w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIdx(0);
      }}
    >
      {/* Visual Image Area (Compact 3:4 Aspect Ratio, no zoom on hover, smooth angle showcase) */}
      <div 
        ref={imageRef}
        onClick={() => onQuickView(product, activeImageIdx)}
        className="relative aspect-[3/4] max-h-[220px] sm:max-h-[240px] md:max-h-[250px] w-full overflow-hidden bg-[#F2EFEB] dark:bg-[#1C1C1C] cursor-pointer flex items-center justify-center"
      >
        <img
          key={currentImg?.url}
          src={currentImg?.url}
          alt={`${product.name} angle`}
          className="w-full h-full object-cover object-center transition-opacity duration-300 animate-fadeIn"
          loading="lazy"
        />

        {/* Subtle angle indicator pills on hover when multi-image */}
        {isHovered && images.length > 1 && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full z-10 pointer-events-none">
            {images.map((_, i) => (
              <span 
                key={i} 
                className={`w-1 h-1 rounded-full transition-all ${
                  activeImageIdx === i ? 'bg-[#D4AF37] w-2' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Minimal Wishlist Heart Icon */}
        <div className="absolute top-1.5 right-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="p-1 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-sm border border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 hover:border-[#D4AF37] text-[#1A1A1A] dark:text-[#F9F8F6] transition-colors"
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-3 h-3 stroke-[1.5] ${isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Compact Product Meta & Size Selection */}
      <div className="p-2 sm:p-2.5 flex flex-col flex-grow justify-between space-y-1.5 sm:space-y-2">
        {/* Name and Price */}
        <div>
          <div className="flex items-baseline justify-between gap-1">
            <h3 
              onClick={() => onQuickView(product, 0)}
              className="font-serif text-[11.5px] sm:text-[12.5px] text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] cursor-pointer transition-colors line-clamp-1 font-normal tracking-wide"
            >
              {product.name}
            </h3>
            <span className="font-serif text-[11.5px] sm:text-[12.5px] font-semibold text-[#1A1A1A] dark:text-[#F9F8F6] whitespace-nowrap">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Sleek Size Selector Buttons */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[7.5px] sm:text-[8.5px] uppercase font-mono tracking-wider">
            <span className={sizeRequiredPrompt ? 'text-red-500 font-bold animate-pulse' : 'text-[#6C6863] dark:text-[#9E9A93]'}>
              {sizeRequiredPrompt ? 'Select size' : (selectedSize ? `Size: ${selectedSize}` : 'Size')}
            </span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            {(product.sizes || ['S', 'M', 'L', 'XL']).map((sz) => (
              <button
                key={sz}
                onClick={(e) => handleSizeClick(sz, e)}
                className={`h-5 sm:h-5.5 px-1.5 text-[8.5px] sm:text-[9px] font-mono tracking-wider transition-all duration-200 border ${
                  selectedSize === sz
                    ? 'bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#F9F8F6] font-bold shadow-sm'
                    : sizeRequiredPrompt
                    ? 'border-red-400 bg-red-50/50 dark:bg-red-950/20 text-[#1A1A1A] dark:text-[#F9F8F6]'
                    : 'border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[#1A1A1A] dark:text-[#F9F8F6] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Add to Bag Button */}
        <div>
          <button
            onClick={handleAddAction}
            className={`w-full h-6.5 sm:h-7 text-[8px] sm:text-[8.5px] uppercase tracking-[0.15em] font-medium transition-all duration-300 flex items-center justify-center space-x-1 ${
              isAdded
                ? 'bg-emerald-600 text-white border border-emerald-600'
                : selectedSize
                ? 'btn-gold-slide bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A]'
                : sizeRequiredPrompt
                ? 'bg-red-600 text-white border border-red-600 animate-shake'
                : 'bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:bg-[#D4AF37] hover:text-[#1A1A1A]'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center space-x-1">
              {isAdded ? (
                <>
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-2.5 h-2.5 stroke-[2]" />
                  <span>{selectedSize ? `Add (${selectedSize})` : 'Add to Bag'}</span>
                </>
              )}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
