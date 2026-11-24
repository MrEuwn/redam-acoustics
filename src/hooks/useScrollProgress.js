import { useEffect, useState } from 'react';

/**
 * Returns normalized 0..1 scroll progress as `ref` traverses the viewport.
 * Respects `prefers-reduced-motion: reduce` by returning `reducedFallback` (default 1).
 */
export function useScrollProgress(ref, { startOffset = 0.85, endOffset = 0.25, reducedFallback = 1 } = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setProgress(reducedFallback);
      return undefined;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const startY = vh * startOffset;
      const endY = vh * endOffset - rect.height;
      const total = startY - endY;
      if (total <= 0) return;
      const raw = (startY - rect.top) / total;
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, startOffset, endOffset, reducedFallback]);

  return progress;
}
