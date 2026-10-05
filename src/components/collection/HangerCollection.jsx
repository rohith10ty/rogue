import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { hangerProducts } from '../../data/hangerProducts';
import { products } from '../../data/products';
import { HangerGarment } from './HangerGarment';
import { FocusedGarment } from './FocusedGarment';
import './HangerCollection.css';

export function HangerCollection({ onQuickView }) {
  const [active, setActive] = useState(null);
  const [focused, setFocused] = useState(null);
  const [back, setBack] = useState(false);
  const [requestedBacks, setRequestedBacks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const viewport = useRef(null);
  const buttons = useRef([]);
  const touch = useRef(null);
  const returning = useRef(false);
  const lastScroll = useRef(-Infinity);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setCompact(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const markScroll = () => { lastScroll.current = performance.now(); };
    window.addEventListener('scroll', markScroll, { passive: true });
    return () => window.removeEventListener('scroll', markScroll);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    // Preload hanger images for instant hover reaction on fresh page loads
    hangerProducts.forEach(prod => {
      ['side', 'front', 'back'].forEach(v => {
        if (prod[v]?.displaySrc) {
          const img = new Image();
          img.src = prod[v].displaySrc;
        }
      });
    });
  }, []);

  const close = useCallback(() => {
    if (focused === null) return;
    const previous = focused;
    returning.current = true;
    setFocused(null); setBack(false); setActive(null);
    buttons.current[previous]?.focus({ preventScroll: true });
    returning.current = false;
  }, [focused]);

  useEffect(() => {
    if (focused === null) return;
    const escape = event => { if (event.key === 'Escape') { event.preventDefault(); close(); } };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [focused, close]);

  // Measure the stable slot, never the animated image. Only on focus/resize.
  useLayoutEffect(() => {
    if (focused === null) return;
    const measure = () => {
      const bounds = viewport.current.getBoundingClientRect();
      const slot = buttons.current[focused].closest('.hc-slot').getBoundingClientRect();
      setOffset(bounds.left + bounds.width / 2 - (slot.left + slot.width / 2));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, [focused]);

  const activate = (index) => {
    if (focused === null && !returning.current && !touch.current) {
      setActive(index);
    }
  };

  const select = (index, event) => {
    if (focused !== null) return;
    const gesture = touch.current;
    touch.current = null;
    if (gesture?.moved) return;
    const isTouch = event.nativeEvent.pointerType === 'touch' || event.nativeEvent.pointerType === 'pen' || gesture;
    if (isTouch && gesture?.active !== index) { setActive(index); return; }
    setActive(index); setBack(false); setFocused(index);
    setRequestedBacks(current => current.includes(index) ? current : [...current, index]);
    viewport.current.closest('section').scrollIntoView({ block: 'start', behavior: reduced ? 'instant' : 'smooth' });
  };

  const handleExploreProduct = (focusedIdx) => {
    const hangerProd = hangerProducts[focusedIdx];
    if (!hangerProd) return;
    const prodMap = {
      'botanical-shirt': 'poplin-oxford-shirt',
      'rare-rabbit-tee': 'nocturne-black-tee',
      'red-inspiration-tee': 'crimson-atelier-tee',
      'monkey-king-tee': 'saffron-overshirt',
      'two-tone-tee': 'pewter-vintage-tee',
      'cream-olive-hoodie': 'drop-shoulder-pullover'
    };
    const targetId = prodMap[hangerProd.id];
    const catalogItem = products.find(p => p.id === targetId) || products[0];
    if (onQuickView) {
      onQuickView(catalogItem, back ? 2 : 0);
    }
  };

  const getGarmentOffset = (index) => {
    if (focused === index) return offset;
    if (focused !== null) {
      const shift = compact ? 30 : 48;
      return index < focused ? -shift : shift;
    }
    if (active !== null) {
      if (active === index) {
        if (compact) return index === 0 ? 12 : index === hangerProducts.length - 1 ? -12 : 0;
        return 0;
      }
      const dist = Math.abs(index - active);
      const direction = index < active ? -1 : 1;
      const moveAmount = compact ? (dist === 1 ? 22 : 12) : (dist === 1 ? 32 : 16);
      return direction * moveAmount;
    }
    return 0;
  };

  return (
    <section className={`hanger-collection${focused !== null ? ' has-focus' : ''}`} aria-labelledby="hc-title">
      <header className="hc-header">
        <div><p className="hc-eyebrow"><span />The collection</p><h2 id="hc-title">Objects in motion.</h2>
          <p className="hc-hint hc-desktop-hint">Hover to reveal · Click to explore</p>
          <p className="hc-hint hc-touch-hint">Tap to reveal · Tap again to explore</p>
        </div>
        <span className="hc-edition">ROGUE / STUDY IN FORM<br /><span>{String(hangerProducts.length).padStart(2, '0')} pieces, every perspective.</span></span>
      </header>
      {focused !== null && <button className="hc-close" type="button" onClick={close} aria-label="Close garment details"><span aria-hidden="true">×</span> Close</button>}
      <div className="hc-viewport" ref={viewport} data-lenis-prevent-horizontal
        onPointerDown={event => {
          if (event.pointerType !== 'mouse') touch.current = { x: event.clientX, y: event.clientY, active, moved: false };
        }}
        onPointerMove={event => {
          const gesture = touch.current;
          if (gesture && Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > 8) gesture.moved = true;
        }}
        onPointerCancel={() => { touch.current = null; }}>
        <div className="hc-rack">
          {/* Single Clean Horizontal Rod */}
          <div className="hc-rail" aria-hidden="true" />
          <div className="hc-garments">
            {hangerProducts.map((product, index) => (
              <HangerGarment key={product.id} product={product} index={index}
                buttonRef={el => { buttons.current[index] = el; }} active={active === index || focused === index}
                focused={focused === index} muted={focused !== null && focused !== index}
                back={focused === index && back} loadBack={requestedBacks.includes(index)} reduced={reduced} compact={compact}
                offset={getGarmentOffset(index)}
                onActivate={activate} onLeave={index => { if (focused === null) setActive(current => current === index ? null : current); }}
                onSelect={select} />
            ))}
          </div>
        </div>
      </div>
      {compact && focused === null && <div className="hc-mobile-selection" aria-live="polite">{active !== null ? <><span>{hangerProducts[active].name}</span><small>Tap again to explore</small></> : <small>Six pieces. Pick your perspective.</small>}</div>}
      {focused !== null && (
        <FocusedGarment 
          key={focused} 
          product={hangerProducts[focused]} 
          index={focused} 
          total={hangerProducts.length} 
          back={back} 
          reduced={reduced} 
          onFlip={async () => {
            const button = buttons.current[focused];
            try {
              await button.querySelector(back ? '.hc-front' : '.hc-back').decode();
              if (button.getAttribute('aria-expanded') === 'true') setBack(value => !value);
            } catch { /* Keep currently loaded face */ }
          }}
          onExplore={() => handleExploreProduct(focused)}
          onClose={close} 
        />
      )}
      <div className="hc-footnote" aria-hidden="true"><span>A different point of view.</span><span>THE ROGUE WARDROBE — 2026</span></div>
    </section>
  );
}
