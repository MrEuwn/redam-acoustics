export const CONTENT = {
  id: {
    langCode: 'ID',
    langSwitchLabel: 'EN',
    langSwitchAria: 'Ganti bahasa ke English',
    brand: 'REDAM',
    nav: {
      menu: 'MENU',
      close: 'TUTUP',
      cta: 'AUDIT RUANG',
      audioOff: 'SIMULASI SUARA: MATI',
      audioOn: 'SIMULASI SUARA: AKTIF',
      dampenOff: 'MODE REDAM: OFF (74 dBA)',
      dampenOn: 'MODE REDAM: ON (46 dBA)',
      links: [
        { id: 'tantangan', label: 'TANTANGAN AKUSTIK' },
        { id: 'solusi', label: 'SOLUSI KAMI' },
        { id: 'ruang', label: 'UNTUK SIAPA' },
        { id: 'tentang', label: 'TENTANG KAMI' },
        { id: 'bukti', label: 'STUDI AKUSTIK' },
        { id: 'kontak', label: 'KONTAK' },
      ],
    },
    hero: {
      headlineLines: ['KAMI MEREDAM', 'BISING RUANG', 'ANDA'],
      subheadLines: ['Agar ruang kaca', 'setenang tampilannya'],
      cta: 'HITUNG AUDIT RT60',
      scrollWord: 'GULIR',
    },
    diagnosis: {
      backdropLines: ['RUANG INDAH,', 'TELINGA LELAH'],
      cards: [
        {
          id: '01',
          variant: 'glass',
          titleLines: ['Gema dinding', 'kaca penuh'],
          body: 'BIDANG KACA PENUH MEMANTULKAN HAMPIR 96% ENERGI VOKAL. PERCAKAPAN MEJA SEBELAH SALING BERTUMPUK HINGGA SEMUA ORANG TERPAKSA BICARA LEBIH KERAS.',
        },
        {
          id: '02',
          variant: 'hvac',
          titleLines: ['Dengung ducting', 'pendingin HVAC'],
          body: 'GETARAN MESIN PENDINGIN DAN ALIRAN UDARA CEPAT PADA SALURAN LOGAM MENCIPTAKAN DENGUNG FREKUENSI RENDAH YANG MEMICU LELAH FOKUS.',
        },
        {
          id: '03',
          variant: 'partition',
          titleLines: ['Bocor partisi', 'ruang tipis'],
          body: 'PARTISI GIPSUM SATU LAPIS TANPA INSULASI RONGGA DAN CELAH PINTU 6 MM MEMBUAT RAPAT PRIVAT TERDENGAR JELAS HINGGA KE KORIDOR.',
        },
        {
          id: '04',
          variant: 'ceiling',
          titleLines: ['Pantulan plafon', 'beton tinggi'],
          body: 'PLAFON BETON EKSPOS DI ATAS 4 METER MEMBENTUK PANTULAN VERTIKAL BERULANG YANG MEMBUAT SUARA SENDOK, KURSI, DAN LANGKAH TERASA TAJAM.',
        },
        {
          id: '05',
          variant: 'traffic',
          titleLines: ['Getaran bising', 'jalan raya'],
          body: 'BISING KNALPOT DAN KENDARAAN BERAT MENEMBUS RANGKA KUSEN TIPIS SERTA KACA TUNGGAL, MENURUNKAN KEJERNIHAN REKAMAN DAN KETENANGAN RUANG.',
        },
      ],
      pushBeat: {
        metricLine: 'HINGGA -14 dB',
        headlineLines: ['BISING', 'DIREDAM'],
      },
    },
    solutions: {
      headlineLines: ['SOLUSI TANPA', 'BONGKAR TOTAL', 'RUANG'],
      items: [
        {
          label: 'BAFFLE PLAFON MIKRO',
          detail: 'NRC 0.85 (250-4000 Hz) · Bilah gantung mikro-perforasi yang memangkas dengung tanpa menutup jalur lampu eksisting.',
        },
        {
          label: 'SEAL AKUSTIK PINTU',
          detail: '+11 dB Isolasi Celah · Drop-down perimeter seal dan karet EPDM berlapis menutup kebocoran suara di kusen.',
        },
        {
          label: 'DIFFUSER KAYU LAMEL',
          detail: 'Scatter 600-3500 Hz · Profil kayu solid terhitung matematis agar pantulan merata tanpa membuat ruang terasa mati.',
        },
        {
          label: 'ISOLASI DUCTING HVAC',
          detail: '-9 dBA Dengung Rendah · Peredam fleksibel anti-getar dan selimut massa akustik pada plenum pendingin.',
        },
        {
          label: 'PANEL FELT TERSEMBUNYI',
          detail: 'NRC 0.90 (18 mm) · Serat PET daur ulang berdensitas tinggi yang diwarnai senada dengan dinding asli.',
        },
        {
          label: 'KALIBRASI RT60',
          detail: 'ISO 3382-1 · Uji impuls ulang setelah pemasangan untuk memverifikasi target waktu dengung secara terukur.',
        },
      ],
    },
    process: {
      headlineLines: ['CARA', 'KERJA'],
      description:
        'PERTAMA, KAMI MEMETAKAN PERILAKU SUARA RUANG ANDA DENGAN MIKROFON PENGUKURAN KELAS 1 DARI TINGKAT KEBISINGAN LATAR HINGGA WAKTU DENGUNG PER PITA OKTAF. LALU KAMI MERANCANG INTERVENSI AKUSTIK YANG CEPAT DIPASANG TANPA MENGHENTIKAN OPERASIONAL HARIAN.',
      steps: [
        {
          index: '(01)',
          step: '01',
          theme: 'amber',
          titleLines: ['Pengukuran', 'dB & RT60'],
          body: 'AUDIT LAPANGAN MIKROFON KELAS 1 UNTUK MEREKAM KEBISINGAN LATAR DAN KURVA PELURUHAN RT60.',
        },
        {
          index: '(02)',
          step: '02',
          theme: 'espresso',
          titleLines: ['Pemetaan', 'bocor suara'],
          body: 'KAMI MENUNJUKKAN TITIK PANTUL DAN CELAH KEBOCORAN DALAM ANGKA DESIBEL YANG TERUKUR.',
        },
        {
          index: '(03)',
          step: '03',
          theme: 'amber',
          titleLines: ['Desain tanpa', 'bongkar total'],
          body: 'PEMILIHAN BAFFLE, DIFFUSER KAYU, DAN PERIMETER SEAL YANG MENJAGA ESTETIKA ARSITEKTUR ASLI.',
        },
        {
          index: '(04)',
          step: '04',
          theme: 'espresso',
          titleLines: ['Instalasi &', 'uji ulang'],
          body: 'PEMASANGAN PRESISI OLEH TEKNISI AKUSTIK DAN VERIFIKASI PENGUKURAN AKHIR SEBELUM SERAH TERIMA.',
        },
      ],
    },
    typologies: {
      headlineLines: ['UNTUK SIAPA'],
      introPrimary:
        'LAYANAN KAMI DIRANCANG UNTUK RUANG URBAN YANG MENGANDALKAN KEJELASAN PERCAKAPAN, FOKUS KERJA, DAN KENYAMANAN TELINGA DI TENGAH ARSITEKTUR KACA SERTA BETON EKSPOS.',
      introSecondary:
        'KAMI BEKERJA SANGAT BAIK BERSAMA KANTOR OPEN-PLAN, KAFE DAN RESTORAN KACA, STUDIO PODCAST DAN MUSIK, KLINIK KONSELING, SERTA AUDITORIUM DAN GALERI DI MANA AKUSTIK MENENTUKAN KUALITAS PENGALAMAN.',
      cards: [
        {
          index: '(01)',
          kind: 'office',
          titleLines: ['Kantor', 'Open-Plan'],
          body: 'MENJAGA PRIVASI PANGGILAN TELEPON DAN MENGURANGI KELELAHAN KOGNITIF DI MEJA KERJA KOLABORATIF. TARGET RT60 0.45-0.60S.',
        },
        {
          index: '(02)',
          kind: 'cafe',
          titleLines: ['Kafe &', 'Restoran'],
          body: 'MENGHILANGKAN EFEK RUANG RAMAI AGAR OBROLAN MEJA TETAP AKRAB MESKI SELURUH KURSI TERISI PENUH. TARGET RT60 0.55-0.75S.',
        },
        {
          index: '(03)',
          kind: 'studio',
          titleLines: ['Studio', 'Podcast'],
          body: 'KONTROL RESONANSI BASS DAN PANTULAN AWAL UNTUK KEJERNIHAN VOKAL SERTA AKURASI MONITORING. TARGET RT60 0.25-0.38S.',
        },
        {
          index: '(04)',
          kind: 'clinic',
          titleLines: ['Klinik &', 'Konseling'],
          body: 'ISOLASI KERAHASIAAN SUARA ANTAR RUANG PERIKSA DAN PENURUNAN GEMA DI RUANG TUNGGU PASIEN. TARGET STC >= 52 dB.',
        },
        {
          index: '(05)',
          kind: 'auditorium',
          titleLines: ['Auditorium', '& Galeri'],
          body: 'KEJELASAN ARTIKULASI BICARA HINGGA BARISAN BELAKANG TANPA MERUSAK KEMEGAHAN LANGIT-LANGIT. TARGET RT60 0.70-0.95S.',
        },
      ],
    },
    manifesto: {
      question: 'Kenapa tidak pasang busa telur sendiri?',
      lines: [
        'TIDAK TAHAN BASS',
        'MERUSAK ARSITEKTUR',
        'TANPA PETA PANTUL',
        'GAGAL UJI RT60',
      ],
    },
    about: {
      headlineLines: ['TENTANG', 'KAMI'],
      portraitAlt:
        'Potret studio tim insinyur akustik arsitektur REDAM dalam olahan duotone espresso hangat',
      bio: 'Kami adalah tim insinyur akustik bangunan dan arsitek interior yang fokus pada ketenangan terukur. Berangkat dari audit lapangan pada puluhan ruang kaca dan beton ekspos di Jakarta serta Bandung, di mana gema awal kerap menembus 1.6 hingga 2.3 detik dan celah pintu 5 mm membocorkan 8 hingga 12 dB suara, REDAM merancang intervensi sunyi yang menyatu dengan material asli arsitek Anda.',
    },
    proof: {
      headlineLines: ['TENANG YANG', 'TERUKUR NYATA'],
      prevAria: 'Kartu studi sebelumnya',
      nextAria: 'Kartu studi berikutnya',
      cards: [
        {
          index: '(01)',
          name: 'Kopi Tugu Menteng',
          role: 'Kafe Fasad Kaca · Simulasi RT60 1.92s -> 0.58s',
          quote:
            'PENAMBAHAN 24 BILAH BAFFLE PLAFON MIKRO DI SELA BALOK EKSPOS MEMANGKAS DENGUNG PIRING DAN OBROLAN JAM MAKAN SIANG SECARA DRASTIS TANPA MENYENTUH DINDING BATA ASLI.',
        },
        {
          index: '(02)',
          name: 'Studio Svara Kemang',
          role: 'Studio Podcast · Simulasi RT60 0.94s -> 0.29s',
          quote:
            'PERANGKAP BASS SUDUT TERSEMBUNYI DI BALIK LAMEL KAYU OAK DAN PENYEGELAN KUSEN PINTU GANDA MENJAGA BISING JALAN RAYA DI BAWAH AMBANG NC-25 SEPANJANG SESI REKAMAN.',
        },
        {
          index: '(03)',
          name: 'Ruang Kerja Cipta',
          role: 'Kantor Arsitek · Simulasi RT60 1.48s -> 0.46s',
          quote:
            'ISOLASI PLENUM AC DAN PANEL FELT WARNA KAPUR DI ZONA RAPAT TERBUKA MEMBUAT DUA PANGGILAN VIDEO BERSAMAAN TIDAK LAGI SALING MENGGANGGU DARI JARAK EMPAT METER.',
        },
        {
          index: '(04)',
          name: 'Klinik Tenang Bandung',
          role: 'Klinik Konseling · Simulasi STC 32 -> 53 dB',
          quote:
            'PEMASANGAN DROP-SEAL PINTU AKUSTIK DAN PENGISIAN WOL MINERAL PADA RONGGA PARTISI ATAS PLAFON MENGEMBALIKAN PRIVASI PENUH PERCAKAPAN DI SELURUH RUANG KONSELING.',
        },
      ],
    },
    prefooter: {
      title: 'Berapa detik gema ruang Anda saat ini?',
      cta: 'HITUNG AUDIT RT60',
    },
    footer: {
      contactsHeading: 'Kontak',
      socialHeading: 'Jaringan sosial',
      standardsHeading: 'Lab akustik',
      detailsHeading: 'Detail studio',
      phone: '+62 21 5088 4219',
      email: 'HALO@REDAMAKUSTIK.ID',
      socials: [
        { label: 'INSTAGRAM', href: '#kontak' },
        { label: 'LINKEDIN', href: '#kontak' },
      ],
      standards: [
        { label: 'KALKULATOR RT60', action: 'audit' },
        { label: 'STANDAR ISO 3382-1', href: '#cara-kerja' },
      ],
      companyName: 'PT REDAM REKAYASA AKUSTIK',
      details: [
        { key: 'STUDIO', value: 'JL. KEMANG TIMUR NO. 48, JAKARTA SELATAN' },
        { key: 'LAB BANDUNG', value: 'JL. CISANGKUY NO. 14, BANDUNG' },
        { key: 'INSTRUMEN', value: 'NTI AUDIO XL2 · MIKROFON KELAS 1' },
        { key: 'JAM KERJA', value: 'SENIN - JUMAT, 09.00 - 18.00 WIB' },
      ],
      copyright: '© 2026 REDAM',
      colophonTop: 'STUDIO AKUSTIK ARSITEKTUR',
      colophonBottom: 'REDAM REKAYASA AKUSTIK',
    },
    modal: {
      badge: 'KALKULATOR ESTIMASI SABINE · [HYPOTHESIS]',
      title: 'Audit Cepat RT60 Ruang',
      subtitle:
        'Masukkan dimensi dan material dominan ruang Anda untuk estimasi waktu dengung awal serta rekomendasi paket peredaman non-invasif.',
      closeAria: 'Tutup kalkulator audit ruang',
      areaLabel: 'Luas Ruang',
      heightLabel: 'Tinggi Plafon',
      typologyLabel: 'Fungsi Ruang',
      surfaceLabel: 'Permukaan Dominan',
      typologies: [
        { id: 'cafe', label: 'Kafe / Restoran', targetMin: 0.55, targetMax: 0.75 },
        { id: 'office', label: 'Kantor Open-Plan', targetMin: 0.45, targetMax: 0.6 },
        { id: 'studio', label: 'Studio Podcast / Musik', targetMin: 0.25, targetMax: 0.38 },
        { id: 'clinic', label: 'Klinik / Konseling', targetMin: 0.4, targetMax: 0.55 },
        { id: 'auditorium', label: 'Auditorium / Galeri', targetMin: 0.7, targetMax: 0.95 },
      ],
      surfaces: [
        { id: 'glass', label: 'Kaca Penuh & Beton Ekspos', alpha: 0.055 },
        { id: 'gypsum', label: 'Dinding Gipsum & Lantai Keramik', alpha: 0.085 },
        { id: 'mixed', label: 'Campuran Kayu, Karpet & Plafon Gipsum', alpha: 0.145 },
      ],
      resultEstLabel: 'Estimasi RT60 Awal',
      resultTargetLabel: 'Target Ideal ISO 3382',
      resultVolumeLabel: 'Volume Udara',
      resultAbsLabel: 'Tambahan Serapan Dibutuhkan',
      statusHigh: 'Gema Tinggi · Perlu Intervensi Penuh',
      statusMid: 'Gema Sedang · Perlu Penyetelan Terarah',
      statusOk: 'Mendekati Ideal · Kalibrasi Ringan',
      packageHeading: 'Rekomendasi Paket Tanpa Bongkar',
      namePlaceholder: 'Nama / Nama Ruang',
      emailPlaceholder: 'Email (nama@studio.id)',
      submitBtn: 'JADWALKAN AUDIT LAPANGAN',
      downloadBtn: 'UNDUH RINGKASAN (.TXT)',
      confirmedTitle: 'Permintaan Audit Tercatat',
      confirmedBody:
        'Ringkasan estimasi Sabine telah siap. Tim akustik REDAM akan menghubungi Anda untuk jadwal pengukuran Kelas 1 di lokasi.',
      resetBtn: 'Hitung Ruang Lain',
    },
  },
  en: {
    langCode: 'EN',
    langSwitchLabel: 'ID',
    langSwitchAria: 'Switch language to Indonesian',
    brand: 'REDAM',
    nav: {
      menu: 'MENU',
      close: 'CLOSE',
      cta: 'BOOK AUDIT',
      audioOff: 'ROOM AUDIO DEMO: OFF',
      audioOn: 'ROOM AUDIO DEMO: LIVE',
      dampenOff: 'DAMPEN MODE: OFF (74 dBA)',
      dampenOn: 'DAMPEN MODE: ON (46 dBA)',
      links: [
        { id: 'tantangan', label: 'ACOUSTIC CHALLENGES' },
        { id: 'solusi', label: 'HOW WE HELP' },
        { id: 'ruang', label: "WHO IT'S FOR" },
        { id: 'tentang', label: 'WHO WE ARE' },
        { id: 'bukti', label: 'ACOUSTIC PROOF' },
        { id: 'kontak', label: 'CONTACTS' },
      ],
    },
    hero: {
      headlineLines: ['WE SILENCE', 'ARCHITECTURAL', 'NOISE'],
      subheadLines: ['Where glass spaces', 'sound as calm as they look'],
      cta: 'ESTIMATE RT60 AUDIT',
      scrollWord: 'SCROLL',
    },
    diagnosis: {
      backdropLines: ['BEAUTIFUL ROOM,', 'EXHAUSTED EARS'],
      cards: [
        {
          id: '01',
          variant: 'glass',
          titleLines: ['Glass curtain', 'wall echo'],
          body: 'FULL-HEIGHT GLAZING REFLECTS NEARLY 96% OF VOCAL ENERGY. ADJACENT TABLES STACK UP UNTIL EVERY GUEST RAISES THEIR VOICE JUST TO BE HEARD.',
        },
        {
          id: '02',
          variant: 'hvac',
          titleLines: ['HVAC ductwork', 'low-end drone'],
          body: 'CHILLER VIBRATION AND HIGH-VELOCITY METAL DUCT TURBULENCE GENERATE A STEADY LOW-FREQUENCY HUM THAT DRAINS CONCENTRATION WITHIN AN HOUR.',
        },
        {
          id: '03',
          variant: 'partition',
          titleLines: ['Thin partition', 'sound bleed'],
          body: 'SINGLE-LAYER DRYWALL LACKING CAVITY WOOL PLUS A 6 MM DOOR UNDERCUT LETS PRIVATE MEETINGS AND CLINICAL SESSIONS CARRY INTO THE CORRIDOR.',
        },
        {
          id: '04',
          variant: 'ceiling',
          titleLines: ['High concrete', 'slab slap-echo'],
          body: 'EXPOSED CONCRETE CEILINGS ABOVE FOUR METERS TRAP VERTICAL FLUTTER ECHOES, TURNING CUTLERY, CHAIRS, AND FOOTSTEPS INTO HARSH GLARE.',
        },
        {
          id: '05',
          variant: 'traffic',
          titleLines: ['Arterial road', 'frame rumble'],
          body: 'EXHAUST RUMBLE AND HEAVY URBAN TRAFFIC PASS THROUGH THIN MULLIONS AND SINGLE GLAZING, MUDDYING VOICE RECORDINGS AND QUIET REST SPACES.',
        },
      ],
      pushBeat: {
        metricLine: 'UP TO -14 dB',
        headlineLines: ['ROOM NOISE', 'SILENCED'],
      },
    },
    solutions: {
      headlineLines: ['SOLUTIONS', 'WITHOUT HEAVY', 'TEARDOWN'],
      items: [
        {
          label: 'MICRO CEILING BAFFLES',
          detail: 'NRC 0.85 (250-4000 Hz) · Micro-perforated suspended blades that cut decay time without obstructing lighting tracks.',
        },
        {
          label: 'ACOUSTIC DOOR SEALS',
          detail: '+11 dB Gap Isolation · Automatic drop-down seals and layered EPDM gaskets sealing perimeter sound leaks.',
        },
        {
          label: 'TIMBER SLAT DIFFUSERS',
          detail: 'Scatter 600-3500 Hz · Mathematically spaced hardwood fins dispersing reflections while keeping rooms natural.',
        },
        {
          label: 'HVAC DUCT ISOLATION',
          detail: '-9 dBA Low-End Hum · Anti-vibration flexible collars and acoustic mass wraps across noisy mechanical plenums.',
        },
        {
          label: 'CONCEALED FELT PANELS',
          detail: 'NRC 0.90 (18 mm) · High-density recycled PET felt color-matched seamlessly to mineral plaster walls.',
        },
        {
          label: 'RT60 CALIBRATION',
          detail: 'ISO 3382-1 · Post-installation impulse response retesting verifying your target decay curve in writing.',
        },
      ],
    },
    process: {
      headlineLines: ['HOW IT', 'WORKS'],
      description:
        'FIRST, WE MAP HOW SOUND BEHAVES INSIDE YOUR SPACE USING CLASS-1 MEASUREMENT MICROPHONES FROM BACKGROUND NOISE FLOORS TO OCTAVE-BAND DECAY TIMES. THEN WE ENGINEER PRACTICAL INTERVENTIONS INSTALLED CLEANLY WITHOUT DISRUPTING DAILY OPERATIONS.',
      steps: [
        {
          index: '(01)',
          step: '01',
          theme: 'amber',
          titleLines: ['dB & RT60', 'measurement'],
          body: 'ON-SITE CLASS-1 OMNIDIRECTIONAL SURVEY LOGGING BACKGROUND NOISE FLOORS AND SIX-BAND RT60 DECAY.',
        },
        {
          index: '(02)',
          step: '02',
          theme: 'espresso',
          titleLines: ['Acoustic leak', 'identification'],
          body: 'WE HIGHLIGHT SPECIFIC REFLECTION PATHS AND PARTITION LEAKS IN MEASURABLE DECIBEL NUMBERS.',
        },
        {
          index: '(03)',
          step: '03',
          theme: 'amber',
          titleLines: ['Non-invasive', 'specification'],
          body: 'ARCHITECTURAL BAFFLES, TIMBER DIFFUSERS, AND DOOR SEALS SPECIFIED TO RESPECT YOUR ORIGINAL INTERIOR.',
        },
        {
          index: '(04)',
          step: '04',
          theme: 'espresso',
          titleLines: ['Installation &', 'retest'],
          body: 'PRECISION MOUNTING BY ACOUSTIC TECHNICIANS FOLLOWED BY A CLOSING IMPULSE VERIFICATION REPORT.',
        },
      ],
    },
    typologies: {
      headlineLines: ["WHO IT'S FOR"],
      introPrimary:
        'OUR WORK IS BUILT FOR CONTEMPORARY INTERIORS WHERE SPEECH CLARITY, COGNITIVE CALM, AND ARCHITECTURAL RESTRAINT MATTER EQUALLY.',
      introSecondary:
        'WE WORK ESPECIALLY WELL WITH OPEN-PLAN OFFICES, GLASS CAFES AND RESTAURANTS, PODCAST AND SOUND STUDIOS, COUNSELING CLINICS, AND AUDITORIUMS WHERE ACOUSTIC COMFORT SHAPES EVERY VISIT.',
      cards: [
        {
          index: '(01)',
          kind: 'office',
          titleLines: ['Open-Plan', 'Offices'],
          body: 'PROTECT CALL PRIVACY AND ELIMINATE VOCAL FATIGUE ACROSS DENSE COLLABORATIVE WORKSTATIONS. TARGET RT60 0.45-0.60S.',
        },
        {
          index: '(02)',
          kind: 'cafe',
          titleLines: ['Glass Cafes', '& Bistros'],
          body: 'TAME THE LOMBARD EFFECT SO TABLE CONVERSATIONS STAY EFFORTLESS EVEN AT FULL WEEKEND CAPACITY. TARGET RT60 0.55-0.75S.',
        },
        {
          index: '(03)',
          kind: 'studio',
          titleLines: ['Podcast &', 'Sound Studios'],
          body: 'CONTROL LOW-END ROOM MODES AND EARLY FLUTTER FOR BROADCAST-READY VOCAL CLARITY. TARGET RT60 0.25-0.38S.',
        },
        {
          index: '(04)',
          kind: 'clinic',
          titleLines: ['Clinics &', 'Counseling'],
          body: 'RESTORE SPEECH CONFIDENTIALITY BETWEEN THERAPY ROOMS AND CALM WAITING LOBBIES. TARGET STC >= 52 dB.',
        },
        {
          index: '(05)',
          kind: 'auditorium',
          titleLines: ['Auditoriums', '& Galleries'],
          body: 'DELIVER CRISP SPEECH INTELLIGIBILITY TO THE BACK ROW WITHOUT CLUTTERING TALL CEILINGS. TARGET RT60 0.70-0.95S.',
        },
      ],
    },
    manifesto: {
      question: 'Why not stick acoustic foam yourself?',
      lines: [
        'NO BASS CONTROL',
        'RUINS ARCHITECTURE',
        'NO REFLECTION MAP',
        'FAILS RT60 TEST',
      ],
    },
    about: {
      headlineLines: ['WHO WE', 'ARE'],
      portraitAlt:
        'Editorial studio portrait of REDAM architectural acoustics team rendered in warm espresso duotone',
      bio: 'We are building-acoustics engineers and interior architects focused on measurable calm. Born from field audits across dozens of glass and exposed-concrete interiors in Jakarta and Bandung, where baseline echo regularly hits 1.6 to 2.3 seconds and a 5 mm door gap leaks 8 to 12 dB, REDAM crafts quiet interventions that honor your original architecture.',
    },
    proof: {
      headlineLines: ['MEASURABLE', 'ACOUSTIC CALM'],
      prevAria: 'Previous benchmark card',
      nextAria: 'Next benchmark card',
      cards: [
        {
          index: '(01)',
          name: 'Kopi Tugu Menteng',
          role: 'Glass Cafe · Simulated RT60 1.92s -> 0.58s',
          quote:
            'TWENTY-FOUR MICRO-PERFORATED CEILING BAFFLES TUCKED BETWEEN EXPOSED BEAMS CUT LUNCH-HOUR CLATTER AND ECHO SHARPLY WHILE LEAVING ORIGINAL BRICK WALLS UNTOUCHED.',
        },
        {
          index: '(02)',
          name: 'Studio Svara Kemang',
          role: 'Podcast Room · Simulated RT60 0.94s -> 0.29s',
          quote:
            'CONCEALED CORNER BASS TRAPS BEHIND OAK SLATS PAIRED WITH DOUBLE PERIMETER DOOR SEALS KEEP ARTERIAL ROAD RUMBLE SAFELY BELOW NC-25 THROUGHOUT VOCAL TAKES.',
        },
        {
          index: '(03)',
          name: 'Ruang Kerja Cipta',
          role: 'Architecture Office · Simulated RT60 1.48s -> 0.46s',
          quote:
            'HVAC PLENUM ISOLATION AND MINERAL-CHALK FELT PLANES ABOVE OPEN TABLES ALLOW PARALLEL VIDEO CALLS FOUR METERS APART WITHOUT ACOUSTIC BLEED.',
        },
        {
          index: '(04)',
          name: 'Klinik Tenang Bandung',
          role: 'Counseling Clinic · Simulated STC 32 -> 53 dB',
          quote:
            'AUTOMATIC ACOUSTIC DROP-SEALS AND PLENUM MINERAL-WOOL BAFFLES ABOVE PARTITION LINES RESTORE FULL CONVERSATIONAL PRIVACY ACROSS EVERY CONSULTATION ROOM.',
        },
      ],
    },
    prefooter: {
      title: 'How many seconds does your room echo today?',
      cta: 'ESTIMATE RT60 AUDIT',
    },
    footer: {
      contactsHeading: 'Contacts',
      socialHeading: 'Social networks',
      standardsHeading: 'Acoustic lab',
      detailsHeading: 'Studio details',
      phone: '+62 21 5088 4219',
      email: 'HALO@REDAMAKUSTIK.ID',
      socials: [
        { label: 'INSTAGRAM', href: '#kontak' },
        { label: 'LINKEDIN', href: '#kontak' },
      ],
      standards: [
        { label: 'RT60 ESTIMATOR', action: 'audit' },
        { label: 'ISO 3382-1 PROTOCOL', href: '#cara-kerja' },
      ],
      companyName: 'PT REDAM REKAYASA AKUSTIK',
      details: [
        { key: 'STUDIO', value: 'JL. KEMANG TIMUR NO. 48, SOUTH JAKARTA' },
        { key: 'BANDUNG LAB', value: 'JL. CISANGKUY NO. 14, BANDUNG' },
        { key: 'INSTRUMENTS', value: 'NTI AUDIO XL2 · CLASS-1 MIC' },
        { key: 'HOURS', value: 'MON - FRI, 09:00 - 18:00 WIB' },
      ],
      copyright: '© 2026 REDAM',
      colophonTop: 'ARCHITECTURAL ACOUSTICS STUDIO',
      colophonBottom: 'REDAM ACOUSTIC ENGINEERING',
    },
    modal: {
      badge: 'SABINE RT60 ESTIMATOR · [HYPOTHESIS]',
      title: 'Quick Room RT60 Audit',
      subtitle:
        'Dial in your floor area, ceiling height, and primary finishes to estimate baseline reverberation and receive a non-invasive treatment blueprint.',
      closeAria: 'Close room audit estimator',
      areaLabel: 'Floor Area',
      heightLabel: 'Ceiling Height',
      typologyLabel: 'Space Typology',
      surfaceLabel: 'Dominant Surfaces',
      typologies: [
        { id: 'cafe', label: 'Cafe / Restaurant', targetMin: 0.55, targetMax: 0.75 },
        { id: 'office', label: 'Open-Plan Office', targetMin: 0.45, targetMax: 0.6 },
        { id: 'studio', label: 'Podcast / Music Studio', targetMin: 0.25, targetMax: 0.38 },
        { id: 'clinic', label: 'Clinic / Counseling', targetMin: 0.4, targetMax: 0.55 },
        { id: 'auditorium', label: 'Auditorium / Gallery', targetMin: 0.7, targetMax: 0.95 },
      ],
      surfaces: [
        { id: 'glass', label: 'Full Glazing & Exposed Concrete', alpha: 0.055 },
        { id: 'gypsum', label: 'Gypsum Walls & Ceramic Tile', alpha: 0.085 },
        { id: 'mixed', label: 'Mixed Timber, Carpet & Gypsum', alpha: 0.145 },
      ],
      resultEstLabel: 'Estimated Baseline RT60',
      resultTargetLabel: 'ISO 3382 Target Band',
      resultVolumeLabel: 'Air Volume',
      resultAbsLabel: 'Extra Absorption Needed',
      statusHigh: 'High Reverberation · Full Acoustic Package',
      statusMid: 'Moderate Echo · Targeted Intervention',
      statusOk: 'Near Target · Light Acoustic Calibration',
      packageHeading: 'Recommended Non-Invasive Package',
      namePlaceholder: 'Name / Space Name',
      emailPlaceholder: 'Email (name@studio.com)',
      submitBtn: 'SCHEDULE ON-SITE AUDIT',
      downloadBtn: 'DOWNLOAD SUMMARY (.TXT)',
      confirmedTitle: 'Audit Request Logged',
      confirmedBody:
        'Your Sabine baseline brief is ready. A REDAM acoustic engineer will coordinate your Class-1 on-site measurement window.',
      resetBtn: 'Estimate Another Space',
    },
  },
};
