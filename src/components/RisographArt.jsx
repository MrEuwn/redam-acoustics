import React from 'react';

/**
 * Shared SVG filter & printmaking texture definitions:
 * 1) Warm Espresso-Parchment Duotone (#3B1A14 -> #855A47 -> #EDE8E6) for studio photography.
 * 2) Subtle warm risograph halftone grain for marigold suit & woodcut cuffs.
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
        <filter id="redam-espresso-duotone" colorInterpolationFilters="sRGB">
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
            <feFuncR type="table" tableValues="0.185 0.44 0.905" />
            <feFuncG type="table" tableValues="0.080 0.27 0.875" />
            <feFuncB type="table" tableValues="0.062 0.21 0.858" />
          </feComponentTransfer>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="2"
            seed="7"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="
              0 0 0 0 0.28
              0 0 0 0 0.13
              0 0 0 0 0.08
              0 0 0 0.065 0"
            result="warmGrain"
          />
          <feComposite in="warmGrain" in2="duotone" operator="over" />
        </filter>

        <pattern
          id="amber-riso-stipple"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.6" cy="1.8" r="0.75" fill="#47220E" fillOpacity="0.11" />
          <circle cx="4.5" cy="4.4" r="0.6" fill="#FFFFFF" fillOpacity="0.16" />
        </pattern>

        <pattern
          id="espresso-riso-stipple"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.8" cy="1.8" r="0.7" fill="#FFA125" fillOpacity="0.22" />
          <circle cx="4.6" cy="4.5" r="0.55" fill="#EDE8E6" fillOpacity="0.12" />
        </pattern>
      </defs>
    </svg>
  );
}

/**
 * Hero Charismatic New-Yorker Brush-Ink Acoustic Consultant.
 * Modeled on Ordix's iconic elongated head, folded-arms marigold suit silhouette,
 * crisp white negative-space highlights, tapered espresso ink strokes, and subtle breathing motion.
 */
