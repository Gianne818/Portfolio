export interface ProjectItem {
  rank: number;
  id: string;
  title: string;
  shortTitle: string;
  category: 'Machine Learning & AI' | 'Assistive & Community' | 'Full-Stack & Systems';
  role: string;
  accolade: string;
  tools: string[];
  summary: string;
  repo: string;
  metrics: Record<string, string>;
}

export interface SkillInventoryItem {
  domain: string;
  skill: string;
  application: string;
}

export interface LifeFocusItem {
  pursuit: string;
  percentage: number;
  colorLight: string;
  colorDark: string;
  description: string;
}

export interface CertificateImageItem {
  label: string;
  imageUrl: string;
}

export interface MilestoneItem {
  period: string;
  title: string;
  organization: string;
  badge: string;
  details: string[];
  certificates: CertificateImageItem[];
}

export type PortalId = 'bio' | 'skills' | 'projects' | 'dispatch';

export interface IslandPortalInfo {
  id: PortalId;
  numeral: string;
  name: string;
  landmarkTitle: string;
  subtitle: string;
  coordinates: [number, number, number];
  accentHex: string;
}

export const PROFILE_INFO = {
  fullName: 'Charlone Gianne V. Cruz',
  age: 20,
  headline: 'Full-Stack Developer · Machine Learning Researcher · AI Systems Architect',
  institution: 'Cebu Institute of Technology – University (CIT-U)',
  institutionShort: 'CIT-U · Cebu City',
  degree: '3rd Year BS Computer Science',
  location: 'Cebu City, Philippines',
  phone: '(+63) 915 026 2014',
  email: 'cruzgian008@gmail.com',
  github: 'https://github.com/Gianne818',
  githubHandle: 'github.com/Gianne818',
  cvPdfPath: './Charlone_Gianne_Cruz_CV.pdf',
  passions: ['Music', 'Pet Birds', 'Botany & Plants', 'Social-Impact Engineering'],
  editorialQuote:
    'Rooted in compassion, guided by observation. I build intelligent systems that serve people—from predicting sustainable fishing grounds for local coastal communities to detecting nocturnal glycemic drops through wearable telemetry.',
  guidingPhilosophy:
    'The true elegance of an algorithm is not measured by its complexity, but by the quiet burden it lifts from another human being.',
  bioParagraphs: [
    'Raised in Cebu City, my curiosity for computing grew alongside a deep affection for living ecosystems—observing the social intelligence of pet birds, tending botanical specimens, and studying how natural systems adapt with quiet resilience.',
    'As a 3rd Year BS Computer Science student at Cebu Institute of Technology – University (CIT-U), I channel that observational discipline into applied machine learning and full-stack software engineering—from dual LightGBM marine catch pipelines in PAROLA to 1D Temporal CNN nocturnal hypoglycemia detection on wearable CGM telemetry.',
    'Whether architecting assistive computer vision tools like IMentia for dementia patients or crafting modular web platforms in Django and Blazor WebAssembly, I strive to build software that feels calm, transparent, and deeply human.',
  ],
};

export const ISLAND_PORTALS: IslandPortalInfo[] = [
  {
    id: 'bio',
    numeral: 'I',
    name: 'Autobiography & Roots',
    landmarkTitle: 'The Banyan Sanctuary',
    subtitle: 'Origin Story, Life Focus & Verified Milestones',
    coordinates: [-38, 4, -28],
    accentHex: '#7EC99E',
  },
  {
    id: 'skills',
    numeral: 'II',
    name: 'Technical Capabilities',
    landmarkTitle: 'The Astrolabe Observatory',
    subtitle: 'Applied ML, Biomedical Telemetry & Full-Text Inventory',
    coordinates: [38, 6, -32],
    accentHex: '#E5A869',
  },
  {
    id: 'projects',
    numeral: 'III',
    name: 'Top 10 Systems',
    landmarkTitle: 'PAROLA Lighthouse Spire',
    subtitle: 'Top 10 Engineering & Research Systems',
    coordinates: [0, 8, -58],
    accentHex: '#F3C68F',
  },
  {
    id: 'dispatch',
    numeral: 'IV',
    name: 'Dispatch & Contact',
    landmarkTitle: 'The Carrier Perch Tower',
    subtitle: 'Direct Channels, Collaboration & Executive CV',
    coordinates: [32, 3, 16],
    accentHex: '#8AD4AB',
  },
];

