import { useEffect, useState, useRef } from 'react'
import { Sun, Moon } from 'lucide-react'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light'
    }
    return true
  })

  const mounted = useRef(false)

  useEffect(() => {
    const root = document.body
    
    if (mounted.current) {
      root.classList.add('theme-transitioning')
    }
    
    if (isDark) {
      root.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
    
    if (mounted.current) {
      const t = setTimeout(() => root.classList.remove('theme-transitioning'), 400)
      return () => clearTimeout(t)
    }
    
    mounted.current = true
  }, [isDark])

  return (
    <button
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : 'theme-toggle--light'}`}
      onClick={() => setIsDark(!isDark)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle__pill">
        <div className="theme-toggle__icon">
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </div>
      </div>
    </button>
  )
}