export function HeroAcousticCharacter({ dampened }) {
  return (
    <svg
      className={`hero-character-svg ${dampened ? 'is-dampened' : ''}`}
      viewBox="0 0 500 670"
      fill="none"
      role="img"
      aria-label="Ilustrasi konsultan akustik REDAM mengenakan jas marigold hangat dengan gestur tenang"
      data-art="redam-risograph"
    >
      {/* Subtle acoustic halo arcs around head when Dampen Mode is active */}
      {dampened && (
        <g className="hero-calm-arcs" opacity="0.55">
          <path
            d="M150 128 C176 116, 200 138, 224 126"
            stroke="#47220E"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M366 114 C394 104, 418 124, 444 114"
            stroke="#FFA125"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Lower Trousers (Solid Deep Espresso with Crisp White Tailored Stripe) */}
      <path
        d="M174 522 L386 528 L364 668 L178 668 L192 592 L128 572 C154 562, 168 544, 174 522 Z"
        fill="#3B1A14"
      />
      <path
        d="M352 544 L380 544 L360 668 L334 668 Z"
        fill="#FFFFFF"
      />
      <path
        d="M350 546 L332 666 M378 544 L359 666 M354 584 L346 658"
        stroke="#47220E"
        strokeWidth="3.8"
        strokeLinecap="round"
      />

      {/* Tailored Jacket White Negative-Space Silhouette */}
      <path
        d="M148 334 C180 296, 224 256, 250 238 L354 236 C394 260, 442 296, 462 346 C474 390, 446 476, 396 558 L178 552 C164 484, 144 402, 148 334 Z"
        fill="#FFFFFF"
      />

      {/* Marigold Amber Suit Plate (Intentional Painterly Offset Leaving White Collar & Edge Rim) */}
      <path
        d="M178 326 C206 294, 240 264, 258 250 L352 248 C392 272, 434 304, 448 350 C456 390, 424 476, 378 556 L192 548 C184 484, 166 396, 178 326 Z"
        fill="#FFA125"
      />
      <path
        d="M178 326 C206 294, 240 264, 258 250 L352 248 C392 272, 434 304, 448 350 C456 390, 424 476, 378 556 L192 548 C184 484, 166 396, 178 326 Z"
        fill="url(#amber-riso-stipple)"
      />

      {/* Crisp White Shirt V & Espresso Necktie */}
      <path
        d="M250 238 L314 238 L272 384 L236 336 Z"
        fill="#FFFFFF"
        stroke="#47220E"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Left & Right Jacket Lapel Calligraphic Ink Strokes */}
      <path
        d="M248 242 L202 316 L224 334 L214 364 L268 386"
        stroke="#47220E"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M352 242 L382 308 L354 328 L364 352 L286 388"
        stroke="#47220E"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Espresso Necktie */}
      <path
        d="M276 254 L298 256 L292 274 L276 274 Z"
        fill="#3B1A14"
      />
      <path
        d="M277 272 L292 272 L278 380 L254 384 Z"
        fill="#3B1A14"
      />
      {/* Crisp White Pocket Square */}
      <path
        d="M340 342 C352 330, 372 332, 378 344 L344 348 Z"
        fill="#FFFFFF"
        stroke="#47220E"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      {/* Subtle Studio Acoustic Earbud Cord / Lapel Pin Detail */}
      <circle cx="332" cy="306" r="4.5" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.4" />
      <path
        d="M324 306 C324 300, 340 300, 340 306"
        stroke="#47220E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Jacket Outer Brush-Ink Contours & Dynamic Sleeve Creases */}
      <path
        d="M150 334 C178 294, 218 260, 248 238 M354 238 C398 262, 444 300, 462 346 C474 390, 446 472, 396 558"
        stroke="#47220E"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M424 304 C446 336, 444 384, 410 432 M408 358 C422 364, 434 374, 440 388 M396 382 L428 394 M388 402 L422 414 M384 552 L408 470"
        stroke="#47220E"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Iconic Folded Arms Group (Smooth Living Shift Animation) */}
      <g className={`hero-folded-arms ${dampened ? 'is-calm' : ''}`}>
        {/* Back Left Hand Fingers Resting Gracefully on Forearm */}
        <path
          d="M114 404 C112 390, 132 378, 158 380 C176 382, 188 394, 198 404 L190 434 C162 432, 132 426, 114 422 Z"
          fill="#FFFFFF"
          stroke="#47220E"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d="M122 396 C142 391, 160 393, 174 397 M118 408 C140 404, 160 405, 176 409 M120 419 C140 417, 156 418, 170 421"
          stroke="#47220E"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Upper Forearm Sweep (Tapered Marigold Sleeve + Crisp White Cuff + Espresso Undershadow) */}
        <path
          d="M142 422 C110 434, 108 468, 138 482 C192 504, 272 478, 342 446 C372 432, 404 422, 420 442 C432 464, 396 498, 344 506 C284 516, 196 496, 138 482 Z"
          fill="#FFA125"
        />
        <path
          d="M142 422 C110 434, 108 468, 138 482 C192 504, 272 478, 342 446 C372 432, 404 422, 420 442 C432 464, 396 498, 344 506 C284 516, 196 496, 138 482 Z"
          fill="url(#amber-riso-stipple)"
        />
        {/* Crisp White Buttoned Shirt Cuff */}
        <path
          d="M262 428 L294 420 L292 464 L256 474 Z"
          fill="#FFFFFF"
          stroke="#47220E"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <circle cx="272" cy="454" r="3" fill="#47220E" />
        <circle cx="283" cy="450" r="2.6" fill="#47220E" />

        {/* Right Hand Tucked on Forearm */}
        <path
          d="M294 422 C314 404, 342 406, 358 424 C364 432, 354 446, 334 452 L294 460 Z"
          fill="#FFFFFF"
          stroke="#47220E"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d="M312 420 C328 416, 342 418, 350 426 M314 432 C330 429, 342 431, 348 438"
          stroke="#47220E"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Lower Arm Espresso Undershadow & Clean Calligraphic Fold Contours */}
        <path
          d="M262 478 L342 496 L334 514 L254 490 Z"
          fill="#3B1A14"
        />
        <path
          d="M144 422 C110 434, 108 470, 140 482 C196 502, 268 478, 344 444 M156 446 C182 440, 202 444, 218 452 M162 460 C186 458, 206 462, 224 468 M252 474 C308 498, 366 510, 404 494 C422 486, 434 466, 424 448"
          stroke="#47220E"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      </g>

      {/* Iconic Elongated Mid-Century Tapered Head & Neck Silhouette (Sleek Ordix Proportion) */}
      <g className="hero-head-group">
        {/* Left & Right Round Ears */}
        <path
          d="M258 126 C244 124, 240 140, 252 148 C256 150, 260 148, 262 144"
          fill="#FFFFFF"
          stroke="#47220E"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M320 122 C338 118, 348 136, 334 148 C328 152, 320 150, 316 146"
          fill="#FFFFFF"
          stroke="#47220E"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path d="M326 132 C332 132, 332 140, 326 142" stroke="#47220E" strokeWidth="2.2" strokeLinecap="round" />

        {/* Sleek Conical White Neck & Face */}
        <path
          d="M270 64 C284 56, 306 58, 314 74 L330 142 L362 214 C338 244, 286 264, 254 252 L264 116 Z"
          fill="#FFFFFF"
          stroke="#47220E"
          strokeWidth="3.6"
          strokeLinejoin="round"
        />
        {/* Crisp Shirt Collar V */}
        <path
          d="M254 252 C284 262, 334 244, 360 216 L372 232 C340 264, 288 282, 250 268 Z"
          fill="#FFFFFF"
          stroke="#47220E"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Swept Espresso Pompadour Hair with Crisp White Brush Strands */}
        <path
          d="M262 76 C248 58, 258 38, 284 42 C306 44, 320 60, 322 80 C308 74, 286 72, 262 76 Z"
          fill="#3B1A14"
        />
        <path
          d="M270 50 C284 50, 296 58, 306 70 M280 46 C294 48, 306 56, 314 68 M264 58 C276 58, 288 64, 296 72"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M304 82 C316 78, 326 88, 324 118 C316 124, 308 120, 304 106 Z"
          fill="#3B1A14"
        />
        <path d="M310 92 L322 96 M308 100 L320 104" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* Expressive Minimal New-Yorker Facial Features */}
        <path d="M272 98 C276 94, 282 94, 284 96" stroke="#47220E" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M294 94 C300 92, 306 94, 308 98" stroke="#47220E" strokeWidth="2.8" strokeLinecap="round" />
        <ellipse cx="279" cy="108" rx="3" ry="4" fill="#47220E" />
        <ellipse cx="298" cy="108" rx="3" ry="4" fill="#47220E" />
        <path
          d="M284 110 L276 140 L296 139 L294 128"
          stroke="#47220E"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M284 150 C292 153, 300 150, 304 146"
          stroke="#47220E"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/**
 * 5 Full-Scene Calligraphic Brush-Ink Cartoons for #tantangan Borderless White Cards.
 * Floats directly on pure #FFFFFF card canvas with warm marigold fills & organic stipple dots.
 */
