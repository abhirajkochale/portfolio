export const personal = {
  name: { first: "ABHIRAJ", last: "KOCHALE" },
  role: "Computer Engineering Student",
  tagline: "Building and deploying full-stack web and mobile applications.",
  location: "Mumbai, India",
  email: "kochaleabhiraj@gmail.com",
  phone: "+91-9324267002",
  github: "https://github.com/abhirajkochale",
  linkedin: "https://linkedin.com/in/abhirajkochale-543284309",
  resume: "/Abhiraj_Kochale_resume.pdf",
  available: true,
  education: {
    school: "KJ Somaiya School of Engineering",
    degree: "B.Tech in Computer Engineering",
    period: "August 2024 – May 2028",
    cgpa: "8.82 / 10.0"
  },
  stats: [
    { value: "8.82", label: "CGPA" },
    { value: "300+", label: "Active Users" },
    { value: "3+", label: "Production Apps" },
    { value: "5", label: "Projects" }
  ]
};

export const projects = [
  {
    id: "sakhi",
    index: "01",
    name: "SAKHI — AI-Powered Safe Journey Intelligence",
    tagline: "AI-powered safe journey intelligence.",
    description: "AI-powered journey safety platform that evaluates route segments using historical crime, temporal, infrastructure, mobility, and spatial features to generate risk scores and rank Safest, Balanced, and Fastest routes.",
    secondDescription: "Built a FastAPI + XGBoost risk pipeline with SHAP-based explanations, confidence scoring, dynamic context updates, and a React Native prototype integrated with OpenStreetMap, OSRM, and PostGIS.",
    stack: ["React Native", "Expo", "FastAPI", "Python", "XGBoost", "SHAP", "PostgreSQL", "PostGIS", "OSM", "OSRM"],
    year: "2026",
    badge: "🏆 Flagship",
    impact: "FastAPI + XGBoost risk pipeline · SHAP-based explanations · React Native prototype",
    live: null,
    github: "https://github.com/abhirajkochale/SAKHI",
    featured: true,
    images: [
      "/images/SAKHI/1.jpeg",
      "/images/SAKHI/2.jpeg",
      "/images/SAKHI/3.jpeg",
      "/images/SAKHI/4.jpeg"
    ]
  },
  {
    id: "parent-portal",
    index: "02",
    name: "Awesome Connect — Preschool Parent Portal",
    tagline: "Production software. 300+ real users.",
    description: "Production-ready parent portal with role-based access for parents and administrators, supporting attendance, announcements, student records, events, fees, documents, and support workflows.",
    secondDescription: "Implemented authentication, Supabase/PostgreSQL integration, document handling, responsive interfaces, and published the Android application on Google Play.",
    stack: ["React", "JavaScript", "Supabase", "PostgreSQL", "Capacitor Web"],
    year: "2025",
    badge: "🚀 Production",
    impact: "300+ users · role-based access · production Android app",
    live: "https://awesomekids-parents-portal.vercel.app/",
    github: null,
    featured: true,
    images: [
      "/images/Parent portal/parent-portal.png",
      "/images/Parent portal/Admin dashboard (3).png",
      "/images/Parent portal/Parent Dashboard (2).png",
      "/images/Parent portal/Admission form.png",
      "/images/Parent portal/Manage Admissions.png",
      "/images/Parent portal/Help and support.png"
    ]
  },
  {
    id: "subtract",
    index: "03",
    name: "SubTract — AI SaaS Spend Audit Platform",
    tagline: "The Mint for AI tool spend.",
    description: "B2B SaaS platform identifying duplicate licenses, unused seats, and cost-saving opportunities; integrated Gemini API to generate CFO-ready audit summaries with automated email delivery.",
    secondDescription: "Shipped shareable audit reports and lead capture workflows with persistent PostgreSQL storage.",
    stack: ["React", "JavaScript", "Supabase", "PostgreSQL", "Gemini API"],
    year: "2026",
    badge: "✦ AI Powered",
    impact: "CFO-ready audit summaries · automated email delivery · persistent PostgreSQL storage",
    live: "https://subtract-gilt.vercel.app/",
    github: "https://github.com/abhirajkochale",
    featured: true,
    images: [
      "/images/SubTract/1.png",
      "/images/SubTract/2.png",
      "/images/SubTract/3.png",
      "/images/SubTract/4.png"
    ]
  },
  {
    id: "expenzo",
    index: "04",
    name: "Expenzo — AI Financial Assistant",
    tagline: "AI financial assistant powered by Gemini.",
    description: "AI-powered financial assistant that converts bank statements into conversational spending insights using Gemini API, with PDF/CSV parsing and financial anomaly detection.",
    stack: ["React", "JavaScript", "Supabase", "PostgreSQL", "Gemini API"],
    year: "2025",
    badge: "✦ AI Powered",
    impact: "Gemini AI · multi-format PDF/CSV parsing · real-time insights",
    live: "https://expenzo-kappa.vercel.app/",
    github: "https://github.com/abhirajkochale/Expenzo",
    featured: true,
    images: [
      "/images/Expenzo/1.png",
      "/images/Expenzo/2.png",
      "/images/Expenzo/3.png",
      "/images/Expenzo/4.png",
      "/images/Expenzo/5.png"
    ]
  },
  {
    id: "awesome-kids",
    index: "05",
    name: "Awesome Kids — School Platform",
    tagline: "Official website for a real institution.",
    description: "Official responsive website for Awesome Kids International Preschool with Supabase-backed inquiry management and admissions-focused digital outreach.",
    stack: ["React", "JavaScript", "Supabase"],
    year: "2024",
    badge: "↗ Live",
    impact: "Live production site · digital admissions outreach · Supabase-backed inquiry system",
    live: "https://awesome-kids.vercel.app/",
    github: null,
    featured: true,
    images: [
      "/images/Awesome Kids/1.png",
      "/images/Awesome Kids/2.png",
      "/images/Awesome Kids/3.png",
      "/images/Awesome Kids/4.png",
      "/images/Awesome Kids/5.png",
      "/images/Awesome Kids/6.png"
    ]
  }
];

