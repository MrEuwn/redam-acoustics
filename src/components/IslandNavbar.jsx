import React, { useEffect, useRef } from 'react';

export function IslandNavbar({
  copy,
  lang,
  onToggleLang,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onOpenAudit,
  dampened,
  onToggleDampen,
  audioActive,
  onToggleAudio,
}) {
  const islandRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseMenu();
      }
    };
    const onPointerDown = (e) => {
      if (islandRef.current && !islandRef.current.contains(e.target)) {
        onCloseMenu();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen, onCloseMenu]);

  return (
    <header className="island-header" role="banner">
      <div
        ref={islandRef}
        className={`island-shell ${menuOpen ? 'is-open' : ''}`}
      >
        <div className="island-bar">
          <div className="island-left">
            <button
              type="button"
              className={`island-pill island-menu-btn ${menuOpen ? 'is-inverted' : ''}`}
              onClick={onToggleMenu}
              aria-expanded={menuOpen}
              aria-controls="redam-island-menu"
              data-testid="menu-toggle"
            >
              {menuOpen ? copy.nav.close : copy.nav.menu}
            </button>

            <button
              type="button"
              className={`island-lang-btn ${menuOpen ? 'is-inverted' : ''}`}
              onClick={onToggleLang}
              aria-label={copy.langSwitchAria}
              data-testid="lang-toggle"
            >
              {copy.langSwitchLabel}
            </button>
          </div>

          <a
            href="#top"
            className="island-brand"
            onClick={onCloseMenu}
            aria-label={`${copy.brand} Home`}
          >
            {copy.brand}
          </a>

          <div className="island-right">
            <button
              type="button"
              className={`island-pill island-cta-btn ${menuOpen ? 'is-inverted' : ''}`}
              onClick={() => {
                onCloseMenu();
                onOpenAudit();
              }}
              data-testid="nav-audit-btn"
            >
              {copy.nav.cta}
            </button>
          </div>
        </div>

        <nav
          id="redam-island-menu"
          className="island-dropdown"
          aria-label={lang === 'id' ? 'Navigasi Utama' : 'Primary Navigation'}
          aria-hidden={!menuOpen}
        >
          <div className="island-dropdown-inner">
            <ul className="island-links">
              {copy.nav.links.map((item) => (
                <li key={item.id} className="island-link-item">
                  <a
                    href={`#${item.id}`}
                    className="island-link"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={onCloseMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Discreet Optional Acoustic Lab Controls tucked inside expanded drawer */}
            <div className="island-lab-controls">
              <button
                type="button"
                className={`island-lab-pill ${dampened ? 'is-active' : ''}`}
                tabIndex={menuOpen ? 0 : -1}
                onClick={onToggleDampen}
                aria-pressed={dampened}
                data-testid="dampen-toggle"
              >
                {dampened ? copy.nav.dampenOn : copy.nav.dampenOff}
              </button>
              <button
                type="button"
                className={`island-lab-pill ${audioActive ? 'is-active' : ''}`}
                tabIndex={menuOpen ? 0 : -1}
                onClick={onToggleAudio}
                aria-pressed={audioActive}
              >
                {audioActive ? copy.nav.audioOn : copy.nav.audioOff}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
