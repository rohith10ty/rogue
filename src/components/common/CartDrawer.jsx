import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Tooltip } from './Tooltip';
import confetti from 'canvas-confetti';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    shippingFee, 
    estimatedTax, 
    total,
    clearCart,
    totalItemsCount,
    lastAddedKey
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ROGUEVIP' || promoCode.trim().toUpperCase() === 'ATELIER') {
      setDiscountApplied(true);
    }
  };

  const finalSubtotal = discountApplied ? subtotal * 0.85 : subtotal;
  const finalTotal = finalSubtotal + shippingFee + (discountApplied ? Math.round(finalSubtotal * 0.12) : estimatedTax);

  const handleCompleteCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      
      // Trigger Luxury Gold Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#1A1A1A', '#F9F8F6', '#EBE5DE']
        });
      } catch (err) {
        console.error(err);
      }
    }, 1500);
  };

  const handleResetAfterOrder = () => {
    clearCart();
    setOrderComplete(false);
    setIsCartOpen(false);
    setDiscountApplied(false);
    setPromoCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1A1A1A]/70 dark:bg-[#121212]/80 backdrop-blur-sm transition-opacity"
        onClick={() => !orderComplete && setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F8F6] dark:bg-[#1A1A1A] border-l border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 shadow-2xl flex flex-col justify-between animate-slideLeft">
          
          {/* Header */}
          <div className="p-6 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37] stroke-[1.5]" />
              <h2 className="font-serif text-xl tracking-[0.1em] text-[#1A1A1A] dark:text-[#F9F8F6]">
                Atelier Shopping Bag
              </h2>
              <span className="text-[10px] font-mono tracking-widest text-[#6C6863] dark:text-[#9E9A93]">
                [{totalItemsCount}]
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content with Lenis Scroll Prevention */}
          <div 
            className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 overscroll-contain"
            data-lenis-prevent
          >
            {orderComplete ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                  Order Confirmed
                </h3>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                  Order No. ROG-{Math.floor(1000 + Math.random() * 9000)}
                </p>
                <p className="text-xs text-[#6C6863] dark:text-[#9E9A93] max-w-xs leading-relaxed">
                  Thank you for acquiring from Rogue Atelier. Your bespoke garments are being inspected and prepared in our archival Japanese mulberry gift box.
                </p>
                <div className="pt-4 w-full">
                  <button
                    onClick={handleResetAfterOrder}
                    className="btn-gold-slide w-full h-12 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium"
                  >
                    <span className="relative z-10">Return to Atelier</span>
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#6C6863]/40 stroke-[1]" />
                <h3 className="font-serif text-xl text-[#1A1A1A] dark:text-[#F9F8F6]">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#6C6863] dark:text-[#9E9A93] max-w-xs">
                  Explore our curated architectural collection and select your signature pieces.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 border border-[#1A1A1A] dark:border-[#F9F8F6] text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress */}
                <div className="bg-[#EBE5DE]/40 dark:bg-[#121212]/60 p-3 border-l-2 border-[#D4AF37]">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider mb-1">
                    <span className="text-[#1A1A1A] dark:text-[#F9F8F6]">
                      {subtotal >= 5000 
                        ? 'VIP Global Express Courier Unlocked' 
                        : `Add ₹${(5000 - subtotal).toLocaleString('en-IN')} for Complimentary Courier`}
                    </span>
                    <span className="text-[#D4AF37]">{Math.min(100, Math.round((subtotal / 5000) * 100))}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#1A1A1A]/10 dark:bg-[#F9F8F6]/10 overflow-hidden">
                    <div 
                      className="h-full bg-[#D4AF37] transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {cart.map((item) => {
                    const isJustAdded = lastAddedKey === `${item.id}-${item.size}`;
                    return (
                      <div 
                        key={`${item.id}-${item.size}`}
                        className={`flex space-x-4 p-3 bg-transparent border transition-all duration-500 relative group ${
                          isJustAdded
                            ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50 bg-[#D4AF37]/5'
                            : 'border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-24 flex-shrink-0 bg-[#EBE5DE]/30 dark:bg-[#1C1C1C] overflow-hidden border border-[#1A1A1A]/10">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-sm text-[#1A1A1A] dark:text-[#F9F8F6] line-clamp-1 pr-2">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-[#6C6863] hover:text-red-500 transition-colors p-1"
                                aria-label="Remove Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-[10px] font-mono tracking-wider text-[#6C6863] dark:text-[#9E9A93] space-x-2 mt-0.5">
                              <span>SIZE: <strong className="text-[#1A1A1A] dark:text-[#F9F8F6]">{item.size}</strong></span>
                              <span>•</span>
                              <span>SKU: {item.sku}</span>
                            </div>
                          </div>

                          {/* Price & Quantity Controls */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, -1)}
                                className="p-1 hover:bg-[#D4AF37] hover:text-[#1A1A1A] text-[#1A1A1A] dark:text-[#F9F8F6] transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-mono text-[#1A1A1A] dark:text-[#F9F8F6]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, 1)}
                                className="p-1 hover:bg-[#D4AF37] hover:text-[#1A1A1A] text-[#1A1A1A] dark:text-[#F9F8F6] transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-serif text-sm font-semibold text-[#1A1A1A] dark:text-[#F9F8F6]">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="VIP Atelier Code (Try 'ROGUEVIP')"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-2 py-1.5 text-xs text-[#1A1A1A] dark:text-[#F9F8F6] placeholder:font-serif placeholder:italic placeholder:text-[#6C6863] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 text-[10px] uppercase tracking-wider font-mono border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {discountApplied && (
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                      ✓ VIP 15% Atelier Privilege Applied
                    </span>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {!orderComplete && cart.length > 0 && (
            <div className="p-6 bg-[#EBE5DE]/20 dark:bg-[#121212]/90 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6C6863] dark:text-[#9E9A93]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#1A1A1A] dark:text-[#F9F8F6]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-mono">
                    <span>VIP Privilege (15%)</span>
                    <span>-₹{Math.round(subtotal * 0.15).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6C6863] dark:text-[#9E9A93]">
                  <span>VIP Courier (All India Express)</span>
                  <span className="font-mono text-[#1A1A1A] dark:text-[#F9F8F6]">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : `₹${shippingFee.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#6C6863] dark:text-[#9E9A93]">
                  <span>Estimated GST (12%)</span>
                  <span className="font-mono text-[#1A1A1A] dark:text-[#F9F8F6]">₹{estimatedTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#1A1A1A] dark:text-[#F9F8F6] pt-2 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
                  <span>Grand Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleCompleteCheckout}
                disabled={isCheckingOut}
                className="btn-gold-slide w-full h-12 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A] text-xs uppercase tracking-[0.25em] font-medium shadow-lg transition-colors duration-500"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isCheckingOut ? (
                    <span>Securing Atelier Acquisition...</span>
                  ) : (
                    <>
                      <span>Proceed to Secure Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#6C6863] dark:text-[#9E9A93] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>256-Bit Encrypted Atelier Gateway</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
