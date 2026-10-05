import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

function imageStyle(view) {
  return {
    width: `calc(var(--garment-height) * ${1122 / view.span})`,
    height: `calc(var(--garment-height) * ${1402 / view.span})`,
    left: `calc(50% - var(--garment-height) * ${view.x / view.span})`,
    top: `calc(var(--garment-height) * ${-view.y / view.span})`,
    transformOrigin: `${view.x / 1122 * 100}% ${view.y / 1402 * 100}%`,
  };
}

export function HangerGarment({ product, index, active, focused, muted, back, loadBack, offset, reduced, compact, onActivate, onLeave, onSelect, buttonRef }) {
  const root = useRef(null);
  const motion = useRef(null);
  const rotation = useRef(null);
  const movement = useRef(null);
  const sway = useRef(null);
  const lastView = useRef('side');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {}, root);
    motion.current = ctx;
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    motion.current.add(() => {
      rotation.current?.kill();
      const side = root.current.querySelector('.hc-side');
      const front = root.current.querySelector('.hc-front');
      const reverse = root.current.querySelector('.hc-back');
      const view = !active ? 'side' : back ? 'back' : 'front';
      const target = !active ? side : back ? reverse : front;
      const others = [side, front, reverse].filter(el => el && el !== target);
      // Close the outgoing silhouette before opening the next face. Both
      // images stay mounted, and every transform pivots at the wooden tip.
      rotation.current = gsap.timeline({ defaults: { overwrite: 'auto', ease: 'power2.out' } })
        .to(others, { autoAlpha: 0, scaleX: reduced ? 1 : 0.12, duration: reduced ? 0.05 : 0.15 }, 0)
        .to(target, { autoAlpha: 1, scaleX: 1, duration: reduced ? 0.05 : 0.35, ease: 'power2.out' }, reduced ? 0 : 0.08)
        .to('.hc-label', { opacity: active && !focused ? 1 : 0, y: active ? 0 : 6, duration: reduced ? 0.05 : 0.2 }, 0);
      sway.current?.kill();
      if (!reduced && lastView.current !== view) {
        const direction = index % 2 === 0 ? 1 : -1;
        sway.current = gsap.timeline()
          .to('.hc-hanging', { rotation: direction * (active ? 0.8 : -0.4), duration: 0.18, ease: 'power2.out' })
          .to('.hc-hanging', { rotation: -direction * 0.2, duration: 0.22, ease: 'sine.inOut' })
          .to('.hc-hanging', { rotation: 0, duration: 0.25, ease: 'sine.out' });
      } else {
        gsap.set('.hc-hanging', { rotation: 0 });
      }
      lastView.current = view;
    });
  }, [active, focused, back, reduced, index]);

  useLayoutEffect(() => {
    motion.current.add(() => {
      movement.current?.kill();
      movement.current = gsap.to(root.current.querySelector('.hc-mover'), {
        x: reduced && !focused ? 0 : offset,
        scale: focused ? (compact ? 1.65 : 1.28) : active && !reduced ? (compact ? 1.05 : 1.025) : 1,
        opacity: muted ? 0 : 1,
        duration: reduced ? 0 : focused || muted ? 0.45 : 0.38, ease: 'power2.out', overwrite: 'auto',
      });
    });
  }, [offset, active, focused, muted, reduced, compact]);

  return (
    <div className={`hc-slot${active ? ' is-active' : ''}${focused ? ' is-focused' : ''}`} ref={root}>
        <button
          ref={buttonRef} type="button" className="hc-garment"
          aria-label={`${product.name} — ${active ? 'explore piece' : 'reveal front'}`}
          aria-expanded={focused} aria-controls={focused ? 'hc-focused-info' : undefined}
          disabled={muted} tabIndex={focused ? -1 : 0}
          onPointerEnter={event => { if (event.pointerType === 'mouse') onActivate(index, true); }}
          onPointerMove={event => { if (event.pointerType === 'mouse' && !active) onActivate(index, true); }}
          onPointerLeave={event => { if (event.pointerType === 'mouse' && document.activeElement !== event.currentTarget) onLeave(index); }}
          onFocus={() => onActivate(index)}
          onBlur={() => onLeave(index)}
          onClick={event => onSelect(index, event)}
        >
          {/* Keep the hit target stationary while its contents move. */}
          <span className="hc-mover">
          <span className="hc-hanging">
            <span className="hc-suspension" aria-hidden="true" />
            <span className="hc-stage">
            {['side', 'front', 'back'].map(view => (
              <span key={view} className={`hc-view-wrapper${index === 0 && view === 'side' ? ' hc-mirror-side' : ''}`}>
                <img className={`hc-image hc-${view}`}
                  src={view !== 'back' || loadBack ? product[view].displaySrc : undefined}
                  srcSet={view !== 'back' || loadBack ? product[view].srcSet : undefined}
                  sizes="(max-width: 767px) 300px, 360px"
                  style={imageStyle(product[view])} alt={`${product.name}, ${view} view on its wooden hanger`}
                  aria-hidden={view !== (!active ? 'side' : back ? 'back' : 'front')}
                  draggable={false} decoding="async" loading="eager"
                  onLoad={event => { event.currentTarget.decode?.().catch(() => {}); }} />
              </span>
            ))}
            </span>
          </span>
          <span className="hc-label"><span>{product.name}</span><small>{product.category}</small></span>
          </span>
        </button>
      <span className="hc-slot-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    </div>
  );
}