export function DiagnosisSpotIllustration({ variant }) {
  switch (variant) {
    case 'glass':
      return (
        <svg className="diagnosis-scene-svg" viewBox="0 0 380 230" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Dynamic perspective ground streaks & warm marigold stipple dust */}
          <path d="M18 188 L352 204 M46 198 L286 210 M82 208 L224 216" stroke="#47220E" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="158" cy="176" r="2.4" fill="#FFA125" />
          <circle cx="174" cy="168" r="1.8" fill="#FFA125" />
          <circle cx="192" cy="182" r="2.5" fill="#FFA125" />
          <circle cx="226" cy="170" r="2" fill="#FFA125" />
          <circle cx="242" cy="184" r="2.2" fill="#FFA125" />

          {/* Architectural Perspective Glass Facade Wall in Warm Marigold */}
          <path d="M30 48 L158 26 L166 184 L38 190 Z" fill="#FFA125" stroke="#47220E" strokeWidth="3.6" strokeLinejoin="round" />
          <path d="M30 48 L158 26 L166 184 L38 190 Z" fill="url(#amber-riso-stipple)" />
          <path d="M158 26 L176 34 L182 184 L166 184 Z" fill="#3B1A14" />
          <path d="M96 36 L104 187 M34 116 L162 104" stroke="#47220E" strokeWidth="3" />
          {/* Crisp white specular window streaks */}
          <path d="M52 72 L82 56 M56 88 L86 72 M114 132 L146 116 M118 146 L142 134" stroke="#FFFFFF" strokeWidth="4.4" strokeLinecap="round" />

          {/* Sweeping Concentric Echo Shockwaves Bouncing Off Curtain Wall */}
          <path d="M184 62 C216 82, 218 134, 186 158" stroke="#47220E" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M206 46 C248 76, 248 140, 206 170" stroke="#FFA125" strokeWidth="4.6" strokeLinecap="round" />
          <path d="M232 62 C258 84, 258 128, 232 150" stroke="#47220E" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M188 104 L214 96 M192 120 L216 126" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />

          {/* Expressive Shrugging New-Yorker Consultant */}
          <g transform="translate(262, 34)">
            {/* Dynamic Stride Legs */}
            <path d="M38 102 L8 156 L22 158 L48 114 L68 164 L82 162 L54 100 Z" fill="#3B1A14" />
            {/* Crisp White Shirt + Espresso Bowtie */}
            <path d="M24 62 C34 58, 48 58, 56 64 L52 104 L28 104 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <polygon points="34,66 46,71 34,76" fill="#3B1A14" />
            <polygon points="48,66 36,71 48,76" fill="#3B1A14" />
            {/* Shrugging Outstretched Arms & Expressive Palms */}
            <path d="M26 70 C8 74, -2 58, -10 46 M54 70 C74 72, 84 56, 92 44" stroke="#47220E" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M-20 40 C-14 32, -2 34, -2 46 C-8 48, -20 48, -20 40 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.6" />
            <path d="M84 44 C88 34, 102 32, 104 42 C100 48, 88 50, 84 44 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.6" />
            {/* Tapered New-Yorker Head & Surprised Expression */}
            <path d="M30 16 C36 8, 52 10, 54 20 L48 62 L30 60 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M28 16 C30 4, 52 2, 58 16 C48 14, 36 14, 28 16 Z" fill="#3B1A14" />
            <circle cx="38" cy="28" r="2.2" fill="#47220E" />
            <circle cx="46" cy="28" r="2.2" fill="#47220E" />
            <path d="M34 22 L40 20 M44 20 L50 22" stroke="#47220E" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="42" cy="44" rx="4.2" ry="6" fill="#3B1A14" />
          </g>
        </svg>
      );

    case 'hvac':
      return (
        <svg className="diagnosis-scene-svg" viewBox="0 0 360 220" fill="none" aria-hidden="true" data-art="redam-risograph">
          <path d="M30 198 L330 190 M68 206 L292 200" stroke="#47220E" strokeWidth="2.6" strokeLinecap="round" />
          {/* Overhead Rattling Metal HVAC Duct */}
          <path d="M36 32 L248 24 L256 76 L44 84 Z" fill="#FFA125" stroke="#47220E" strokeWidth="3.6" strokeLinejoin="round" />
          <path d="M248 24 L274 36 L278 86 L256 76 Z" fill="#3B1A14" />
          <path d="M108 29 L114 81 M184 26 L190 78" stroke="#47220E" strokeWidth="3" />
          {/* Louver Grilles */}
          <path d="M62 48 L96 47 M64 58 L98 57 M66 68 L100 67" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {/* Vibration Ticks */}
          <path d="M28 42 C20 50, 20 64, 28 72 M288 38 C298 48, 298 66, 288 76" stroke="#47220E" strokeWidth="3" strokeLinecap="round" />

          {/* Heavy Low-Frequency Swirling Drone Waves */}
          <path
            d="M84 96 C64 118, 134 124, 108 148 C88 166, 152 172, 168 150"
            stroke="#FFA125"
            strokeWidth="4.4"
            strokeLinecap="round"
          />
          <path
            d="M148 94 C132 114, 186 118, 174 138"
            stroke="#47220E"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="122" cy="126" r="2.5" fill="#FFA125" />
          <circle cx="152" cy="146" r="2.2" fill="#FFA125" />

          {/* Character Covering Ears Under Duct */}
          <g transform="translate(216, 62)">
            <path d="M34 86 L12 132 L26 134 L44 96 L64 134 L78 132 L54 84 Z" fill="#3B1A14" />
            <path d="M24 46 L58 46 L54 88 L28 88 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M40 48 L36 74 L44 74 Z" fill="#3B1A14" />
            {/* Hands Clamped Tightly on Ears */}
            <path d="M24 56 C10 52, 8 34, 24 28 M58 56 C72 52, 74 34, 58 28" stroke="#47220E" strokeWidth="3.6" strokeLinecap="round" />
            <path d="M28 12 C34 6, 52 6, 54 16 L50 48 L30 48 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M26 14 C30 2, 54 2, 58 16 C46 14, 34 14, 26 14 Z" fill="#3B1A14" />
            <path d="M34 26 L40 28 M48 26 L42 28" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M36 38 C40 34, 44 34, 48 38" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'partition':
      return (
        <svg className="diagnosis-scene-svg" viewBox="0 0 360 220" fill="none" aria-hidden="true" data-art="redam-risograph">
          <path d="M26 196 L336 188 M58 205 L290 199" stroke="#47220E" strokeWidth="2.6" strokeLinecap="round" />
          {/* Perspective Door & Thin Partition Wall */}
          <path d="M136 30 L220 22 L224 176 L140 184 Z" fill="#FFA125" stroke="#47220E" strokeWidth="3.6" strokeLinejoin="round" />
          <path d="M150 42 L208 36 L211 168 L153 174 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="198" cy="110" r="4.5" fill="#3B1A14" />
          {/* 6mm Bottom Gap Highlight */}
          <path d="M148 180 L216 174" stroke="#FFA125" strokeWidth="6" strokeLinecap="round" />

          {/* Sound Ribbons Squeezing Straight Under Door & Through Seam */}
          <path d="M46 116 C82 96, 108 134, 144 114" stroke="#47220E" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M216 114 C252 94, 268 128, 304 106" stroke="#FFA125" strokeWidth="4.4" strokeLinecap="round" />
          <path d="M74 178 C114 166, 152 188, 198 182 C238 176, 266 192, 304 174" stroke="#47220E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="242" cy="164" r="2.4" fill="#FFA125" />
          <circle cx="258" cy="172" r="2" fill="#FFA125" />

          {/* Listening Figure Outside Door */}
          <g transform="translate(248, 52)">
            <path d="M32 90 L14 136 L28 138 L42 100 L56 138 L68 136 L50 88 Z" fill="#3B1A14" />
            <path d="M22 50 L54 50 L50 92 L26 92 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M26 14 C32 8, 48 10, 50 20 L48 52 L28 50 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M24 16 C28 4, 48 4, 54 18 Z" fill="#3B1A14" />
            <circle cx="34" cy="28" r="2.2" fill="#47220E" />
            <path d="M22 56 C10 46, 8 36, 18 30" stroke="#47220E" strokeWidth="3.4" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'ceiling':
      return (
        <svg className="diagnosis-scene-svg" viewBox="0 0 360 220" fill="none" aria-hidden="true" data-art="redam-risograph">
          <path d="M28 196 L332 192 M66 205 L286 202" stroke="#47220E" strokeWidth="2.6" strokeLinecap="round" />
          {/* Soaring Concrete Ceiling Beams */}
          <path d="M36 28 L322 28 L314 54 L44 54 Z" fill="#3B1A14" />
          <path d="M74 54 L94 54 L90 74 L70 74 Z M172 54 L192 54 L188 74 L168 74 Z M268 54 L288 54 L284 74 L264 74 Z" fill="#FFA125" stroke="#47220E" strokeWidth="2.8" />

          {/* Sharp Slap-Echo Zig-Zag Bouncing Between Concrete Slab & Cafe Table */}
          <path
            d="M84 152 L116 64 L162 154 L208 62 L248 136"
            stroke="#FFA125"
            strokeWidth="4.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M116 64 L126 84 M208 62 L218 82"
            stroke="#47220E"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Cafe Table + Cup on Left */}
          <path d="M54 154 L144 154 M99 154 L99 194 M76 194 L122 194" stroke="#47220E" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M74 134 L100 134 L96 154 L78 154 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3" strokeLinejoin="round" />

          {/* Character Ducking Slightly from Echo Glare */}
          <g transform="translate(232, 66)">
            <path d="M32 82 L14 126 L28 128 L42 94 L60 128 L74 126 L52 80 Z" fill="#3B1A14" />
            <path d="M24 44 L58 46 L52 84 L26 82 Z" fill="#FFA125" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M38 44 L44 68 L34 68 Z" fill="#FFFFFF" />
            <path d="M24 52 C8 46, 6 34, 18 26" stroke="#47220E" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M30 14 C36 6, 52 8, 54 18 L48 46 L28 44 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M28 14 C34 2, 54 4, 58 18 Z" fill="#3B1A14" />
            <circle cx="36" cy="26" r="2.2" fill="#47220E" />
            <circle cx="44" cy="26" r="2.2" fill="#47220E" />
          </g>
        </svg>
      );

    case 'traffic':
    default:
      return (
        <svg className="diagnosis-scene-svg" viewBox="0 0 360 220" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Expressive Road Speed Lines & Warm Stipple Dust (Direct Nod to Ordix Truck Energy!) */}
          <path d="M22 178 L320 198 M58 188 L266 204 M84 198 L210 208" stroke="#47220E" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="54" cy="158" r="2.6" fill="#FFA125" />
          <circle cx="66" cy="146" r="2" fill="#FFA125" />
          <circle cx="148" cy="166" r="2.4" fill="#FFA125" />
          <circle cx="164" cy="158" r="1.8" fill="#FFA125" />
          <circle cx="212" cy="174" r="2.5" fill="#FFA125" />

          {/* Speeding Stylized Arterial Truck Sending Bass Rumble */}
          <g transform="translate(22, 42)">
            {/* Dust Puff Behind Wheels */}
            <path
              d="M14 114 C4 104, 12 88, 26 92 C32 82, 48 86, 46 98 L44 118 Z"
              fill="#FFFFFF"
              stroke="#47220E"
              strokeWidth="2.8"
            />
            {/* Trailer Box in Warm Marigold */}
            <path d="M114 16 L236 36 L228 116 L108 106 Z" fill="#FFA125" stroke="#47220E" strokeWidth="3.6" strokeLinejoin="round" />
            <path d="M114 16 L236 36 L228 116 L108 106 Z" fill="url(#amber-riso-stipple)" />
            {/* Cab */}
            <path d="M36 96 L56 46 L114 16 L108 106 L34 112 Z" fill="#FFA125" stroke="#47220E" strokeWidth="3.6" strokeLinejoin="round" />
            <path d="M62 54 L94 42 L92 68 L56 72 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.8" strokeLinejoin="round" />
            {/* Grill & Wheels */}
            <path d="M40 84 L62 84 M40 92 L62 92 M40 100 L62 100" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="90" cy="112" r="15" fill="#3B1A14" />
            <circle cx="90" cy="112" r="6" fill="#FFFFFF" />
            <circle cx="152" cy="116" r="13" fill="#3B1A14" />
            <circle cx="152" cy="116" r="5" fill="#FFFFFF" />
            {/* Dust Puff Mid */}
            <path d="M118 116 C114 96, 134 86, 148 96 C158 92, 170 104, 162 120 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.8" />
            {/* Rumble Arcs Over Roof */}
            <path d="M126 6 C164 10, 198 18, 224 26" stroke="#47220E" strokeWidth="2.6" strokeLinecap="round" />
          </g>

          {/* Character Shrugging on Right Edge */}
          <g transform="translate(248, 36)">
            <path d="M30 98 L6 146 L20 148 L40 108 L62 152 L76 150 L50 96 Z" fill="#3B1A14" />
            <path d="M22 58 L50 58 L46 98 L26 98 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <polygon points="31,62 43,66 31,70" fill="#3B1A14" />
            <polygon points="44,62 32,66 44,70" fill="#3B1A14" />
            <path d="M24 68 C8 70, 0 56, -8 46 M48 68 C66 68, 76 54, 84 46" stroke="#47220E" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M28 14 C32 8, 48 8, 48 18 L44 56 L28 54 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M26 14 C28 4, 48 2, 52 14 Z" fill="#3B1A14" />
            <circle cx="34" cy="26" r="2.2" fill="#47220E" />
            <circle cx="42" cy="26" r="2.2" fill="#47220E" />
            <ellipse cx="38" cy="40" rx="4" ry="5" fill="#3B1A14" />
          </g>
        </svg>
      );
  }
}

