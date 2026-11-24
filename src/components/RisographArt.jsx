import React from 'react';

/**
 * Shared SVG definitions for REDAM's 3-ink risograph texture
 * and Deep Pine duotone photographic treatment.
 */
export function RisographDefs() {
  return (
    <svg
      aria-hidden="true"
      data-art="redam-risograph-defs"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        {/* Deep Pine Duotone filter: shadows -> #0E241E, mids -> #2A6353, highlights -> #E5ECE9 */}
        <filter id="redam-pine-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="
              0.2126 0.7152 0.0722 0 0
              0.2126 0.7152 0.0722 0 0
              0.2126 0.7152 0.0722 0 0
              0      0      0      1 0"
            result="gray"
          />
          <feComponentTransfer in="gray" result="duotone">
            <feFuncR type="table" tableValues="0.055 0.16 0.85" />
            <feFuncG type="table" tableValues="0.141 0.39 0.90" />
            <feFuncB type="table" tableValues="0.118 0.32 0.88" />
          </feComponentTransfer>
        </filter>

        {/* Subtle risograph ink hatching pattern */}
        <pattern
          id="riso-hatch-pine"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="#0E241E" strokeWidth="1.4" strokeOpacity="0.22" />
        </pattern>

        <pattern
          id="riso-dots-chartreuse"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.15" fill="#0E241E" fillOpacity="0.16" />
        </pattern>
      </defs>
    </svg>
  );
}

/**
 * Hero Background Hand-Drawn Acoustic Wave Ribbons.
 * Morphs cleanly between turbulent echo peaks (OFF) and calm harmonic lines (ON).
 */
