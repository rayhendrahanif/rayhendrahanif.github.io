/**
 * All site copy lives here, in English and Bahasa Indonesia.
 * Source: CV_Rayhendra_Hanif_ATS_Indonesian.pdf (September 2026).
 * Edit this file to update the website; the layout reads everything from it.
 */

export type Locale = "en" | "id";

export type Entry = {
  period: string;
  role: string;
  org: string;
  place?: string;
  points?: string[];
  note?: string;
};

export type Presentation = {
  year: string;
  event: string;
  format: string;
  title?: string;
  outcome?: string;
  image?: { src: string; alt: string; width: number; height: number; position?: string };
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { id: string; label: string }[];
  ui: {
    skip: string;
    menu: string;
    close: string;
    themeToDark: string;
    themeToLight: string;
    langLabel: string;
    downloadCv: string;
    contact: string;
    research: string;
    present: string;
    livePlay: string;
    livePause: string;
    liveHint: string;
    viewPhoto: string;
    closePhoto: string;
    copyEmail: string;
    copied: string;
    backToTop: string;
    footer: string;
  };
  hero: {
    kicker: string;
    title: string;
    summary: string;
    based: string;
    credentials: string;
    figureCaption: string;
    figureAlt: string;
  };
  facts: { value: string; label: string }[];
  profile: { heading: string; body: string[] };
  training: {
    heading: string;
    intro: string;
    clinicalHeading: string;
    clinical: Entry[];
    educationHeading: string;
    education: Entry[];
    certsHeading: string;
    certs: Entry[];
  };
  research: {
    heading: string;
    intro: string;
    rolesHeading: string;
    roles: Entry[];
    presentationsHeading: string;
    presentations: Presentation[];
    publicationsHeading: string;
    publications: { year: string; title: string; translation?: string; venue: string }[];
  };
  outreach: {
    heading: string;
    intro: string;
    deploymentsHeading: string;
    deployments: Entry[];
    serviceHeading: string;
    service: Entry[];
    leadershipHeading: string;
    leadership: Entry[];
  };
  honors: { heading: string; items: { year?: string; title: string; detail: string }[] };
  skills: { heading: string; groups: { label: string; items: string[] }[] };
  contactSection: { heading: string; body: string; emailLabel: string; phoneLabel: string };
};

/* Shared, language-neutral data ------------------------------------------ */

export const person = {
  name: "Rayhendra Hanif",
  email: "rayhendra.hanif@gmail.com",
  phoneDisplay: "+62 813-7836-1518",
  phoneHref: "tel:+6281378361518",
  cv: "/cv/CV-Rayhendra-Hanif.pdf",
  portrait: {
    src: "/images/profile.jpg",
    srcSet: "/images/profile-400.jpg 400w, /images/profile.jpg 720w",
    width: 720,
    height: 720,
  },
  /**
   * Live Photo clip for the hero: a short (2–4 s) muted clip in /public/media/.
   * List MP4 (H.264, for Safari/iPhone) and WebM (VP9) versions, e.g.
   *   [{ src: "/media/portrait-live.mp4", type: "video/mp4" }, { src: "/media/portrait-live.webm", type: "video/webm" }]
   * While this is empty the portrait still tilts, but no "Live" badge is shown.
   */
  liveVideo: [] as { src: string; type: string }[],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rayhendra-hanif-32164b190/", handle: "in/rayhendra-hanif" },
    { label: "ORCID", href: "https://orcid.org/0009-0004-8234-2772", handle: "0009-0004-8234-2772" },
    { label: "GitHub", href: "https://github.com/rayhendrahanif", handle: "@rayhendrahanif" },
  ],
};

const photos = {
  symcard: {
    src: "/images/symcard-2026.jpg",
    width: 720,
    height: 1280,
    position: "50% 38%",
  },
  hopecardis: {
    src: "/images/hopecardis-2025.jpg",
    width: 729,
    height: 1600,
    position: "50% 35%",
  },
  pud: {
    src: "/images/pediatric-update-2024.jpg",
    width: 1179,
    height: 569,
    position: "62% 50%",
  },
};

/* English ----------------------------------------------------------------- */

