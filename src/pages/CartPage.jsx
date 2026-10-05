import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Package, 
  Sparkles,
  CreditCard,
  Truck,
  Gift
} from 'lucide-react';

export const CartPage = ({ onNavigate }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    shippingFee, 
    estimatedTax, 
    total,
    clearCart,
    totalItemsCount 
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [giftWrap, setGiftWrap] = useState(true);
  
  // Checkout flow state
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi'
  });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'ROGUEVIP' || clean === 'ATELIER') {
      setDiscountApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid privilege code. Try "ROGUEVIP"');
    }
  };

  const finalSubtotal = discountApplied ? subtotal * 0.85 : subtotal;
  const finalTotal = finalSubtotal + shippingFee + (discountApplied ? Math.round(finalSubtotal * 0.12) : estimatedTax);

  const handleStartCheckout = () => {
    setCheckoutStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderNo = `ROG-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderNumber(randomOrderNo);
      setCheckoutStep('success');
      clearCart();

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#1A1A1A', '#F9F8F6', '#EBE5DE']
        });
      } catch (err) {
        console.error(err);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto animate-fadeIn">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 gap-4">
        <div>
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#6C6863] dark:text-[#9E9A93] hover:text-[#D4AF37] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Collection</span>
          </button>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] dark:text-[#F9F8F6]">
            {checkoutStep === 'success' 
              ? 'Acquisition Confirmed' 
              : checkoutStep === 'checkout' 
              ? 'Secure Atelier Checkout' 
              : 'Atelier Shopping Bag'}
          </h1>
        </div>

        {checkoutStep !== 'success' && (
          <div className="flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-[#6C6863] dark:text-[#9E9A93]">
            <span className={checkoutStep === 'cart' ? 'text-[#D4AF37] font-bold' : ''}>01. Bag Review</span>
            <span>→</span>
            <span className={checkoutStep === 'checkout' ? 'text-[#D4AF37] font-bold' : ''}>02. Delivery & Payment</span>
          </div>
        )}
      </div>

      {/* SUCCESS SCREEN */}
      {checkoutStep === 'success' && (
        <div className="py-16 max-w-2xl mx-auto text-center space-y-6 border border-[#D4AF37]/40 bg-white/60 dark:bg-[#161616] p-8 md:p-12 shadow-2xl">
          <div className="w-16 h-16 mx-auto border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
            <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37]">
              Order Confirmed • {orderNumber}
            </span>
            <h2 className="font-serif text-3xl text-[#1A1A1A] dark:text-[#F9F8F6]">
              Thank You for Acquiring with Rogue
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#6C6863] dark:text-[#9E9A93] leading-relaxed max-w-md mx-auto">
            Your bespoke pieces have entered preparation in our atelier. They will be hand-inspected, wrapped in archival Japanese mulberry gift boxes, and dispatched via carbon-neutral express courier.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('landing')}
              className="btn-gold-slide h-12 px-8 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium shadow-md"
            >
              <span className="relative z-10">Explore Further Pieces</span>
            </button>
          </div>
        </div>
      )}

      {/* EMPTY BAG STATE */}
      {checkoutStep === 'cart' && cart.length === 0 && (
        <div className="py-24 max-w-xl mx-auto text-center space-y-5">
          <div className="w-16 h-16 mx-auto border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 flex items-center justify-center text-[#6C6863]">
            <ShoppingBag className="w-8 h-8 stroke-[1]" />
          </div>
          <h2 className="font-serif text-2xl text-[#1A1A1A] dark:text-[#F9F8F6]">
            Your Atelier Bag is Empty
          </h2>
          <p className="text-xs text-[#6C6863] dark:text-[#9E9A93] max-w-sm mx-auto">
            Explore our architectural silhouettes, 480GSM French terry essentials, and selvedge denim archive.
          </p>
          <button
            onClick={() => onNavigate('landing')}
            className="btn-gold-slide px-8 py-3 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium"
          >
            <span className="relative z-10">Explore Collection</span>
          </button>
        </div>
      )}

      {/* MAIN CART / CHECKOUT CONTENT */}
      {checkoutStep !== 'success' && cart.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Items List or Checkout Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {checkoutStep === 'cart' ? (
              <>
                {/* Free Shipping Alert Bar */}
                <div className="bg-[#EBE5DE]/40 dark:bg-[#1C1C1C] p-4 border-l-2 border-[#D4AF37]">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-wider mb-2">
                    <span className="text-[#1A1A1A] dark:text-[#F9F8F6]">
                      {subtotal >= 5000 
                        ? 'VIP Express All-India Courier Unlocked' 
                        : `Add ₹${(5000 - subtotal).toLocaleString('en-IN')} for Free VIP Courier`}
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
                <div className="divide-y divide-[#1A1A1A]/10 dark:divide-[#F9F8F6]/10 border-y border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
                  {cart.map((item) => (
                    <div 
                      key={`${item.id}-${item.size}`}
                      className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      {/* Image & Info */}
                      <div className="flex space-x-4">
                        <div className="w-24 h-30 bg-[#EBE5DE]/30 dark:bg-[#1C1C1C] border border-[#1A1A1A]/10 overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col justify-between py-0.5">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#6C6863] dark:text-[#9E9A93]">
                              {item.category} • SKU: {item.sku}
                            </span>
                            <h3 className="font-serif text-base text-[#1A1A1A] dark:text-[#F9F8F6]">
                              {item.name}
                            </h3>
                            <div className="text-xs font-mono text-[#6C6863] dark:text-[#9E9A93]">
                              Size: <strong className="text-[#1A1A1A] dark:text-[#F9F8F6]">{item.size}</strong>
                            </div>
                          </div>

                          <span className="font-serif text-sm font-semibold text-[#1A1A1A] dark:text-[#F9F8F6] pt-2 sm:pt-0">
                            ₹{item.price.toLocaleString('en-IN')} <span className="text-[10px] text-[#6C6863] font-mono font-normal">each</span>
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Total & Remove */}
                      <div className="flex items-center justify-between sm:justify-end sm:space-x-8 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1A1A1A]/5">
                        <div className="flex items-center border border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, -1)}
                            className="p-1.5 hover:bg-[#D4AF37] hover:text-[#1A1A1A] text-[#1A1A1A] dark:text-[#F9F8F6] transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 text-xs font-mono text-[#1A1A1A] dark:text-[#F9F8F6]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, 1)}
                            className="p-1.5 hover:bg-[#D4AF37] hover:text-[#1A1A1A] text-[#1A1A1A] dark:text-[#F9F8F6] transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-serif text-base font-semibold text-[#1A1A1A] dark:text-[#F9F8F6] min-w-[80px] text-right">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="p-1.5 text-[#6C6863] hover:text-red-500 transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Gift Wrap & Services Note */}
                <div className="p-4 border border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 bg-white/40 dark:bg-[#161616] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Gift className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <h4 className="font-serif text-sm text-[#1A1A1A] dark:text-[#F9F8F6]">
                        Complimentary Japanese Mulberry Gift Box
                      </h4>
                      <p className="text-xs text-[#6C6863] dark:text-[#9E9A93]">
                        Archival box, wax seal stamp, and custom ribbon packaging included.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                  />
                </div>
              </>
            ) : (
              /* CHECKOUT FORM */
              <form onSubmit={handleCompleteOrder} className="space-y-6">
                <div className="p-6 border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 bg-white/60 dark:bg-[#161616] space-y-4">
                  <h3 className="font-serif text-xl text-[#1A1A1A] dark:text-[#F9F8F6] flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-[#D4AF37]" />
                    <span>1. Shipping & Atelier Delivery Address</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={shippingDetails.fullName}
                      onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
                      className="bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Contact Phone Number *"
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                      className="bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address for Dispatch Tracking *"
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                      className="md:col-span-2 bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Street Address / Suite / Residence *"
                      value={shippingDetails.address}
                      onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                      className="md:col-span-2 bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="City *"
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                      className="bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="PIN Code *"
                      value={shippingDetails.pincode}
                      onChange={(e) => setShippingDetails({...shippingDetails, pincode: e.target.value})}
                      className="bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="p-6 border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 bg-white/60 dark:bg-[#161616] space-y-4">
                  <h3 className="font-serif text-xl text-[#1A1A1A] dark:text-[#F9F8F6] flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                    <span>2. Select Payment Gateway</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { key: 'upi', label: 'Instant UPI (GPay / PhonePe)' },
                      { key: 'card', label: 'Credit / Debit Card' },
                      { key: 'cod', label: 'Cash on Delivery' }
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.key}
                        onClick={() => setShippingDetails({...shippingDetails, paymentMethod: m.key})}
                        className={`p-3 text-xs font-mono tracking-wider border transition-all text-left ${
                          shippingDetails.paymentMethod === m.key
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#1A1A1A] dark:text-[#F9F8F6] font-bold'
                            : 'border-[#1A1A1A]/20 dark:border-[#F9F8F6]/20 text-[#6C6863]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="px-6 py-3 border border-[#1A1A1A] dark:border-[#F9F8F6] text-xs uppercase tracking-[0.2em]"
                  >
                    Back to Review
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-gold-slide flex-grow h-12 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium shadow-xl"
                  >
                    <span className="relative z-10">
                      {isProcessing ? 'Securing Acquisition...' : `Complete Acquisition • ₹${finalTotal.toLocaleString('en-IN')}`}
                    </span>
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* RIGHT COLUMN: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-[#EBE5DE]/30 dark:bg-[#161616] p-6 md:p-8 border border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 space-y-6">
            <h3 className="font-serif text-xl text-[#1A1A1A] dark:text-[#F9F8F6] pb-3 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
              Acquisition Summary
            </h3>

            {/* Promo Code */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="VIP Privilege Code (Try 'ROGUEVIP')"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-transparent border-b border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 px-2 py-1.5 text-xs text-[#1A1A1A] dark:text-[#F9F8F6] placeholder:font-serif placeholder:italic focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-mono border border-[#1A1A1A]/30 dark:border-[#F9F8F6]/30 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block">
                  ✓ VIP 15% Atelier Privilege Applied
                </span>
              )}
              {promoError && (
                <span className="text-[10px] font-mono text-red-500 block">
                  {promoError}
                </span>
              )}
            </form>

            {/* Line items calculation */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-[#6C6863] dark:text-[#9E9A93]">
                <span>Subtotal ({totalItemsCount} pieces)</span>
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

              <div className="flex justify-between text-base font-serif font-bold text-[#1A1A1A] dark:text-[#F9F8F6] pt-3 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10">
                <span>Grand Total</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTA in Bag Review state */}
            {checkoutStep === 'cart' && (
              <button
                onClick={handleStartCheckout}
                className="btn-gold-slide w-full h-12 bg-[#1A1A1A] dark:bg-[#F9F8F6] text-[#F9F8F6] dark:text-[#1A1A1A] hover:text-[#1A1A1A] text-xs uppercase tracking-[0.25em] font-medium shadow-xl transition-all"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            )}

            {/* Security Guarantee */}
            <div className="pt-2 flex items-center justify-center space-x-2 text-[10px] text-[#6C6863] dark:text-[#9E9A93] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>256-Bit Encrypted Atelier Gateway</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