export function HeroAcousticWaves({ dampened }) {
  const topPath = dampened
    ? 'M -20 118 C 180 112, 340 124, 540 118 C 740 112, 920 123, 1120 118 C 1280 114, 1380 120, 1480 118'
    : 'M -20 126 L 80 78 L 140 162 L 215 62 L 295 170 L 380 86 L 465 152 L 555 58 L 645 174 L 740 88 L 835 162 L 940 72 L 1030 154 L 1140 82 L 1260 150 L 1380 94 L 1480 126';

  const midPath = dampened
    ? 'M -20 210 C 210 205, 420 215, 640 210 C 860 205, 1080 215, 1480 210'
    : 'M -20 210 L 95 256 L 175 156 L 260 264 L 350 148 L 435 250 L 535 162 L 625 270 L 725 144 L 820 258 L 920 168 L 1015 248 L 1125 160 L 1240 252 L 1360 176 L 1480 210';

  const botPath = dampened
    ? 'M -20 302 C 260 299, 510 305, 760 302 C 1010 299, 1260 305, 1480 302'
    : 'M -20 302 L 110 272 L 190 338 L 280 264 L 370 342 L 470 278 L 570 334 L 675 266 L 785 344 L 895 274 L 1010 336 L 1135 272 L 1270 332 L 1480 302';

  return (
    <svg
      className={`hero-waves-svg ${dampened ? 'is-dampened' : ''}`}
      viewBox="0 0 1440 380"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      data-art="redam-risograph"
    >
      <path
        className="hero-wave-path hero-wave-path--primary"
        d={topPath}
        stroke="#0E241E"
        strokeWidth={dampened ? '2.2' : '2.6'}
        strokeOpacity={dampened ? '0.16' : '0.13'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="hero-wave-path hero-wave-path--accent"
        d={midPath}
        stroke={dampened ? '#0B6B56' : '#0E241E'}
        strokeWidth={dampened ? '2.8' : '2'}
        strokeOpacity={dampened ? '0.28' : '0.1'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="hero-wave-path hero-wave-path--subtle"
        d={botPath}
        stroke="#0E241E"
        strokeWidth="1.6"
        strokeOpacity={dampened ? '0.11' : '0.09'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dampened ? 'none' : '8 7'}
      />
    </svg>
  );
}

/**
 * Hero Bespoke 3-Ink New-Yorker / Risograph Acoustic Engineer Character.
 * Hand-crafted calligraphic ink paths, intentional chartreuse screenprint fill offset,
 * studio headphones, and an analog Class-1 SPL meter that calms down in Dampen Mode.
 */
export function HeroAcousticCharacter({ dampened }) {
  return (
    <svg
      className={`hero-character-svg ${dampened ? 'is-dampened' : ''}`}
      viewBox="0 0 540 690"
      fill="none"
      role="img"
      aria-label={
        dampened
          ? 'Ilustrasi insinyur akustik REDAM mengenakan headphone studio dengan gestur tenang saat Mode Redam aktif'
          : 'Ilustrasi insinyur akustik REDAM memegang pengukur desibel di tengah gelombang pantulan ruang'
      }
      data-art="redam-risograph"
    >
      {/* Dynamic Sound Energy Sparks / Serene Harmonic Halos around Headphones */}
      <g className={`char-waves ${dampened ? 'is-calm' : 'is-noisy'}`}>
        {dampened ? (
          <>
            <path
              d="M78 158 C118 148, 152 168, 192 158"
              stroke="#0B6B56"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M64 184 C108 176, 146 192, 186 184"
              stroke="#0E241E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            <path
              d="M398 148 C432 140, 464 156, 498 148"
              stroke="#0B6B56"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M406 176 C438 170, 468 182, 504 176"
              stroke="#0E241E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            <circle cx="116" cy="126" r="6" fill="#C7F238" stroke="#0E241E" strokeWidth="2.5" />
            <circle cx="460" cy="118" r="5" fill="#C7F238" stroke="#0E241E" strokeWidth="2.5" />
          </>
        ) : (
          <>
            <path
              d="M64 140 L102 118 L116 156 L154 126 L176 158"
              stroke="#0E241E"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M48 182 L88 168 L104 202 L144 176 L166 196"
              stroke="#0B6B56"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M402 126 L432 98 L448 138 L484 108 L508 144"
              stroke="#0E241E"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M412 178 L446 164 L462 194 L496 166"
              stroke="#0B6B56"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Jagged chartreuse ping triangle accents */}
            <polygon points="150,90 174,100 156,114" fill="#C7F238" stroke="#0E241E" strokeWidth="2.8" strokeLinejoin="round" />
            <polygon points="444,68 468,74 452,92" fill="#C7F238" stroke="#0E241E" strokeWidth="2.8" strokeLinejoin="round" />
          </>
        )}
      </g>

      {/* Studio Headphone Arch (Behind Head Crown) */}
      <path
        d="M214 148 C206 62, 344 58, 340 148"
        stroke="#0E241E"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M222 142 C216 74, 334 70, 332 142"
        stroke="#C7F238"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Tailored Lower Trousers Silhouette (Solid Deep Pine Ink Base) */}
      <path
        d="M190 544 L394 552 L374 686 L192 686 L202 606 L142 586 C166 576, 182 564, 190 544 Z"
        fill="#0E241E"
      />
      {/* Crisp white trouser side pleat highlight */}
      <path
        d="M360 564 L388 564 L370 684 L344 684 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M356 594 L350 676"
        stroke="#0E241E"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Jacket Base White Paper Silhouette */}
      <path
        d="M174 344 C204 316, 232 292, 248 278 L368 276 C408 296, 444 328, 466 364 C478 398, 456 488, 408 568 L188 560 C174 494, 162 414, 174 344 Z"
        fill="#FFFFFF"
      />

      {/* Risograph Chartreuse Coat Color Plate (Intentional Slight Screenprint Offset!) */}
      <path
        d="M188 352 C218 324, 246 300, 260 288 L374 286 C406 306, 434 334, 446 370 C454 410, 424 494, 386 566 L194 558 C184 490, 174 416, 188 352 Z"
        fill="#C7F238"
      />
      {/* Subtle risograph ink hatching on jacket shadow side */}
      <path
        d="M352 332 L442 368 C448 418, 422 492, 384 562 L322 558 Z"
        fill="url(#riso-hatch-pine)"
      />

      {/* Crisp White Dress Shirt & Deep Pine Tie */}
      <path
        d="M254 274 L306 312 L348 272 L302 426 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Shirt Collar Flaps */}
      <path
        d="M248 272 L288 318 L254 344 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M352 268 L314 318 L354 342 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Tie Knot & Blade */}
      <path
        d="M288 312 L314 312 L306 336 L294 336 Z"
        fill="#0E241E"
      />
      <path
        d="M294 336 L306 336 L316 446 L296 470 L282 444 Z"
        fill="#0E241E"
      />

      {/* Expressive Calligraphic Jacket Lapels, Seams & Pocket Square */}
      <path
        d="M244 276 L174 348 C158 394, 166 478, 186 562 L398 568 C436 502, 474 420, 466 362 C448 326, 412 294, 366 274"
        stroke="#0E241E"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Lapel */}
      <path
        d="M244 280 L226 346 L246 354 L232 378 L272 448"
        stroke="#0E241E"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Lapel */}
      <path
        d="M366 276 L388 342 L366 354 L378 378 L316 456"
        stroke="#0E241E"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Breast Pocket + Crisp White Pocket Square */}
      <path
        d="M362 396 C378 386, 396 388, 404 398 L364 402 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      <path
        d="M358 402 L408 402"
        stroke="#0E241E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Expressive Dry-Brush Shoulder Fold Lines */}
      <path d="M416 322 L442 308" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M424 334 L452 322" stroke="#0E241E" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M412 414 L448 400" stroke="#0E241E" strokeWidth="3.8" strokeLinecap="round" />
      <path d="M406 428 L442 414" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M424 510 L414 562" stroke="#0E241E" strokeWidth="4.5" strokeLinecap="round" />

      {/* Tall Iconic Mid-Century Architectural Neck & Head Silhouette */}
      <path
        d="M242 292 L254 114 C256 96, 304 94, 314 114 L352 276 C322 308, 272 310, 242 292 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sculpted Pompadour Hair with Crisp White Comb Lines */}
      <path
        d="M246 108 C236 86, 256 68, 286 72 C308 75, 326 88, 326 112 C314 110, 284 108, 246 108 Z"
        fill="#0E241E"
      />
      <path
        d="M262 82 C276 80, 294 84, 304 94"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M256 92 C272 90, 292 94, 304 102"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Sideburn accent */}
      <path
        d="M312 114 L328 114 L328 144 L314 148 Z"
        fill="#0E241E"
      />
      <path d="M314 124 L326 124" stroke="#FFFFFF" strokeWidth="2.2" />

      {/* Studio Over-Ear Headphone Cups (Left & Right) */}
      <g className="char-headphones">
        {/* Left Cup */}
        <rect
          x="198"
          y="138"
          width="32"
          height="58"
          rx="14"
          fill="#0E241E"
          stroke="#0E241E"
          strokeWidth="4"
        />
        <rect
          x="224"
          y="144"
          width="14"
          height="46"
          rx="6"
          fill="#C7F238"
          stroke="#0E241E"
          strokeWidth="3.5"
        />
        {/* Right Cup */}
        <rect
          x="324"
          y="138"
          width="32"
          height="58"
          rx="14"
          fill="#0E241E"
          stroke="#0E241E"
          strokeWidth="4"
        />
        <rect
          x="316"
          y="144"
          width="14"
          height="46"
          rx="6"
          fill="#C7F238"
          stroke="#0E241E"
          strokeWidth="3.5"
        />
        {/* Acoustic vent bars on cups */}
        <line x1="208" y1="158" x2="218" y2="158" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="208" y1="168" x2="218" y2="168" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="208" y1="178" x2="218" y2="178" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="336" y1="158" x2="346" y2="158" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="336" y1="168" x2="346" y2="168" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="336" y1="178" x2="346" y2="178" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      </g>

      {/* Expressive Minimalist Editorial Face (Reacts to Dampen Mode!) */}
      <g className="char-face">
        {/* Eyebrows */}
        <path
          d={dampened ? 'M264 134 C270 131, 276 131, 281 134' : 'M262 130 L282 135'}
          stroke="#0E241E"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <path
          d={dampened ? 'M294 134 C300 131, 306 131, 311 134' : 'M292 135 L312 128'}
          stroke="#0E241E"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        {/* Eyes: serene closed crescents when dampened, crisp alert dots when noisy */}
        {dampened ? (
          <>
            <path d="M266 150 C270 155, 276 155, 280 150" stroke="#0E241E" strokeWidth="3.8" strokeLinecap="round" />
            <path d="M294 150 C298 155, 304 155, 308 150" stroke="#0E241E" strokeWidth="3.8" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="272" cy="149" rx="3.8" ry="5.2" fill="#0E241E" />
            <ellipse cx="300" cy="149" rx="3.8" ry="5.2" fill="#0E241E" />
          </>
        )}
        {/* Sharp Geometric Editorial Nose */}
        <path
          d="M284 148 L278 176 L296 176"
          stroke="#0E241E"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Mouth: gentle calm smile vs taut focused line */}
        <path
          d={dampened ? 'M280 192 C288 199, 298 198, 306 190' : 'M284 194 L301 191'}
          stroke="#0E241E"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        {/* Cheek crease line */}
        <path d="M304 172 C308 176, 310 180, 311 184" stroke="#0E241E" strokeWidth="2.6" strokeLinecap="round" />
      </g>

      {/* Foreground Dynamic Arms Group: Smoothly shifts between Measuring dB and Calm Folded Poise */}
      <g className={`char-arms-group ${dampened ? 'is-calm' : 'is-measuring'}`}>
        {/* Left Forearm Crossing Chest (Chartreuse sleeve + White cuff + Inked Fingers) */}
        <path
          d="M174 352 C142 396, 108 444, 102 478 C98 504, 134 522, 186 508 L302 472 L292 424 L178 448 L206 382"
          fill="#C7F238"
          stroke="#0E241E"
          strokeWidth="5.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Crisp White Shirt Cuff */}
        <path
          d="M262 434 L308 424 L318 470 L272 480 Z"
          fill="#FFFFFF"
          stroke="#0E241E"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <circle cx="282" cy="462" r="3.2" fill="#0E241E" />
        <circle cx="296" cy="458" r="3.2" fill="#0E241E" />

        {/* Right Forearm Folding Back Across Waist */}
        <path
          d="M448 378 C432 434, 392 496, 344 514 C298 530, 240 502, 198 486 L216 446 C262 458, 304 470, 340 462 C372 454, 396 414, 412 372"
          fill="#C7F238"
          stroke="#0E241E"
          strokeWidth="5.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Expressive Dark Shadow Slash Under Folded Arm */}
        <path
          d="M236 502 L344 518 L334 536 L226 516 Z"
          fill="#0E241E"
        />

        {/* Inked Right Hand Fingers resting cleanly over left bicep */}
        <path
          d="M214 446 C188 432, 154 426, 134 434 C122 440, 126 450, 146 452 C122 452, 118 464, 142 466 C122 468, 124 478, 152 478 C176 480, 198 486, 212 484 Z"
          fill="#FFFFFF"
          stroke="#0E241E"
          strokeWidth="4.2"
          strokeLinejoin="round"
        />
        <path d="M144 448 L192 452" stroke="#0E241E" strokeWidth="3" strokeLinecap="round" />
        <path d="M142 462 L190 464" stroke="#0E241E" strokeWidth="3" strokeLinecap="round" />

        {/* Left Hand Holding Precision Analog SPL Meter */}
        <g className="char-spl-meter">
          {/* Hand */}
          <path
            d="M312 426 C334 416, 362 414, 376 426 C386 436, 374 452, 356 456 C338 462, 322 466, 316 466 Z"
            fill="#FFFFFF"
            stroke="#0E241E"
            strokeWidth="4.2"
            strokeLinejoin="round"
          />
          {/* Class-1 Measurement Mic Tip & Meter Body */}
          <rect
            x="342"
            y="344"
            width="50"
            height="86"
            rx="12"
            fill="#0E241E"
            stroke="#0E241E"
            strokeWidth="4"
          />
          {/* Mic Capsule Probe */}
          <line x1="367" y1="344" x2="367" y2="308" stroke="#0E241E" strokeWidth="6" strokeLinecap="round" />
          <circle cx="367" cy="304" r="7" fill="#C7F238" stroke="#0E241E" strokeWidth="3.5" />
          {/* Analog Meter Dial Face */}
          <rect x="350" y="354" width="34" height="28" rx="6" fill="#FFFFFF" />
          <path d="M355 376 C360 364, 374 364, 379 376" stroke="#0E241E" strokeWidth="2.2" fill="none" />
          {/* Live Pivoting dB Needle */}
          <line
            className="spl-needle"
            x1="367"
            y1="378"
            x2={dampened ? '357' : '379'}
            y2={dampened ? '364' : '360'}
            stroke={dampened ? '#0B6B56' : '#0E241E'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="367" cy="378" r="2.6" fill="#0E241E" />
          {/* Indicator LED Pill */}
          <rect
            x="355"
            y="392"
            width="24"
            height="9"
            rx="4.5"
            fill={dampened ? '#C7F238' : '#FFFFFF'}
          />
          <line x1="357" y1="412" x2="377" y2="412" stroke="#C7F238" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Section 3 Lounging Character perched directly atop the giant chartreuse typography
 * on the #0E241E Deep Pine polarity flip section (matching Ordix's witty editorial beat).
 */
export function LoungingCharacter() {
  return (
    <svg
      className="lounging-char-svg"
      viewBox="0 0 380 220"
      fill="none"
      aria-hidden="true"
      data-art="redam-risograph"
    >
      {/* Reclining Body Silhouette resting cleanly across the letter top */}
      <path
        d="M28 118 C68 88, 132 82, 188 86 L256 96 L338 88 C356 88, 364 102, 356 114 C346 124, 294 128, 250 126 L160 124 L42 126 Z"
        fill="#0E241E"
        stroke="#FFFFFF"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      {/* Jacket Lapel & Interior Hatching */}
      <path d="M120 92 L166 116 L184 96" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M96 96 L138 122" stroke="#C7F238" strokeWidth="3" strokeLinecap="round" />

      {/* Propped Head Wearing Studio Headphones */}
      <g transform="translate(216, 18)">
        {/* Pompadour White Hair Mass */}
        <path
          d="M42 14 C56 2, 74 4, 80 18 C92 18, 96 34, 86 44 C94 52, 84 68, 66 64 Z"
          fill="#FFFFFF"
          stroke="#0E241E"
          strokeWidth="2.5"
        />
        {/* Tilted Head Outline */}
        <path
          d="M46 28 C64 26, 76 42, 70 62 L44 98 C24 104, 4 94, 4 76 L26 40 C32 32, 38 28, 46 28 Z"
          fill="#0E241E"
          stroke="#FFFFFF"
          strokeWidth="3.6"
          strokeLinejoin="round"
        />
        {/* Studio Headphone Cup */}
        <rect
          x="52"
          y="46"
          width="24"
          height="32"
          rx="10"
          transform="rotate(24 52 46)"
          fill="#C7F238"
          stroke="#0E241E"
          strokeWidth="3"
        />
        <path d="M22 36 C32 10, 64 14, 72 44" stroke="#C7F238" strokeWidth="4.2" strokeLinecap="round" />
        {/* Expressive Confident Face */}
        <path d="M24 54 L36 56" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M44 58 L54 62" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="28" cy="64" r="2.6" fill="#FFFFFF" />
        <circle cx="46" cy="69" r="2.6" fill="#FFFFFF" />
        <path d="M36 64 L30 78 L42 78" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 84 C32 90, 42 88, 48 82" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Resting Right Hand Propping Chin */}
      <path
        d="M276 112 C288 102, 304 106, 304 122 C304 134, 290 144, 274 140 C264 138, 266 120, 276 112 Z"
        fill="#0E241E"
        stroke="#FFFFFF"
        strokeWidth="3.4"
      />
      <line x1="280" y1="118" x2="294" y2="128" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="276" y1="126" x2="290" y2="136" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />

      {/* Foreground Arm Draping Over the Giant Letter & Pointing Downward! */}
      <path
        d="M114 94 C138 110, 162 138, 176 160 L194 148 C178 122, 158 98, 134 86"
        fill="#0E241E"
        stroke="#FFFFFF"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crisp Chartreuse Cuff */}
      <path
        d="M168 152 L192 140 L200 152 L176 164 Z"
        fill="#C7F238"
        stroke="#0E241E"
        strokeWidth="2.6"
      />
      {/* Pointing Index Hand Dropping Below the Baseline */}
      <path
        d="M178 164 L196 154 L214 198 C216 206, 206 210, 202 202 L190 176 L184 184 C178 186, 174 176, 178 164 Z"
        fill="#0E241E"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Section 8 Serene Floating Meditating Character wearing studio headphones,
 * levitating peacefully in front of giant #C7F238 typography on #0E241E.
 */
export function MeditatingCharacter() {
  return (
    <svg
      className="meditating-char-svg"
      viewBox="0 0 420 290"
      fill="none"
      aria-hidden="true"
      data-art="redam-risograph"
    >
      {/* Headphone Arc & Serene Head */}
      <path d="M180 56 C180 14, 240 14, 240 56" stroke="#C7F238" strokeWidth="6" strokeLinecap="round" />
      <rect x="168" y="44" width="16" height="30" rx="7" fill="#C7F238" stroke="#0E241E" strokeWidth="3" />
      <rect x="236" y="44" width="16" height="30" rx="7" fill="#C7F238" stroke="#0E241E" strokeWidth="3" />

      {/* Head */}
      <path
        d="M190 42 C192 26, 228 26, 230 42 L232 82 C220 94, 200 94, 188 82 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      {/* Hair cap */}
      <path d="M189 44 C190 22, 230 22, 231 44 C220 38, 202 38, 189 44 Z" fill="#0E241E" />
      {/* Closed serene eyes & peaceful smile */}
      <path d="M196 58 C200 63, 206 63, 209 58" stroke="#0E241E" strokeWidth="3" strokeLinecap="round" />
      <path d="M214 58 C218 63, 224 63, 227 58" stroke="#0E241E" strokeWidth="3" strokeLinecap="round" />
      <path d="M204 74 C210 78, 216 78, 220 74" stroke="#0E241E" strokeWidth="2.8" strokeLinecap="round" />

      {/* White Tailored Jacket Torso */}
      <path
        d="M164 102 L256 102 L242 204 L178 204 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Jacket Lapels */}
      <path d="M184 102 L210 176 L236 102" fill="#0E241E" />
      <path d="M192 102 L210 156 L228 102 Z" fill="#FFFFFF" />
      {/* Electric Chartreuse Tie */}
      <path
        d="M204 104 L216 104 L220 184 L210 198 L200 184 Z"
        fill="#C7F238"
        stroke="#0E241E"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* Pocket detail */}
      <path d="M226 126 L244 126 L242 134 L228 134 Z" fill="#FFFFFF" stroke="#0E241E" strokeWidth="2.6" />

      {/* Left Extended Meditating Arm */}
      <path
        d="M164 104 L126 168 L62 178 L66 198 L142 190 L176 140"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Left Hand in Acoustic Calm Mudra */}
      <path
        d="M62 178 C46 174, 30 166, 20 174 C14 180, 26 188, 36 188 C22 192, 24 202, 42 200 L66 196 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="184" r="5" fill="#C7F238" stroke="#0E241E" strokeWidth="2.4" />

      {/* Right Extended Meditating Arm */}
      <path
        d="M256 104 L294 168 L358 178 L354 198 L278 190 L244 140"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Right Hand in Acoustic Calm Mudra */}
      <path
        d="M358 178 C374 174, 390 166, 400 174 C406 180, 394 188, 384 188 C398 192, 396 202, 378 200 L354 196 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <circle cx="376" cy="184" r="5" fill="#C7F238" stroke="#0E241E" strokeWidth="2.4" />

      {/* Crossed Lotus Legs (Crisp White Pants + Dark Shoes) */}
      <path
        d="M174 200 C118 200, 96 218, 126 242 C164 268, 224 260, 286 244 C318 234, 326 210, 294 202 C264 196, 228 214, 174 200 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Crossing leg seam */}
      <path d="M134 218 C178 232, 240 248, 288 238" stroke="#0E241E" strokeWidth="3.8" strokeLinecap="round" />
      <path d="M286 214 C244 232, 186 254, 134 268" stroke="#0E241E" strokeWidth="3.8" strokeLinecap="round" />
      {/* Floating Slip-on Shoes */}
      <path
        d="M126 264 C110 264, 102 276, 120 278 C142 280, 160 272, 162 264 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="3.4"
      />
      <path
        d="M274 252 C292 252, 306 260, 298 268 C286 274, 264 268, 262 258 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="3.4"
      />
      {/* Subtle Levitation Wave Shadow */}
      <path d="M168 282 C196 286, 224 286, 252 282" stroke="#C7F238" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.65" />
    </svg>
  );
}

