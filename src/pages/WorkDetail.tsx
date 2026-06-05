import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../components/SEO'
import PageTransition from '../components/PageTransition'
import './WorkDetail.css'

type CaseStudy = {
  title: string
  subtitle: string
  stats: { label: string; value: string }[]
  problem: string
  solution: string
  howIBuiltIt: { step: string; title: string; desc: string }[]
  links: { demo?: string; github?: string }
  nextProject: { slug: string; name: string }
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  'parent-portal': {
    title: 'Parent Portal',
    subtitle: 'Preschool Management System',
    stats: [
      { label: 'Users', value: '150+' },
      { label: 'Tech Stack', value: '5 Tools' },
      { label: 'Duration', value: '3 Months' },
    ],
    problem: 'The preschool lacked a unified platform for parents, teachers, and administrators. Communication was scattered, and tracking admissions, fee payments, and student progress manually was error-prone and time-consuming.',
    solution: 'Built a multi-role RBAC (Role-Based Access Control) system with Supabase and React. It centralizes all preschool operations, providing distinct, secure dashboards for parents, teachers, and admins.',
    howIBuiltIt: [
      {
        step: '01',
        title: 'Database & Auth Architecture',
        desc: 'Designed a PostgreSQL schema via Supabase to handle distinct user roles. Implemented strict Row Level Security (RLS) policies so parents can only see their own child’s data, while admins have global access.'
      },
      {
        step: '02',
        title: 'Frontend State & RBAC',
        desc: 'Built the frontend using React and TypeScript. Implemented a custom authentication context that verifies the user’s role on login and dynamically renders the appropriate dashboard layout.'
      },
      {
        step: '03',
        title: 'Real-time Features',
        desc: 'Integrated Supabase real-time subscriptions to immediately reflect fee payment statuses and admission approvals across the admin and parent dashboards without requiring a page reload.'
      }
    ],
    links: {
      demo: 'https://awesomekids-parents-portal.vercel.app/'
    },
    nextProject: {
      slug: 'expenzo',
      name: 'Expenzo'
    }
  },
  'expenzo': {
    title: 'Expenzo',
    subtitle: 'AI Financial App',
    stats: [
      { label: 'Core AI', value: 'Gemini API' },
      { label: 'Key Feature', value: 'NLP Queries' },
      { label: 'Type', value: 'Personal Project' },
    ],
    problem: 'Parsing complex bank statements manually is tedious. Existing expense trackers require manual data entry and lack the ability to answer specific, natural-language questions about spending habits.',
    solution: 'Integrated Google\'s Gemini API to automatically categorize transactions and allow users to query their financial data using plain English, entirely eliminating manual entry.',
    howIBuiltIt: [
      {
        step: '01',
        title: 'Statement Parsing',
        desc: 'Developed a robust parsing utility to extract transaction data from standard bank statement formats, cleaning the text for AI processing.'
      },
      {
        step: '02',
        title: 'Gemini API Integration',
        desc: 'Implemented the Gemini API to analyze the raw transaction strings. Engineered specific prompts to instruct the AI to categorize spending (e.g., Groceries, Entertainment) with high accuracy.'
      },
      {
        step: '03',
        title: 'Natural Language Interface',
        desc: 'Built a chat-like interface where users can ask questions like "How much did I spend on food last month?" The app sends the context and query to Gemini, returning a precise answer based on the user\'s actual data.'
      }
    ],
    links: {
      demo: 'https://expenzo-kappa.vercel.app/',
      github: 'https://github.com/abhirajkochale/expenzo'
    },
    nextProject: {
      slug: 'awesome-kids-website',
      name: 'Awesome Kids Website'
    }
  },
  'awesome-kids-website': {
    title: 'Awesome Kids',
    subtitle: 'Marketing Site',
    stats: [
      { label: 'Role', value: 'Frontend' },
      { label: 'Stack', value: 'React + TS' },
      { label: 'Backend', value: 'Supabase' },
    ],
    problem: 'The preschool needed a professional, responsive online presence to attract new admissions and provide clear curriculum information to prospective parents.',
    solution: 'Developed a visually engaging marketing site with dynamic, database-backed content delivery for announcements and fee structures.',
    howIBuiltIt: [
      {
        step: '01',
        title: 'Responsive UI Design',
        desc: 'Translated design requirements into a fully responsive React application, ensuring optimal viewing across mobile and desktop devices.'
      },
      {
        step: '02',
        title: 'Dynamic Content Integration',
        desc: 'Connected the frontend to a Supabase backend to allow preschool administrators to easily update fee structures and public announcements without code changes.'
      }
    ],
    links: {
      demo: 'https://awesome-kids.vercel.app/'
    },
    nextProject: {
      slug: 'resume-screening',
      name: 'Resume Screening'
    }
  },
  'resume-screening': {
    title: 'Resume Screening',
    subtitle: 'ML Pipeline',
    stats: [
      { label: 'Language', value: 'Python' },
      { label: 'Library', value: 'Scikit-learn' },
      { label: 'Method', value: 'TF-IDF' },
    ],
    problem: 'HR departments spend countless hours manually reviewing hundreds of resumes for a single job posting, making the initial screening process highly inefficient.',
    solution: 'Built an automated machine learning pipeline to parse, vectorize, and rank resumes based on their relevance to a given job description.',
    howIBuiltIt: [
      {
        step: '01',
        title: 'NLP Preprocessing',
        desc: 'Utilized Natural Language Processing techniques to clean the resume text, removing stop words, punctuation, and performing stemming/lemmatization.'
      },
      {
        step: '02',
        title: 'TF-IDF Vectorization',
        desc: 'Applied Term Frequency-Inverse Document Frequency (TF-IDF) to convert the cleaned text into numerical vectors, capturing the relative importance of words.'
      },
      {
        step: '03',
        title: 'Classification Model',
        desc: 'Trained a Logistic Regression model on the vectorized data to classify and rank resumes against target job descriptions with measurable accuracy.'
      }
    ],
    links: {
      github: 'https://github.com/abhirajkochale/resume-screening'
    },
    nextProject: {
      slug: 'parent-portal',
      name: 'Parent Portal'
    }
  }
}