/**
 * Athletic New-Yorker Character Physically Leaning & Pushing the Giant Metric Display.
 */
export function PushingTextCharacter() {
  return (
    <svg
      className="pushing-char-svg"
      viewBox="0 0 340 420"
      fill="none"
      role="img"
      aria-label="Ilustrasi insinyur akustik REDAM mendorong blok tipografi besar pengurangan bising"
      data-art="redam-risograph"
    >
      {/* Floor Traction Shadow & Amber Effort Stipple */}
      <ellipse cx="194" cy="396" rx="108" ry="11" fill="#47220E" fillOpacity="0.12" />
      <circle cx="292" cy="376" r="3" fill="#FFA125" />
      <circle cx="308" cy="364" r="2.4" fill="#FFA125" />
      <circle cx="278" cy="382" r="2.2" fill="#FFA125" />

      {/* Braced Espresso Trousers in Forward Power Lunge */}
      <path
        d="M174 238 L224 242 L292 386 L264 388 L206 286 L154 388 L128 386 Z"
        fill="#3B1A14"
      />
      {/* Crisp White Trouser Crease Highlight */}
      <path d="M204 264 L268 382" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
      {/* Shoes */}
      <path d="M126 382 L94 392 L152 396 L154 384 Z" fill="#47220E" />
      <path d="M262 384 L298 384 L306 396 L266 396 Z" fill="#47220E" />

      {/* Forward-Leaning Marigold Blazer */}
      <path
        d="M120 132 C148 118, 194 128, 228 164 L218 250 L144 238 C126 204, 114 166, 120 132 Z"
        fill="#FFA125"
        stroke="#47220E"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M120 132 C148 118, 194 128, 228 164 L218 250 L144 238 C126 204, 114 166, 120 132 Z"
        fill="url(#amber-riso-stipple)"
      />
      {/* Shirt Collar & Swinging Espresso Tie */}
      <path d="M122 134 L152 138 L138 176 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3" strokeLinejoin="round" />
      <path d="M138 152 L116 184 L128 190 L146 158 Z" fill="#3B1A14" />

      {/* Both Extended Arms Braced Against Left Edge (x = 12) */}
      <path
        d="M132 152 L42 156 L42 182 L134 184 Z"
        fill="#FFA125"
        stroke="#47220E"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      {/* Crisp White Cuff & Pressed Pushing Palms */}
      <path d="M36 152 L54 152 L54 186 L36 186 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="3.2" />
      <path
        d="M12 144 C12 136, 26 136, 36 146 L36 190 C24 196, 12 190, 12 180 Z"
        fill="#FFFFFF"
        stroke="#47220E"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      <path d="M16 158 L30 158 M16 170 L30 170 M16 180 L28 180" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />

      {/* Effort Lines Around Contact Point */}
      <path d="M6 124 L20 132 M4 168 L10 168 M8 210 L22 200" stroke="#FFA125" strokeWidth="3.8" strokeLinecap="round" />

      {/* Leaning Elongated Head */}
      <path
        d="M108 130 L96 64 C96 50, 126 48, 134 62 L152 132 Z"
        fill="#FFFFFF"
        stroke="#47220E"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      <path d="M98 58 C100 38, 132 36, 144 58 C128 56, 112 56, 98 58 Z" fill="#3B1A14" />
      <path d="M108 46 C120 46, 128 50, 134 56" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      {/* Determined Face Looking Left */}
      <circle cx="109" cy="78" r="2.8" fill="#47220E" />
      <path d="M104 70 L118 73" stroke="#47220E" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M102 88 L94 98 L106 98" stroke="#47220E" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M102 108 C108 106, 114 106, 118 108" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Crisp White-Line Lounging Character Lying Across Giant Amber Type (#solusi).
 * Exact aesthetic match to ordix/beat-optimize-1440.png: filled with #3B1A14 so it
 * cleanly masks the amber letters behind it, pointing downward toward the spiral.
 */
export function LoungingCharacter() {
  return (
    <svg
      className="lounging-char-svg"
      viewBox="0 0 430 245"
      fill="none"
      aria-hidden="true"
      data-art="redam-risograph"
    >
      {/* Draped Blazer & Reclining Shoulders Resting Directly on Top of Amber Letters */}
      <path
        d="M12 132 C56 102, 118 82, 232 82 L378 96 C402 98, 412 126, 386 136 L278 140 L176 142 L112 138 L22 142 Z"
        fill="#3B1A14"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Jacket Lapels, Shirt V & Collar Creases */}
      <path
        d="M168 86 L204 114 L154 134 M218 84 L242 132 M86 98 L128 118"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Arm Folded Comfortably Supporting Chin/Neck */}
      <path
        d="M318 102 C354 96, 392 94, 408 112 C416 122, 406 138, 378 138 L322 138"
        fill="#3B1A14"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* Relaxed Curled Fingers Draped Over Letter Edge */}
      <path
        d="M312 114 C296 120, 282 138, 276 160 C282 166, 290 156, 296 144 M300 126 C290 138, 286 154, 288 168 M312 128 C304 140, 302 154, 304 166"
        fill="#3B1A14"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Expressive Swoopy White Cloud-Pompadour Hair */}
      <path
        d="M316 38 C314 14, 344 10, 352 28 C366 22, 378 38, 366 52 C382 58, 378 86, 354 90 Z"
        fill="#FFFFFF"
      />
      {/* Sculpted Smiling Head Leaning In */}
      <path
        d="M276 132 L308 56 C318 42, 350 52, 354 74 L328 134 Z"
        fill="#3B1A14"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      {/* Ear */}
      <path
        d="M344 92 C358 92, 360 110, 344 114"
        fill="#3B1A14"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Warm Knowing Smile Looking Downward */}
      <path d="M312 72 L322 74 M330 78 L340 82" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="316" cy="82" r="2.8" fill="#FFFFFF" />
      <circle cx="332" cy="88" r="2.8" fill="#FFFFFF" />
      <path d="M320 88 L310 98 L322 101" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M308 108 C316 115, 326 115, 332 110" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />

      {/* Left Arm Hanging Downward Pointing Straight Into Spiral */}
      <path
        d="M114 96 L178 170 L160 184 L92 108 C82 94, 98 84, 114 96 Z"
        fill="#3B1A14"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      {/* Graceful Pointing Hand & Extended Index Finger */}
      <path
        d="M168 176 L190 210 C198 224, 204 234, 198 238 C192 242, 182 230, 174 214 L164 204 L158 184 Z"
        fill="#3B1A14"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M162 190 C156 198, 158 206, 166 204 M168 198 C164 204, 166 212, 174 210" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 4 Expressive Woodcut / Calligraphic Inked Hand Illustrations for #cara-kerja Square Cards.
 * Exact craft nod to ordix/mid-1440.png's white inked hand with textured amber cuff holding a pen.
 */
