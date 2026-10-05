import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export const FlyToCartOverlay = () => {
  const [flyingItems, setFlyingItems] = useState([]);

  const handleCompleteFlight = useCallback((id) => {
    setFlyingItems(prev => prev.filter(item => item.id !== id));

    // Elastic spring bounce on the pill upon arrival (squash & stretch)
    const pillEl = document.getElementById('floating-cart-pill');
    if (pillEl) {
      gsap.timeline()
        .to(pillEl, { scaleX: 1.16, scaleY: 0.86, duration: 0.12, ease: "power2.out" })
        .to(pillEl, { scaleX: 0.93, scaleY: 1.09, duration: 0.16, ease: "power1.inOut" })
        .to(pillEl, { scaleX: 1, scaleY: 1, duration: 0.45, ease: "elastic.out(1.2, 0.4)" });
    }

    // Bump navbar bag as well
    const navbarEl = document.getElementById('navbar-bag-button');
    if (navbarEl) {
      navbarEl.classList.remove('animate-bag-bump');
      void navbarEl.offsetWidth;
      navbarEl.classList.add('animate-bag-bump');
      setTimeout(() => navbarEl?.classList.remove('animate-bag-bump'), 500);
    }
  }, []);

  useEffect(() => {
    let lastEventTime = 0;
    let lastEventKey = '';

    const handleFlyEvent = (e) => {
      const { image, startRect } = e.detail || {};
      if (!image) return;

      const now = Date.now();
      
      const sWidth = Number(startRect?.width) > 0 ? Math.min(Number(startRect.width), 220) : 140;
      const sHeight = Number(startRect?.height) > 0 ? Math.min(Number(startRect.height), 280) : Math.round(sWidth * (4 / 3));

      let startX = Number.isFinite(Number(startRect?.left)) ? Number(startRect.left) : (window.innerWidth / 2 - sWidth / 2);
      let startY = Number.isFinite(Number(startRect?.top)) ? Number(startRect.top) : (window.innerHeight / 2 - sHeight / 2);

      // Debounce duplicate triggers within 250ms
      const eventKey = `${image}-${Math.round(startX)}-${Math.round(startY)}`;
      if (now - lastEventTime < 250 && lastEventKey === eventKey) {
        return;
      }
      lastEventTime = now;
      lastEventKey = eventKey;

      // Clean resting coordinate of the floating pill avatar slot at bottom-right
      let targetX = window.innerWidth - 150;
      let targetY = window.innerHeight - 50;

      const slotEl = document.getElementById('pill-thumbnail-slot');
      if (slotEl) {
        const slotRect = slotEl.getBoundingClientRect();
        if (slotRect.left > 0 && slotRect.left < window.innerWidth && slotRect.width > 0) {
          targetX = slotRect.left + slotRect.width / 2;
          targetY = slotRect.top + slotRect.height / 2;
        }
      }

      const id = Date.now() + Math.random();

      setFlyingItems(prev => [...prev, {
        id,
        image,
        startX,
        startY,
        sWidth,
        sHeight,
        targetX,
        targetY
      }]);
    };

    window.addEventListener('rogue-fly-to-cart', handleFlyEvent);
    return () => window.removeEventListener('rogue-fly-to-cart', handleFlyEvent);
  }, []);

  if (flyingItems.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {flyingItems.map(item => (
        <GSAPFlyingItem 
          key={item.id} 
          item={item} 
          onComplete={handleCompleteFlight} 
        />
      ))}
    </div>
  );
};

const GSAPFlyingItem = ({ item, onComplete }) => {
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;
    const el = elRef.current;
    const deltaX = item.targetX - (item.startX + item.sWidth / 2);
    const deltaY = item.targetY - (item.startY + item.sHeight / 2);

    // Initial state: keeps 3:4 image shape with GPU layer
    gsap.set(el, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      borderRadius: '6px',
      force3D: true
    });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete(item.id);
      }
    });

    // Horizontal motion (original smooth 0.72s)
    tl.to(el, {
      x: deltaX,
      duration: 0.72,
      ease: "power2.inOut"
    }, 0);

    // Vertical arc motion
    tl.to(el, {
      y: -25,
      duration: 0.22,
      ease: "power1.out"
    }, 0);
    tl.to(el, {
      y: deltaY,
      duration: 0.5,
      ease: "power2.in"
    }, 0.22);

    // Smooth proportional scale down (keeps 3:4 aspect ratio, gentle 6px border-radius)
    tl.to(el, {
      scale: 0.16,
      borderRadius: "6px",
      duration: 0.72,
      ease: "power3.inOut"
    }, 0);

    // Clean fade out at arrival
    tl.to(el, {
      opacity: 0,
      duration: 0.1,
      ease: "power1.in"
    }, 0.62);

    return () => {
      tl.kill();
    };
  }, []); // Run once on mount

  return (
    <div
      ref={elRef}
      style={{
        position: 'absolute',
        left: item.startX,
        top: item.startY,
        width: item.sWidth,
        height: item.sHeight,
        aspectRatio: '3/4',
        transformOrigin: 'center center',
        borderRadius: '6px',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
      className="border border-[#D4AF37] bg-white dark:bg-[#161616] p-1 overflow-hidden shadow-2xl flex items-center justify-center pointer-events-none"
    >
      <img
        src={item.image}
        alt="flying garment"
        className="w-full h-full object-cover pointer-events-none rounded-[4px]"
      />
    </div>
  );
};
