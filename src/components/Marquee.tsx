import './Marquee.css'

const ITEMS = [
  'REACT', 'TYPESCRIPT', 'PYTHON', 'NODE.JS',
  'SUPABASE', 'POSTGRESQL', 'SCIKIT-LEARN', 'GSAP', 'GEMINI API', 'OPENCV'
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