export function ProcessHandIllustration({ step, darkCard }) {
  const cuffFill = darkCard ? '#FFA125' : '#3B1A14';
  const cuffPattern = darkCard ? 'url(#amber-riso-stipple)' : 'url(#espresso-riso-stipple)';
  const strokeMain = darkCard ? '#FFFFFF' : '#3B1A14';
  const handFill = darkCard ? '#3B1A14' : '#FFFFFF';
  const accentStroke = darkCard ? '#FFA125' : '#3B1A14';

  switch (step) {
    case '01':
      // Hand holding Class-1 Acoustic Measurement Microphone
      return (
        <svg className="process-hand-svg" viewBox="0 0 240 165" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Textured Sleeve Cuff */}
          <path d="M168 62 L226 44 L236 96 L176 112 Z" fill={cuffFill} />
          <path d="M168 62 L226 44 L236 96 L176 112 Z" fill={cuffPattern} />
          <path d="M168 62 L176 112" stroke={strokeMain} strokeWidth="3" strokeLinecap="round" />
          <circle cx="184" cy="96" r="3" fill={strokeMain} />

          {/* Class-1 Measurement Mic */}
          <path d="M74 28 L104 28 L96 118 L82 118 Z" fill={handFill} stroke={strokeMain} strokeWidth="3.4" strokeLinejoin="round" />
          <circle cx="89" cy="24" r="10" fill={cuffFill} stroke={strokeMain} strokeWidth="3" />
          {/* Gentle Live Sound Arcs */}
          <path d="M56 16 C48 24, 48 36, 56 44 M42 10 C30 22, 30 40, 42 52" stroke={accentStroke} strokeWidth="3.2" strokeLinecap="round" />

          {/* Expressive Calligraphic Hand Gripping Mic */}
          <path
            d="M170 68 C144 64, 122 52, 102 64 C92 70, 94 82, 110 82 L104 94 C94 98, 96 110, 114 108 L108 118 C100 124, 106 134, 126 128 C144 122, 160 112, 174 108 Z"
            fill={handFill}
            stroke={strokeMain}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          <path d="M110 82 L144 82 M114 106 L146 104 M126 70 C138 72, 148 76, 156 84" stroke={strokeMain} strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );

    case '02':
      // Direct Homage to Ordix mid-1440.png: Calligraphic Hand with Fountain Pen Drawing Checkmark!
      return (
        <svg className="process-hand-svg" viewBox="0 0 240 165" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Textured Amber Cuff on Deep Espresso Card */}
          <path d="M162 66 L224 46 L234 98 L170 116 Z" fill={cuffFill} />
          <path d="M162 66 L224 46 L234 98 L170 116 Z" fill={cuffPattern} />
          <path d="M162 66 L170 116" stroke={strokeMain} strokeWidth="3" strokeLinecap="round" />
          <circle cx="178" cy="100" r="3" fill={strokeMain} />

          {/* Tilted Architectural Fountain Pen */}
          <path d="M114 16 L128 20 L98 122 L88 118 Z" fill="#FFFFFF" stroke="#3B1A14" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M88 118 L98 122 L86 144 Z" fill={handFill} stroke={strokeMain} strokeWidth="3" strokeLinejoin="round" />

          {/* Crisp Anatomical Inked Hand Holding Pen */}
          <path
            d="M164 72 C142 62, 118 46, 98 54 C76 62, 66 86, 72 104 C76 116, 92 126, 116 122 C136 118, 152 112, 168 110 Z"
            fill={handFill}
            stroke={strokeMain}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          {/* Knuckle & Finger Creases */}
          <path
            d="M84 82 C96 76, 114 78, 128 86 M80 98 C96 94, 114 96, 130 102 M104 114 C118 112, 132 108, 144 102 M116 62 C126 68, 134 74, 142 82"
            stroke={strokeMain}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Drawn Amber Vector Checkmark Under Nib */}
          <path d="M74 146 L88 156 L116 138" stroke={accentStroke} strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case '03':
      // Hand Gently Aligning Suspended Acoustic Ceiling Baffle Blades
      return (
        <svg className="process-hand-svg" viewBox="0 0 240 165" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Hanging Ceiling Baffle Fins */}
          <path d="M52 16 L52 40 M90 16 L90 40 M128 16 L128 40" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" />
          <rect x="40" y="40" width="24" height="58" rx="6" fill={handFill} stroke={strokeMain} strokeWidth="3.2" />
          <rect x="78" y="40" width="24" height="58" rx="6" fill={handFill} stroke={strokeMain} strokeWidth="3.2" />
          <rect x="116" y="40" width="24" height="58" rx="6" fill={cuffFill} stroke={strokeMain} strokeWidth="3.2" />

          {/* Cuff & Adjusting Hand from Right */}
          <path d="M168 82 L226 68 L234 118 L174 132 Z" fill={cuffFill} />
          <path d="M168 82 L226 68 L234 118 L174 132 Z" fill={cuffPattern} />
          <path
            d="M170 88 C148 84, 136 78, 118 88 C108 94, 114 106, 130 104 L124 116 C116 124, 128 134, 146 128 L174 124 Z"
            fill={handFill}
            stroke={strokeMain}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          <path d="M130 104 L154 102 M136 116 L158 114" stroke={strokeMain} strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );

    case '04':
    default:
      // Hand Holding Calibrated Acoustic Tuning Fork with Harmonic Concentric Ripples
      return (
        <svg className="process-hand-svg" viewBox="0 0 240 165" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Cuff */}
          <path d="M166 74 L226 56 L236 108 L174 124 Z" fill={cuffFill} />
          <path d="M166 74 L226 56 L236 108 L174 124 Z" fill={cuffPattern} />
          <circle cx="182" cy="106" r="3" fill={strokeMain} />

          {/* Tuning Fork */}
          <path
            d="M72 24 L72 64 C72 80, 102 80, 102 64 L102 24 M87 76 L87 128"
            stroke={strokeMain}
            strokeWidth="5.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Balanced Calm Acoustic Ripples */}
          <path d="M54 34 C46 44, 46 56, 54 66 M120 34 C128 44, 128 56, 120 66" stroke={accentStroke} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M40 28 C28 42, 28 58, 40 72" stroke={accentStroke} strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />

          {/* Hand Gripping Fork Stem */}
          <path
            d="M168 82 C144 76, 116 74, 96 86 C86 92, 90 104, 106 104 L102 116 C94 122, 102 134, 122 128 C142 124, 158 120, 174 118 Z"
            fill={handFill}
            stroke={strokeMain}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          <path d="M106 104 L144 102 M110 116 L146 114" stroke={strokeMain} strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
  }
}

