import React, { useEffect, useMemo, useRef, useState } from 'react';

export function AuditModal({ isOpen, onClose, copy, lang }) {
  const [area, setArea] = useState(110);
  const [height, setHeight] = useState(3.8);
  const [typologyId, setTypologyId] = useState('cafe');
  const [surfaceId, setSurfaceId] = useState('glass');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 60);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  const m = copy.modal;

  const calculation = useMemo(() => {
    const typology = m.typologies.find((t) => t.id === typologyId) || m.typologies[0];
    const surface = m.surfaces.find((s) => s.id === surfaceId) || m.surfaces[0];

    const volume = area * height;
    const sideApprox = Math.sqrt(area);
    const perimeter = 4 * sideApprox * 1.06;
    const totalSurfaceArea = 2 * area + perimeter * height;
    const currentAbsorption = Math.max(4, totalSurfaceArea * surface.alpha);
    const estRt60 = (0.161 * volume) / currentAbsorption;

    const targetMid = (typology.targetMin + typology.targetMax) / 2;
    const targetAbsorption = (0.161 * volume) / targetMid;
    const extraSabins = Math.max(0, targetAbsorption - currentAbsorption);
    const baffleAreaM2 = Math.max(4, Math.round(extraSabins / 0.85));

    let severity = 'ok';
    let statusText = m.statusOk;
    if (estRt60 > typology.targetMax * 1.45) {
      severity = 'high';
      statusText = m.statusHigh;
    } else if (estRt60 > typology.targetMax * 1.05) {
      severity = 'mid';
      statusText = m.statusMid;
    }

    const recommendations =
      lang === 'id'
        ? [
            `~${baffleAreaM2} m² modul baffle plafon mikro & panel felt tersembunyi (NRC 0.85)`,
            severity === 'high'
              ? 'Diffuser kayu lamel pada bidang dinding pantul utama'
              : 'Penyetelan titik pantul pertama tanpa perubahan tata letak',
            typologyId === 'clinic' || typologyId === 'studio' || typologyId === 'office'
              ? 'Drop-down perimeter acoustic seal pada pintu & isolasi plenum HVAC'
              : 'Pengukuran kalibrasi ulang ISO 3382-1 sebelum serah terima',
          ]
        : [
            `~${baffleAreaM2} m² micro-perforated ceiling baffles & concealed felt planes (NRC 0.85)`,
            severity === 'high'
              ? 'Mathematically spaced timber slat diffusers along primary reflection walls'
              : 'Targeted first-reflection tuning with zero structural demolition',
            typologyId === 'clinic' || typologyId === 'studio' || typologyId === 'office'
              ? 'Automatic acoustic door drop-seals & HVAC plenum damping wrap'
              : 'Closing ISO 3382-1 impulse retest before studio sign-off',
          ];

    return {
      volume: Math.round(volume),
      estRt60: Number(estRt60.toFixed(2)),
      targetMin: typology.targetMin,
      targetMax: typology.targetMax,
      targetMid: Number(targetMid.toFixed(2)),
      extraSabins: Math.round(extraSabins),
      baffleAreaM2,
      severity,
      statusText,
      recommendations,
      typologyLabel: typology.label,
      surfaceLabel: surface.label,
    };
  }, [area, height, typologyId, surfaceId, m, lang]);

  if (!isOpen) return null;

  const handleDownloadBrief = () => {
    const lines = [
      'REDAM ACOUSTICS · SABINE RT60 PRELIMINARY BRIEF [HYPOTHESIS]',
      '------------------------------------------------------------',
      `Space Typology : ${calculation.typologyLabel}`,
      `Dominant Finish: ${calculation.surfaceLabel}`,
      `Dimensions     : ${area} m2 x ${height.toFixed(1)} m (${calculation.volume} m3)`,
      `Baseline RT60  : ${calculation.estRt60} s`,
      `ISO 3382 Target: ${calculation.targetMin} s - ${calculation.targetMax} s`,
      `Added Sabins   : +${calculation.extraSabins} m2 Sabins (~${calculation.baffleAreaM2} m2 treatment)`,
      `Contact        : ${contactName || 'N/A'} (${contactEmail || 'N/A'})`,
      '',
      'Recommended Non-Invasive Scope:',
      ...calculation.recommendations.map((item, idx) => `  ${idx + 1}. ${item}`),
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redam-rt60-brief-${typologyId}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const maxScale = 2.6;
  const estPct = Math.min(100, (calculation.estRt60 / maxScale) * 100);
  const targetPct = Math.min(100, (calculation.targetMid / maxScale) * 100);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="redam-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-testid="audit-modal"
    >
      <div className="modal-panel">
        <div className="modal-header">
          <div>
            <span className="modal-badge">{m.badge}</span>
            <h2 id="redam-modal-title" className="modal-title">
              {m.title}
            </h2>
            <p className="modal-subtitle">{m.subtitle}</p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label={m.closeAria}
          >
            ✕
          </button>
        </div>

        <div className="modal-grid">
          <div className="modal-controls">
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="audit-area">{m.areaLabel}</label>
                <output className="mono-value" htmlFor="audit-area" data-testid="audit-area-out">
                  {area} m²
                </output>
              </div>
              <input
                id="audit-area"
                type="range"
                min="25"
                max="500"
                step="5"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="redam-range"
              />
            </div>

            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="audit-height">{m.heightLabel}</label>
                <output className="mono-value" htmlFor="audit-height">
                  {height.toFixed(1)} m
                </output>
              </div>
              <input
                id="audit-height"
                type="range"
                min="2.6"
                max="8.0"
                step="0.2"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="redam-range"
              />
            </div>

            <div className="control-group">
              <span className="control-label">{m.typologyLabel}</span>
              <div className="chip-grid">
                {m.typologies.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`select-chip ${typologyId === item.id ? 'is-active' : ''}`}
                    onClick={() => setTypologyId(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <span className="control-label">{m.surfaceLabel}</span>
              <div className="surface-stack">
                {m.surfaces.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`surface-btn ${surfaceId === item.id ? 'is-active' : ''}`}
                    onClick={() => setSurfaceId(item.id)}
                  >
                    <span>{item.label}</span>
                    <span className="mono-alpha">α {item.alpha}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-output">
            <div className={`rt60-readout-card is-${calculation.severity}`}>
              <div className="rt60-status-pill">{calculation.statusText}</div>
              <div className="rt60-main-numbers">
                <div>
                  <span className="rt60-caption">{m.resultEstLabel}</span>
                  <div className="rt60-big-value" data-testid="rt60-value">
                    {calculation.estRt60}s
                  </div>
                </div>
                <div className="rt60-target-box">
                  <span className="rt60-caption">{m.resultTargetLabel}</span>
                  <div className="rt60-target-value">
                    {calculation.targetMin}s - {calculation.targetMax}s
                  </div>
                </div>
              </div>

              {/* Acoustic Comparison Bar */}
              <div className="rt60-bars" aria-hidden="true">
                <div className="rt60-bar-row">
                  <span className="rt60-bar-label">BASELINE</span>
                  <div className="rt60-bar-track">
                    <div className="rt60-bar-fill rt60-bar-fill--est" style={{ width: `${estPct}%` }} />
                  </div>
                </div>
                <div className="rt60-bar-row">
                  <span className="rt60-bar-label">TARGET</span>
                  <div className="rt60-bar-track">
                    <div className="rt60-bar-fill rt60-bar-fill--target" style={{ width: `${targetPct}%` }} />
                  </div>
                </div>
              </div>

              <div className="rt60-meta-strip">
                <div>
                  <span className="rt60-meta-k">{m.resultVolumeLabel}</span>
                  <strong className="rt60-meta-v">{calculation.volume} m³</strong>
                </div>
                <div>
                  <span className="rt60-meta-k">{m.resultAbsLabel}</span>
                  <strong className="rt60-meta-v">+{calculation.extraSabins} Sabins</strong>
                </div>
              </div>
            </div>

            <div className="package-box">
              <h3 className="package-heading">{m.packageHeading}</h3>
              <ul className="package-list">
                {calculation.recommendations.map((rec) => (
                  <li key={rec}>{rec}</li>
                ))}
              </ul>
            </div>

            {submitted ? (
              <div className="audit-confirmed" role="status" data-testid="audit-confirmed">
                <h3>{m.confirmedTitle}</h3>
                <p>{m.confirmedBody}</p>
                <div className="audit-confirm-actions">
                  <button type="button" className="btn-pine" onClick={handleDownloadBrief}>
                    {m.downloadBtn}
                  </button>
                  <button
                    type="button"
                    className="btn-outline-pine"
                    onClick={() => setSubmitted(false)}
                  >
                    {m.resetBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form className="audit-form" onSubmit={handleSubmit}>
                <div className="audit-form-inputs">
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={m.namePlaceholder}
                    aria-label={m.namePlaceholder}
                    className="audit-input"
                  />
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder={m.emailPlaceholder}
                    aria-label={m.emailPlaceholder}
                    className="audit-input"
                  />
                </div>
                <div className="audit-form-actions">
                  <button type="submit" className="btn-pine">
                    {m.submitBtn}
                  </button>
                  <button type="button" className="btn-outline-pine" onClick={handleDownloadBrief}>
                    {m.downloadBtn}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
