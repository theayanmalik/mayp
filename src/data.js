export const GH = 'https://github.com/theayanmalik';
export const LI = 'https://www.linkedin.com/in/ayan-parwez-2a47a51a9/';
export const EMAIL = 'ayan.2201002cs@iiitbh.ac.in';

export const roles = ['AI-enabled products', 'scalable backends', 'RAG pipelines', 'full-stack platforms', 'efficient data systems'];

export const stats = [
  { value: 700, suffix: '+', label: 'DSA problems solved on LeetCode' },
  { value: 96.99, decimals: 2, suffix: '', label: 'JEE Mains national percentile' },
  { value: 85, suffix: '%', label: 'RAM reduction in out-of-core engine' },
  { value: 14, suffix: '+', label: 'Certifications & credentials' },
];

export const projects = [
  {
    id: 'genflash', num: '01', title: 'GenFlash', accent: '#a78bfa',
    category: 'Generative AI · SaaS', groups: ['AI / ML', 'Full Stack'],
    subtitle: 'Document intelligence — from raw files to structured knowledge.',
    desc: 'A full-stack generative AI platform that parses multi-page PDF/DOCX documents and extracts structured JSON content using RAG pipelines, async worker queues and the Gemini LLM.',
    tags: ['Next.js', 'TypeScript', 'Gemini API', 'Supabase', 'PostgreSQL', 'RAG'],
    problem: 'Long, unstructured documents are slow to turn into reusable, structured study or business content.',
    approach: [
      'Upload pipeline accepts multi-page PDF/DOCX files and normalises extracted text.',
      'Retrieval-augmented prompting grounds Gemini output in the source document.',
      'Async inference workers keep the UI responsive during long generations.',
      'Supabase (PostgreSQL) provides authentication and persistent user data.',
    ],
    flow: ['Upload', 'Parse', 'Chunk + retrieve', 'Gemini LLM', 'Structured JSON', 'Supabase'],
    links: [{ label: 'Source', href: GH + '/genflash' }],
  },
  {
    id: 'recsys', num: '02', title: 'High-Throughput Recommendation Engine', accent: '#22d3ee',
    category: 'Python · Systems optimisation', groups: ['AI / ML', 'Systems'],
    subtitle: 'Big-data thinking on a small memory budget.',
    desc: 'A low-latency recommendation and data processing engine in Python/FastAPI built around cosine-similarity matrices and out-of-core streaming for 700 MB+ datasets.',
    tags: ['Python', 'FastAPI', 'Keras', 'Cosine similarity', 'Out-of-core streaming'],
    metric: { value: '85%', label: 'RAM reduction · 1.5 GB → <200 MB' },
    problem: 'Loading the full similarity data in memory required ~1.5 GB, making cheap cloud deployment impractical.',
    approach: [
      'Streamed datasets in chunks instead of loading everything into memory.',
      'Kept large similarity data out of RAM, reading only what each request needs.',
      'Served real-time recommendations through a FastAPI endpoint.',
    ],
    flow: ['700 MB+ dataset', 'Chunked stream', 'Similarity matrix (disk)', 'FastAPI', 'Recommendations'],
    links: [{ label: 'Source', href: GH + '/Movie-recommendation-System' }],
  },
  {
    id: 'tracker', num: '03', title: 'AI Student Progress Tracker', accent: '#a3e635',
    category: 'Applied AI · Education', groups: ['AI / ML', 'Full Stack'],
    subtitle: 'Turning performance data into actionable feedback.',
    desc: 'A Django analytics platform combining structured academic progress data with LLM-generated insights and adaptive feedback loops.',
    tags: ['Django', 'OpenAI API', 'SQLite', 'Analytics'],
    problem: 'Raw marks rarely tell students what to do next.',
    approach: [
      'Structured data model for students, subjects and assessments.',
      'Automated performance analytics surface trends and weak areas.',
      'OpenAI-powered feedback generates personalised, adaptive suggestions.',
    ],
    flow: ['Student data', 'Django models', 'Analytics', 'OpenAI API', 'Adaptive feedback'],
    links: [{ label: 'Source', href: GH + '/StudentProgressTracker_AI_powered' }],
  },
  {
    id: 'election', num: '04', title: 'Election Portal', accent: '#fbbf24',
    category: 'Backend · Secure workflows', groups: ['Full Stack', 'Systems'], period: 'Aug — Nov 2025',
    subtitle: 'Authentication, validation and results processing.',
    desc: 'A secure digital election platform that ran IIIT Bhagalpur’s first-ever online Student Gymkhana Council election — ~900 eligible voters, ~70% turnout, covered by Dainik Bhaskar and Hindustan.',
    tags: ['Django', 'Authentication', 'HTML', 'CSS'],
    metric: { value: '~900', label: 'voters · 70% turnout · in the news' },
    image: '/media/election-portal-live.jpg',
    problem: 'Campus elections need a trustworthy, one-person-one-vote digital process — IIIT Bhagalpur had never run its SGC election online.',
    approach: [
      'Authenticated access restricts voting to eligible users.',
      'Scalable backend validation logic checks every submission.',
      'Structured result-processing workflows produce the outcome.',
      'Co-led development (with Siddharth Nama) over two months; the election ran smoothly and was reported in regional newspapers.',
    ],
    flow: ['Login', 'Eligibility check', 'Ballot', 'Validation', 'Results'],
    links: [{ label: 'Source', href: GH + '/ElectionPortal_IIITBH-new' }],
  },
  {
    id: 'complaints', num: '05', title: 'Complaint Resolution System', accent: '#f472b6',
    category: 'Full stack · Enterprise workflow', groups: ['Full Stack', 'Systems'], period: 'Jan 2025',
    subtitle: 'Operational workflows with structured escalation.',
    desc: 'A MERN workflow-management portal with role-based authentication, escalation pipelines and dashboard-driven issue tracking.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'RBAC', 'REST'],
    problem: 'Complaints get lost without ownership, status and escalation rules.',
    approach: [
      'Role-based authentication controls who can view and act on issues.',
      'Escalation pipelines move stale issues up the chain.',
      'Dashboards track status across the full issue lifecycle.',
      'End-to-end testing and debugging of the integrated flows.',
    ],
    flow: ['Raise issue', 'Assign (RBAC)', 'Track', 'Escalate', 'Resolve'],
    links: [{ label: 'Source', href: GH + '/Complaint-Resolution-System' }],
  },
  {
    id: 'deepfake', num: '06', title: 'Deepfake Detection', accent: '#60a5fa',
    category: 'Computer vision · Research', groups: ['AI / ML'], period: 'Sep 2025',
    subtitle: 'Exploring visual authenticity with deep learning.',
    desc: 'An academic deep learning project at IIIT Bhagalpur investigating CNN-based detection of manipulated face imagery.',
    tags: ['Deep Learning', 'CNN', 'Computer Vision'],
    problem: 'Synthetic media is increasingly hard to distinguish from real footage.',
    approach: [
      'CNN-based approach to classifying real vs. manipulated imagery.',
      'Evaluation results and reproducibility notes to be published with the repository.',
    ],
    flow: ['Image input', 'Preprocess', 'CNN', 'Real / fake'],
    links: [],
  },
];