const en: Dictionary = {
  meta: {
    title: "dr. Rayhendra Hanif — General Practitioner & Clinical Researcher",
    description:
      "General practitioner based in South Jakarta: Ministry of Health disaster deployments, emergency and primary care, and cardiovascular research.",
  },
  nav: [
    { id: "profile", label: "Profile" },
    { id: "training", label: "Training" },
    { id: "research", label: "Research" },
    { id: "outreach", label: "Outreach" },
    { id: "contact", label: "Contact" },
  ],
  ui: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    langLabel: "Language",
    downloadCv: "Download CV",
    contact: "Get in touch",
    research: "Research",
    present: "Present",
    livePlay: "Play live photo",
    livePause: "Pause live photo",
    liveHint: "Hover or tap to play",
    viewPhoto: "View photo",
    closePhoto: "Close photo",
    copyEmail: "Copy email address",
    copied: "Copied",
    backToTop: "Back to top",
    footer: "Designed and built in Jakarta. Hosted on GitHub Pages.",
  },
  hero: {
    kicker: "General Practitioner · Clinical Researcher",
    title: "Frontline care, informed by research.",
    summary:
      "A doctor from Padang, now based in South Jakarta. I've led emergency care on Ministry of Health disaster deployments in Aceh and East Nusa Tenggara, and I'm currently a research assistant at the National Cardiovascular Center Harapan Kita.",
    based: "South Jakarta, Indonesia",
    credentials: "ACLS · ATLS · ICH-GCP",
    figureCaption: "Media Center Kesehatan, Ministry of Health of the Republic of Indonesia.",
    figureAlt: "Portrait of Rayhendra Hanif in a Ministry of Health field vest",
  },
  facts: [
    { value: "3", label: "Ministry of Health disaster deployments" },
    { value: "5", label: "Scientific presentations, 2024–2026" },
    { value: "7", label: "Certifications and clinical workshops" },
  ],
  profile: {
    heading: "Profile",
    body: [
      "I'm a general practitioner from Padang, trained at Universitas Andalas and now based in South Jakarta. My work sits where humanitarian response, clinical practice and medical research meet.",
      "I've served on Ministry of Health emergency deployments across provinces — running mobile emergency clinics and under-equipped emergency rooms — and I'm used to making clinical decisions under pressure. Alongside patient care, I've worked as a research assistant, designed systematic reviews and presented at national medical symposia.",
    ],
  },
  training: {
    heading: "Medical Training",
    intro: "Internship, degrees and the certifications behind my emergency and research work.",
    clinicalHeading: "Clinical practice",
    clinical: [
      {
        period: "Mar – Jul 2026",
        role: "General Practitioner",
        org: "Puskesmas Kurai Taji",
        place: "Pariaman, West Sumatra",
        points: [
          "Delivered primary care and managed outpatient services during the Indonesian Doctor Internship Program (PIDI).",
          "Ran community health programmes for the district's catchment population.",
        ],
      },
      {
        period: "Nov 2025 – Mar 2026",
        role: "General Practitioner",
        org: "RSUD Prof. M. Yamin",
        place: "Pariaman, West Sumatra",
        points: [
          "Managed acute and emergency cases in the emergency department (IGD) during PIDI.",
          "Assessed inpatients on the wards.",
        ],
      },
    ],
    educationHeading: "Education",
    education: [
      { period: "2023 – 2025", role: "Medical Doctor (Profesi Dokter)", org: "Universitas Andalas", place: "Padang" },
      { period: "2019 – 2023", role: "Bachelor of Medicine (S.Ked)", org: "Universitas Andalas", place: "Padang" },
    ],
    certsHeading: "Certifications",
    certs: [
      { period: "Aug 2026", role: "Advanced Trauma Life Support (ATLS)", org: "IKABI · Universitas Muhammadiyah Jakarta" },
      { period: "Aug 2026", role: "ICH Good Clinical Practice E6(R3)", org: "The Global Health Network" },
      { period: "Jul 2026", role: "Occupational Hygiene & Health (HIPERKES)", org: "PT Bina Okupasi Indonesia" },
      { period: "Jul 2026", role: "Advanced Cardiac Life Support (ACLS)", org: "PERKI · PERKI House, Jakarta" },
      { period: "Jun 2026", role: "Workshop: Ultrasound in Cardiovascular Care (POCUS)", org: "11th Padang SymCARD" },
      { period: "Jun 2026", role: "Workshop: Basic Mechanical Ventilation Management", org: "11th Padang SymCARD" },
      { period: "Apr 2026", role: "Basic Health Crisis Management (MOOC)", org: "For health human resources" },
    ],
  },
  research: {
    heading: "Research & Publications",
    intro: "Research assistantships in cardiothoracic and respiratory medicine, and evidence synthesis presented at national symposia.",
    rolesHeading: "Research roles",
    roles: [
      {
        period: "Aug 2026 – Present",
        role: "Research Assistant (Intern)",
        org: "National Cardiovascular Center Harapan Kita",
        place: "Jakarta",
        points: [
          "Helping Dr. dr. Amin Tjubandi, Sp.BTKV, Subsp.JD(K) design a research proposal on secretome and mesenchymal stem cell therapy.",
        ],
      },
      {
        period: "Jun – Nov 2025",
        role: "Research Assistant (Intern)",
        org: "RSUP Persahabatan & RS Islam Cempaka Putih",
        place: "Jakarta",
        points: [
          "Supported dr. Fanny Fachrucha, Sp.P(K) on studies of interstitial lung disease (ILD) and telomere testing.",
          "Coordinated participants' examinations, processed study data and handled specimen transport.",
        ],
      },
    ],
    presentationsHeading: "Presentations",
    presentations: [
      { year: "2026", event: "ROICAM, Jakarta", format: "Poster", title: "Systematic review and meta-analysis abstract" },
      { year: "2026", event: "HOPECARDIS", format: "Oral presentation", title: "Case illustration" },
      {
        year: "2026",
        event: "11th Padang Symposium on Cardiovascular Disease (SymCARD)",
        format: "Oral presenter",
        title:
          "Surviving Yo-Yo Hypertension: an evidence-based case report on the prognostic impact of extreme visit-to-visit blood pressure variability on MACE",
        image: { ...photos.symcard, alt: "Rayhendra Hanif presenting at the 11th Padang SymCARD, June 2026" },
      },
      {
        year: "2025",
        event: "HOPECARDIS, Jakarta",
        format: "Poster",
        title:
          "The future of atrial fibrillation detection: a systematic review and meta-analysis of wearable ECG accuracy and its role in anticoagulation initiation",
        image: { ...photos.hopecardis, alt: "Rayhendra Hanif beside his poster at HOPECARDIS 2025" },
      },
      {
        year: "2024",
        event: "Pediatric Update & Q-SPA, Padang",
        format: "Poster",
        title: "Pertussis in an unvaccinated, almost 2-month-old baby: is timing everything?",
        outcome: "Juara Harapan 1 (first honourable mention)",
        image: { ...photos.pud, alt: "Rayhendra Hanif receiving the Juara Harapan 1 poster award" },
      },
    ],
    publicationsHeading: "Publications",
    publications: [
      {
        year: "2024",
        title: "Gambaran Klinis COVID-19 pada Mahasiswa FK Universitas Andalas Berdasarkan Status Vaksinasi COVID-19",
        translation: "Clinical features of COVID-19 among Andalas University medical students by vaccination status",
        venue: "Jikesi",
      },
    ],
  },
  outreach: {
    heading: "Community Outreach",
    intro: "Emergency medicine where the system is under strain, and service to the communities I trained in.",
    deploymentsHeading: "Ministry of Health disaster deployments",
    deployments: [
      {
        period: "7 – 20 Sep 2026",
        role: "Medical officer — East Nusa Tenggara, Period II",
        org: "Manggarai Regency",
        points: [
          "Staffed the emergency room at Puskesmas Dintor with limited equipment.",
          "Ran mobile emergency clinics at sites across the regency.",
        ],
      },
      {
        period: "18 – 31 Jan 2026",
        role: "Medical officer — Sumatra, Period III",
        org: "Aceh Tamiang Regency",
        points: [
          "Worked the emergency department at RSUD Muda Sedia with limited equipment.",
          "Ran mobile emergency clinics at multiple sites.",
        ],
      },
      {
        period: "19 – 31 Dec 2025",
        role: "Medical officer — Sumatra, Period I",
        org: "Aceh Utara Regency",
        points: ["Ran mobile emergency clinics, managing everything from outpatient complaints to emergencies."],
      },
    ],
    serviceHeading: "Field medicine & service",
    service: [
      {
        period: "10 – 14 Aug 2026",
        role: "Expedition doctor, geology field trip",
        org: "Geodwipa Teknika Nusantara",
        place: "Surabaya → Banyuwangi",
        points: ["Monitored participants' health across Gresik, Bondowoso, Situbondo and Banyuwangi and handled problems in the field."],
      },
      {
        period: "Jul 2026",
        role: "Operator, mass circumcision",
        org: "Pariaman City anniversary",
        points: ["Performed free circumcisions and post-procedure follow-up."],
      },
    ],
    leadershipHeading: "Leadership in medical school",
    leadership: [
      { period: "May 2025", role: "Lead, UKMPPD exam preparation", org: "Universitas Andalas", points: ["Managed candidates' paperwork and ran CBT/OSCE coaching and briefings for candidates from across West Sumatra."] },
      { period: "Apr 2025", role: "Lead, AIPKI exam preparation", org: "Universitas Andalas", points: ["Handled registration and coordinated preparation schedules with candidates from other universities in West Sumatra."] },
      { period: "Jun – Aug 2024", role: "Vice lead, pediatrics clerkship", org: "Universitas Andalas" },
      { period: "Nov – Dec 2023", role: "Lead, ophthalmology clerkship", org: "Universitas Andalas" },
      { period: "Public health rotation", role: "Lead, Project DIVA", org: "Universitas Andalas", points: ["Cervical cancer prevention outreach with mass VIA screening."] },
      { period: "Medical school", role: "Fundraising & Merchandise division", org: "CIMSA" },
    ],
  },
  honors: {
    heading: "Honours",
    items: [
      { title: "Certificate of Appreciation", detail: "Ministry of Health, for disaster health response in Aceh, North Sumatra and West Sumatra" },
      { year: "2024", title: "Juara Harapan 1, poster presentation", detail: "Pediatric Update & Q-SPA, Padang" },
      { year: "2021", title: "3rd place, English debate", detail: "MTQ Universitas Andalas" },
      { title: "Better Evidence UpToDate Donation Program", detail: "Ariadne Labs (Brigham and Women's Hospital & Harvard T.H. Chan School of Public Health)" },
    ],
  },
  skills: {
    heading: "Skills",
    groups: [
      { label: "Clinical", items: ["Emergency care", "ACLS", "ATLS", "Point-of-care ultrasound", "Basic mechanical ventilation", "Circumcision", "Primary care"] },
      { label: "Research", items: ["Systematic review & meta-analysis", "Evidence-based case reports", "RevMan", "R / RStudio", "STATA", "SPSS", "NVivo", "Rayyan", "Zotero · Mendeley · EndNote"] },
      { label: "Design", items: ["Canva", "Adobe Creative Suite", "Procreate"] },
      { label: "Languages", items: ["Indonesian (native)", "English (professional)", "Spanish (basic)"] },
    ],
  },
  contactSection: {
    heading: "Contact",
    body: "For clinical roles, research collaborations or deployments, email is the fastest way to reach me.",
    emailLabel: "Email",
    phoneLabel: "Phone",
  },
};

