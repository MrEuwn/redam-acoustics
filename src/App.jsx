import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { CONTENT } from './data/content';
import { IslandNavbar } from './components/IslandNavbar';
import { AuditModal } from './components/AuditModal';
import { CustomCursor } from './components/CustomCursor';
import { RunningLoader } from './components/RunningLoader';
import {
  RisographDefs,
  HeroAcousticCharacter,
  PushingTextCharacter,
  LoungingCharacter,
  MeditatingCharacter,
  DiagnosisSpotIllustration,
  ProcessHandIllustration,
  TypologySpotIllustration,
  PrefooterCharacter,
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
  const [activeSolutionIdx, setActiveSolutionIdx] = useState(null);
  const [activeTarotIdx, setActiveTarotIdx] = useState(0);
  const [manualTarotIdx, setManualTarotIdx] = useState(null);

  const copy = CONTENT[lang];

  // Scroll-scrubbed direct-DOM refs (60fps Ordix choreography)
  const heroCopyRef = useRef(null);
  const heroArtRef = useRef(null);

  const diagnosisCardRefs = useRef([]);

  const pushTrackRef = useRef(null);
  const pushRigRef = useRef(null);
  const pushCharWrapRef = useRef(null);

  const solutionRef = useRef(null);

  const processTrackRef = useRef(null);
  const processCardRefs = useRef([]);

  const typologiesTrackRef = useRef(null);
  const typologyLetterRefs = useRef([]);
  const typologyCardRefs = useRef([]);
  const lastTarotRef = useRef(0);
  const manualTarotRef = useRef(null);

  const manifestoRef = useRef(null);
  const aboutRef = useRef(null);
  const proofTrackRef = useRef(null);

  manualTarotRef.current = manualTarotIdx;

  const solutionProgress = useScrollProgress(solutionRef, {
    startOffset: 0.96,
    endOffset: 0.44,
  });
  const manifestoProgress = useScrollProgress(manifestoRef, {
    startOffset: 0.9,
    endOffset: 0.24,
  });
  const aboutProgress = useScrollProgress(aboutRef, {
    startOffset: 0.95,
    endOffset: 0.46,
  });

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  // Silky Lenis inertia scroll (disabled under prefers-reduced-motion)
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
  // 1) Hero subtle counter-parallax
  // 2) #tantangan 5 vertical borderless white cards stacking over pinned backdrop
  // 3) Pinned "Character Pushing Giant Text" (HINGGA -14 dB)
  // 4) #cara-kerja 4 square borderless cards tilting ±15deg & flying upward past navbar
  // 5) #ruang scattered per-letter top display + tilted white tarot card carousel on scroll
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smooth = { hero: 0, push: 0, proc: 0, typoHeader: 0, typoDeck: 0 };
    let rafId = 0;

    const trackProgress = (el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const travel = Math.max(1, r.height - vh);
      return clamp01(-r.top / travel);
    };

    const viewportEnterProgress = (el, startMult = 0.95, endMult = 0.18) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const startY = vh * startMult;
      const endY = vh * endMult;
      return clamp01((startY - r.top) / Math.max(1, startY - endY));
    };

    const tarotTilts = [-4.2, 3.6, -3.2, 4.4, -2.8];

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
        typologyCardRefs.current.forEach((el, idx) => {
          if (!el) return;
          const active = manualTarotRef.current ?? lastTarotRef.current;
          const isCur = idx === active;
          el.style.transform = isCur ? `rotate(${tarotTilts[idx % tarotTilts.length]}deg)` : 'scale(0.94)';
          el.style.opacity = isCur ? '1' : '0';
          el.style.pointerEvents = isCur ? 'auto' : 'none';
        });
        return;
      }

      const lerp = immediate ? 1 : 0.14;

      // 1) Hero subtle counter-parallax
      const rawHero = clamp01(window.scrollY / Math.max(1, vh));
      smooth.hero += (rawHero - smooth.hero) * lerp;
      if (heroCopyRef.current) {
        heroCopyRef.current.style.transform = `translate3d(${(-smooth.hero * 28).toFixed(1)}px, ${(smooth.hero * 24).toFixed(1)}px, 0)`;
      }
      if (heroArtRef.current) {
        heroArtRef.current.style.transform = `translate3d(${(-smooth.hero * 48).toFixed(1)}px, ${(-smooth.hero * 14).toFixed(1)}px, 0) rotate(${(-smooth.hero * 3.2).toFixed(2)}deg)`;
      }

      // 2) #tantangan: 5 vertical borderless white cards rising & gently compressing as next rises
      const diagCards = diagnosisCardRefs.current;
      for (let i = 0; i < diagCards.length; i += 1) {
        const card = diagCards[i];
        if (!card) continue;
        const nextCard = diagCards[i + 1];
        if (nextCard) {
          const curTop = card.getBoundingClientRect().top;
          const nextTop = nextCard.getBoundingClientRect().top;
          const overlap = clamp01(1 - (nextTop - curTop) / (vh * 0.62));
          const scale = 1 - overlap * 0.065;
          const tilt = (i % 2 === 0 ? -1 : 1) * overlap * 1.8;
          const fade = 1 - overlap * 0.16;
          card.style.transform = `scale(${scale.toFixed(3)}) rotate(${tilt.toFixed(2)}deg)`;
          card.style.opacity = fade.toFixed(3);
        } else {
          card.style.transform = 'scale(1) rotate(0deg)';
          card.style.opacity = '1';
        }
      }

      // 3) Pinned "Character Pushing Giant Text" (HINGGA -14 dB BISING DIREDAM)
      const rawPush = trackProgress(pushTrackRef.current);
      smooth.push += (rawPush - smooth.push) * lerp;
      const pPush = smooth.push;
      const shoveEase = easeOutCubic(clamp01(pPush / 0.62));
      const rigOffsetX =
        (1 - shoveEase) * Math.min(vw * 0.24, 320) -
        clamp01((pPush - 0.68) / 0.32) * 56;
      const strideBob =
        Math.sin(pPush * Math.PI * 5) * (1 - clamp01((pPush - 0.72) / 0.22)) * 5;
      const effortLean = -(1 - shoveEase) * 4.5;
      if (pushRigRef.current) {
        pushRigRef.current.style.transform = `translate3d(${rigOffsetX.toFixed(1)}px, 0, 0)`;
      }
      if (pushCharWrapRef.current) {
        pushCharWrapRef.current.style.transform = `translate3d(0, ${strideBob.toFixed(1)}px, 0) rotate(${effortLean.toFixed(2)}deg)`;
      }

      // 4) #cara-kerja: Real Physical Card Stack, Top Card Peels, Tilts ±16deg & Throws Upward Past Navbar
      const rawProc = trackProgress(processTrackRef.current);
      smooth.proc += (rawProc - smooth.proc) * lerp;
      const totalProc = 4;
      const stepFloat = smooth.proc * (totalProc - 1);

      for (let i = 0; i < totalProc; i += 1) {
        const el = processCardRefs.current[i];
        if (!el) continue;
        const delta = stepFloat - i;
        let ty = 0;
        let tx = 0;
        let rot = 0;
        let scale = 1;
        let opacity = 1;

        if (delta < 0) {
          // Waiting solid & crisp directly underneath the active card in the deck
          const depth = Math.min(2, -delta);
          scale = 1 - depth * 0.032;
          ty = depth * 12;
          opacity = depth > 1.4 ? 0 : 1;
        } else if (delta > 0 && i < totalProc - 1) {
          // Top card physically tilts & flies upward past the floating navbar (exact Ordix mid-1440.png!)
          const throwT = easeInOutCubic(clamp01(delta));
          ty = -throwT * (vh * 1.18);
          tx = (i % 2 === 0 ? 1 : -1) * throwT * 145;
          rot = (i % 2 === 0 ? 16.5 : -16.5) * throwT;
          scale = 1 - throwT * 0.04;
          opacity = 1;
        }

        el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(30 - i);
      }

      // 5) #ruang: Scattered Per-Letter Giant Header + Single Tilted Tarot Card Carousel on Scroll
      const rawTypoHeader = viewportEnterProgress(typologiesTrackRef.current, 0.94, 0.14);
      smooth.typoHeader += (rawTypoHeader - smooth.typoHeader) * lerp;
      const scatter = 1 - easeOutCubic(smooth.typoHeader);

      // Ordix playful scattered vertical offsets at rest (some letters float slightly up/down)
      const restOffsets = [-12, 18, -8, 22, -14, 0, -10, 24, -14, 16, -6, 12];
      typologyLetterRefs.current.forEach((node, idx) => {
        if (!node) return;
        const baseY = restOffsets[idx % restOffsets.length];
        const seed = ((idx * 37) % 11) - 5;
        const dy = baseY + scatter * (seed * 22);
        const rot = scatter * (seed * 4.5);
        node.style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg)`;
      });

      const rawTypoDeck = trackProgress(typologiesTrackRef.current);
      smooth.typoDeck += (rawTypoDeck - smooth.typoDeck) * lerp;
      const totalTarots = 5;
      const targetFloat =
        manualTarotRef.current !== null
          ? manualTarotRef.current
          : smooth.typoDeck * (totalTarots - 1);

      const nearestTarot = Math.min(totalTarots - 1, Math.max(0, Math.round(targetFloat)));
      if (nearestTarot !== lastTarotRef.current) {
        lastTarotRef.current = nearestTarot;
        setActiveTarotIdx(nearestTarot);
      }

      for (let i = 0; i < totalTarots; i += 1) {
        const card = typologyCardRefs.current[i];
        if (!card) continue;
        const d = i - targetFloat; // 0 = center spotlight, -1 = exited left, +1 = incoming right
        const absD = Math.abs(d);
        const tx = d * Math.min(vw * 0.42, 540);
        const ty = absD * absD * 44;
        const rot = tarotTilts[i % tarotTilts.length] + d * 14;
        const scale = Math.max(0.84, 1 - absD * 0.1);
        const opacity = clamp01(1.15 - absD * 0.92);

        card.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = String(20 - Math.round(absD * 5));
        card.style.pointerEvents = absD < 0.45 ? 'auto' : 'none';
      }
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

  // Clear manual tarot override when the user actively scrolls #ruang
  useEffect(() => {
    const onWheelOrTouch = () => {
      if (manualTarotRef.current !== null) {
        setManualTarotIdx(null);
      }
    };
    window.addEventListener('wheel', onWheelOrTouch, { passive: true });
    window.addEventListener('touchmove', onWheelOrTouch, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheelOrTouch);
      window.removeEventListener('touchmove', onWheelOrTouch);
    };
  }, []);

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
    const step = Math.min(410, track.clientWidth * 0.85);
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const spiralDraw = Math.min(1, solutionProgress * 1.9);
  const spiralDashOffset = Number(Math.max(0, 1 - spiralDraw).toFixed(3));
  const aboutLoopOffset = Number(Math.max(0, 1 - Math.min(1, aboutProgress * 2.0)).toFixed(3));

  let letterCounter = 0;

  return (
    <div id="top" className={`redam-app ${dampened ? 'is-dampen-mode' : ''} ${loaderDone ? 'is-entered' : ''}`}>
      <RunningLoader onComplete={handleLoaderComplete} />
      <RisographDefs />
      <CustomCursor />

      {/* 1. Floating White Island Pill Navbar (Expands In-Place into #3B1A14 Espresso) */}
      <IslandNavbar
        copy={copy}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'id' ? 'en' : 'id'))}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenAudit={() => setAuditOpen(true)}
        dampened={dampened}
        onToggleDampen={handleToggleDampen}
        audioActive={audioActive}
        onToggleAudio={handleToggleAudio}
      />

      <main id="main-content">
        {/* 2. Pure Editorial Hero (#EDE8E6): Iconic 3-Element Left Stack + Tall Brush-Ink Character */}
        <section className="hero-section" aria-labelledby="hero-heading">
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

              <p className="hero-subhead">
                {copy.hero.subheadLines.map((line) => (
                  <span key={line} className="block-line">
                    {line}
                  </span>
                ))}
              </p>

              <div className="hero-cta-wrap">
                <button
                  type="button"
                  className="btn-espresso"
                  onClick={() => setAuditOpen(true)}
                  data-testid="hero-audit-btn"
                >
                  {copy.hero.cta}
                </button>
              </div>
            </div>

            <div ref={heroArtRef} className="hero-art-col">
              <HeroAcousticCharacter dampened={dampened} />
            </div>
          </div>
        </section>

        {/* 3. Sticky Backdrop + 5 Tall Vertical Borderless White Diagnosis Cards (#tantangan) */}
        <section
          id="tantangan"
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
                <div className="diagnosis-card-art">
                  <DiagnosisSpotIllustration variant={card.variant} />
                </div>
                <h3 className="diagnosis-card-title">
                  {card.titleLines.map((line) => (
                    <span key={line} className="block-line">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="diagnosis-card-copy">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 3B. Pinned Character Pushing Giant Display Text (HINGGA -14 dB BISING DIREDAM) */}
        <section
          ref={pushTrackRef}
          className="push-beat-track"
          aria-label={`${copy.diagnosis.pushBeat.metricLine} ${copy.diagnosis.pushBeat.headlineLines.join(' ')}`}
        >
          <div className="push-beat-sticky">
            <div ref={pushRigRef} className="push-beat-rig container">
              <div className="push-beat-text-block">
                <div className="push-beat-metric">{copy.diagnosis.pushBeat.metricLine}</div>
                <p className="push-beat-display">
                  {copy.diagnosis.pushBeat.headlineLines.map((line) => (
                    <span key={line} className="block-line">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div ref={pushCharWrapRef} className="push-beat-char-wrap">
                <PushingTextCharacter />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Deep Espresso (#3B1A14) Polarity Flip (#solusi) */}
        <section
          id="solusi"
          ref={solutionRef}
          className="solutions-section"
          aria-labelledby="solutions-heading"
        >
          <div className="container solutions-inner">
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

              {/* Single Graceful Scroll-Scrubbed Amber Spiral Curve (No Left Caption Wall) */}
              <svg
                className="solutions-spiral-svg"
                viewBox="0 0 380 260"
                fill="none"
                aria-hidden="true"
                data-art="redam-risograph"
              >
                <path
                  d="M14 58 C118 28, 224 58, 214 148 C206 206, 134 220, 120 166 C108 118, 174 72, 248 92 C314 110, 344 166, 336 226"
                  stroke="#FFA125"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={spiralDashOffset}
                />
              </svg>
            </div>

            <div className="solutions-list-stage">
              <ul className="solutions-paren-list">
                {copy.solutions.items.map((item, idx) => {
                  const isActive = activeSolutionIdx === idx;
                  return (
                    <li key={item.label} className="solutions-paren-item">
                      <button
                        type="button"
                        className={`solutions-paren-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => setActiveSolutionIdx((prev) => (prev === idx ? null : idx))}
                        aria-expanded={isActive}
                      >
                        ( {item.label} )
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
        </section>

        {/* 5. Pinned 2-Column Throw-Away Square Card Deck (#cara-kerja) */}
        <section
          id="cara-kerja"
          ref={processTrackRef}
          className="process-section-track"
          aria-labelledby="process-heading"
        >
          <div className="process-sticky-stage">
            <div className="container process-grid">
              <div className="process-sticky-col">
                <h2 id="process-heading" className="process-display">
                  {copy.process.headlineLines.map((line) => (
                    <span key={line} className="block-line">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="process-desc">{copy.process.description}</p>
              </div>

              <div className="process-cards-stage">
                {copy.process.steps.map((step, idx) => {
                  const isEspresso = step.theme === 'espresso';
                  return (
                    <article
                      key={step.step}
                      ref={(el) => {
                        processCardRefs.current[idx] = el;
                      }}
                      className={`process-card ${isEspresso ? 'process-card--espresso' : 'process-card--amber'}`}
                    >
                      <div className="process-card-art">
                        <ProcessHandIllustration step={step.step} darkCard={isEspresso} />
                      </div>
                      <div className="process-card-content">
                        <h3 className="process-card-title">
                          {step.titleLines.map((line) => (
                            <span key={line} className="block-line">
                              {line}
                            </span>
                          ))}
                        </h3>
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

        {/* 6. Scattered Giant Per-Letter Header + Tilted White Tarot Card Carousel (#ruang) */}
        <section
          id="ruang"
          ref={typologiesTrackRef}
          className="typologies-track"
          aria-labelledby="typologies-heading"
        >
          <div className="typologies-sticky">
            <div className="typologies-header-band">
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
            </div>

            <div className="typologies-intro container">
              <p>{copy.typologies.introPrimary}</p>
              <p>{copy.typologies.introSecondary}</p>
            </div>

            <div className="typologies-carousel-stage">
              {copy.typologies.cards.map((card, idx) => (
                <article
                  key={card.kind}
                  ref={(el) => {
                    typologyCardRefs.current[idx] = el;
                  }}
                  className="typology-tarot-card"
                >
                  <div className="typology-card-art">
                    <TypologySpotIllustration kind={card.kind} />
                  </div>
                  <h3 className="typology-title">
                    {card.titleLines.map((line) => (
                      <span key={line} className="block-line">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="typology-body">{card.body}</p>
                </article>
              ))}
            </div>

            <div className="typologies-dots" role="tablist" aria-label={lang === 'id' ? 'Pilih tipe ruang' : 'Choose space typology'}>
              {copy.typologies.cards.map((card, idx) => {
                const isSelected = (manualTarotIdx ?? activeTarotIdx) === idx;
                return (
                  <button
                    key={card.kind}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`typology-step-pill ${isSelected ? 'is-active' : ''}`}
                    onClick={() => {
                      setManualTarotIdx(idx);
                      setActiveTarotIdx(idx);
                    }}
                  >
                    {card.index}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. Giant Uppercase Manifesto with Chunky Scroll-Scrubbed #FFA125 Wave Underlines */}
        <section
          ref={manifestoRef}
          className="manifesto-section"
          aria-labelledby="manifesto-heading"
        >
          <div className="container manifesto-inner">
            <h2 id="manifesto-heading" className="manifesto-question">
              {copy.manifesto.question}
            </h2>

            <ol className="manifesto-list">
              {copy.manifesto.lines.map((line, idx) => {
                const start = idx * 0.17;
                const localProgress = Math.max(
                  0,
                  Math.min(1, (manifestoProgress - start) / 0.34)
                );
                const dashOffset = Number((1 - localProgress).toFixed(3));
                const wavePaths = [
                  'M6 16 C90 22, 180 6, 270 16 C360 26, 450 8, 540 16 C590 20, 620 14, 634 15',
                  'M6 18 C48 6, 92 22, 138 12 C184 2, 232 24, 278 14 C324 4, 372 24, 418 14 C464 4, 512 24, 558 14 C592 8, 616 18, 634 12',
                  'M6 20 C160 15, 360 11, 634 8',
                  'M6 14 C74 22, 142 6, 214 16 C286 24, 356 6, 428 16 C500 24, 568 8, 634 14',
                ];
                return (
                  <li key={line} className="manifesto-item">
                    <span className="manifesto-line-text">{line}</span>
                    <svg
                      className="manifesto-wave-svg"
                      viewBox="0 0 640 28"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      data-art="redam-risograph"
                    >
                      <path
                        d={wavePaths[idx % wavePaths.length]}
                        stroke="#FFA125"
                        strokeWidth="6.5"
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

        {/* 8. Giant Overlapping #FFA125 "TENTANG KAMI" + Warm Espresso Duotone Portrait (#tentang) */}
        <section
          id="tentang"
          ref={aboutRef}
          className="about-section"
          aria-labelledby="about-heading"
        >
          <div className="container about-stage">
            <h2 id="about-heading" className="about-display">
              {copy.about.headlineLines.map((line) => (
                <span key={line} className="block-line">
                  {line}
                </span>
              ))}
            </h2>

            <div className="about-layout">
              <div className="about-bio-col">
                <p className="about-bio">{copy.about.bio}</p>
              </div>

              <div className="about-photo-col">
                <svg
                  className="about-loop-svg"
                  viewBox="0 0 280 340"
                  fill="none"
                  aria-hidden="true"
                  data-art="redam-risograph"
                >
                  <path
                    d="M174 14 C258 32, 266 148, 170 198 C86 242, 12 206, 22 156 C32 108, 122 98, 184 146 C236 186, 242 274, 178 326"
                    stroke="#FFA125"
                    strokeWidth="2.8"
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
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Deep Espresso (#3B1A14) Polarity Flip + Meditating Character + Tall Borderless #FFA125 Cards (#bukti) */}
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
                </div>
                <div className="proof-card-bottom">
                  <p className="proof-card-quote">{card.quote}</p>
                  <span className="proof-card-index">{card.index}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 10. Open Parchment Prefooter Stage */}
        <section className="prefooter-section" aria-labelledby="prefooter-heading">
          <div className="container prefooter-inner">
            <PrefooterCharacter />
            <h2 id="prefooter-heading" className="prefooter-title">
              {copy.prefooter.title}
            </h2>
            <button
              type="button"
              className="btn-espresso"
              onClick={() => setAuditOpen(true)}
            >
              {copy.prefooter.cta}
            </button>
          </div>
        </section>
      </main>

      {/* 11. Rounded-Top #3B1A14 Monochrome #FFA125 Footer (#kontak) */}
      <footer id="kontak" className="site-footer" role="contentinfo">
        <div className="container footer-grid">
          <div className="footer-col-left">
            <div className="footer-wordmark">{copy.brand}</div>

            <div className="footer-left-groups">
              <div className="footer-block">
                <h2 className="footer-serif-heading">{copy.footer.socialHeading}</h2>
                <ul className="footer-link-list">
                  {copy.footer.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} className="footer-caps-link">
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
                      {st.action === 'audit' ? (
                        <button
                          type="button"
                          className="footer-caps-btn"
                          onClick={() => setAuditOpen(true)}
                        >
                          {st.label}
                        </button>
                      ) : (
                        <a href={st.href} className="footer-caps-link">
                          {st.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="footer-copyright">{copy.footer.copyright}</p>
          </div>

          <div className="footer-col-right">
            <div className="footer-block">
              <h2 className="footer-serif-heading">{copy.footer.contactsHeading}</h2>
              <div className="footer-contact-links">
                <a href="tel:+622150884219" className="footer-caps-link">
                  {copy.footer.phone}
                </a>
                <a href="mailto:halo@redamakustik.id" className="footer-caps-link">
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