export const experience = [
  {
    period: 'Oct 2026 — Present', role: 'Associate, ML Data Operations', org: 'Amazon · GO-AI Operations', place: 'Bengaluru',
    points: [
      'Evaluate high-volume ML and multimodal data workflows against strict quality, accuracy and latency benchmarks.',
      'Detect and resolve data-quality edge cases across production AI datasets.',
      'Audit task workflows and maintain detailed logs supporting model-evaluation and data-engineering pipelines.',
    ],
  },
  {
    period: 'Sep 2024 — Present', role: 'AI, Full-Stack & Systems Developer', org: 'Freelance · Technical consultant', place: 'Remote',
    points: [
      'Architected full-stack web apps and automated LLM pipelines with FastAPI, Django, React and PostgreSQL.',
      'Configured Dockerised microservices and CI/CD pipelines with GitHub Actions.',
      'Built server health-monitoring scripts and log parsers (Python/Bash) for Linux environments.',
    ],
  },
  {
    period: 'Jun — Oct 2026', role: 'Business & Technical Operations Consultant', org: 'Intellipaat', place: 'Bengaluru',
    points: ['Managed learner lifecycle requirements, CRM records and technical escalations across Full Stack, Data Science and DevOps programmes.'],
  },
  {
    period: 'Feb — Mar 2026', role: 'Systems & ERP Trainee', org: 'BIPARD', place: 'Patna',
    points: ['Developed SAP ABAP data objects, SmartForms and dictionary components for administrative process automation.'],
  },
];

