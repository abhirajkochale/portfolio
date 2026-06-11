export const personal = {
  name: { first: "ABHIRAJ", last: "KOCHALE" },
  role: "Full Stack Developer & ML Enthusiast",
  tagline: "Building real software that people actually use.",
  location: "Mumbai, India",
  email: "kochaleabhiraj@gmail.com",
  phone: "+91-9324267002",
  github: "https://github.com/abhirajkochale",
  linkedin: "https://linkedin.com/in/abhiraj-kochale-543284309",
  resume: "/resume.pdf",
  available: true,
  education: {
    school: "KJ Somaiya School of Engineering",
    degree: "B.Tech Computer Engineering",
    period: "2024 – 2028",
    cgpa: "8.70"
  },
  stats: [
    { value: "8.70", label: "CGPA" },
    { value: "200+", label: "Active Users" },
    { value: "1",    label: "Internship" },
    { value: "4+",   label: "Projects" }
  ]
};

export const projects = [
  {
    id: "parent-portal",
    index: "01",
    name: "Parent Portal",
    tagline: "Production software. 200+ real users.",
    description: "Preschool management portal with JWT auth and role-based access control for parents and admins. Live in production with 200+ active users and real-time student updates via Supabase.",
    stack: ["React","TypeScript","Supabase","PostgreSQL","RBAC"],
    year: "2025",
    badge: "🏆 Flagship",
    impact: "200+ Active Users · Live in Production",
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
    id: "expenzo",
    index: "02",
    name: "Expenzo",
    tagline: "AI financial assistant powered by Gemini.",
    description: "Natural language financial insights from bank statements via Gemini API. React/TypeScript frontend with Supabase/PostgreSQL backend.",
    stack: ["React","TypeScript","Supabase","PostgreSQL","Gemini API"],
    year: "2025",
    badge: "✦ AI Powered",
    impact: "Conversational AI · Real-time Insights",
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
    index: "03",
    name: "Preschool Website",
    tagline: "Official website for a real institution.",
    description: "Responsive database-backed website for Awesome Kids International Preschool supporting digital admissions outreach.",
    stack: ["React","TypeScript","Supabase"],
    year: "2024",
    badge: "↗ Live",
    impact: "Real Business · Production Deployed",
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
  },
  {
    id: "subtract",
    index: "04",
    name: "SubTract",
    tagline: "The Mint for AI tool spend.",
    description: "B2B financial auditing tool for startup founders. Identifies wasted budget on duplicate AI subscriptions and generates personalized CFO summaries using Gemini AI.",
    stack: ["Next.js 15", "Supabase", "Gemini API", "Resend SDK", "Vitest"],
    year: "2026",
    badge: "🚀 B2B SaaS",
    impact: "Lead-Gen · Cost Optimization",
    live: null,
    github: null,
    featured: true,
    images: [
      "/images/SubTract/1.png",
      "/images/SubTract/2.png",
      "/images/SubTract/3.png",
      "/images/SubTract/4.png"
    ]
  }
];

export const experience = [
  {
    company: "Wayspire Ed-Tech Pvt Ltd",
    role: "Machine Learning Intern",
    period: "Jun 2025 – Aug 2025",
    location: "Remote",
    points: [
      "Built ML models using Python and Scikit-learn for text classification with TF-IDF and Logistic Regression",
      "Gained exposure to computer vision with OpenCV; observed model training and evaluation workflows"
    ]
  },
  {
    company: "Somaiya ML & Research Association",
    role: "Marketing Team Member",
    period: "Oct 2024 – Present",
    location: "Mumbai",
    points: [
      "Sponsorship outreach and marketing for ML workshops attended by 100+ students"
    ]
  },
  {
    company: "Awesome Kids International Preschool",
    role: "Social Media Manager",
    period: "2024 – Present",
    location: "Mumbai",
    points: [
      "Grew Instagram engagement 30%+ through consistent content planning; managed 10+ posts/month"
    ]
  }
];

export const skills = {
  "Languages":   ["Python", "Java", "JavaScript", "TypeScript"],
  "Frontend":    ["React", "HTML5", "CSS3", "Tailwind CSS"],
  "Backend":     ["Supabase", "PostgreSQL", "SQL", "REST APIs"],
  "AI / ML":     ["Gemini API", "OpenAI API", "Scikit-learn", "TensorFlow", "OpenCV", "NLP"],
  "Tools":       ["Git", "GitHub", "VS Code", "Vercel"]
};

export const certifications = [
  {
    name: "Machine Learning with Python",
    issuer: "IBM",
    date: "Aug 2025",
    icon: "🎓"
  },
  {
    name: "ML Internship & Training Certificate",
    issuer: "Wayspire Ed-Tech Pvt Ltd",
    date: "Aug 2025",
    icon: "🏅"
  }
];
