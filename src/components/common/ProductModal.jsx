import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { Tooltip } from './Tooltip';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Layers,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';

export const ProductModal = ({ product, initialImageIndex = 0, isOpen, onClose }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(initialImageIndex);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const thumbnailsRef = useRef(null);
  const modalImageRef = useRef(null);

  useEffect(() => {
    setSelectedImageIndex(initialImageIndex);
    setSelectedSize(null);
    setSizeError(false);
    setIsAdded(false);
    setQuantity(1);
  }, [initialImageIndex, product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, selectedImageIndex, product]);

  if (!isOpen || !product) return null;

  const imagesList = product.images || [];
  const totalImages = imagesList.length;
  const currentImage = imagesList[selectedImageIndex] || imagesList[0];
  const isWishlisted = wishlist.includes(product.id);

  const handlePrevImage = () => {
    if (totalImages <= 1) return;
    const newIdx = (selectedImageIndex - 1 + totalImages) % totalImages;
    setSelectedImageIndex(newIdx);
    scrollToThumbnail(newIdx);
  };

  const handleNextImage = () => {
    if (totalImages <= 1) return;
    const newIdx = (selectedImageIndex + 1) % totalImages;
    setSelectedImageIndex(newIdx);
    scrollToThumbnail(newIdx);
  };

  const scrollToThumbnail = (idx) => {
    if (thumbnailsRef.current) {
      const child = thumbnailsRef.current.children[idx];
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const scrollThumbnailsHorizontal = (direction) => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollBy({
        left: direction === 'left' ? -140 : 140,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (e) => {
    if (isAdded) return;
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    const rect = modalImageRef.current 
      ? modalImageRef.current.getBoundingClientRect() 
      : e?.currentTarget?.getBoundingClientRect();

    addToCart(product, selectedSize, quantity, currentImage?.url, rect);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-[#1A1A1A]/80 dark:bg-[#121212]/90 backdrop-blur-md animate-fadeIn">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#F9F8F6] dark:bg-[#1A1A1A] border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/20 shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 overflow-y-auto md:overflow-hidden pb-6 md:pb-0">
        
        {/* Dedicated Clear Close Button (High z-index, positioned with ample clearance) */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-40 p-2 text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all focus:outline-none bg-[#F9F8F6] dark:bg-[#1A1A1A] shadow-md border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Left Column: Visual Gallery & Interactive Angle Navigation (6 Cols) */}
        <div className="md:col-span-6 bg-[#EBE5DE]/30 dark:bg-[#121212]/80 p-4 md:p-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
          
          {/* Main Visual Display with Left/Right Carousel Arrows */}
          <div 
            ref={modalImageRef}
            className="relative w-full aspect-[4/5] max-h-[350px] md:max-h-[370px] overflow-hidden border border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 shadow-sm bg-white dark:bg-[#151515] flex items-center justify-center p-2 group"
          >
            <img
              src={currentImage?.url}
              alt={`${product.name} - ${currentImage?.label || ''}`}
              className="w-full h-full object-contain object-center transition-all duration-300"
            />

            {/* Perspective Label Badge */}
            <div className="absolute top-2.5 left-2.5 bg-[#1A1A1A]/90 dark:bg-[#121212]/95 backdrop-blur-sm text-[#F9F8F6] text-[9px] uppercase font-mono tracking-[0.2em] px-2.5 py-0.5 border border-[#D4AF37]/40 flex items-center space-x-1.5 z-10">
              <Layers className="w-2.5 h-2.5 text-[#D4AF37]" />
              <span>{currentImage?.label || `Angle ${selectedImageIndex + 1}/${totalImages}`}</span>
            </div>

            {/* Carousel Arrows on Main Image */}
            {totalImages > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-[#1A1A1A]/90 border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#1A1A1A] dark:text-[#F9F8F6] flex items-center justify-center transition-all shadow-md opacity-80 group-hover:opacity-100 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-[#1A1A1A]/90 border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#1A1A1A] dark:text-[#F9F8F6] flex items-center justify-center transition-all shadow-md opacity-80 group-hover:opacity-100 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Row with Horizontal Scroll Arrows */}
          <div className="mt-3 pt-3 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
            <div className="flex items-center justify-between text-[9px] uppercase font-mono tracking-[0.2em] text-[#6C6863] dark:text-[#9E9A93] mb-2">
              <span>All Angles ({totalImages})</span>
              <span className="text-[#D4AF37]">Click or use arrows</span>
            </div>

            <div className="relative flex items-center">
              {/* Left Arrow for Thumbnails */}
              {totalImages > 4 && (
                <button
                  onClick={() => scrollThumbnailsHorizontal('left')}
                  className="flex-shrink-0 mr-1.5 w-6 h-14 bg-white/90 dark:bg-[#1A1A1A]/90 border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#1A1A1A] dark:text-[#F9F8F6] flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Scroll thumbnails left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Thumbnails Container */}
              <div 
                ref={thumbnailsRef}
                className="flex items-center space-x-2 overflow-x-auto py-1 px-0.5 scrollbar-none flex-grow scroll-smooth"
              >
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      scrollToThumbnail(idx);
                    }}
                    className={`flex-shrink-0 w-13 h-15 sm:w-14 sm:h-16 border transition-all duration-200 overflow-hidden bg-white dark:bg-[#151515] p-1 flex items-center justify-center ${
                      selectedImageIndex === idx
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37] scale-105 shadow-sm'
                        : 'border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`View angle ${idx + 1}`}
                  >
                    <img
                      src={img.url}
                      alt={img.label || `Angle ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Right Arrow for Thumbnails */}
              {totalImages > 4 && (
                <button
                  onClick={() => scrollThumbnailsHorizontal('right')}
                  className="flex-shrink-0 ml-1.5 w-6 h-14 bg-white/90 dark:bg-[#1A1A1A]/90 border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#1A1A1A] dark:text-[#F9F8F6] flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Scroll thumbnails right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Product Architecture & Purchase Options (6 Cols) */}
        <div className="md:col-span-6 p-5 md:p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-3.5">
            
            {/* Header Meta (Padded right with pr-14 so SKU is NEVER behind the close button) */}
            <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.25em] uppercase text-[#6C6863] dark:text-[#9E9A93] pr-14">
              <span>{product.category}</span>
              <span className="font-semibold text-[#1A1A1A] dark:text-[#F9F8F6]">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-xl md:text-2xl font-normal leading-tight text-[#1A1A1A] dark:text-[#F9F8F6] pr-10">
              {product.name}
            </h2>

            {/* Price & Stock Status */}
            <div className="flex items-baseline justify-between py-1 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
              <div className="flex items-baseline space-x-1.5">
                <span className="font-serif text-xl font-bold text-[#1A1A1A] dark:text-[#F9F8F6]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#D4AF37]">
                  (All Taxes Incl.)
                </span>
              </div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                <span>{product.stock} Units In Stock</span>
              </span>
            </div>

            {/* Tagline / Description */}
            <p className="text-xs leading-relaxed text-[#6C6863] dark:text-[#9E9A93]">
              {product.description}
            </p>

            {/* Size Selector (No default pre-selected size) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[9px] uppercase font-mono tracking-[0.2em]">
                <span className={`${sizeError ? 'text-red-500 font-bold' : 'text-[#1A1A1A] dark:text-[#F9F8F6]'}`}>
                  {selectedSize ? `Size Selected: ${selectedSize}` : 'Select Size (Required)'}
                </span>
                <span className="text-[#D4AF37] underline cursor-pointer">Size Guide</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                {product.sizes?.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setSelectedSize(sz);
                      setSizeError(false);
                    }}
                    className={`h-9 text-xs font-mono tracking-wider border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-[#F9F8F6] font-bold shadow-sm'
                        : sizeError
                        ? 'border-red-400/80 text-[#1A1A1A] dark:text-[#F9F8F6] hover:border-[#D4AF37]'
                        : 'border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[#1A1A1A] dark:text-[#F9F8F6] hover:border-[#D4AF37]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Contextual Size Warning */}
              {sizeError && (
                <div className="flex items-center space-x-1.5 text-[10px] text-red-500 font-mono tracking-wider pt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  <span>Please choose your desired size before adding to bag</span>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-3 pt-1">
              <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#6C6863] dark:text-[#9E9A93]">
                Quantity
              </span>
              <div className="flex items-center border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-xs text-[#1A1A1A] dark:text-[#F9F8F6] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-mono text-[#1A1A1A] dark:text-[#F9F8F6]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-xs text-[#1A1A1A] dark:text-[#F9F8F6] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddToCart}
                className={`flex-grow h-11 text-[10px] uppercase tracking-[0.2em] font-medium shadow-md transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isAdded
                    ? 'bg-emerald-600 text-white scale-102 shadow-emerald-500/20'
                    : selectedSize
                    ? 'btn-gold-slide bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A]'
                    : 'bg-[#1A1A1A]/80 dark:bg-[#F9F8F6]/80 text-[#F9F8F6] dark:text-[#1A1A1A]'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>
                        {selectedSize ? `Add to Bag • ₹${(product.price * quantity).toLocaleString('en-IN')}` : 'Select Size to Add'}
                      </span>
                    </>
                  )}
                </span>
              </button>

              <Tooltip content={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"} position="top">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="h-11 w-11 border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 hover:border-[#D4AF37] flex items-center justify-center text-[#1A1A1A] dark:text-[#F9F8F6] transition-colors"
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                </button>
              </Tooltip>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