export const skills = {
  'AI & ML': ['Agentic AI (LangGraph, LangChain)', 'RAG pipelines', 'Vector DBs & embeddings', 'Prompt engineering', 'LLM red teaming & evals', 'Multi-agent systems', 'ML data operations', 'Keras', 'Scikit-learn', 'TensorBoard'],
  'Languages & Web': ['Python', 'TypeScript', 'JavaScript (ES6+)', 'Java', 'C / C++', 'SQL', 'Bash', 'React', 'Next.js', 'Node.js / Express', 'FastAPI', 'Django', 'Tailwind CSS'],
  'DevOps & Cloud': ['Linux (systemd, journalctl)', 'Docker', 'AWS (EC2, S3)', 'GitHub Actions CI/CD', 'Ansible', 'Prometheus', 'Grafana', 'Microservices', 'PyTest', 'REST Assured'],
  'Data & Enterprise': ['PostgreSQL (indexing, query optimisation)', 'Supabase', 'Redis', 'SQLite', 'HDF5', 'ServiceNow (CAD / CSA)', 'SAP ABAP Cloud', 'Postman', 'JIRA', 'Agile / Scrum'],
};

// file: local document in /public/certificates · verify: issuer verification URL
export const certs = [
  { name: 'SAP Certified — Back-End Developer, ABAP Cloud', issuer: 'SAP', kind: 'Enterprise', file: 'global-sapcertification20260728-20-y6wgas.pdf', verify: 'https://www.credly.com/badges/04731c71-a61c-4c23-8b33-a39d630b5319/public_url', featured: true },
  { name: 'ServiceNow Certified Application Developer (CAD)', issuer: 'ServiceNow', kind: 'Enterprise', file: 'global-servicenow-certified-application-developer-cad.pdf', verify: 'https://www.credly.com/badges/9705da89-4e43-43d2-b768-f0ce2b9e7663/public_url', featured: true },
  { name: 'ServiceNow Certified System Administrator (CSA)', issuer: 'ServiceNow', kind: 'Enterprise', file: 'globalservicenow-certified-system-administrator-csa.pdf', featured: true },
  { name: 'Generative AI in Software Engineering', issuer: 'Amazon · Coursera', kind: 'AI', file: 'amazon-generative-in-software-engineering.pdf', verify: 'https://coursera.org/share/205df8daa88928d4fcce4598b4a6fed8', featured: true },
  { name: 'Full Stack Development', issuer: 'AWS · Coursera', kind: 'Cloud', file: 'full-stack-aws.png', featured: true },
  { name: 'Guide to Large Language Models', issuer: 'Pearson', kind: 'AI', file: 'guide-to-large-language-model-pearson.pdf', featured: true },
  { name: 'Technical Support Fundamentals', issuer: 'Google · Coursera', kind: 'Cloud', verify: 'https://coursera.org/share/d8bc60038c054a02e1fc2c2d2229ef6b' },
  { name: 'IBM Cloud Kubernetes Service', issuer: 'IBM SkillsBuild', kind: 'Cloud', verify: 'https://skills.yourlearning.ibm.com/certificate/share/87d86461e4ewogICJvYmplY3RJZCIgOiAiSVNHLURMNzAzNjZHIiwKICAibGVhcm5lckNOVU0iIDogIjU0NTAzNjZSRUciLAogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIKfQ481744a20d-10' },
  { name: 'JavaScript Essentials', issuer: 'Cisco', kind: 'Development', verify: 'https://cdn.unstop.com/uploads/user-project-files/68af2d0b65212_javascriptessentials1update20250827_29_z7vlox_pdf_other.pdf' },
  { name: 'ML in Agriculture (STC)', issuer: 'IIIT Bhagalpur', kind: 'AI', file: 'ml-in-agriculture-iiit-bh.pdf' },
  { name: 'SAP ABAP Training', issuer: 'BIPARD Patna', kind: 'Enterprise', file: 'sap-abap-bipard-trainee.jpg' },
  { name: 'Application Developer', issuer: 'Certificate', kind: 'Development', file: 'application-developer.png' },
  { name: 'Multimedia Content', issuer: 'Adobe', kind: 'Development', file: 'multimedia-content-adobe.png' },
  { name: 'How the Global Economy Works', issuer: 'University of Illinois', kind: 'Other', file: 'how-global-economy-works-university-of-illinois.pdf' },
  { name: 'Provisional B.Tech Degree', issuer: 'IIIT Bhagalpur', kind: 'Education', file: 'provisional-degree-iiit-bh.pdf' },
  { name: 'Participation Certificate', issuer: 'Event', kind: 'Other', file: 'participation-certificate.pdf' },
  { name: 'Participation Certificate II', issuer: 'Event', kind: 'Other', file: 'participate-certificate.pdf' },
];

