import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'

// ✅ FIX: Inline SVG components instead of lucide-react named imports
// lucide-react named exports resolve to namespace objects in this Vite config
// causing "Element type is invalid: got object" at the <Icon /> render
const LeafIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
)

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const StarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const STATS = [
  {
    Icon:   LeafIcon,
    value:  100,
    suffix: '%',
    label:  'Natural Products',
    note:   'Pure herbs, zero synthetics',
  },
  {
    Icon:   UsersIcon,
    value:  500,
    suffix: '+',
    label:  'Happy Patients',
    note:   'Trusted by families across Kerala',
  },
  {
    Icon:   StarIcon,
    value:  1,
    suffix: ' Year',
    label:  'Of Excellence',
    note:   'New beginnings, ancient wisdom',
  },
]

export default function StatsBar() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative bg-primary py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-white/10">
          {STATS.map(({ Icon, value, suffix, label, note }, i) => (
            <StatCard
              key={label}
              Icon={Icon}
              value={value}
              suffix={suffix}
              label={label}
              note={note}
              inView={inView}
              delay={i * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ✅ FIX: Extracted to named component so <Icon /> renders in its own scope
// Rendering <Icon /> inside .map() inline caused the object resolution to
// be evaluated lazily — extracting it forces React to validate at definition time
function StatCard({ Icon, value, suffix, label, note, inView, delay }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2200
    let start = null

    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * eased))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(value)
    }

    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <div
      className="flex flex-col items-center text-center px-8"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-gold">
        <Icon />
      </div>
      <div className="font-display text-5xl font-light text-white mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="font-body font-medium text-gold-light text-sm tracking-wide uppercase mb-1">
        {label}
      </p>
      <p className="font-accent italic text-accent/70 text-xs">
        {note}
      </p>
    </div>
  )
}