export default function WorkDetail() {
  const { slug } = useParams()
  
  if (!slug || !CASE_STUDIES[slug]) {
    return <Navigate to="/work" replace />
  }

  const project = CASE_STUDIES[slug]

  return (
    <PageTransition>
      <SEO title={`${project.title} — Abhiraj Kochale`} description={project.problem} />
      <div className="case-detail">
        
        {/* Hero */}
        <section className="case-hero">
          <div className="case-hero__eyebrow eyebrow">
            <span className="eyebrow__num">CASE STUDY</span>
            <span className="eyebrow__sep">/</span>
            <span className="eyebrow__label">{project.subtitle}</span>
          </div>
          <h1 className="case-hero__title">{project.title}</h1>
        </section>

        {/* Stats */}
        <section className="case-stats">
          {project.stats.map((stat, i) => (
            <div className="case-stat" key={i}>
              <div className="case-stat__value">{stat.value}</div>
              <div className="case-stat__label">{stat.label}</div>
            </div>
          ))}
        </section>

        <div className="case-content-wrapper">
          {/* Context */}
          <section className="case-context">
            <div className="case-context__block">
              <div className="case-context__label">The Problem</div>
              <p className="case-context__text">{project.problem}</p>
            </div>
            <div className="case-context__block">
              <div className="case-context__label">The Solution</div>
              <p className="case-context__text">{project.solution}</p>
            </div>
          </section>

          {/* Process */}
          <section className="case-process">
            <h2 className="case-process__header">How I built it.</h2>
            <div className="case-process__list">
              {project.howIBuiltIt.map((step, i) => (
                <div className="case-step" key={i}>
                  <div className="case-step__num">{step.step}</div>
                  <div className="case-step__content">
                    <h3 className="case-step__title">{step.title}</h3>
                    <p className="case-step__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <section className="case-actions">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="tag tag--primary">
                View Live Demo ↗
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="tag">
                GitHub Repository ↗
              </a>
            )}
            <Link to="/work" className="tag">
              ← Back to Work
            </Link>
          </section>
        </div>

        {/* Next Project */}
        <Link to={`/work/${project.nextProject.slug}`} className="case-next">
          <span className="case-next__label">Next Project</span>
          <div className="case-next__title">
            {project.nextProject.name}
            <span className="case-next__arrow">→</span>
          </div>
        </Link>

      </div>
    </PageTransition>
  )
}
