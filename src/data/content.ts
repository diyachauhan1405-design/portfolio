export const profile = {
  name: "Diya Chauhan",
  role: "UI/UX Designer & Frontend Developer",
  experienceYears: "1.5+",
  company: "WildMind AI",
  location: "Ahmedabad, GJ, India",
  availability: "Immediate Joiner · Open to Work",
  email: "diyachauhan1405@gmail.com",
  socials: {
    linkedin: "https://linkedin.com/in/diya-chauhan14",
    github: "https://github.com/diyachauhan1405-design",
    behance: "",
    dribbble: "",
  },
};

export const education = [
  {
    institution: "IIT Kharagpur",
    degree: "Post Graduate, AI Software Engineering",
    location: "Kharagpur",
    period: "Oct 2026 — Jul 2027",
    status: "In progress",
    // TODO(Diya): add real modules / capstone once the programme starts.
    points: [
      "Deepening the engineering side of the AI products I design and build",
      "Builds directly on my generative AI platform work at WildMind AI",
      "Open to full-time roles during the programme — immediate joiner",
    ],
  },
  {
    institution: "U.V. Patel College of Engineering, Ganpat University",
    degree: "Bachelor's, Computer Engineering",
    location: "Kherva",
    period: "Aug 2021 — May 2025",
    status: "Completed",
    // TODO(Diya): add CGPA, final-year project or key subjects if you'd like.
    points: [
      "Python computer-vision internship at Vnnovate Solutions in 3rd year (Dec 2023 – Jan 2024)",
      "UI/UX internship at Vnnovate Solutions alongside final year (Jan – Jun 2025)",
      "Certified in Circuit Assembly and PRINT FUSION 2K24 at U.V. Patel College (Mar 2024)",
    ],
  },
];

export const skillCategories = [
  {
    category: "UI/UX",
    usedAt: "WildMind AI · Vnnovate · FLYBIT · IncsSmart",
    skills: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "User Flows",
      "Information Architecture",
      "Design Systems",
      "Interaction Design",
      "Responsive Design",
    ],
  },
  {
    category: "Frontend",
    usedAt: "WildMind AI · FLYBIT · IncsSmart · Vnnovate",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Tailwind CSS",
    ],
  },
  {
    category: "Tools & Collaboration",
    usedAt: "All roles & projects",
    skills: [
      "Figma",
      "Git",
      "GitHub",
      "REST APIs",
    ],
  },
];

export const projects = [
  {
    name: "FLYBIT Dynamics",
    role: "UI/UX Designer & Frontend Developer",
    timeline: "2025",
    category: "Marketing Website",
    tagline: "A website for a drone light show company",
    note: "sky",
    tech: ["Figma", "React", "Next.js", "Tailwind CSS"],
    description:
      "Designed and developed the official website for a drone light show company — from Figma to production. Built service, city-specific, blog, and portfolio pages on a consistent design system, with a conversion-focused layout that showcases drone shows and improves the client inquiry experience across devices.",
    screenshot: "/projects/flybit-site.jpg",
    host: "flybitdynamics.com",
    github: "#",
    liveUrl: "https://flybitdynamics.com/",
  },
  {
    name: "WildMind AI",
    role: "UI/UX Designer & Frontend Developer",
    timeline: "2025 — 2026",
    category: "AI Product",
    tagline: "UX + frontend for a generative AI platform",
    note: "pink",
    tech: ["Figma", "React.js", "Next.js", "Design Systems"],
    description:
      "Designed and developed intuitive, scalable experiences for a generative AI platform — translating complex AI workflows into seamless, user-centric products. Improved overall UX by ~30% and built reusable React/Next.js components that cut frontend development time by ~30%.",
    // No public site yet: shows a bold cover. Add a shareable screenshot as `screenshot` to switch it to the browser view.
    cover: { metric: "~30%", metricLabel: "better UX", color: "#ff9ec7" },
    github: "#",
    liveUrl: "#",
  },
  {
    name: "IncSmart Technologies",
    role: "UI/UX Designer & Frontend Developer",
    timeline: "2025",
    category: "Corporate Website",
    tagline: "A corporate site for IoT & energy solutions",
    note: "mint",
    tech: ["Figma", "HTML5", "CSS3", "Bootstrap"],
    description:
      "Designed and developed a corporate website showcasing IoT and energy management solutions. Created responsive pages for products, services, and industry use cases — translating business requirements into clean, user-friendly interfaces that strengthen the company's digital presence.",
    screenshot: "/projects/incsmart-site.jpg",
    host: "incsmart-web.vercel.app",
    github: "https://github.com/diyachauhan1405-design/incsmart-web",
    liveUrl: "https://incsmart-web.vercel.app/",
  },
];

