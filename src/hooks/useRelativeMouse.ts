import { useState, useEffect } from 'react'
import type { RefObject } from 'react'

export function useRelativeMouse<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [mousePosition, setMousePosition] = useState({ 
    x: 0, 
    y: 0, 
    clientX: 0, 
    clientY: 0,
    isActive: false 
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate precise coordinates relative to the element's bounding box
      const rect = el.getBoundingClientRect()
      
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        clientX: e.clientX,
        clientY: e.clientY,
        isActive: true
      })
    }
    
    const handleMouseLeave = () => {
      setMousePosition(prev => ({ ...prev, isActive: false }))
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])

  return mousePosition
}