/**
 * 5 Compact Charming Hand-Inked Editorial Spot Icons for #ruang Tilted White Tarot Cards.
 * Sized and proportioned directly like the lipstick spot icon in ordix/beat-who-its-for-1440.png.
 */
export function TypologySpotIllustration({ kind }) {
  switch (kind) {
    case 'office':
      return (
        <svg className="typo-spot-svg" viewBox="0 0 88 88" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Desk Acoustic Lamp */}
          <path d="M24 72 L64 72" stroke="#47220E" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M44 72 L44 46 L56 26" stroke="#47220E" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 22 C44 12, 62 14, 68 28 L42 36 Z" fill="#FFA125" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M26 44 C30 40, 34 40, 38 44 M22 52 C28 48, 34 48, 40 52" stroke="#47220E" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'cafe':
      return (
        <svg className="typo-spot-svg" viewBox="0 0 88 88" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Espresso Cup & Calm Wave */}
          <path d="M22 40 L58 40 L53 66 C51 72, 29 72, 27 66 Z" fill="#FFA125" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M58 44 C68 44, 68 58, 56 60" stroke="#47220E" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M18 72 L66 72" stroke="#47220E" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M32 30 C32 22, 38 22, 38 14 M46 30 C46 22, 52 22, 52 16" stroke="#47220E" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case 'studio':
      return (
        <svg className="typo-spot-svg" viewBox="0 0 88 88" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Classic Condenser Studio Mic */}
          <rect x="32" y="14" width="24" height="36" rx="12" fill="#FFA125" stroke="#47220E" strokeWidth="3.2" />
          <path d="M36 26 L52 26 M36 34 L52 34 M36 42 L52 42" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M24 38 C24 56, 64 56, 64 38 M44 54 L44 72 M30 72 L58 72" stroke="#47220E" strokeWidth="3.4" strokeLinecap="round" />
        </svg>
      );
    case 'clinic':
      return (
        <svg className="typo-spot-svg" viewBox="0 0 88 88" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Quiet Door Key & Acoustic Seal */}
          <circle cx="34" cy="34" r="14" fill="#FFA125" stroke="#47220E" strokeWidth="3.2" />
          <circle cx="34" cy="34" r="5" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.6" />
          <path d="M44 44 L68 68 M58 58 L66 50 M64 64 L72 56" stroke="#47220E" strokeWidth="3.6" strokeLinecap="round" />
        </svg>
      );
    case 'auditorium':
    default:
      return (
        <svg className="typo-spot-svg" viewBox="0 0 88 88" fill="none" aria-hidden="true" data-art="redam-risograph">
          {/* Curved Acoustic Shell Canopy */}
          <path d="M16 64 C16 28, 72 28, 72 64 Z" fill="#FFA125" stroke="#47220E" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M28 64 C28 40, 60 40, 60 64" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.8" />
          <path d="M12 68 L76 68" stroke="#47220E" strokeWidth="3.6" strokeLinecap="round" />
        </svg>
      );
  }
}