/**
 * Section 2 Diagnosis Card Hand-Inked 3-Ink Editorial Spot Illustrations.
 */
export function DiagnosisSpotIllustration({ variant }) {
  switch (variant) {
    case 'glass':
      return (
        <svg viewBox="0 0 180 128" fill="none" className="spot-svg" aria-hidden="true" data-art="redam-risograph">
          {/* Curtain Wall Glass Pane with Risograph Offset */}
          <rect x="28" y="16" width="118" height="92" rx="8" fill="#C7F238" transform="translate(6 5)" />
          <rect x="24" y="14" width="118" height="92" rx="8" fill="#FFFFFF" stroke="#0E241E" strokeWidth="3.5" />
          <line x1="83" y1="14" x2="83" y2="106" stroke="#0E241E" strokeWidth="3" />
          <line x1="24" y1="60" x2="142" y2="60" stroke="#0E241E" strokeWidth="2.5" strokeDasharray="5 4" />
          {/* Sharp Bouncing Acoustic Rays */}
          <path d="M36 92 L78 28 L124 88 L158 34" stroke="#0E241E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="164,25 148,32 160,44" fill="#0E241E" />
          <circle cx="78" cy="28" r="5.5" fill="#C7F238" stroke="#0E241E" strokeWidth="2.8" />
          <circle cx="124" cy="88" r="5.5" fill="#C7F238" stroke="#0E241E" strokeWidth="2.8" />
        </svg>
      );
    case 'hvac':
      return (
        <svg viewBox="0 0 180 128" fill="none" className="spot-svg" aria-hidden="true" data-art="redam-risograph">
          {/* Metal Duct Trunk */}
          <path d="M18 22 L156 22 L156 58 L18 58 Z" fill="#C7F238" transform="translate(5 5)" />
          <path d="M16 20 L154 20 L154 56 L16 56 Z" fill="#FFFFFF" stroke="#0E241E" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Grille Louvers */}
          <line x1="48" y1="30" x2="122" y2="30" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="48" y1="40" x2="122" y2="40" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="48" y1="50" x2="122" y2="50" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
          {/* Low-Frequency Drone Rings */}
          <path d="M56 72 C74 84, 98 84, 116 72" stroke="#0E241E" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M40 88 C68 106, 104 106, 132 88" stroke="#0E241E" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M28 104 C64 124, 108 124, 144 104" stroke="#0B6B56" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 5" />
        </svg>
      );
    case 'partition':
      return (
        <svg viewBox="0 0 180 128" fill="none" className="spot-svg" aria-hidden="true" data-art="redam-risograph">
          {/* Thin Wall Slab */}
          <rect x="86" y="14" width="14" height="82" rx="3" fill="#C7F238" stroke="#0E241E" strokeWidth="3.4" />
          {/* Floor Line with 6mm Undercut Leak Gap */}
          <line x1="18" y1="108" x2="164" y2="108" stroke="#0E241E" strokeWidth="4" strokeLinecap="round" />
          {/* Sound Wave Passing Directly Through Partition & Under Door Gap */}
          <path d="M22 48 C42 30, 56 66, 76 48 C96 30, 110 66, 130 48 C144 36, 154 52, 162 46" stroke="#0E241E" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M36 98 C58 90, 74 104, 93 102 C112 100, 128 92, 154 100" stroke="#0B6B56" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="93" cy="102" r="5" fill="#C7F238" stroke="#0E241E" strokeWidth="2.6" />
        </svg>
      );
    case 'ceiling':
      return (
        <svg viewBox="0 0 180 128" fill="none" className="spot-svg" aria-hidden="true" data-art="redam-risograph">
          {/* High Concrete Vault Slab */}
          <rect x="20" y="12" width="140" height="20" rx="4" fill="#0E241E" />
          <line x1="20" y1="112" x2="160" y2="112" stroke="#0E241E" strokeWidth="4" strokeLinecap="round" />
          {/* Vertical Flutter Echo Arrows */}
          <path d="M52 36 L52 104" stroke="#0E241E" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M44 48 L52 36 L60 48" stroke="#0E241E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 92 L52 104 L60 92" stroke="#0E241E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Center Resonant Pill */}
          <rect x="76" y="42" width="28" height="58" rx="14" fill="#C7F238" stroke="#0E241E" strokeWidth="3.4" />
          <path d="M90 54 L90 88" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M128 36 L128 104" stroke="#0E241E" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M120 48 L128 36 L136 48" stroke="#0E241E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M120 92 L128 104 L136 92" stroke="#0E241E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 180 128" fill="none" className="spot-svg" aria-hidden="true" data-art="redam-risograph">
          {/* Street Window Frame Vibrating */}
          <rect x="78" y="18" width="78" height="86" rx="8" fill="#C7F238" transform="translate(5 5)" />
          <rect x="74" y="16" width="78" height="86" rx="8" fill="#FFFFFF" stroke="#0E241E" strokeWidth="3.5" />
          <line x1="113" y1="16" x2="113" y2="102" stroke="#0E241E" strokeWidth="3" />
          {/* Heavy Low-End Street Rumble Arcs */}
          <path d="M22 30 C36 48, 36 78, 22 96" stroke="#0E241E" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M42 22 C60 46, 60 82, 42 104" stroke="#0E241E" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M62 34 C74 52, 74 74, 62 92" stroke="#0B6B56" strokeWidth="3.5" strokeLinecap="round" />
          {/* Vibration ticks around sill */}
          <line x1="162" y1="36" x2="170" y2="32" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="164" y1="58" x2="174" y2="58" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="162" y1="80" x2="170" y2="84" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      );
  }
}

