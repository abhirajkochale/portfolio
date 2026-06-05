import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Cursor.css'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on desktop (pointer: fine)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot  = dotRef.current!
    const ring = ringRef.current!

    let mx = window.innerWidth  / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my

    // Dot follows exactly
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      gsap.to(dot, { x: mx, y: my, duration: 0, overwrite: true })
    }
    window.addEventListener('mousemove', onMove)

    // Ring follows with lerp
    const tick = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      gsap.set(ring, { x: rx, y: ry })
    }
    gsap.ticker.add(tick)

    // Hover interactive elements — grow ring
    const onEnter = () => {
      gsap.to(dot,  { scale: 0,   duration: 0.25, ease: 'power2.out' })
      gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.35, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(dot,  { scale: 1,   duration: 0.25, ease: 'power2.out' })
      gsap.to(ring, { scale: 1,   opacity: 1, duration: 0.35, ease: 'power2.out' })
    }

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Appear on first move
    gsap.to([dot, ring], { opacity: 1, duration: 0.5, delay: 0.3 })

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