/* Bahasa Indonesia -------------------------------------------------------- */

const id: Dictionary = {
  meta: {
    title: "dr. Rayhendra Hanif — Dokter Umum & Peneliti Klinis",
    description:
      "Dokter umum di Jakarta Selatan: penugasan bencana Kementerian Kesehatan, pelayanan gawat darurat dan primer, serta riset kardiovaskular.",
  },
  nav: [
    { id: "profile", label: "Profil" },
    { id: "training", label: "Pendidikan" },
    { id: "research", label: "Riset" },
    { id: "outreach", label: "Pengabdian" },
    { id: "contact", label: "Kontak" },
  ],
  ui: {
    skip: "Langsung ke konten",
    menu: "Menu",
    close: "Tutup",
    themeToDark: "Ganti ke tema gelap",
    themeToLight: "Ganti ke tema terang",
    langLabel: "Bahasa",
    downloadCv: "Unduh CV",
    contact: "Hubungi saya",
    research: "Riset",
    present: "Sekarang",
    livePlay: "Putar foto live",
    livePause: "Jeda foto live",
    liveHint: "Arahkan kursor atau ketuk untuk memutar",
    viewPhoto: "Lihat foto",
    closePhoto: "Tutup foto",
    copyEmail: "Salin alamat email",
    copied: "Tersalin",
    backToTop: "Kembali ke atas",
    footer: "Dirancang dan dibangun di Jakarta. Di-hosting di GitHub Pages.",
  },
  hero: {
    kicker: "Dokter Umum · Peneliti Klinis",
    title: "Pelayanan garis depan, berbasis riset.",
    summary:
      "Dokter asal Padang yang kini berdomisili di Jakarta Selatan. Saya menangani kegawatdaruratan dalam penugasan bencana Kementerian Kesehatan di Aceh dan Nusa Tenggara Timur, dan saat ini menjadi asisten peneliti di RS Jantung dan Pembuluh Darah Harapan Kita.",
    based: "Jakarta Selatan, Indonesia",
    credentials: "ACLS · ATLS · ICH-GCP",
    figureCaption: "Media Center Kesehatan, Kementerian Kesehatan Republik Indonesia.",
    figureAlt: "Potret Rayhendra Hanif mengenakan rompi lapangan Kementerian Kesehatan",
  },
  facts: [
    { value: "3", label: "Penugasan bencana Kementerian Kesehatan" },
    { value: "5", label: "Presentasi ilmiah, 2024–2026" },
    { value: "7", label: "Sertifikasi dan workshop klinis" },
  ],
  profile: {
    heading: "Profil",
    body: [
      "Saya dokter umum asal Padang, lulusan Universitas Andalas, dan kini berdomisili di Jakarta Selatan. Pekerjaan saya berada di titik temu aksi kemanusiaan, pelayanan klinis, dan riset medis.",
      "Saya telah bertugas dalam penugasan darurat Kementerian Kesehatan lintas provinsi — menjalankan poli darurat keliling dan IGD dengan alat terbatas — dan terbiasa mengambil keputusan klinis di bawah tekanan. Di samping pelayanan pasien, saya berpengalaman sebagai asisten peneliti, perancang systematic review, dan presenter di berbagai simposium medis nasional.",
    ],
  },
  training: {
    heading: "Pendidikan & Pelatihan",
    intro: "Internsip, pendidikan, dan sertifikasi yang menopang pekerjaan kegawatdaruratan dan riset saya.",
    clinicalHeading: "Praktik klinis",
    clinical: [
      {
        period: "Mar – Jul 2026",
        role: "Dokter Umum",
        org: "Puskesmas Kurai Taji",
        place: "Pariaman, Sumatera Barat",
        points: [
          "Memberikan pelayanan medis primer dan mengelola layanan rawat jalan pada Program Internsip Dokter Indonesia (PIDI).",
          "Melaksanakan berbagai program kesehatan masyarakat di wilayah kerja puskesmas.",
        ],
      },
      {
        period: "Nov 2025 – Mar 2026",
        role: "Dokter Umum",
        org: "RSUD Prof. M. Yamin",
        place: "Pariaman, Sumatera Barat",
        points: [
          "Menangani kasus akut dan kegawatdaruratan di Instalasi Gawat Darurat (IGD) pada PIDI.",
          "Melakukan asesmen pasien rawat inap.",
        ],
      },
    ],
    educationHeading: "Pendidikan",
    education: [
      { period: "2023 – 2025", role: "Profesi Dokter", org: "Universitas Andalas", place: "Padang" },
      { period: "2019 – 2023", role: "Pendidikan Dokter (S.Ked)", org: "Universitas Andalas", place: "Padang" },
    ],
    certsHeading: "Sertifikasi",
    certs: [
      { period: "Agu 2026", role: "Advanced Trauma Life Support (ATLS)", org: "IKABI · Universitas Muhammadiyah Jakarta" },
      { period: "Agu 2026", role: "ICH Good Clinical Practice E6(R3)", org: "The Global Health Network" },
      { period: "Jul 2026", role: "Higiene Perusahaan dan Kesehatan Kerja (HIPERKES)", org: "PT Bina Okupasi Indonesia" },
      { period: "Jul 2026", role: "Advanced Cardiac Life Support (ACLS)", org: "PERKI · PERKI House, Jakarta" },
      { period: "Jun 2026", role: "Workshop Ultrasound in Cardiovascular Care (POCUS)", org: "11th Padang SymCARD" },
      { period: "Jun 2026", role: "Workshop Basic Mechanical Ventilation Management", org: "11th Padang SymCARD" },
      { period: "Apr 2026", role: "Pelatihan Dasar Manajemen Penanggulangan Krisis Kesehatan (MOOC)", org: "Bagi SDM Kesehatan" },
    ],
  },
  research: {
    heading: "Riset & Publikasi",
    intro: "Asisten penelitian di bidang bedah toraks-kardiovaskular dan paru, serta sintesis bukti yang dipresentasikan di simposium nasional.",
    rolesHeading: "Peran riset",
    roles: [
      {
        period: "Agu 2026 – Sekarang",
        role: "Asisten Peneliti (Magang)",
        org: "RS Jantung dan Pembuluh Darah Harapan Kita",
        place: "Jakarta",
        points: [
          "Membantu Dr. dr. Amin Tjubandi, Sp.BTKV, Subsp.JD(K) merancang proposal penelitian tentang penggunaan secretome dan mesenchymal stem cell.",
        ],
      },
      {
        period: "Jun – Nov 2025",
        role: "Asisten Peneliti (Magang)",
        org: "RSUP Persahabatan & RS Islam Cempaka Putih",
        place: "Jakarta",
        points: [
          "Membantu dr. Fanny Fachrucha, Sp.P(K) dalam penelitian interstitial lung disease (ILD) dan pemeriksaan telomer.",
          "Mengoordinasikan pemeriksaan pasien penelitian, mengolah data, dan mengurus transpor spesimen.",
        ],
      },
    ],
    presentationsHeading: "Presentasi",
    presentations: [
      { year: "2026", event: "ROICAM, Jakarta", format: "Poster", title: "Abstrak systematic review dan meta-analisis" },
      { year: "2026", event: "HOPECARDIS", format: "Presentasi oral", title: "Case illustration" },
      {
        year: "2026",
        event: "11th Padang Symposium on Cardiovascular Disease (SymCARD)",
        format: "Presenter oral",
        title:
          "Surviving Yo-Yo Hypertension: an evidence-based case report on the prognostic impact of extreme visit-to-visit blood pressure variability on MACE",
        image: { ...photos.symcard, alt: "Rayhendra Hanif mempresentasikan di 11th Padang SymCARD, Juni 2026" },
      },
      {
        year: "2025",
        event: "HOPECARDIS, Jakarta",
        format: "Poster",
        title:
          "The future of atrial fibrillation detection: a systematic review and meta-analysis of wearable ECG accuracy and its role in anticoagulation initiation",
        image: { ...photos.hopecardis, alt: "Rayhendra Hanif di samping posternya di HOPECARDIS 2025" },
      },
      {
        year: "2024",
        event: "Pediatric Update & Q-SPA, Padang",
        format: "Poster",
        title: "Pertussis in an unvaccinated, almost 2-month-old baby: is timing everything?",
        outcome: "Juara Harapan 1",
        image: { ...photos.pud, alt: "Rayhendra Hanif menerima penghargaan Juara Harapan 1 presentasi poster" },
      },
    ],
    publicationsHeading: "Publikasi",
    publications: [
      {
        year: "2024",
        title: "Gambaran Klinis COVID-19 pada Mahasiswa FK Universitas Andalas Berdasarkan Status Vaksinasi COVID-19",
        venue: "Jikesi",
      },
    ],
  },
  outreach: {
    heading: "Pengabdian Masyarakat",
    intro: "Kegawatdaruratan di tempat sistem kesehatan sedang tertekan, dan pengabdian bagi masyarakat tempat saya ditempa.",
    deploymentsHeading: "Penugasan bencana Kementerian Kesehatan",
    deployments: [
      {
        period: "7 – 20 Sep 2026",
        role: "Tenaga medis — Nusa Tenggara Timur, Periode II",
        org: "Kabupaten Manggarai",
        points: [
          "Memberikan pelayanan IGD di Puskesmas Dintor dengan alat yang terbatas.",
          "Menjalankan poli darurat keliling di berbagai titik.",
        ],
      },
      {
        period: "18 – 31 Jan 2026",
        role: "Tenaga medis — Sumatera, Periode III",
        org: "Kabupaten Aceh Tamiang",
        points: [
          "Memberikan pelayanan IGD di RSUD Muda Sedia dengan alat yang terbatas.",
          "Menjalankan poli darurat keliling di berbagai titik.",
        ],
      },
      {
        period: "19 – 31 Des 2025",
        role: "Tenaga medis — Sumatera, Periode I",
        org: "Kabupaten Aceh Utara",
        points: ["Menjalankan poli darurat keliling, menatalaksana kasus rawat jalan hingga kegawatdaruratan."],
      },
    ],
    serviceHeading: "Kedokteran lapangan & pengabdian",
    service: [
      {
        period: "10 – 14 Agu 2026",
        role: "Dokter pendamping field trip geologi",
        org: "Geodwipa Teknika Nusantara",
        place: "Surabaya → Banyuwangi",
        points: ["Memantau kesehatan peserta di Gresik, Bondowoso, Situbondo, dan Banyuwangi serta mengantisipasi masalah kesehatan di lapangan."],
      },
      {
        period: "Jul 2026",
        role: "Operator sunatan massal",
        org: "HUT Kota Pariaman",
        points: ["Memberikan layanan sunat gratis dan evaluasi pascatindakan."],
      },
    ],
    leadershipHeading: "Kepemimpinan semasa pendidikan",
    leadership: [
      { period: "Mei 2025", role: "Ketua Persiapan UKMPPD", org: "Universitas Andalas", points: ["Mengelola berkas administratif calon peserta serta mengatur bimbingan CBT/OSCE dan briefing bagi peserta dari seluruh Sumatera Barat."] },
      { period: "Apr 2025", role: "Ketua Persiapan AIPKI", org: "Universitas Andalas", points: ["Mengelola pendaftaran dan mengoordinasikan jadwal persiapan dengan peserta dari universitas lain di Sumatera Barat."] },
      { period: "Jun – Agu 2024", role: "Wakil Ketua Siklus Anak", org: "Universitas Andalas" },
      { period: "Nov – Des 2023", role: "Ketua Siklus Mata", org: "Universitas Andalas" },
      { period: "Stase IKM", role: "Ketua Projek DIVA", org: "Universitas Andalas", points: ["Promosi pencegahan kanker serviks dan pemeriksaan massal IVA."] },
      { period: "Masa kuliah", role: "Divisi Fundraising & Merchandise", org: "CIMSA" },
    ],
  },
  honors: {
    heading: "Penghargaan",
    items: [
      { title: "Tanda Penghargaan", detail: "Kementerian Kesehatan, atas penanganan kesehatan di wilayah bencana Aceh, Sumatera Utara, dan Sumatera Barat" },
      { year: "2024", title: "Juara Harapan 1 Presentasi Poster", detail: "Pediatric Update & Q-SPA, Padang" },
      { year: "2021", title: "Juara 3 Debat Bahasa Inggris", detail: "MTQ Universitas Andalas" },
      { title: "Better Evidence UpToDate Donation Program", detail: "Ariadne Labs (Brigham and Women's Hospital & Harvard T.H. Chan School of Public Health)" },
    ],
  },
  skills: {
    heading: "Keahlian",
    groups: [
      { label: "Klinis", items: ["Kegawatdaruratan", "ACLS", "ATLS", "Point-of-care ultrasound", "Dasar ventilasi mekanik", "Sirkumsisi", "Pelayanan primer"] },
      { label: "Riset", items: ["Systematic review & meta-analisis", "Evidence-based case report", "RevMan", "R / RStudio", "STATA", "SPSS", "NVivo", "Rayyan", "Zotero · Mendeley · EndNote"] },
      { label: "Desain", items: ["Canva", "Adobe Creative Suite", "Procreate"] },
      { label: "Bahasa", items: ["Indonesia (penutur asli)", "Inggris (profesional)", "Spanyol (dasar)"] },
    ],
  },
  contactSection: {
    heading: "Kontak",
    body: "Untuk posisi klinis, kolaborasi riset, atau penugasan, email adalah cara tercepat menghubungi saya.",
    emailLabel: "Email",
    phoneLabel: "Telepon",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, id };
