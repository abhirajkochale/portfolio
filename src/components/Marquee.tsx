import './Marquee.css'

const ITEMS = [
  'React', 'TypeScript', 'Python', 'Node.js',
  'Supabase', 'PostgreSQL', 'Scikit-learn', 'GSAP', 'Gemini API', 'OpenCV'
]

export default function Marquee() {
  const all = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {all.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__dot">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