/* Exact distribution specified by user:
   Others 35%, Academics 30%, Extracurriculars 15%, Pet Birds 15%, Plants 5% */
export const LIFE_FOCUS_DATA: LifeFocusItem[] = [
  {
    pursuit: 'Others',
    percentage: 35,
    colorLight: '#C27D38',
    colorDark: '#E5A869',
    description: 'Music, creative exploration, rest & personal leisure',
  },
  {
    pursuit: 'Academics',
    percentage: 30,
    colorLight: '#1B3B2B',
    colorDark: '#7EC99E',
    description: 'BS Computer Science coursework & theoretical foundations at CIT-U',
  },
  {
    pursuit: 'Extracurriculars',
    percentage: 15,
    colorLight: '#2D5A43',
    colorDark: '#529671',
    description: 'Startup challenges, AI hackathons & student tech organizations',
  },
  {
    pursuit: 'Pet Birds',
    percentage: 15,
    colorLight: '#406B52',
    colorDark: '#407559',
    description: 'Daily care, bonding & avian behavior observation',
  },
  {
    pursuit: 'Plants',
    percentage: 5,
    colorLight: '#6E8F7A',
    colorDark: '#2E5A44',
    description: 'Botanical care, propagation & tending greenery',
  },
];

export const SKILLS_INVENTORY: SkillInventoryItem[] = [
  {
    domain: 'Machine Learning & AI',
    skill: 'LightGBM (Gradient Boosted Trees)',
    application:
      'PAROLA — Dual predictive pipelines forecasting demersal and pelagic fisheries (PSC Region VII Top 25 Finalist)',
  },
  {
    domain: 'Machine Learning & AI',
    skill: '1D Temporal CNN & MLP',
    application:
      'PhysioCGM Telemetry — Nocturnal hypoglycemia detection using continuous smartwatch physiological sensor signals',
  },
  {
    domain: 'Machine Learning & AI',
    skill: 'PyTorch & Scikit-learn',
    application:
      'Exploratory signal modeling, sequential trend feature engineering, data augmentation, and baseline validation',
  },
  {
    domain: 'Computer Vision',
    skill: 'OpenCV (Java Interface)',
    application:
      'IMentia — Real-time camera facial recognition and contextual memory prompt assistant for dementia patients',
  },
  {
    domain: 'Natural Language Processing',
    skill: 'SpeechRecognition & AST Parsing',
    application:
      'SpeechToCode — Error-tolerant voice-to-code synthesis formatting natural speech into structured Python syntax',
  },
  {
    domain: 'Web Architecture',
    skill: 'Python Django (MVT)',
    application:
      'LantaWires — Scalable web platform with role-based authentication and relational database management',
  },
  {
    domain: 'Web Architecture',
    skill: 'C# Blazor WebAssembly',
    application:
      'CineTerra & OurDriedFish — Reactive single-page client applications running native C# directly in the browser',
  },
  {
    domain: 'Desktop Software',
    skill: 'Java & JavaFX / Swing',
    application:
      '+inHealth & IMentia — Desktop ergonomic activity monitor and assistive healthcare interfaces',
  },
  {
    domain: 'Campus Infrastructure',
    skill: 'PHP & MySQL',
    application:
      'WildGuard — Campus security reporting, visitor logging, and incident access tracking system',
  },
  {
    domain: 'Game Development',
    skill: 'Game Jam Logic Engine',
    application:
      'Sugbuanon Saga: Banhwa — Game Jam 2025 narrative adventure celebrating Visayan and Cebuano folklore',
  },
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    rank: 1,
    id: 'parola',
    title: 'PAROLA — Intelligent Marine Catch Prediction System',
    shortTitle: 'PAROLA',
    category: 'Machine Learning & AI',
    role: 'Lead Machine Learning Engineer (Team Tiki)',
    accolade:
      'Top 25 Regional Finalist & Best Logo Design Award · Philippine Startup Challenge (PSC) Region VII',
    tools: ['Python', 'LightGBM', 'Pandas', 'Scikit-learn', 'Geospatial Telemetry'],
    summary:
      'Designed dual specialized gradient-boosted decision tree models using LightGBM, training distinct predictive pipelines for demersal (bottom-dwelling) and pelagic (open-water) fish species. Correlates ocean currents, sea-surface temperature, and seasonal coordinates to pinpoint sustainable, fuel-saving fishing zones for artisanal fishermen in Region VII.',
    repo: 'https://github.com/Gianne818/Parola_PSC',
    metrics: {
      'Primary Model': 'Dual LightGBM',
      'Target Species': 'Demersal + Pelagic',
      'Regional Scope': 'Region VII Fisheries',
    },
  },
  {
    rank: 2,
    id: 'physiocgm',
    title: 'Nocturnal Hypoglycemia Detection via Wearable CGM Telemetry',
    shortTitle: 'PhysioCGM Telemetry',
    category: 'Machine Learning & AI',
    role: 'Lead AI Researcher & Data Analyst',
    accolade: 'Applied AI & Biomedical Time-Series Research',
    tools: ['Python', 'PyTorch', '1D Temporal CNN', 'MLP', 'PhysioCGM Dataset'],
    summary:
      'Investigated whether non-invasive consumer smartwatches can reliably detect nocturnal hypoglycemia episodes before critical drops. Analyzed the PhysioCGM dataset, formulated signal augmentation, and engineered a sequential 1D Temporal CNN (TCN) capturing nocturnal physiological trends that outperform standard MLP baselines.',
    repo: 'https://github.com/Gianne818',
    metrics: {
      Architecture: '1D Temporal CNN',
      Baseline: 'Multi-Layer Perceptron',
      Dataset: 'PhysioCGM Multimodal',
    },
  },
  {
    rank: 3,
    id: 'imentia',
    title: 'IMentia — AI Facial Recognition & Memory Recall Assistant',
    shortTitle: 'IMentia',
    category: 'Assistive & Community',
    role: 'Computer Vision & AI Developer',
    accolade: 'Assistive Healthcare & Identity Retention Platform',
    tools: ['Java', 'Java Swing', 'OpenCV (Java Interface)', 'SQLite'],
    summary:
      "Developed an assistive desktop healthcare platform for dementia and Alzheimer's patients. Uses a live camera feed and OpenCV facial recognition to identify visiting loved ones, instantly displaying relational context, conversation logs, and memory prompts to preserve emotional connection.",
    repo: 'https://github.com/Gianne818',
    metrics: {
      Modality: 'Live Video Feed',
      Engine: 'OpenCV Java',
      Focus: 'Memory Retention',
    },
  },
  {
    rank: 4,
    id: 'speechtocode',
    title: 'SpeechToCode — AI Voice-to-Code Synthesis Engine',
    shortTitle: 'SpeechToCode',
    category: 'Machine Learning & AI',
    role: 'AI Developer & NLP Engineer',
    accolade: 'Developer Accessibility & Voice Parsing',
    tools: ['Python', 'SpeechRecognition', 'AST Parsing', 'NLP'],
    summary:
      'Translates spoken natural language into syntactically sound code structures. Built custom error-tolerant phonetic parsing to resolve homophones and syntax ambiguities even under noisy acoustic conditions.',
    repo: 'https://github.com/Gianne818',
    metrics: {
      Language: 'Python',
      Parsing: 'Phonetic AST',
      Input: 'Acoustic Speech',
    },
  },
  {
    rank: 5,
    id: 'lantawires',
    title: 'LantaWires — Scalable Web Architecture Platform',
    shortTitle: 'LantaWires',
    category: 'Full-Stack & Systems',
    role: 'Full-Stack Backend Developer',
    accolade: 'Enterprise Web Platform Architecture',
    tools: ['Python', 'Django (MVT)', 'PostgreSQL', 'JavaScript'],
    summary:
      "Architected a scalable, modular web application utilizing Django's Model-View-Template pattern, with secure role-based authentication, modular relational database models, and an intuitive administrative operations dashboard.",
    repo: 'https://github.com/Gianne818/LantaWires',
    metrics: {
      Framework: 'Django MVT',
      Database: 'PostgreSQL / SQLite',
      Architecture: 'Modular Monolith',
    },
  },
  {
    rank: 6,
    id: 'cineterra',
    title: 'CineTerra — Cinematic Discovery & Media Platform',
    shortTitle: 'CineTerra',
    category: 'Full-Stack & Systems',
    role: 'Frontend Engineer',
    accolade: 'High-Performance Single-Page App',
    tools: ['C#', '.NET', 'Blazor WebAssembly', 'Modern CSS'],
    summary:
      'Constructed a responsive single-page cinema exploration interface executing client-side C# directly in the browser via Blazor WebAssembly, eliminating heavy JavaScript overhead while providing instant catalog filtering.',
    repo: 'https://github.com/Gianne818/CineTerra',
    metrics: {
      Runtime: 'Blazor WebAssembly',
      Language: 'C# (.NET)',
      Client: 'Zero Heavy JS',
    },
  },
  {
    rank: 7,
    id: 'ourdriedfish',
    title: 'OurDriedFish — Local Artisanal E-Commerce Platform',
    shortTitle: 'OurDriedFish',
    category: 'Full-Stack & Systems',
    role: 'Frontend Developer',
    accolade: 'Regional Artisanal Digitalization',
    tools: ['C#', 'Blazor WebAssembly', 'Component CSS'],
    summary:
      'Digital showcase platform celebrating Cebuano dried seafood producers (danggit, dried squid). Built with reactive Blazor component state and responsive UI to empower local micro-vendors.',
    repo: 'https://github.com/Gianne818/OurDriedFish',
    metrics: {
      Domain: 'Cebuano Artisanal',
      Framework: 'Blazor Wasm',
      State: 'Reactive Components',
    },
  },
  {
    rank: 8,
    id: 'inhealth',
    title: '+inHealth — Desktop Ergonomic Wellness & Activity Monitor',
    shortTitle: '+inHealth',
    category: 'Assistive & Community',
    role: 'Software Developer',
    accolade: 'Preventative Ergonomics for Developers',
    tools: ['Java', 'JavaFX', 'Desktop Event Hooks'],
    summary:
      'Proactive desktop health monitor combating screen fatigue and sedentary habits through non-intrusive posture nudges, hydration reminders, and gentle ergonomic activity prompts.',
    repo: 'https://github.com/Gianne818',
    metrics: {
      Platform: 'Desktop',
      UI: 'JavaFX',
      Mission: 'Sedentary Relief',
    },
  },
  {
    rank: 9,
    id: 'wildguard',
    title: 'WildGuard — Campus Security & Incident Reporting System',
    shortTitle: 'WildGuard',
    category: 'Full-Stack & Systems',
    role: 'Backend Developer',
    accolade: 'Campus Physical Infrastructure & Safety',
    tools: ['PHP', 'MySQL', 'Apache', 'Web Forms'],
    summary:
      'Centralized reporting and visitor access management system for campus security personnel, handling visitor logs, incident reporting, and audit trails.',
    repo: 'https://github.com/Gianne818',
    metrics: {
      Stack: 'LAMP (PHP/MySQL)',
      Scope: 'Campus Safety',
      Audit: 'Structured Relational',
    },
  },
  {
    rank: 10,
    id: 'banhwa',
    title: 'Sugbuanon Saga: Banhwa — Cultural Mythological Adventure',
    shortTitle: 'Sugbuanon Saga: Banhwa',
    category: 'Assistive & Community',
    role: 'Game Logic & Narrative Developer',
    accolade: 'Game Jam 2025 Submission',
    tools: ['Game Jam Framework', '2D Pixel Art', 'Narrative State Engine'],
    summary:
      'Story-driven adventure game celebrating Visayan and Cebuano folklore: when an ancient relic protecting Cebu shatters, the player reforges the artifact while navigating mythical creatures.',
    repo: 'https://github.com/Gianne818',
    metrics: {
      Theme: 'Visayan Folklore',
      Engine: 'Game Jam 2025',
      Story: 'Relic Reforging',
    },
  },
];