/**
 * Levitating Meditating Character Overlapping Giant Amber Headline (#bukti).
 * Exact aesthetic match to ordix/low-1440.png: crisp white suit/lotus legs, deep espresso outlines,
 * vibrant #FFA125 vertical necktie down the center, delicate mudra hands.
 */
export function MeditatingCharacter() {
  return (
    <svg
      className="meditating-char-svg"
      viewBox="0 0 380 280"
      fill="none"
      aria-hidden="true"
      data-art="redam-risograph"
    >
      {/* Cross-Legged Lotus Base */}
      <path
        d="M92 222 C96 196, 144 188, 190 202 C236 188, 284 196, 288 222 C284 242, 236 254, 190 248 C144 254, 96 242, 92 222 Z"
        fill="#FFFFFF"
        stroke="#3B1A14"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M128 214 L252 246 M252 214 L128 246"
        stroke="#3B1A14"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* Left & Right Lotus Shoes */}
      <path d="M108 246 L146 252 L144 260 L102 254 Z" fill="#FFFFFF" stroke="#3B1A14" strokeWidth="3" />
      <path d="M272 246 L234 252 L236 260 L278 254 Z" fill="#FFFFFF" stroke="#3B1A14" strokeWidth="3" />

      {/* Outstretched Arms in Mudra Pose */}
      <path
        d="M138 118 L108 176 L58 178 L58 196 L122 194 L154 140 Z"
        fill="#FFFFFF"
        stroke="#3B1A14"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      <path
        d="M242 118 L272 176 L322 178 L322 196 L258 194 L226 140 Z"
        fill="#FFFFFF"
        stroke="#3B1A14"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      {/* Delicate Mudra Hands */}
      <path
        d="M58 184 C44 178, 32 184, 34 192 C36 198, 48 196, 58 192 M46 182 L32 172 M46 190 L28 186"
        fill="#FFFFFF"
        stroke="#3B1A14"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M322 184 C336 178, 348 184, 346 192 C344 198, 332 196, 322 192 M334 182 L348 172 M334 190 L352 186"
        fill="#FFFFFF"
        stroke="#3B1A14"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Tailored White Blazer Torso */}
      <path
        d="M136 112 L244 112 L226 206 L154 206 Z"
        fill="#FFFFFF"
        stroke="#3B1A14"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M162 112 L176 196 M218 112 L204 196" stroke="#3B1A14" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M214 142 L228 142 L226 148 L214 148 Z" fill="#FFFFFF" stroke="#3B1A14" strokeWidth="2.4" />

      {/* Iconic Vertical Marigold Amber Necktie */}
      <path
        d="M182 112 L198 112 L204 194 L190 212 L176 194 Z"
        fill="#FFA125"
        stroke="#3B1A14"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />

      {/* Serene Meditating Elongated Head */}
      <path
        d="M170 42 C176 32, 204 32, 210 42 L214 114 L166 114 Z"
        fill="#FFFFFF"
        stroke="#3B1A14"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      {/* Hair Crown */}
      <path d="M168 42 C166 20, 212 18, 214 42 C200 38, 182 38, 168 42 Z" fill="#3B1A14" />
      <path d="M176 30 C188 28, 198 30, 206 36" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      {/* Closed Peaceful Eyes & Slight Smile */}
      <path d="M176 66 C180 71, 186 71, 188 66 M194 66 C198 71, 204 71, 206 66" stroke="#3B1A14" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M188 74 L192 82 L187 82" stroke="#3B1A14" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M183 92 C188 96, 194 96, 198 92" stroke="#3B1A14" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Warm Prefooter Peeking Acoustic Figure Inviting User to Open Sabine RT60 Estimator.
 */
