import React, { useEffect, useRef, useState } from 'react';

/**
 * Fine-pointer-only warm marigold dot cursor (exact Ordix signature, zero ghost dot on touch).
 * Only mounts after a real mouse pointer move on hover-capable devices.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!enabled) setEnabled(true);
      const el = dotRef.current;
      if (el) {
        el.style.opacity = '1';
        el.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`;
      }
    };

    const onLeave = () => {
      if (dotRef.current) {
        dotRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />;
}
