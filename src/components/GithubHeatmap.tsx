import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './GithubHeatmap.css'

interface DayContribution {
  date: string
  contributionCount: number
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'
}

interface GithubData {
  contributions: DayContribution[][]
  totalContributions: number
}

export default function GithubHeatmap() {
  const [data, setData] = useState<GithubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://github-contributions-api.deno.dev/abhirajkochale.json')
        if (!res.ok) throw new Error('Network response was not ok')
        const jsonData: GithubData = await res.json()
        setData(jsonData)

        // Calculate current streak
        let currentStreak = 0
        const flatDays = jsonData.contributions.flat().reverse() // newest first
        
        // Find today or the last valid day
        const todayStr = new Date().toISOString().split('T')[0]
        let started = false

        for (const day of flatDays) {
          if (!started && day.date > todayStr) {
            // Skip future dates if the API includes them
            continue
          }
          started = true
          
          if (day.contributionCount > 0) {
            currentStreak++
          } else if (day.date !== todayStr) {
            // If it's 0 and it's not today (maybe haven't committed today yet), streak broken
            break
          }
        }
        setStreak(currentStreak)

      } catch (error) {
        console.error('Error fetching github data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Animation
  useEffect(() => {
    if (!data || loading || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Stagger animate the columns (we wrapped them in a visual concept, but we can animate cells)
      // Since grid-auto-flow is column, we can stagger by column by calculating index / 7
      const cells = gsap.utils.toArray<HTMLElement>('.gh-cell')
      
      gsap.fromTo(cells, 
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, 
          scale: 1,
          duration: 0.4,
          ease: 'back.out(2)',
          stagger: {
            amount: 1.5, // Total time to stagger all cells
            grid: 'auto', // GSAP can figure out the grid based on layout!
            from: 'start' // left to right
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true
          }
        }
      )
    }, sectionRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [data, loading])

  // Tooltip interaction
  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>, day: DayContribution) => {
    const tip = tooltipRef.current
    if (!tip) return

    const rect = e.currentTarget.getBoundingClientRect()
    // Center above the cell
    const x = rect.left + rect.width / 2
    const y = rect.top - 8 

    tip.style.left = `${x}px`
    tip.style.top = `${y}px`
    tip.classList.add('is-visible')

    // Update text
    const countText = day.contributionCount === 1 ? '1 contribution' : `${day.contributionCount} contributions`
    const dateText = new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    
    tip.innerHTML = `
      <div><strong>${countText}</strong></div>
      <div class="gh-tooltip-date">${dateText}</div>
    `
  }, [])

  const onMouseLeave = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.classList.remove('is-visible')
    }
  }, [])

  if (loading) return null // Could return a skeleton here, but simple null works for fast APIs

  return (
    <div className="github-heatmap" ref={sectionRef}>
      
      <div className="gh-header">
        <div>
          <h3 className="gh-title">GitHub Contributions</h3>
          <div className="gh-subtitle">abhirajkochale</div>
        </div>
        <div className="gh-stats">
          <div className="gh-stat">
            <div className="gh-stat-value">{data?.totalContributions || 0}</div>
            <div className="gh-stat-label">This Year</div>
          </div>
          <div className="gh-stat">
            <div className="gh-stat-value">{streak}</div>
            <div className="gh-stat-label">Day Streak</div>
          </div>
        </div>
      </div>

      <div className="gh-grid-wrapper">
        <div className="gh-grid" style={{ gridAutoFlow: 'column' }}>
          {data?.contributions.map((week, weekIdx) => (
            week.map((day, dayIdx) => (
              <div 
                key={`${weekIdx}-${dayIdx}`} 
                className="gh-cell"
                data-level={day.contributionLevel}
                onMouseEnter={(e) => onMouseEnter(e, day)}
                onMouseLeave={onMouseLeave}
              />
            ))
          ))}
        </div>
      </div>

      {/* Floating Tooltip */}
      <div ref={tooltipRef} className="gh-tooltip" aria-hidden="true" />
    </div>
  )
}