export const experience = [
  {
    company: "Wayspire Ed-Tech Pvt Ltd",
    role: "Machine Learning Intern",
    period: "June 2025 – August 2025",
    location: "Remote",
    points: [
      "Built and evaluated text classification models using Python, Scikit-learn, TF-IDF, and Logistic Regression; achieved 87%+ accuracy across 8 categories through data preprocessing, feature engineering, and model evaluation",
      "Developed OpenCV-based computer vision preprocessing pipelines for image classification workflows, reducing data preparation time by approximately 40%"
    ]
  },
  {
    company: "Alumni Cell, KJ Somaiya School of Engineering",
    role: "Marketing Head",
    period: "July 2026 – Present",
    location: "Mumbai, India",
    points: [
      "Lead sponsorship outreach for alumni events by identifying potential sponsors, initiating partnerships, and managing end-to-end communication and follow-ups",
      "Coordinate sponsorship proposals, negotiations, and deliverables with external organizations to support event funding and collaborations"
    ]
  },
  {
    company: "Awesome Kids International Preschool",
    role: "Social Media Manager",
    period: "2024 – Present",
    location: "Mumbai, India",
    points: [
      "Grew Instagram engagement by 30%+ through strategic content planning; managed a calendar of 10+ posts/month supporting admissions outreach and event promotions",
      "Coordinated with the school team on content, announcements, and admissions-related campaigns"
    ]
  }
];

export const achievements = [
  {
    title: "Smart India Hackathon 2026",
    description: "Secured 3rd Rank among 90 shortlisted teams in the internal college round with SAKHI, an AI-powered safe journey intelligence platform."
  },
  {
    title: "Google Play Production Access",
    description: "Granted production access for Awesome Connect after completing Google's closed-testing requirements."
  }
];

export const skills = {
  "Languages": ["Python", "Java", "JavaScript", "SQL"],
  "Frontend": ["React", "React Native", "Expo", "HTML5", "CSS3"],
  "Backend & DB": ["Node.js", "Express.js", "FastAPI", "REST APIs", "Supabase", "PostgreSQL"],
  "AI / ML": ["Scikit-learn", "Gemini API", "OpenCV"],
  "AI Development": ["Claude", "AI Coding Agents", "Prompt Engineering"]
};

export const certifications = [
  {
    name: "IBM Machine Learning with Python",
    issuer: "IBM",
    date: "August 2025",
    icon: "🎓"
  },
  {
    name: "Machine Learning Internship & Training Certificate",
    issuer: "Wayspire Ed-Tech Pvt Ltd",
    date: "August 2025",
    icon: "🏅"
  }
];
