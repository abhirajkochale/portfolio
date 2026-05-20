import './Marquee.css'

const ITEMS = [
  'REACT', 'TYPESCRIPT', 'PYTHON', 'NODE.JS',
  'SUPABASE', 'POSTGRESQL', 'SCIKIT-LEARN', 'GSAP',
]

function Track() {
  // Duplicate ×4 for seamless infinite loop
  const all = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div className="marquee__track">
      {all.map((item, i) => (
        <span key={i} className={item === '·' ? 'marquee__dot' : 'marquee__item'}>
          {item}
          {i < all.length - 1 && <span className="marquee__dot" aria-hidden="true">·</span>}
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <Track />
    </div>
  )
}
