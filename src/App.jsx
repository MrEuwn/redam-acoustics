import React, { useEffect, useRef, useState } from 'react';
import { CONTENT } from './data/content';
import { IslandNavbar } from './components/IslandNavbar';
import { AuditModal } from './components/AuditModal';
import { CustomCursor } from './components/CustomCursor';
import {
  RisographDefs,
  HeroAcousticWaves,
  HeroAcousticCharacter,
  LoungingCharacter,
  MeditatingCharacter,
  DiagnosisSpotIllustration,
  ProcessHandIllustration,
  TypologySpotIllustration,
} from './components/RisographArt';
import { useScrollProgress } from './hooks/useScrollProgress';
import { roomDampenAudio } from './utils/audioDampen';

export default function App() {
  const [lang, setLang] = useState('id');
  const [menuOpen, setMenuOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [dampened, setDampened] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [activeSolutionIdx, setActiveSolutionIdx] = useState(0);

  const copy = CONTENT[lang];

  // Scroll-scrubbed section refs
  const solutionRef = useRef(null);
  const processRef = useRef(null);
  const manifestoRef = useRef(null);
  const aboutRef = useRef(null);
  const proofTrackRef = useRef(null);

  const solutionProgress = useScrollProgress(solutionRef, {
    startOffset: 0.95,
    endOffset: 0.5,
  });
  const processProgress = useScrollProgress(processRef, {
    startOffset: 0.12,
    endOffset: 0.85,
    reducedFallback: 0,
  });
  const manifestoProgress = useScrollProgress(manifestoRef, {
    startOffset: 0.9,
    endOffset: 0.3,
  });
  const aboutProgress = useScrollProgress(aboutRef, {
    startOffset: 0.96,
    endOffset: 0.52,
  });

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

  return (
    <div id="top" className={`redam-app ${dampened ? 'is-dampen-mode' : ''}`}>
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
        <section className="hero-section" aria-labelledby="hero-heading">
          <HeroAcousticWaves dampened={dampened} />

          {/* Left Margin Vertical Scroll Ticker (Pure CSS hairline bars, zero em dashes) */}
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
            <div className="hero-copy-col">
              <p className="hero-eyebrow">{copy.hero.eyebrow}</p>

              <h1 id="hero-heading" className="hero-display">
                {copy.hero.headlineLines.map((line) => (
                  <span key={line} className="hero-display-line">
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

            <div className="hero-art-col">
              <HeroAcousticCharacter dampened={dampened} />
            </div>
          </div>
        </section>

        {/* 3. Sticky Tactile Diagnosis Deck (#tantangan) */}
        <section id="tantangan" className="diagnosis-section" aria-labelledby="diagnosis-heading">
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

              {/* Expressive 3-ink character lounging directly on top of the giant chartreuse letters */}
              <div className="solutions-lounging-wrap">
                <LoungingCharacter />
              </div>
            </div>

            <div className="solutions-lower-grid">
              <div className="solutions-left-col">
                <p className="solutions-caption">{copy.solutions.caption}</p>
                {/* Scroll-scrubbed hand-drawn chartreuse spiral arrow */}
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

        {/* 5. Sticky 2-Column Tilting Process Card Deck (#cara-kerja) */}
        <section
          id="cara-kerja"
          ref={processRef}
          className="process-section"
          aria-labelledby="process-heading"
        >
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

            <div className="process-cards-col">
              {copy.process.steps.map((step, idx) => {
                const isDark = step.theme === 'pine';
                // Compute subtle progressive tilt as the following card rises over it
                const cardSegment = Math.max(0, Math.min(1, processProgress * 4 - idx));
                const tiltDeg =
                  idx < copy.process.steps.length - 1
                    ? (idx % 2 === 0 ? -1 : 1) * Math.max(0, cardSegment - 0.65) * 14
                    : 0;
                return (
                  <article
                    key={step.step}
                    className={`process-card ${isDark ? 'process-card--pine' : 'process-card--chartreuse'}`}
                    style={{
                      '--card-index': idx,
                      '--card-tilt': `${tiltDeg.toFixed(2)}deg`,
                    }}
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
        </section>

        {/* 6. Space Typologies Tilted Card Fan (#ruang) */}
        <section id="ruang" className="typologies-section" aria-labelledby="typologies-heading">
          <div className="container">
            <div className="typologies-header">
              <h2 id="typologies-heading" className="typologies-display">
                {copy.typologies.headlineLines.map((line) => (
                  <span key={line} className="block-line">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="typologies-subtitle">{copy.typologies.subtitle}</p>
            </div>

            <div className="typologies-fan">
              {copy.typologies.cards.map((card, idx) => {
                const tilts = [-2.2, 1.5, -1.2, 2.0, -1.6];
                return (
                  <article
                    key={card.kind}
                    className="typology-card"
                    style={{ '--fan-tilt': `${tilts[idx % tilts.length]}deg` }}
                  >
                    <div className="typology-card-art">
                      <TypologySpotIllustration kind={card.kind} />
                    </div>
                    <span className="typology-badge">{card.target}</span>
                    <h3 className="typology-title">{card.title}</h3>
                    <p className="typology-body">{card.body}</p>
                  </article>
                );
              })}
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
                {/* Connecting Hand-Drawn Loop SVG (Scroll-scrubbed) */}
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

      {/* Interactive Room RT60 Estimator Modal */}
      <AuditModal
        isOpen={auditOpen}
        onClose={() => setAuditOpen(false)}
        copy={copy}
        lang={lang}
      />
    </div>
  );
}
