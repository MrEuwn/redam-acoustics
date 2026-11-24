import React, { useEffect, useRef, useState } from 'react';

/**
 * Ordix-inspired Fast Running Character Intro Preloader:
 * Warm parchment #EDE8E6 fullscreen curtain (z-index: 999) with fluid New-Yorker
 * brush-ink sprinting acoustic consultant in #FFA125 suit + #47220E ink,
 * lifting smoothly (~1.1s total) into the Hero with zero useEffect restart traps.
 */
export function RunningLoader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'done';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'running';
  });

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      onCompleteRef.current?.();
      return undefined;
    }

    const start = performance.now();
    const runMs = 980;
    let rafId = 0;
    let exitTimer = 0;

    const tick = (now) => {
      const t = Math.max(0, Math.min(1, (now - start) / runMs));
      const eased = 1 - Math.pow(1 - t, 3);
      setPercent(Math.max(0, Math.min(100, Math.round(eased * 100))));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setPhase('exiting');
        exitTimer = window.setTimeout(() => {
          setPhase('done');
          onCompleteRef.current?.();
        }, 560);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(exitTimer);
    };
  }, []);

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
          <svg
            className="running-runner-svg"
            viewBox="0 0 260 220"
            fill="none"
            aria-hidden="true"
            data-art="redam-risograph"
          >
            {/* Dynamic Floor Shadow */}
            <ellipse className="runner-shadow" cx="136" cy="198" rx="48" ry="6.5" fill="#47220E" fillOpacity="0.14" />

            {/* Warm Marigold Speed Lines & Stipple */}
            <g className="runner-speedlines" stroke="#FFA125" strokeWidth="3.4" strokeLinecap="round">
              <line x1="20" y1="84" x2="66" y2="84" />
              <line x1="10" y1="112" x2="54" y2="112" />
              <line x1="28" y1="142" x2="68" y2="142" />
              <circle cx="48" cy="170" r="2.2" fill="#FFA125" stroke="none" />
              <circle cx="34" cy="162" r="1.8" fill="#FFA125" stroke="none" />
            </g>

            {/* Animated Sprinting Calligraphic Consultant */}
            <g className="runner-body-bounce">
              {/* Back Leg */}
              <g className="runner-leg-back">
                <path
                  d="M128 134 L94 162 L68 154"
                  stroke="#3B1A14"
                  strokeWidth="11.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M68 154 L54 164 L74 166"
                  fill="#FFA125"
                  stroke="#47220E"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
              </g>

              {/* Front Leg */}
              <g className="runner-leg-front">
                <path
                  d="M138 134 L168 156 L186 186"
                  stroke="#3B1A14"
                  strokeWidth="11.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M182 186 L208 186 L204 194 L180 194 Z"
                  fill="#FFA125"
                  stroke="#47220E"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
              </g>

              {/* Back Arm */}
              <g className="runner-arm-back">
                <path
                  d="M126 88 L94 106 L82 90"
                  stroke="#47220E"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Forward-Leaning Marigold Suit Jacket */}
              <path
                d="M114 78 L160 82 L152 138 L108 134 Z"
                fill="#FFA125"
                stroke="#47220E"
                strokeWidth="3.8"
                strokeLinejoin="round"
              />
              {/* Crisp White Shirt V & Flying Espresso Tie */}
              <path d="M134 80 L152 82 L144 108 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.8" />
              <path d="M144 92 L126 112 L134 118 L148 98 Z" fill="#3B1A14" />

              {/* Elongated New-Yorker Head Leaning Forward */}
              <path
                d="M132 76 L146 30 C150 22, 174 24, 174 34 L168 82 Z"
                fill="#FFFFFF"
                stroke="#47220E"
                strokeWidth="3.8"
                strokeLinejoin="round"
              />
              <path d="M142 30 C142 18, 166 16, 176 28 C166 28, 152 28, 142 30 Z" fill="#3B1A14" />
              <path d="M150 22 C160 22, 166 24, 170 28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <circle cx="163" cy="44" r="2.5" fill="#47220E" />
              <path d="M156 38 L169 41" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M161 54 L169 54" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />

              {/* Front Arm with Acoustic Meter */}
              <g className="runner-arm-front">
                <path
                  d="M146 92 L178 112 L196 96"
                  stroke="#FFA125"
                  strokeWidth="9.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M146 92 L178 112 L196 96"
                  stroke="#47220E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="192" y="76" width="15" height="24" rx="4" fill="#3B1A14" stroke="#FFA125" strokeWidth="2.4" />
                <line x1="199.5" y1="68" x2="199.5" y2="76" stroke="#47220E" strokeWidth="2.6" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </div>

        <div className="running-loader-meta">
          <span className="running-loader-brand">REDAM</span>
          <span className="running-loader-track" aria-hidden="true">
            <span className="running-loader-fill" style={{ transform: `scaleX(${percent / 100})` }} />
          </span>
          <span className="running-loader-pct">{String(percent).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  );
}
