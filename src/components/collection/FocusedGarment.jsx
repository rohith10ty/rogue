import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function FocusedGarment({ product, index, total, back, onFlip, onExplore, reduced }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(root.current, 
        { opacity: 0, y: reduced ? 0 : 15 }, 
        { opacity: 1, y: 0, duration: reduced ? 0.1 : 0.45, ease: "power2.out" }
      );
    }, root);
    root.current.closest('section').querySelector('.hc-close').focus({ preventScroll: true });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div className="hc-focused-info" id="hc-focused-info" ref={root} role="region" aria-label={`${product.name} details`}>
      <div className="hc-focused-name">
        <p className="hc-eyebrow">
          <span>{String(index + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
        </p>
        <h3>{product.name}</h3>
        <p className="hc-category">{product.category}</p>
      </div>

      <div className="hc-focused-controls">
        <div className="hc-actions">
          <button 
            type="button" 
            className="hc-explore" 
            onClick={onExplore}
            aria-label={`Explore ${product.name} product details`}
          >
            Explore Piece <span aria-hidden="true">→</span>
          </button>
          
          <button 
            type="button" 
            className="hc-flip-btn"
            onClick={onFlip} 
            aria-label={`View ${back ? 'front' : 'back'} of ${product.name}`}
          >
            View {back ? 'Front View' : 'Back View'}
          </button>
        </div>
      </div>
      <span className="hc-sr-only" role="status">Showing {back ? 'back' : 'front'} view</span>
    </div>
  );
}