/**
 * Section 4 Process Cards Woodcut / Risograph Hand Spot Illustrations.
 * Matches Ordix's iconic white inked hand + solid accent cuff aesthetic.
 */
export function ProcessHandIllustration({ step, darkCard }) {
  const strokeInk = '#0E241E';
  const cuffFill = darkCard ? '#C7F238' : '#0E241E';
  const accentStroke = darkCard ? '#C7F238' : '#0E241E';

  if (step === '01') {
    return (
      <svg viewBox="0 0 220 156" fill="none" className="process-hand-svg" aria-hidden="true" data-art="redam-risograph">
        {/* Acoustic Calibration Rings around Class-1 Mic Tip */}
        <circle cx="96" cy="36" r="26" stroke={accentStroke} strokeWidth="2.8" strokeDasharray="5 5" />
        <circle cx="96" cy="36" r="14" stroke={accentStroke} strokeWidth="2.6" />
        {/* Slender Measurement Microphone */}
        <path d="M96 32 L114 106 L102 109 L86 35 Z" fill="#FFFFFF" stroke={strokeInk} strokeWidth="3.2" strokeLinejoin="round" />
        <circle cx="91" cy="33" r="6" fill={cuffFill} stroke={strokeInk} strokeWidth="2.8" />
        {/* Crisp White Inked Hand Gripping Mic */}
        <path
          d="M84 74 C72 72, 68 84, 78 88 C68 90, 68 102, 82 104 C74 108, 78 120, 96 120 L132 114 L138 78 L112 72 C104 68, 92 70, 84 74 Z"
          fill="#FFFFFF"
          stroke={strokeInk}
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path d="M84 88 L110 86" stroke={strokeInk} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M84 102 L112 100" stroke={strokeInk} strokeWidth="2.6" strokeLinecap="round" />
        {/* Solid Risograph Sleeve Cuff */}
        <path d="M132 72 L182 62 L192 118 L140 124 Z" fill={cuffFill} stroke={strokeInk} strokeWidth="3.4" strokeLinejoin="round" />
        <circle cx="148" cy="108" r="3.5" fill={darkCard ? '#0E241E' : '#C7F238'} />
      </svg>
    );
  }

  if (step === '02') {
    return (
      <svg viewBox="0 0 220 156" fill="none" className="process-hand-svg" aria-hidden="true" data-art="redam-risograph">
        {/* Drafting Pen Held by Crisp Inked Hand (Homage to Mid-1440 Craft!) */}
        <path
          d="M116 14 L126 18 L96 116 L84 128 L86 112 Z"
          fill="#FFFFFF"
          stroke={strokeInk}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <line x1="112" y1="30" x2="122" y2="34" stroke={strokeInk} strokeWidth="2.6" />
        {/* Hand & Curled Fingers */}
        <path
          d="M88 60 C72 68, 64 88, 72 104 C78 114, 92 108, 102 98 C108 114, 128 116, 144 106 L154 74 C140 58, 114 52, 88 60 Z"
          fill="#FFFFFF"
          stroke={strokeInk}
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path d="M82 88 C94 84, 106 86, 118 92" stroke={strokeInk} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M98 70 C108 72, 118 76, 126 82" stroke={strokeInk} strokeWidth="2.6" strokeLinecap="round" />
        {/* Sleeve Cuff */}
        <path d="M148 64 L196 54 L204 106 L154 114 Z" fill={cuffFill} stroke={strokeInk} strokeWidth="3.4" strokeLinejoin="round" />
        <circle cx="164" cy="96" r="3.5" fill={darkCard ? '#0E241E' : '#C7F238'} />
        {/* Drawn Acoustic Reflection Check Node */}
        <path d="M62 134 L82 146 L118 124" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (step === '03') {
    return (
      <svg viewBox="0 0 220 156" fill="none" className="process-hand-svg" aria-hidden="true" data-art="redam-risograph">
        {/* Rhythmic Micro-Perforated Ceiling Baffle Blades */}
        <rect x="34" y="24" width="22" height="72" rx="4" fill="#FFFFFF" stroke={strokeInk} strokeWidth="3.2" />
        <rect x="64" y="24" width="22" height="72" rx="4" fill="#FFFFFF" stroke={strokeInk} strokeWidth="3.2" />
        <rect x="94" y="18" width="22" height="72" rx="4" fill={cuffFill} stroke={strokeInk} strokeWidth="3.2" />
        {/* Micro perforations */}
        <circle cx="45" cy="42" r="2" fill={strokeInk} />
        <circle cx="45" cy="58" r="2" fill={strokeInk} />
        <circle cx="45" cy="74" r="2" fill={strokeInk} />
        <circle cx="75" cy="42" r="2" fill={strokeInk} />
        <circle cx="75" cy="58" r="2" fill={strokeInk} />
        <circle cx="75" cy="74" r="2" fill={strokeInk} />
        {/* Inked Hand Gently Slotting the 3rd Baffle Blade */}
        <path
          d="M104 72 C92 78, 92 94, 108 98 L148 112 L158 76 L124 64 C116 62, 110 66, 104 72 Z"
          fill="#FFFFFF"
          stroke={strokeInk}
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path d="M110 84 L132 90" stroke={strokeInk} strokeWidth="2.6" strokeLinecap="round" />
        {/* Cuff */}
        <path d="M154 70 L198 76 L192 128 L146 120 Z" fill={cuffFill} stroke={strokeInk} strokeWidth="3.4" strokeLinejoin="round" />
        <circle cx="164" cy="108" r="3.5" fill={darkCard ? '#0E241E' : '#C7F238'} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 156" fill="none" className="process-hand-svg" aria-hidden="true" data-art="redam-risograph">
      {/* Compact RT60 Spectrum Analyzer Frame */}
      <rect x="28" y="22" width="108" height="80" rx="12" fill="#FFFFFF" stroke={strokeInk} strokeWidth="3.4" />
      {/* Target Decay Curve Inside Screen */}
      <path d="M42 40 C58 76, 86 84, 122 86" stroke={strokeInk} strokeWidth="3.8" strokeLinecap="round" />
      <path d="M42 78 L122 78" stroke={darkCard ? '#0B6B56' : '#0B6B56'} strokeWidth="2.4" strokeDasharray="4 4" />
      <circle cx="118" cy="86" r="5" fill="#C7F238" stroke={strokeInk} strokeWidth="2.6" />
      {/* Hand Dialing Precision Calibration Knob */}
      <path
        d="M116 90 C106 98, 108 116, 122 120 L158 124 L164 88 L134 82 C126 80, 120 84, 116 90 Z"
        fill="#FFFFFF"
        stroke={strokeInk}
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <path d="M158 84 L200 84 L198 134 L154 130 Z" fill={cuffFill} stroke={strokeInk} strokeWidth="3.4" strokeLinejoin="round" />
      <circle cx="168" cy="118" r="3.5" fill={darkCard ? '#0E241E' : '#C7F238'} />
    </svg>
  );
}

/**
 * Section 5 Space Typologies 3-Ink Architectural Elevation Spot Plates.
 */
export function TypologySpotIllustration({ kind }) {
  switch (kind) {
    case 'office':
      return (
        <svg viewBox="0 0 140 92" fill="none" className="typo-svg" aria-hidden="true" data-art="redam-risograph">
          <rect x="22" y="14" width="96" height="14" rx="7" fill="#C7F238" stroke="#0E241E" strokeWidth="3" />
          <line x1="44" y1="28" x2="44" y2="42" stroke="#0E241E" strokeWidth="2.6" />
          <line x1="96" y1="28" x2="96" y2="42" stroke="#0E241E" strokeWidth="2.6" />
          <rect x="18" y="54" width="104" height="10" rx="3" fill="#FFFFFF" stroke="#0E241E" strokeWidth="3" />
          <line x1="30" y1="64" x2="30" y2="82" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="110" y1="64" x2="110" y2="82" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
          <rect x="52" y="38" width="36" height="16" rx="3" fill="#0E241E" />
        </svg>
      );
    case 'cafe':
      return (
        <svg viewBox="0 0 140 92" fill="none" className="typo-svg" aria-hidden="true" data-art="redam-risograph">
          {/* Hanging Ceiling Baffles + Arched Glass Cafe Window */}
          <path d="M24 80 L24 40 C24 20, 116 20, 116 40 L116 80" stroke="#0E241E" strokeWidth="3.4" strokeLinecap="round" />
          <rect x="44" y="18" width="10" height="26" rx="3" fill="#C7F238" stroke="#0E241E" strokeWidth="2.6" />
          <rect x="65" y="16" width="10" height="28" rx="3" fill="#C7F238" stroke="#0E241E" strokeWidth="2.6" />
          <rect x="86" y="18" width="10" height="26" rx="3" fill="#C7F238" stroke="#0E241E" strokeWidth="2.6" />
          {/* Coffee Cup Silhouette on Table */}
          <line x1="38" y1="74" x2="102" y2="74" stroke="#0E241E" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M58 58 L82 58 L78 74 L62 74 Z" fill="#0E241E" />
        </svg>
      );
    case 'studio':
      return (
        <svg viewBox="0 0 140 92" fill="none" className="typo-svg" aria-hidden="true" data-art="redam-risograph">
          {/* Timber Slat Diffuser + Broadcast Mic */}
          <rect x="18" y="16" width="104" height="62" rx="10" fill="#FFFFFF" stroke="#0E241E" strokeWidth="3.2" />
          <line x1="34" y1="18" x2="34" y2="76" stroke="#0E241E" strokeWidth="2.8" />
          <line x1="48" y1="18" x2="48" y2="76" stroke="#0E241E" strokeWidth="2.8" />
          <line x1="92" y1="18" x2="92" y2="76" stroke="#0E241E" strokeWidth="2.8" />
          <line x1="106" y1="18" x2="106" y2="76" stroke="#0E241E" strokeWidth="2.8" />
          <rect x="61" y="28" width="18" height="32" rx="9" fill="#C7F238" stroke="#0E241E" strokeWidth="3" />
          <line x1="70" y1="60" x2="70" y2="78" stroke="#0E241E" strokeWidth="3.4" />
        </svg>
      );
    case 'clinic':
      return (
        <svg viewBox="0 0 140 92" fill="none" className="typo-svg" aria-hidden="true" data-art="redam-risograph">
          {/* Acoustic Sealed Door & Quiet Shield */}
          <rect x="44" y="12" width="52" height="70" rx="6" fill="#FFFFFF" stroke="#0E241E" strokeWidth="3.4" />
          <rect x="44" y="72" width="52" height="10" rx="2" fill="#C7F238" stroke="#0E241E" strokeWidth="2.8" />
          <circle cx="84" cy="48" r="4" fill="#0E241E" />
          {/* Calmed wave outside */}
          <path d="M16 42 C24 38, 28 46, 36 42" stroke="#0B6B56" strokeWidth="3" strokeLinecap="round" />
          <path d="M104 42 C112 38, 116 46, 124 42" stroke="#0B6B56" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 140 92" fill="none" className="typo-svg" aria-hidden="true" data-art="redam-risograph">
          {/* Stepped Auditorium Ceiling Canopies */}
          <path d="M18 30 L52 22 L92 18 L122 24" stroke="#0E241E" strokeWidth="4" strokeLinecap="round" />
          <path d="M24 44 L56 36 L94 32 L118 38" stroke="#0B6B56" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M20 78 L48 78 L48 70 L74 70 L74 62 L100 62 L100 54 L122 54" stroke="#0E241E" strokeWidth="3.4" strokeLinejoin="round" />
          <circle cx="34" cy="62" r="8" fill="#C7F238" stroke="#0E241E" strokeWidth="3" />
        </svg>
      );
  }
}

/**
 * Ordix-inspired 3-ink Editorial Character physically leaning forward with both hands
 * planted firmly against the right edge of the giant display typography, shoving it leftward.
 */
export function PushingTextCharacter() {
  return (
    <svg
      className="pushing-char-svg"
      viewBox="0 0 360 340"
      fill="none"
      aria-hidden="true"
      data-art="redam-risograph"
    >
      {/* Floor push friction shadow & effort dust puffs */}
      <ellipse cx="220" cy="316" rx="108" ry="11" fill="#0E241E" fillOpacity="0.12" />
      <g className="push-dust-puffs" stroke="#0E241E" strokeWidth="3" strokeLinecap="round">
        <path d="M286 306 C296 296, 314 298, 318 308 C328 306, 336 314, 330 320" fill="#FFFFFF" />
        <path d="M312 284 L334 276" />
        <path d="M320 296 L346 294" />
      </g>

      {/* Effort sweat/motion bursts around head */}
      <g className="push-effort-sparks" stroke="#0B6B56" strokeWidth="3.2" strokeLinecap="round">
        <line x1="126" y1="62" x2="112" y2="48" />
        <line x1="148" y1="50" x2="144" y2="32" />
        <line x1="176" y1="54" x2="188" y2="40" />
      </g>

      {/* Back Extended Planted Leg pushing hard off floor */}
      <path
        d="M214 218 L272 268 L302 308"
        stroke="#0E241E"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M292 310 L324 304 L322 316 L288 318 Z"
        fill="#C7F238"
        stroke="#0E241E"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />

      {/* Front Bent Lunge Leg bracing torque */}
      <path
        d="M192 224 L152 262 L176 308"
        stroke="#0E241E"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M148 310 L186 310 L184 320 L144 320 Z"
        fill="#C7F238"
        stroke="#0E241E"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />

      {/* Lower Back Arm braced flat against the left wall/text edge (x=18) */}
      <path
        d="M146 154 L76 162 L24 166"
        stroke="#FFFFFF"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M146 154 L76 162 L24 166"
        stroke="#0E241E"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Leaning Chartreuse Suit Jacket Torso */}
      <path
        d="M126 116 L236 168 L216 232 L118 188 Z"
        fill="#C7F238"
        stroke="#0E241E"
        strokeWidth="4.8"
        strokeLinejoin="round"
      />
      <path
        d="M182 146 L234 170 L218 228 L168 206 Z"
        fill="url(#riso-hatch-pine)"
      />
      {/* White Shirt Lapel & Deep Pine Tie */}
      <path
        d="M126 116 L166 136 L146 166 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M138 144 L118 192 L130 198 L148 152 Z" fill="#0E241E" />

      {/* Tall Mid-Century Head Leaning Forward Into Push */}
      <path
        d="M122 126 L88 84 C82 72, 108 56, 120 64 L164 118 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4.8"
        strokeLinejoin="round"
      />
      {/* Pompadour Hair */}
      <path
        d="M88 82 C78 66, 98 48, 122 56 C132 60, 134 72, 122 76 C108 78, 98 80, 88 82 Z"
        fill="#0E241E"
      />
      <path d="M98 64 C108 60, 118 62, 124 68" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />

      {/* Focused Pushing Expression */}
      <path d="M96 86 L108 82" stroke="#0E241E" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="101" cy="92" r="2.8" fill="#0E241E" />
      <path d="M104 104 C110 102, 114 104, 118 108" stroke="#0E241E" strokeWidth="3" strokeLinecap="round" />

      {/* Studio Headphone Cup */}
      <rect
        x="118"
        y="76"
        width="18"
        height="30"
        rx="8"
        transform="rotate(-26 118 76)"
        fill="#0E241E"
        stroke="#C7F238"
        strokeWidth="3"
      />

      {/* Foreground Pushing Arm & Flat Palm Braced Directly Against Text Edge (x=14) */}
      <path
        d="M158 140 L84 126 L22 126"
        stroke="#C7F238"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M158 140 L84 126 L22 126"
        stroke="#0E241E"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* White Cuff & Flat Pushing Palms Pressed Against Display Text */}
      <rect x="26" y="114" width="14" height="24" rx="3" fill="#FFFFFF" stroke="#0E241E" strokeWidth="3.8" />
      <path
        d="M24 106 L12 106 C8 106, 8 142, 12 142 L26 142 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4.2"
        strokeLinejoin="round"
      />
      <path
        d="M26 150 L14 150 C10 150, 10 182, 14 182 L28 182 Z"
        fill="#FFFFFF"
        stroke="#0E241E"
        strokeWidth="4.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