export const education = [
  { school: 'Indian Institute of Information Technology Bhagalpur', detail: 'B.Tech, Computer Science & Engineering', period: '2022 — 2026', note: 'DSA · Operating Systems · DBMS · Computer Networks · Software Engineering · System Design' },
  { school: 'New Horizon School, Bhagalpur', detail: 'Class XII · CBSE · Science (PCM)', period: '2022' },
  { school: 'Mount Assisi School, Bhagalpur', detail: 'Class X · ICSE', period: '2020' },
];

// Press coverage & real-world photos (files in /public/media)
export const press = [
  { outlet: 'Dainik Bhaskar', date: '05 Aug 2025', headline: 'IIIT: SGC election held through a portal', img: '/media/press-dainik-bhaskar.jpg',
    quote: 'For the first time the election was run on an online portal built by students — lead developers Siddharth Nama and Ayan Parwez.' },
  { outlet: 'Hindustan', date: '05 Aug 2025', headline: 'IIIT builds its own online election software', img: '/media/press-hindustan.jpg',
    quote: '“This shows the quality of the institute and its students.” — Prof. Madhusudan Singh, Director, IIIT Bhagalpur' },
];

export const milestones = [
  { img: '/media/election-portal-live.jpg', title: 'Election Portal — live on voting day', caption: 'Students casting votes on the portal I co-led for IIIT Bhagalpur’s first-ever online SGC election.', tag: 'Election Portal', tall: true },
  { img: '/media/election-team.jpg', title: 'The team behind the portal', caption: 'Two months of building with the student developer team that shipped the election system.', tag: 'Teamwork' },
  { img: '/media/bipard-cohort.jpg', title: 'SAP ABAP trainee cohort · BIPARD', caption: 'Systems & ERP training at BIPARD, Patna — SAP ABAP data objects, SmartForms and dictionary components.', tag: 'Enterprise' },
  { img: '/media/ayan-campus.jpg', title: 'IIIT Bhagalpur', caption: 'Where I studied Computer Science & Engineering (2022 — 2026).', tag: 'Campus', tall: true },
];
