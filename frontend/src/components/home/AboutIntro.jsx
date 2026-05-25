import { useEffect, useRef, useState } from 'react'

// ── Lines of text — REPLACE content with your clinic details ──────────────
const LINES = [
  { type: 'heading', text: 'Best Ayurvedic Clinic in Kerala' },
  { type: 'spacer' },
  { type: 'body', text: 'Welcome to Health Care Ayurveda, widely recognised as one of' },
  { type: 'body', text: 'the finest Ayurvedic clinics in Kerala for holistic wellness.' },
  { type: 'body', text: 'Rooted in authentic principles, our Ayurvedic centre delivers' },
  { type: 'body', text: 'personalised care that heals the body, calms the mind,' },
  { type: 'body', text: 'and restores natural balance.' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80', alt: 'Ayurvedic treatment room' },
  { type: 'body', text: 'As a leading Ayurvedic centre in Kerala, we combine traditional' },
  { type: 'body', text: 'healing with modern wellness approaches, making us a preferred' },
  { type: 'body', text: 'destination for men, women, and families across all life stages.' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80', alt: 'Herbal medicine preparation' },
  { type: 'body', text: 'Every treatment begins with deep consultation,' },
  { type: 'body', text: 'personalised for your unique body constitution.' },
]

// ── Single line — animates in when it enters viewport ─────────────────────
function AnimatedLine({ item, index }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  if (item.type === 'spacer') return <div style={{ height: '16px' }} />

  if (item.type === 'image') return (
    <div
      ref={ref}
      style={{
        margin: '28px 0',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        style={{
          width: '100%',
          maxHeight: '300px',
          objectFit: 'cover',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(45,90,39,0.15)',
          /* Subtle green border frame */
          border: '3px solid rgba(138,184,122,0.25)',
        }}
      />
    </div>
  )

  const isHeading = item.type === 'heading'

  return (
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
        marginBottom: isHeading ? '20px' : '4px',
      }}
    >
      <p
        style={{
          fontFamily: isHeading
            ? '"Cormorant Garamond", Georgia, serif'
            : '"DM Sans", sans-serif',
          fontSize:   isHeading
            ? 'clamp(1.8rem, 3.5vw, 2.8rem)'
            : 'clamp(0.95rem, 1.5vw, 1.1rem)',
          fontWeight: isHeading ? 400 : 300,
          color:      isHeading ? '#2D5A27' : '#3D4F35',
          lineHeight: isHeading ? 1.2 : 1.75,
          letterSpacing: isHeading ? '-0.01em' : '0.01em',
          /* Slide-up line reveal */
          opacity:    vis ? 1 : 0,
          transform:  vis ? 'translateY(0)' : 'translateY(100%)',
          transition: `opacity 0.7s ease ${index * 0.06}s,
                       transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s`,
        }}
      >
        {item.text}
      </p>
    </div>
  )
}

export default function AboutIntro() {
  return (
    <section style={{
      backgroundColor: '#FAFAF7',
      padding: '80px 24px',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Subtle vertical green line accent — left edge */}
      <div style={{
        position: 'absolute',
        left: 'clamp(24px, 8vw, 120px)',
        top: '60px', bottom: '60px',
        width: '2px',
        background: 'linear-gradient(180deg, transparent, #8AB87A 20%, #8AB87A 80%, transparent)',
        opacity: 0.25,
      }} />

      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        paddingLeft: 'clamp(0px, 4vw, 40px)',
      }}>
        {LINES.map((item, i) => (
          <AnimatedLine key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