export const experience = [
  {
    company: "WildMind AI",
    role: "UI/UX Designer & Frontend Developer",
    period: "Aug 2025 — July 2026",
    responsibilities: [
      "Designed and developed intuitive, scalable user experiences for a generative AI platform",
      "Managed the end-to-end UI/UX process — user research, wireframing, high-fidelity prototyping, usability improvements, and responsive frontend development",
      "Translated complex AI workflows into seamless, user-centric digital products",
    ],
    achievements: [
      "Improved overall user experience by ~30% across the generative AI platform",
      "Reduced design-to-development iterations by ~25%",
      "Built generic, reusable React.js & Next.js components — ~40% more reusability and ~30% faster frontend development",
    ],
    impact: [
      { value: "~30%", label: "Better UX" },
      { value: "~25%", label: "Fewer iterations" },
      { value: "~40%", label: "Reusability" },
    ],
    tech: ["Figma", "React.js", "Next.js", "Design Systems"],
  },
  {
    company: "Vnnovate Solutions Pvt Ltd",
    role: "UI/UX Intern",
    period: "Jan 2025 — Jun 2025",
    responsibilities: [
      "Led the redesign of the official Vnnovate Solutions website with a user-centric UX approach",
      "Created high-fidelity Figma prototypes with responsive, modern designs",
      "Developed responsive frontend layouts using HTML, CSS, and Bootstrap — without custom CSS",
    ],
    achievements: [
      "Improved usability, visual consistency, and user engagement by ~25%",
      "Improved website navigation and user flows by ~30%",
    ],
    impact: [
      { value: "~25%", label: "Engagement" },
      { value: "~30%", label: "Better navigation" },
    ],
    tech: ["Figma", "HTML", "CSS", "Bootstrap"],
  },
  {
    company: "Vnnovate Solutions Pvt Ltd",
    role: "Python Development Intern",
    period: "Dec 2023 — Jan 2024",
    responsibilities: [
      "Developed a facial recognition system using Python, OpenCV, and Firebase",
      "Integrated CVZone, MediaPipe, and NumPy to improve computer vision workflows",
    ],
    achievements: [
      "Optimized image processing, improving application efficiency by ~20%",
      "Delivered a functional and scalable computer vision solution",
    ],
    impact: [{ value: "~20%", label: "Efficiency" }],
    tech: ["Python", "OpenCV", "CVZone", "Firebase", "NumPy", "MediaPipe"],
  },
];

export const certifications = [
  { name: "Python Computer Vision", issuer: "Vnnovate Solutions Pvt. Ltd.", date: "Jan 2024" },
  { name: "Circuit Assembly", issuer: "U.V. Patel College of Engineering", date: "Mar 2024" },
  { name: "PRINT FUSION 2K24", issuer: "U.V. Patel College of Engineering", date: "Mar 2024" },
];

export const recruiterSummary = {
  headline: "Designer who ships the code — focused on AI products.",
  facts: [
    { label: "Role", value: "UI/UX Designer & Frontend Developer" },
    { label: "Experience", value: "1.5+ years · 1 full-time role, 2 internships" },
    { label: "Core stack", value: "Figma · React.js · Next.js · Tailwind CSS" },
    { label: "Domain", value: "Generative AI platform, marketing & corporate sites" },
    { label: "Education", value: "B.E. Computer Engineering · PG in AI Software Engineering, IIT Kharagpur (from Oct 2026)" },
    { label: "Availability", value: "Immediate joiner · Ahmedabad, India" },
  ],
  highlights: [
    { value: "~30%", label: "UX improvement on a generative AI platform" },
    { value: "~40%", label: "more component reuse across projects" },
    { value: "~25%", label: "fewer design-to-dev iterations" },
  ],
};

// Case study — built from the WildMind AI resume entry.
// TODO(Diya): replace the drafted "decisions", "tradeOff" and "reflection" text with
// the real specifics from your work before publishing.
export const caseStudy = {
  company: "WildMind AI",
  title: "Making a generative AI platform feel simple",
  period: "Aug 2025 — Jul 2026",
  role: "UI/UX Designer & Frontend Developer — owned research, design and frontend build",
  tags: ["Generative AI", "Product Design", "Design System", "React.js", "Next.js"],
  context:
    "WildMind AI is a generative AI platform. Its power was hidden behind complex, multi-step AI workflows that new users found hard to follow.",
  problem:
    "Users had to understand how the AI worked before they could get value from it. Each new screen was also designed and built from scratch, so design and development drifted apart and every feature took several hand-off rounds.",
  constraints: [
    "AI generation is slow and its output is unpredictable, so the UI has to handle waiting, partial results and failures gracefully.",
    "A small team: the same person (me) designing in Figma and shipping the frontend.",
    "The product was evolving fast, so designs had to be reusable rather than one-off.",
  ],
  decisions: [
    {
      title: "Turn complex AI workflows into guided steps",
      detail:
        "Mapped each workflow through user research and user flows, then broke it into clear steps with progressive disclosure — advanced options stay out of the way until needed.",
      tradeOff: "Fewer controls on screen at first, in exchange for a much faster first success for new users.",
    },
    {
      title: "Design every state, not just the happy path",
      detail:
        "Prototyped loading, generating, partial, empty and error states in Figma before building, so slow or failed generations never left users guessing.",
      tradeOff: "More design time up front, but far fewer surprises and rework during development.",
    },
    {
      title: "One reusable component library across design and code",
      detail:
        "Built generic, reusable React.js and Next.js components that mirror the Figma components, so a design change maps directly to one component in code.",
      tradeOff: "Slower to build the first screens, much faster for every screen after that.",
    },
  ],
  outcomes: [
    { value: "~30%", label: "Improvement in overall user experience" },
    { value: "~25%", label: "Fewer design-to-development iterations" },
    { value: "~40%", label: "Increase in component reusability" },
    { value: "~30%", label: "Less frontend development time" },
  ],
  reflection:
    "If I did it again, I would set up usability metrics from day one, so improvements could be measured continuously instead of estimated at milestones.",
};

