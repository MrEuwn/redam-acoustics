import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { CONTENT } from './data/content';
import { IslandNavbar } from './components/IslandNavbar';
import { AuditModal } from './components/AuditModal';
import { CustomCursor } from './components/CustomCursor';
import { RunningLoader } from './components/RunningLoader';
import {
  RisographDefs,
  HeroAcousticWaves,
  HeroAcousticCharacter,
  PushingTextCharacter,
  LoungingCharacter,
  MeditatingCharacter,
  DiagnosisSpotIllustration,
  ProcessHandIllustration,
  TypologySpotIllustration,
} from './components/RisographArt';
import { useScrollProgress } from './hooks/useScrollProgress';
import { roomDampenAudio } from './utils/audioDampen';

function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function App() {
  const [lang, setLang] = useState('id');
  const [loaderDone, setLoaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [dampened, setDampened] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [activeSolutionIdx, setActiveSolutionIdx] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(1);

  const copy = CONTENT[lang];

  // Scroll-scrubbed section refs (60fps direct-DOM RAF choreography matching ordix.org)
  const heroRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroArtRef = useRef(null);

  const diagnosisTrackRef = useRef(null);
  const diagnosisCardRefs = useRef([]);

  const pushTrackRef = useRef(null);
  const pushRigRef = useRef(null);
  const pushCharWrapRef = useRef(null);

  const solutionRef = useRef(null);

  const processTrackRef = useRef(null);
  const processCardRefs = useRef([]);
  const lastProcessStepRef = useRef(1);

  const typologiesTrackRef = useRef(null);
  const typologyLetterRefs = useRef([]);
  const typologyCardRefs = useRef([]);

  const manifestoRef = useRef(null);
  const aboutRef = useRef(null);
  const proofTrackRef = useRef(null);

  const solutionProgress = useScrollProgress(solutionRef, {
    startOffset: 0.95,
    endOffset: 0.5,
  });
  const manifestoProgress = useScrollProgress(manifestoRef, {
    startOffset: 0.9,
    endOffset: 0.3,
  });
  const aboutProgress = useScrollProgress(aboutRef, {
    startOffset: 0.96,
    endOffset: 0.52,
  });

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  // Lenis smooth inertia scroll (Ordix silky cadence, disabled under prefers-reduced-motion)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Direct-DOM 60fps Ordix Scroll Choreography Engine:
  // 1) Hero parallax push-out
  // 2) #tantangan 5 physical stacking cards compressing as next card arrives
  // 3) Dedicated Pinned "Character Pushing Giant Text" stage
  // 4) #cara-kerja 4-card sticky physical tilt & fly-away throw deck
  // 5) #ruang per-letter kinetic scatter header + fanning tilted tarot deck
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smooth = { hero: 0, push: 0, proc: 0, typo: 0 };
    let rafId = 0;

    const trackProgress = (el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const travel = Math.max(1, r.height - vh);
      return clamp01(-r.top / travel);
    };

    const viewportEnterProgress = (el, startMult = 0.96, endMult = 0.22) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const startY = vh * startMult;
      const endY = vh * endMult;
      return clamp01((startY - r.top) / Math.max(1, startY - endY));
    };

    const tick = (immediate = false) => {
      const isCompact = window.innerWidth < 920 || reducedMotion;
      const vh = window.innerHeight || 900;
      const vw = window.innerWidth || 1440;

      if (isCompact) {
        if (heroCopyRef.current) heroCopyRef.current.style.transform = '';
        if (heroArtRef.current) heroArtRef.current.style.transform = '';
        diagnosisCardRefs.current.forEach((el) => {
          if (el) {
            el.style.transform = '';
            el.style.opacity = '1';
          }
        });
        if (pushRigRef.current) pushRigRef.current.style.transform = '';
        if (pushCharWrapRef.current) pushCharWrapRef.current.style.transform = '';
        processCardRefs.current.forEach((el) => {
          if (el) {
            el.style.transform = '';
            el.style.opacity = '1';
          }
        });
        typologyLetterRefs.current.forEach((el) => {
          if (el) {
            el.style.transform = '';
            el.style.opacity = '1';
          }
        });
        typologyCardRefs.current.forEach((el) => {
          if (el) {
            el.style.transform = '';
            el.style.opacity = '1';
          }
        });
        return;
      }

      const lerp = immediate ? 1 : 0.14;

      // 1) Hero scroll-linked subtle counter-parallax (character nudging text on scroll)
      const rawHero = clamp01(window.scrollY / Math.max(1, vh));
      smooth.hero += (rawHero - smooth.hero) * lerp;
      if (heroCopyRef.current) {
        heroCopyRef.current.style.transform = `translate3d(${(-smooth.hero * 36).toFixed(1)}px, ${(smooth.hero * 28).toFixed(1)}px, 0)`;
      }
      if (heroArtRef.current) {
        heroArtRef.current.style.transform = `translate3d(${(-smooth.hero * 64).toFixed(1)}px, ${(-smooth.hero * 18).toFixed(1)}px, 0) rotate(${(-smooth.hero * 4.5).toFixed(2)}deg)`;
      }

      // 2) #tantangan: 5 Physical Sticky Diagnosis Cards compressing & tilting back as next card rises
      const diagCards = diagnosisCardRefs.current;
      for (let i = 0; i < diagCards.length; i += 1) {
        const card = diagCards[i];
        if (!card) continue;
        const nextCard = diagCards[i + 1];
        if (nextCard) {
          const curTop = card.getBoundingClientRect().top;
          const nextTop = nextCard.getBoundingClientRect().top;
          const overlap = clamp01(1 - (nextTop - curTop) / (vh * 0.56));
          const scale = 1 - overlap * 0.085;
          const tilt = (i % 2 === 0 ? -1 : 1) * overlap * 2.6;
          const fade = 1 - overlap * 0.22;
          card.style.transform = `scale(${scale.toFixed(3)}) rotate(${tilt.toFixed(2)}deg)`;
          card.style.opacity = fade.toFixed(3);
        } else {
          card.style.transform = 'scale(1) rotate(0deg)';
          card.style.opacity = '1';
        }
      }

      // 3) Dedicated Pinned "Character Pushing Giant Text" Stage (Ordix signature)
      const rawPush = trackProgress(pushTrackRef.current);
      smooth.push += (rawPush - smooth.push) * lerp;
      const pPush = smooth.push;
      // Character physically shoves the entire giant display block from +44vw -> 0vw -> slight push past (-4vw)
      const shoveEase = easeOutCubic(clamp01(pPush / 0.78));
      const rigOffsetX = (1 - shoveEase) * Math.min(vw * 0.42, 620) - clamp01((pPush - 0.78) / 0.22) * 32;
      // Subtle rhythmic athletic push lean synchronized to scroll distance
      const strideBob = Math.sin(pPush * Math.PI * 5) * (1 - clamp01((pPush - 0.78) / 0.2)) * 5.5;
      const effortLean = -(1 - shoveEase) * 4.5;
      if (pushRigRef.current) {
        pushRigRef.current.style.transform = `translate3d(${rigOffsetX.toFixed(1)}px, 0, 0)`;
      }
      if (pushCharWrapRef.current) {
        pushCharWrapRef.current.style.transform = `translate3d(0, ${strideBob.toFixed(1)}px, 0) rotate(${effortLean.toFixed(2)}deg)`;
      }

      // 4) #cara-kerja: 4 Alternating Square Cards Physically Tilting & Flying Upward Out of Frame!
      const rawProc = trackProgress(processTrackRef.current);
      smooth.proc += (rawProc - smooth.proc) * lerp;
      const pProc = smooth.proc;
      const totalCards = 4;
      const stepFloat = pProc * (totalCards - 1); // 0 -> 3 across 4 cards
      const nearestStep = Math.min(totalCards, Math.max(1, Math.round(stepFloat) + 1));
      if (nearestStep !== lastProcessStepRef.current) {
        lastProcessStepRef.current = nearestStep;
        setActiveProcessStep(nearestStep);
      }

      for (let i = 0; i < totalCards; i += 1) {
        const el = processCardRefs.current[i];
        if (!el) continue;
        // delta < 0: card waiting below to rise in; delta == 0: locked center; delta > 0: tilting & flying upward out!
        const delta = stepFloat - i;
        let ty = 0;
        let tx = 0;
        let rot = 0;
        let scale = 1;
        let opacity = 1;

        if (delta < 0) {
          // Rising cleanly from bottom into stage
          const enterT = clamp01(1 + delta); // 0 at delta=-1, 1 at delta=0
          const eased = easeOutCubic(enterT);
          ty = (1 - eased) * (vh * 0.92);
          rot = (1 - eased) * (i % 2 === 0 ? 7 : -7);
          scale = 0.92 + eased * 0.08;
          opacity = enterT <= 0.01 ? 0 : Math.min(1, enterT * 1.45);
        } else if (delta > 0 && i < totalCards - 1) {
          // Physically tilted & thrown upward past the floating navbar (exact Ordix mid-1440.png physics!)
          const throwT = easeInOutCubic(clamp01(delta));
          ty = -throwT * (vh * 1.08);
          tx = (i % 2 === 0 ? 1 : -1) * throwT * 124;
          rot = (i % 2 === 0 ? 15.5 : -15.5) * throwT;
          scale = 1 - throwT * 0.08;
          opacity = 1 - clamp01((delta - 0.62) / 0.36);
        }

        el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(10 + i);
      }

      // 5) #ruang: Per-Letter Scattered Kinetic Header + Fanning Tilted Tarot Deck
      const rawTypo = viewportEnterProgress(typologiesTrackRef.current, 0.94, 0.16);
      smooth.typo += (rawTypo - smooth.typo) * lerp;
      const settle = easeOutCubic(smooth.typo);
      const scatter = 1 - settle;

      typologyLetterRefs.current.forEach((node, idx) => {
        if (!node) return;
        const seed = ((idx * 37) % 11) - 5; // -5..+5 deterministic
        const dy = scatter * (seed * 24 + (idx % 2 === 0 ? -36 : 36));
        const dx = scatter * ((idx - 8) * 9);
        const rot = scatter * (seed * 5.2);
        node.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg)`;
        node.style.opacity = (0.35 + settle * 0.65).toFixed(3);
      });

      const restTilts = [-2.4, 1.6, -1.2, 2.2, -1.8];
      typologyCardRefs.current.forEach((node, idx) => {
        if (!node) return;
        const offsetFromCenter = idx - 2;
        const fanY = scatter * (64 + Math.abs(offsetFromCenter) * 38);
        const fanX = scatter * (-offsetFromCenter * 48);
        const fanRot = restTilts[idx % restTilts.length] + scatter * (offsetFromCenter * 7.5);
        node.style.transform = `translate3d(${fanX.toFixed(1)}px, ${fanY.toFixed(1)}px, 0) rotate(${fanRot.toFixed(2)}deg)`;
        node.style.opacity = (0.28 + settle * 0.72).toFixed(3);
      });
    };

    tick(true);
    const loop = () => {
      tick(false);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (audioActive) {
      roomDampenAudio.setDampened(dampened);
    }
  }, [dampened, audioActive]);

  useEffect(() => () => roomDampenAudio.stop(), []);

  const handleToggleDampen = () => {
    setDampened((prev) => !prev);
  };

  const handleToggleAudio = () => {
    if (audioActive) {
      roomDampenAudio.stop();
      setAudioActive(false);
    } else {
      const ok = roomDampenAudio.start(dampened);
      if (ok) setAudioActive(true);
    }
  };

  const scrollProofBy = (direction) => {
    const track = proofTrackRef.current;
    if (!track) return;
    const step = Math.min(430, track.clientWidth * 0.85);
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const spiralDraw = Math.min(1, solutionProgress * 1.95);
  const spiralDashOffset = Number(Math.max(0, 1 - spiralDraw).toFixed(3));
  const spiralArrowOffset = Number(
    Math.max(0, 1 - Math.max(0, (spiralDraw - 0.82) / 0.18)).toFixed(3)
  );
  const aboutLoopOffset = Number(Math.max(0, 1 - Math.min(1, aboutProgress * 2.1)).toFixed(3));

  // Build flat letter index map for per-letter scattered kinetic heading in #ruang
  let letterCounter = 0;

  return (
    <div id="top" className={`redam-app ${dampened ? 'is-dampen-mode' : ''} ${loaderDone ? 'is-entered' : ''}`}>
      <RunningLoader onComplete={handleLoaderComplete} />
      <RisographDefs />
      <CustomCursor />

      {/* 1. Morphing Floating Island Navbar */}
      <IslandNavbar
        copy={copy}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'id' ? 'en' : 'id'))}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenAudit={() => setAuditOpen(true)}
      />

      <main id="main-content">
        {/* 2. Hero Stage (#F2F4F6, 100vh) */}
        <section ref={heroRef} className="hero-section" aria-labelledby="hero-heading">
          <HeroAcousticWaves dampened={dampened} />

          <div className="hero-scroll-ticker" aria-hidden="true">
            <div className="hero-scroll-track">
              {[0, 1, 2, 3].map((idx) => (
                <span key={idx} className="hero-scroll-unit">
                  <span>{copy.hero.scrollWord}</span>
                  <span className="hero-scroll-bar" />
                </span>
              ))}
            </div>
          </div>

          <div className="hero-inner container">
            <div ref={heroCopyRef} className="hero-copy-col">
              <p className="hero-eyebrow">{copy.hero.eyebrow}</p>

              <h1 id="hero-heading" className="hero-display">
                {copy.hero.headlineLines.map((line, idx) => (
                  <span
                    key={line}
                    className="hero-display-line"
                    style={{ '--line-idx': idx }}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <p className="hero-subhead">{copy.hero.subhead}</p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="btn-pine btn-pine--lg"
                  onClick={() => setAuditOpen(true)}
                  data-testid="hero-audit-btn"
                >
                  {copy.hero.cta}
                </button>

                <button
                  type="button"
                  role="switch"
                  aria-checked={dampened}
                  className={`dampen-switch ${dampened ? 'is-on' : ''}`}
                  onClick={handleToggleDampen}
                  data-testid="dampen-toggle"
                >
                  <span className="dampen-switch-text">
                    {copy.hero.dampenLabel}:{' '}
                    <strong>{dampened ? copy.hero.dampenOn : copy.hero.dampenOff}</strong>
                  </span>
                  <span className="dampen-switch-track" aria-hidden="true">
                    <span className="dampen-switch-thumb" />
                  </span>
                </button>
              </div>

              <div className="hero-telemetry-strip">
                <span
                  className={`telemetry-pill ${dampened ? 'is-calm' : ''}`}
                  data-testid="dampen-status"
                >
                  <span className="telemetry-dot" aria-hidden="true" />
                  {dampened ? copy.hero.dampenStatusOn : copy.hero.dampenStatusOff}
                </span>

                <button
                  type="button"
                  className={`audio-demo-btn ${audioActive ? 'is-playing' : ''}`}
                  onClick={handleToggleAudio}
                  aria-pressed={audioActive}
                >
                  <span className="audio-bars" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  {audioActive ? copy.hero.audioLabelOn : copy.hero.audioLabelOff}
                </button>
              </div>
            </div>

            <div ref={heroArtRef} className="hero-art-col">
              <HeroAcousticCharacter dampened={dampened} />
            </div>
          </div>
        </section>

        {/* 3. Sticky Tactile Diagnosis Deck (#tantangan) */}
        <section
          id="tantangan"
          ref={diagnosisTrackRef}
          className="diagnosis-section"
          aria-labelledby="diagnosis-heading"
        >
          <div className="diagnosis-sticky-header container">
            <h2 id="diagnosis-heading" className="diagnosis-backdrop-title">
              {copy.diagnosis.backdropLines.map((line) => (
                <span key={line} className="block-line">
                  {line}
                </span>
              ))}
            </h2>
            <p className="diagnosis-intro">{copy.diagnosis.intro}</p>
          </div>

          <div className="diagnosis-deck container">
            {copy.diagnosis.cards.map((card, idx) => (
              <article
                key={card.id}
                ref={(el) => {
                  diagnosisCardRefs.current[idx] = el;
                }}
                className="diagnosis-card"
                style={{ '--stack-index': idx }}
              >
                <div className="diagnosis-card-top">
                  <span className="mono-badge">({card.id}) {card.metric}</span>
                </div>
                <div className="diagnosis-card-body">
                  <div className="diagnosis-card-art">
                    <DiagnosisSpotIllustration variant={card.variant} />
                  </div>
                  <div className="diagnosis-card-text">
                    <h3 className="diagnosis-card-title">{card.title}</h3>
                    <p className="diagnosis-card-copy">{card.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3B. Signature Ordix Pinned "Character Pushing Giant Text" Stage */}
        <section
          ref={pushTrackRef}
          className="push-beat-track"
          aria-label={copy.diagnosis.pushBeat.eyebrow}
        >
          <div className="push-beat-sticky">
            <div ref={pushRigRef} className="push-beat-rig container">
              <div className="push-beat-text-block">
                <span className="push-beat-eyebrow">{copy.diagnosis.pushBeat.eyebrow}</span>
                <div className="push-beat-metric">{copy.diagnosis.pushBeat.metricLine}</div>
                <p className="push-beat-display">
                  {copy.diagnosis.pushBeat.headlineLines.map((line) => (
                    <span key={line} className="block-line">
                      {line}
                    </span>
                  ))}
                </p>
                <p className="push-beat-caption">{copy.diagnosis.pushBeat.caption}</p>
              </div>

              <div ref={pushCharWrapRef} className="push-beat-char-wrap">
                <PushingTextCharacter />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Deep Pine Polarity Flip (#solusi) */}
        <section
          id="solusi"
          ref={solutionRef}
          className="solutions-section"
          aria-labelledby="solutions-heading"
        >
          <div className="container solutions-inner">
            <p className="solutions-eyebrow">{copy.solutions.eyebrow}</p>

            <div className="solutions-hero-stage">
              <h2 id="solutions-heading" className="solutions-display">
                {copy.solutions.headlineLines.map((line, i) => (
                  <span
                    key={line}
                    className={`solutions-display-line solutions-line-${i}`}
                  >
                    {line}
                  </span>
                ))}
              </h2>

              <div className="solutions-lounging-wrap">
                <LoungingCharacter />
              </div>
            </div>

            <div className="solutions-lower-grid">
              <div className="solutions-left-col">
                <p className="solutions-caption">{copy.solutions.caption}</p>
                <svg
                  className="solutions-spiral-svg"
                  viewBox="0 0 360 220"
                  fill="none"
                  aria-hidden="true"
                  data-art="redam-risograph"
                >
                  <path
                    d="M24 26 C118 8, 224 44, 212 112 C202 164, 128 176, 108 134 C90 96, 148 56, 214 78 C272 98, 294 148, 326 192"
                    stroke="#C7F238"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={spiralDashOffset}
                  />
                  <path
                    d="M308 184 L328 196 L334 174"
                    stroke="#C7F238"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={spiralArrowOffset}
                  />
                </svg>
              </div>

              <div className="solutions-list-col">
                <ul className="solutions-paren-list">
                  {copy.solutions.items.map((item, idx) => {
                    const isActive = activeSolutionIdx === idx;
                    return (
                      <li key={item.label} className="solutions-paren-item">
                        <button
                          type="button"
                          className={`solutions-paren-btn ${isActive ? 'is-active' : ''}`}
                          onClick={() => setActiveSolutionIdx(idx)}
                          onMouseEnter={() => setActiveSolutionIdx(idx)}
                          aria-expanded={isActive}
                        >
                          <span className="solutions-paren-title">
                            ( {item.label} )
                          </span>
                          <span className="solutions-paren-spec">{item.spec}</span>
                        </button>
                        {isActive && (
                          <p className="solutions-paren-detail">{item.detail}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Pinned 2-Column Physical Card-Throw Process Deck (#cara-kerja) */}
        <section
          id="cara-kerja"
          ref={processTrackRef}
          className="process-section-track"
          aria-labelledby="process-heading"
        >
          <div className="process-sticky-stage">
            <div className="container process-grid">
              <div className="process-sticky-col">
                <div>
                  <span className="process-step-counter">
                    0{activeProcessStep} / 0{copy.process.steps.length}
                  </span>
                  <h2 id="process-heading" className="process-display">
                    {copy.process.headlineLines.map((line) => (
                      <span key={line} className="block-line">
                        {line}
                      </span>
                    ))}
                  </h2>
                </div>
                <p className="process-desc">{copy.process.description}</p>
              </div>

              <div className="process-cards-stage">
                {copy.process.steps.map((step, idx) => {
                  const isDark = step.theme === 'pine';
                  return (
                    <article
                      key={step.step}
                      ref={(el) => {
                        processCardRefs.current[idx] = el;
                      }}
                      className={`process-card ${isDark ? 'process-card--pine' : 'process-card--chartreuse'}`}
                    >
                      <div className="process-card-art">
                        <ProcessHandIllustration step={step.step} darkCard={isDark} />
                      </div>
                      <div className="process-card-content">
                        <h3 className="process-card-title">{step.title}</h3>
                        <p className="process-card-body">{step.body}</p>
                        <span className="process-card-index">{step.index}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Space Typologies: Per-Letter Scattered Kinetic Header + Fanning Tilted Deck (#ruang) */}
        <section
          id="ruang"
          ref={typologiesTrackRef}
          className="typologies-section"
          aria-labelledby="typologies-heading"
        >
          <div className="container">
            <div className="typologies-header">
              <h2
                id="typologies-heading"
                className="typologies-display"
                aria-label={copy.typologies.headlineLines.join(' ')}
              >
                {copy.typologies.headlineLines.map((line) => (
                  <span key={line} className="typologies-word-line" aria-hidden="true">
                    {line.split('').map((ch, ci) => {
                      if (ch === ' ') {
                        return (
                          <span key={`sp-${ci}`} className="typology-letter-space">
                            &nbsp;
                          </span>
                        );
                      }
                      const idx = letterCounter;
                      letterCounter += 1;
                      return (
                        <span
                          key={`${ch}-${idx}`}
                          ref={(el) => {
                            typologyLetterRefs.current[idx] = el;
                          }}
                          className="typology-scatter-letter"
                        >
                          {ch}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </h2>
              <p className="typologies-subtitle">{copy.typologies.subtitle}</p>
            </div>

            <div className="typologies-fan">
              {copy.typologies.cards.map((card, idx) => (
                <article
                  key={card.kind}
                  ref={(el) => {
                    typologyCardRefs.current[idx] = el;
                  }}
                  className="typology-card"
                >
                  <div className="typology-card-art">
                    <TypologySpotIllustration kind={card.kind} />
                  </div>
                  <span className="typology-badge">{card.target}</span>
                  <h3 className="typology-title">{card.title}</h3>
                  <p className="typology-body">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Scroll-Scrubbed SVG Wave Manifesto */}
        <section
          ref={manifestoRef}
          className="manifesto-section"
          aria-labelledby="manifesto-heading"
        >
          <div className="container manifesto-inner">
            <h2 id="manifesto-heading" className="manifesto-question">
              {copy.manifesto.question}
            </h2>
            <p className="manifesto-note">{copy.manifesto.note}</p>

            <ol className="manifesto-list">
              {copy.manifesto.lines.map((line, idx) => {
                const start = idx * 0.18;
                const localProgress = Math.max(
                  0,
                  Math.min(1, (manifestoProgress - start) / 0.34)
                );
                const dashOffset = Number((1 - localProgress).toFixed(3));
                return (
                  <li key={line} className="manifesto-item">
                    <span className="manifesto-line-text">{line}</span>
                    <svg
                      className="manifesto-wave-svg"
                      viewBox="0 0 640 24"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      data-art="redam-risograph"
                    >
                      <path
                        d="M4 14 C62 4, 118 22, 178 12 C238 2, 294 22, 354 12 C414 2, 472 22, 532 12 C578 4, 608 18, 636 11"
                        stroke="#0B6B56"
                        strokeWidth="4.2"
                        strokeLinecap="round"
                        pathLength="1"
                        strokeDasharray="1"
                        strokeDashoffset={dashOffset}
                      />
                    </svg>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* 8. Studio & Team Duotone Plate (#tentang) */}
        <section
          id="tentang"
          ref={aboutRef}
          className="about-section"
          aria-labelledby="about-heading"
        >
          <div className="container about-inner">
            <h2 id="about-heading" className="about-display">
              {copy.about.headlineLines.map((line) => (
                <span key={line} className="block-line">
                  {line}
                </span>
              ))}
            </h2>

            <div className="about-grid">
              <div className="about-copy-col">
                <p className="about-lead">{copy.about.lead}</p>
                <p className="about-body">{copy.about.body}</p>

                <div className="research-ledger">
                  <span className="research-badge">{copy.about.researchBadge}</span>
                  <dl className="research-list">
                    {copy.about.researchItems.map((item) => (
                      <div key={item.metric} className="research-row">
                        <dt className="research-metric">{item.metric}</dt>
                        <dd className="research-label">{item.label}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="about-photo-col">
                <svg
                  className="about-loop-svg"
                  viewBox="0 0 240 240"
                  fill="none"
                  aria-hidden="true"
                  data-art="redam-risograph"
                >
                  <path
                    d="M174 16 C228 62, 210 144, 126 154 C48 162, 16 122, 46 92 C78 62, 168 92, 184 164 C192 198, 174 220, 146 232"
                    stroke="#0B6B56"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={aboutLoopOffset}
                  />
                </svg>

                <figure className="about-photo-frame">
                  <img
                    src="./images/studio-portrait.jpg"
                    alt={copy.about.portraitAlt}
                    className="about-duotone-img"
                    decoding="async"
                    width="1000"
                    height="1000"
                  />
                  <figcaption className="about-photo-caption">
                    {copy.about.portraitCaption}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Deep Pine Polarity Flip Acoustic Proof Strip (#bukti) */}
        <section id="bukti" className="proof-section" aria-labelledby="proof-heading">
          <div className="container proof-header-stage">
            <h2 id="proof-heading" className="proof-display">
              {copy.proof.headlineLines.map((line) => (
                <span key={line} className="block-line">
                  {line}
                </span>
              ))}
            </h2>

            <div className="proof-meditating-wrap">
              <MeditatingCharacter />
            </div>

            <div className="proof-subrow">
              <p className="proof-subtitle">{copy.proof.subtitle}</p>
              <div className="proof-controls">
                <button
                  type="button"
                  className="proof-arrow-btn"
                  onClick={() => scrollProofBy(-1)}
                  aria-label={copy.proof.prevAria}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="proof-arrow-btn"
                  onClick={() => scrollProofBy(1)}
                  aria-label={copy.proof.nextAria}
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div
            ref={proofTrackRef}
            className="proof-carousel"
            tabIndex={0}
            aria-label={lang === 'id' ? 'Daftar studi tolok ukur akustik' : 'Acoustic benchmark studies'}
          >
            {copy.proof.cards.map((card) => (
              <article key={card.index} className="proof-card">
                <div className="proof-card-top">
                  <h3 className="proof-card-name">{card.name}</h3>
                  <p className="proof-card-role">{card.role}</p>
                  <span className="proof-card-tag">{card.tag}</span>
                </div>
                <div className="proof-card-bottom">
                  <p className="proof-card-quote">{card.quote}</p>
                  <span className="proof-card-index">{card.index}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 10. Prefooter Acoustic Estimator Invitation */}
        <section className="prefooter-section" aria-labelledby="prefooter-heading">
          <div className="container prefooter-inner">
            <span className="prefooter-kicker">{copy.prefooter.kicker}</span>
            <h2 id="prefooter-heading" className="prefooter-title">
              {copy.prefooter.title}
            </h2>
            <p className="prefooter-body">{copy.prefooter.body}</p>
            <button
              type="button"
              className="btn-pine btn-pine--lg"
              onClick={() => setAuditOpen(true)}
            >
              {copy.prefooter.cta}
            </button>
          </div>
        </section>
      </main>

      {/* 11. Rounded-Top Deep Pine Architectural Footer (#kontak) */}
      <footer id="kontak" className="site-footer" role="contentinfo">
        <div className="container footer-grid">
          <div className="footer-col-left">
            <div className="footer-wordmark">{copy.brand}</div>

            <div className="footer-block">
              <h2 className="footer-serif-heading">{copy.footer.socialHeading}</h2>
              <ul className="footer-link-list">
                {copy.footer.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="footer-mono-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-block">
              <h2 className="footer-serif-heading">{copy.footer.standardsHeading}</h2>
              <ul className="footer-link-list">
                {copy.footer.standards.map((st) => (
                  <li key={st.label}>
                    <a href={st.href} className="footer-mono-link">
                      {st.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="footer-copyright">{copy.footer.copyright}</p>
          </div>

          <div className="footer-col-right">
            <div className="footer-block">
              <h2 className="footer-serif-heading">{copy.footer.contactsHeading}</h2>
              <div className="footer-contact-links">
                <a href="tel:+622150884219" className="footer-mono-link">
                  {copy.footer.phone}
                </a>
                <a href="mailto:halo@redamakustik.id" className="footer-mono-link">
                  {copy.footer.email}
                </a>
              </div>
            </div>

            <div className="footer-block">
              <h2 className="footer-serif-heading">{copy.footer.detailsHeading}</h2>
              <p className="footer-company-name">{copy.footer.companyName}</p>
              <dl className="footer-details-table">
                {copy.footer.details.map((row) => (
                  <div key={row.key} className="footer-details-row">
                    <dt>{row.key}:</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="footer-colophon">
              <span>{copy.footer.colophonTop}</span>
              <strong>{copy.footer.colophonBottom}</strong>
            </div>
          </div>
        </div>
      </footer>

      <AuditModal
        isOpen={auditOpen}
        onClose={() => setAuditOpen(false)}
        copy={copy}
        lang={lang}
      />
    </div>
  );
}