export const MILESTONES_LIST: MilestoneItem[] = [
  {
    period: 'October 2026',
    title: 'Philippine Startup Challenge (PSC) Region VII — Top 25 Finalist & Best Logo Design',
    organization: 'DICT Region VII · Bai Hotel, Mandaue City',
    badge: 'Regional Award Winner',
    details: [
      'Competed at the DICT Philippine Startup Challenge XI / XII Regional Finals with Team Tiki.',
      'Led the Machine Learning modeling for PAROLA, an intelligent marine catch prediction platform utilizing dual LightGBM pipelines.',
      'Recognized among the Top 25 Regional Startups and awarded Best Logo Design for blending nautical lighthouse symbolism with marine conservation tech.',
    ],
    certificates: [
      { label: 'Top 25 Regional Finalist Certificate', imageUrl: './certificates/psc-award-1.png' },
      { label: 'Best Logo Design Award Certificate', imageUrl: './certificates/psc-award-2.png' },
    ],
  },
  {
    period: '2026',
    title: 'AIFEST AI Hackathon Professional Competency Series',
    organization: 'AIFEST 2026',
    badge: 'Competitor & Certified',
    details: [
      'Workshop 1: Human-Centered AI Design & Problem Discovery.',
      'Workshop 2: Technical System Architecture & Scalable Model Pipelines.',
      'Webinar 3: Agile Pitching, Venture Strategy, and Sustainable Deployment.',
    ],
    certificates: [
      { label: 'Workshop 1: Human-Centered AI Design', imageUrl: './certificates/aifest-workshop-1.png' },
      { label: 'Workshop 2: Technical System Architecture', imageUrl: './certificates/aifest-workshop-2.png' },
      { label: 'Webinar 3: Agile Pitching & Venture Strategy', imageUrl: './certificates/aifest-webinar-3.png' },
    ],
  },
  {
    period: 'April 2026',
    title: 'Cebu ICT Student Congress 2026',
    organization: 'PSITE Central Visayas · UC New Cebu Coliseum',
    badge: 'Verified Participant',
    details: [
      'Focused on Emerging Cloud Technologies, Applied AI in Industry, and Regional Digital Transformation.',
    ],
    certificates: [
      { label: 'Cebu ICT Student Congress Certificate', imageUrl: './certificates/psite-congress-2026.png' },
    ],
  },
  {
    period: 'December 2025',
    title: 'AI Ready ASEAN Certification',
    organization: 'ASEAN Foundation & Google.org',
    badge: 'Verified Credential',
    details: [
      'Earned verified credential covering ethical artificial intelligence deployment, prompt engineering, generative fundamentals, and responsible technological integration across Southeast Asia.',
    ],
    certificates: [
      { label: 'AI Ready ASEAN Official Certificate', imageUrl: './certificates/asean-ai-ready.png' },
    ],
  },
];
