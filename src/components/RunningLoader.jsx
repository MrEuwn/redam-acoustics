import React, { useEffect, useState } from 'react';

/**
 * Ordix-inspired Running Character Preloader:
 * Fast (~1.15s) energetic 3-ink sprinting acoustic engineer with calibration counter
 * that lifts smoothly as a rounded Deep Pine curtain using CSS linear() spring physics.
 * Automatically bypassed under prefers-reduced-motion: reduce.
 */
export function RunningLoader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'done';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'running';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      onComplete?.();
      return undefined;
    }

    const start = performance.now();
    const runMs = 1050;
    let rafId = 0;
    let exitTimer = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / runMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setPercent(Math.round(eased * 100));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setPhase('exiting');
        exitTimer = window.setTimeout(() => {
          setPhase('done');
          onComplete?.();
        }, 640);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`running-loader ${phase === 'exiting' ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Memuat studio REDAM"
      data-testid="running-loader"
    >
      <div className="running-loader-inner">
        <div className="running-loader-stage">
          {/* Speed lines & acoustic pulse track */}
          <svg
            className="running-runner-svg"
            viewBox="0 0 260 220"
            fill="none"
            aria-hidden="true"
            data-art="redam-risograph"
          >
            {/* Dynamic floor shadow */}
            <ellipse className="runner-shadow" cx="136" cy="198" rx="46" ry="7" fill="#C7F238" fillOpacity="0.28" />

            {/* Trailing speed-burst lines */}
            <g className="runner-speedlines" stroke="#C7F238" strokeWidth="3.2" strokeLinecap="round">
              <line x1="18" y1="84" x2="64" y2="84" />
              <line x1="8" y1="112" x2="54" y2="112" />
              <line x1="26" y1="142" x2="66" y2="142" />
            </g>

            {/* Animated sprinting 3-ink acoustic engineer */}
            <g className="runner-body-bounce">
              {/* Back Leg */}
              <g className="runner-leg-back">
                <path
                  d="M128 134 L94 162 L68 154"
                  stroke="#FFFFFF"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M68 154 L56 164 L76 166"
                  fill="#C7F238"
                  stroke="#0E241E"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </g>

              {/* Front Leg */}
              <g className="runner-leg-front">
                <path
                  d="M138 134 L168 156 L186 186"
                  stroke="#FFFFFF"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M182 186 L206 186 L202 194 L180 194 Z"
                  fill="#C7F238"
                  stroke="#0E241E"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </g>

              {/* Back Arm */}
              <g className="runner-arm-back">
                <path
                  d="M126 88 L94 106 L82 90"
                  stroke="#FFFFFF"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Forward-Leaning Chartreuse Jacket Torso */}
              <path
                d="M114 78 L160 82 L152 138 L108 134 Z"
                fill="#C7F238"
                stroke="#0E241E"
                strokeWidth="4.2"
                strokeLinejoin="round"
              />
              {/* Crisp White Shirt V & Flying Tie */}
              <path d="M134 80 L152 82 L144 108 Z" fill="#FFFFFF" stroke="#0E241E" strokeWidth="3" />
              <path
                className="runner-tie"
                d="M144 92 L126 112 L134 118 L148 98 Z"
                fill="#0E241E"
              />

              {/* Tall Mid-Century Head Leaning Forward + Headphones */}
              <path
                d="M132 76 L146 30 C150 22, 174 24, 174 34 L168 82 Z"
                fill="#FFFFFF"
                stroke="#0E241E"
                strokeWidth="4.2"
                strokeLinejoin="round"
              />
              {/* Pompadour Hair */}
              <path d="M142 30 C142 18, 166 16, 176 28 C166 28, 152 28, 142 30 Z" fill="#0E241E" />
              {/* Determined eye & brow */}
              <circle cx="163" cy="44" r="2.6" fill="#0E241E" />
              <path d="M156 38 L169 41" stroke="#0E241E" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M161 54 L169 54" stroke="#0E241E" strokeWidth="2.4" strokeLinecap="round" />

              {/* Headphone Cup */}
              <rect x="136" y="38" width="14" height="24" rx="6" fill="#0E241E" stroke="#C7F238" strokeWidth="2.5" />

              {/* Front Arm holding SPL Meter */}
              <g className="runner-arm-front">
                <path
                  d="M146 92 L178 112 L198 96"
                  stroke="#FFFFFF"
                  strokeWidth="9.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="192" y="76" width="16" height="24" rx="4" fill="#0E241E" stroke="#C7F238" strokeWidth="2.5" />
                <line x1="200" y1="68" x2="200" y2="76" stroke="#C7F238" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </div>

        <div className="running-loader-meta">
          <span className="running-loader-brand">REDAM</span>
          <span className="running-loader-track" aria-hidden="true">
            <span className="running-loader-fill" style={{ transform: `scaleX(${percent / 100})` }} />
          </span>
          <span className="running-loader-pct">{String(percent).padStart(3, '0')}% · RT60</span>
        </div>
      </div>
    </div>
  );
}