// Figma files shown on /designs.
// TODO(Diya): paste each file's share link into `figmaUrl` (Share → "Anyone with the link can view" → Copy link).
// Optional `prototypeUrl`: a Figma prototype link (Present → Share prototype) to power the ▶ Present button.
export type DesignFile = {
  id: string;
  name: string;
  page: string;
  project: string;
  role: string;
  year?: string;
  type: string;
  tools: string[];
  summary: string;
  highlights: string[];
  figmaUrl: string;
  prototypeUrl?: string;
  liveUrl?: string;
  swatch: string;
};

// TODO(Diya): give each file its real project name, year and a line about your role.
export const designFiles: DesignFile[] = [
  {
    id: "dashboard",
    name: "Admin dashboard",
    page: "Web & dashboards",
    project: "Admin dashboard",
    role: "UI/UX Designer",
    type: "Web app · Dashboard",
    tools: ["Figma", "Data tables", "Charts"],
    summary:
      "A desktop admin dashboard with a dark sidebar navigation, data-dense tables, filters and analytics cards.",
    highlights: ["Multiple dashboard screens", "Table, filter and chart patterns", "Consistent navigation shell"],
    figmaUrl: "https://www.figma.com/design/Ij9uE4nCNtqgALvSQfRMrP/Untitled?node-id=17-3",
    swatch: "#bba6ff",
  },
  {
    id: "mobile-orange",
    name: "Mobile app — full flow",
    page: "Mobile apps",
    project: "Mobile app (orange)",
    role: "UI/UX Designer",
    type: "Mobile app",
    tools: ["Figma", "User flows", "Mobile UI"],
    summary:
      "An end-to-end mobile app: a large set of screens laid out flow by flow, with an orange accent system across light and dark screens.",
    highlights: ["Complete multi-screen flows", "Light and dark screens", "Reusable mobile components"],
    figmaUrl: "https://www.figma.com/design/kRLjs4MHwXXicePTAiUiui/Untitled?node-id=0-1",
    swatch: "#ffae5c",
  },
  {
    id: "mobile-green",
    name: "Mobile app — green UI",
    page: "Mobile apps",
    project: "Mobile app (green)",
    role: "UI/UX Designer",
    type: "Mobile app",
    tools: ["Figma", "Mobile UI"],
    summary:
      "A green-themed mobile app, with screens grouped on separate boards for different parts of the journey.",
    highlights: ["Screens grouped by journey", "Consistent green action system"],
    figmaUrl: "https://www.figma.com/design/PjyQoMO50dc2D81oOnn1Ul/Untitled?node-id=0-1",
    swatch: "#8ee6b5",
  },
  {
    id: "sneaker",
    name: "Sneaker store — product page",
    page: "Web & dashboards",
    project: "Sneaker store concept",
    role: "UI Designer",
    type: "E-commerce concept",
    tools: ["Figma", "Visual design"],
    summary:
      "A bold e-commerce product page concept for a sneaker drop: hero product shot, size picker, add-to-cart and related products.",
    highlights: ["Strong visual hierarchy", "Size picker & cart actions", "Related-product rail"],
    figmaUrl: "https://www.figma.com/design/WYQ6wSABeLCGpd7uuvESJl/Untitled",
    swatch: "#8fd3ff",
  },
  {
    id: "wireframes",
    name: "Wireframes — low fidelity",
    page: "Wireframes",
    project: "Wireframes",
    role: "UX Designer",
    type: "Wireframes",
    tools: ["Figma", "Wireframing", "Information architecture"],
    summary:
      "Low-fidelity wireframes that map out structure and flow before any visual design — where layout and content decisions get made.",
    highlights: ["Structure before styling", "Page-by-page flow"],
    figmaUrl: "https://www.figma.com/design/tYPve3LZiZVISonUQzBBrb/Untitled",
    swatch: "#ffd54a",
  },
];