export function PrefooterCharacter() {
  return (
    <svg
      className="prefooter-char-svg"
      viewBox="0 0 220 150"
      fill="none"
      aria-hidden="true"
      data-art="redam-risograph"
    >
      {/* Calm Acoustic Wave Horizon */}
      <path d="M14 134 C66 118, 154 118, 206 134" stroke="#FFA125" strokeWidth="4" strokeLinecap="round" />
      {/* Shoulders in Marigold Blazer */}
      <path
        d="M52 134 C58 98, 78 88, 110 88 C142 88, 162 98, 168 134 Z"
        fill="#FFA125"
        stroke="#47220E"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      <path d="M96 88 L124 88 L110 124 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.8" />
      <path d="M106 94 L114 94 L112 126 L108 126 Z" fill="#3B1A14" />
      {/* Expressive Elongated Head */}
      <path
        d="M92 32 C98 22, 122 22, 128 32 L130 88 L90 88 Z"
        fill="#FFFFFF"
        stroke="#47220E"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      <path d="M90 34 C90 14, 128 12, 132 34 C118 30, 102 30, 90 34 Z" fill="#3B1A14" />
      <path d="M98 22 C108 20, 118 22, 124 28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="103" cy="50" r="2.4" fill="#47220E" />
      <circle cx="117" cy="50" r="2.4" fill="#47220E" />
      <path d="M108 52 L105 64 L114 64" stroke="#47220E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M103 72 C108 76, 114 76, 118 72" stroke="#47220E" strokeWidth="2.4" strokeLinecap="round" />
      {/* Waving Hand */}
      <path d="M162 114 C174 96, 186 78, 192 64" stroke="#47220E" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M184 58 C186 48, 200 48, 202 58 C202 66, 192 70, 184 66 Z" fill="#FFFFFF" stroke="#47220E" strokeWidth="2.8" />
    </svg>
  );
}
