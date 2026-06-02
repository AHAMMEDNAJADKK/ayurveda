import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// ── Scroll reveal hook ────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el  = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ── Reveal wrapper ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
  const [ref, visible] = useReveal()
  const transforms = {
    up:    visible ? 'translateY(0)'   : 'translateY(40px)',
    left:  visible ? 'translateX(0)'   : 'translateX(-40px)',
    right: visible ? 'translateX(0)'   : 'translateX(40px)',
    scale: visible ? 'scale(1)'        : 'scale(0.94)',
  }
  return (
    <div ref={ref} style={{
      opacity:    visible ? 1 : 0,
      transform:  transforms[direction],
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── Branch card data ───────────────────────────────────────────
const BRANCHES = [
  {
    id:       1,
    badge:    'Main Branch',
    name:     'Health Care Ayurveda — Kochi',
    address:  'Ground Floor, XYZ Building, MG Road, Ernakulam, Kochi — 682 016',
    phone:    '+91 95396 91757',
    email:    'kochi@healthcareayurveda.com',
    hours:    'Mon – Sun: 9:00 AM – 6:00 PM',
    image:    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=700&q=80',
    mapUrl:   'https://maps.app.goo.gl/p3n2pCFwT8mFHEK3A?g_st=aw',
    highlight: 'Our flagship centre — fully equipped with all Panchakarma facilities, consultation rooms, and herbal pharmacy.',
    features: ['Panchakarma Suite', 'Herbal Pharmacy', 'Consultation Rooms', 'Relaxation Lounge'],
    color:    '#61aa45',
  },
  {
    id:       2,
    badge:    'Branch',
    name:     'Health Care Ayurveda — Infopark',
    address:  '2nd Floor, ABC Tower, Infopark Campus, Kakkanad, Kochi — 682 030',
    phone:    '+91 95396 91757',
    email:    'infopark@healthcareayurveda.com',
    hours:    'Mon – Sun: 9:00 AM – 6:00 PM',
    image:    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=80',
    mapUrl:   '',
    highlight: 'Serving the Infopark tech community with convenient weekday appointments and express wellness programs.',
    features: ['Express Consultations', 'Stress Relief Programs', 'Herbal Products', 'Online Booking'],
    color:    '#61aa45',
  },
]

// ── Philosophy pillars ────────────────────────────────────────────────────
const PHILOSOPHY = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Authentic Ayurveda',
    desc:  'Every treatment follows classical Ayurvedic texts. We use only genuine herbal formulations sourced from certified suppliers.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'For Every Individual',
    desc:  'We welcome all — men, women, children and seniors. Every treatment plan is personalised to your unique body constitution.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Holistic Healing',
    desc:  'We address root causes, not just symptoms. Body, mind and spirit are treated as one — for lasting, sustainable wellness.',
  },
]

// ── Team ──────────────────────────────────────────────────────────────────
const TEAM = [
  { name: 'Dr. Arundhati Nair', role: 'Chief Ayurvedic Physician', exp: '12+ yrs', initials: 'AN' },
  { name: 'Dr. Vasundhara Sen', role: 'Panchakarma Specialist', exp: '8+ yrs', initials: 'VS' },
  { name: 'Dr. Devika Raj', role: 'Wellness & Lifestyle Advisor', exp: '6+ yrs', initials: 'DR' },
]

export default function OurStory() {
  return (
    <>
      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1a3d10 0%, #61aa45 60%, #1a3d10 100%)',
        padding: 'clamp(80px, 12vw, 140px) 24px 80px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Decorative radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(0,145,158,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        {/* Ghost large text watermark */}
        <div style={{
          position: 'absolute', bottom: -20, left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(4rem, 12vw, 9rem)',
          fontWeight: 300, color: 'rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        }}>
          Our Story
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.68rem',
            letterSpacing: '0.4em', color: 'rgba(125,196,94,0.85)',
            textTransform: 'uppercase', marginBottom: '16px',
          }}
        >
          Who We Are
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 300, color: '#FAFAF7',
            lineHeight: 1.15, marginBottom: '16px',
          }}
        >
          Rooted in Nature,<br />
          <em style={{ fontStyle: 'italic', color: '#e0f5f6' }}>Thriving in Health</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{
            fontFamily: '"Lora", serif', fontStyle: 'italic',
            fontSize: '1.1rem', color: 'rgba(250,250,247,0.55)',
          }}
        >
          Ancient wisdom. Modern wellness. Two locations in Kerala.
        </motion.p>
      </section>

      {/* ── Our Story text + image ───────────────────────────────────── */}
      <section style={{ backgroundColor: '#edf7e8', padding: '80px 24px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px, 6vw, 80px)', alignItems: 'center',
        }}
          className="story-grid"
        >
          <Reveal direction="left">
            <p style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: '0.68rem',
              letterSpacing: '0.4em', color: '#61aa45',
              textTransform: 'uppercase', marginBottom: '12px',
            }}>
              Our Beginning
            </p>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 300, color: '#1a3d10',
              lineHeight: 1.2, marginBottom: '24px',
            }}>
              The{' '}
              <em style={{ fontStyle: 'italic', color: '#61aa45' }}>
                Health Care Ayurveda
              </em>{' '}
              Difference
            </h2>
            {[
              'Founded with a deep belief in Ayurveda\'s transformative power, Health Care Ayurveda was established as a clinical sanctuary dedicated to holistic wellness for everyone in Kerala.',
              'Over the years, we have served thousands of patients — men, women, children, and seniors — from young professionals managing stress, to families seeking preventive care, to individuals recovering from chronic conditions.',
              'Our approach blends the timeless wisdom of classical Ayurvedic texts with a modern understanding of human physiology, creating deeply personalised healing experiences for every individual.',
            ].map((para, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 'clamp(0.92rem, 1.4vw, 1rem)',
                  color: '#1a3d10', lineHeight: 1.85,
                  marginBottom: '16px',
                }}>
                  {para}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <Link to="/appointment" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', marginTop: '8px',
                background: '#61aa45', color: '#fff',
                fontFamily: '"DM Sans", sans-serif', fontWeight: 500,
                fontSize: '0.88rem', borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(97,170,69,0.25)',
              }}>
                Book a Consultation
              </Link>
            </Reveal>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=700&q=80"
                alt="Health Care Ayurveda clinic interior"
                loading="lazy"
                style={{
                  width: '100%', height: 'clamp(300px, 40vw, 460px)',
                  objectFit: 'cover', borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(26,61,16,0.18)',
                }}
              />
              {/* Floating stat badge */}
              <div style={{
                position: 'absolute', bottom: '-20px', left: '-20px',
                background: '#61aa45', borderRadius: '16px',
                padding: '16px 24px',
                boxShadow: '0 8px 28px rgba(97,170,69,0.3)',
              }}>
                <p style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '2rem', fontWeight: 400,
                  color: '#e0f5f6', lineHeight: 1,
                }}>
                  500+
                </p>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.72rem', color: 'rgba(250,250,247,0.7)',
                  marginTop: '4px',
                }}>
                  Patients healed
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Mobile grid fix */}
        <style>{`
          @media (max-width: 768px) {
            .story-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── TWO BRANCHES SECTION ─────────────────────────────────────── */}
      <section style={{
        backgroundColor: '#e0f5f6',
        padding: '80px 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Section bg watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(5rem, 15vw, 12rem)',
          fontWeight: 300, color: 'rgba(97,170,69,0.035)',
          whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        }}>
          Our Branches
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '0.68rem',
                letterSpacing: '0.4em', color: '#61aa45',
                textTransform: 'uppercase', marginBottom: '12px',
              }}>
                Our Locations
              </p>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 300, color: '#1a3d10', lineHeight: 1.2,
              }}>
                Two Branches,{' '}
                <em style={{ fontStyle: 'italic', color: '#61aa45' }}>One Purpose</em>
              </h2>
              <div style={{
                width: '48px', height: '2px',
                background: '#00919e',
                margin: '20px auto 0',
              }} />
            </div>
          </Reveal>

          {/* Branch cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
            gap: '32px',
          }}>
            {BRANCHES.map((branch, i) => (
              <Reveal key={branch.id} direction={i === 0 ? 'left' : 'right'} delay={i * 0.15} style={{ height: '100%' }}>
                <div style={{
                  background: '#edf7e8',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 40px rgba(26,61,16,0.10)',
                  border: '1px solid rgba(97,170,69,0.07)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(26,61,16,0.18)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(26,61,16,0.10)'
                  }}
                >
                  {/* Branch image */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={branch.image}
                      alt={branch.name}
                      loading="lazy"
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.7s ease',
                      }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(180deg, transparent 40%, ${branch.color}cc 100%)`,
                    }} />
                    {/* Badge */}
                    <span style={{
                      position: 'absolute', top: '16px', left: '16px',
                      background: '#00919e', color: '#ffffff',
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.72rem', fontWeight: 600,
                      padding: '5px 14px', borderRadius: '50px',
                      letterSpacing: '0.05em',
                    }}>
                      {branch.badge}
                    </span>
                    {/* Branch name over image bottom */}
                    <h3 style={{
                      position: 'absolute', bottom: '16px', left: '20px', right: '20px',
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.5rem', fontWeight: 400,
                      color: '#ffffff', lineHeight: 1.2,
                    }}>
                      {branch.name}
                    </h3>
                  </div>

                  {/* Branch details */}
                  <div style={{
                    padding: '24px 28px 28px',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <p style={{
                        fontFamily: '"Lora", serif', fontStyle: 'italic',
                        fontSize: '0.9rem', color: '#1a3d10',
                        lineHeight: 1.7, marginBottom: '20px',
                        borderLeft: `3px solid ${branch.color}`,
                        paddingLeft: '14px',
                      }}>
                        {branch.highlight}
                      </p>

                      {/* Info rows */}
                      {[
                        { icon: '📍', label: 'Address', value: branch.address },
                        { icon: '📞', label: 'Phone',   value: branch.phone },
                        { icon: '✉️', label: 'Email',   value: branch.email },
                        { icon: '🕐', label: 'Hours',   value: branch.hours },
                      ].map(row => (
                        <div key={row.label} style={{
                          display: 'flex', gap: '12px', marginBottom: '12px',
                          alignItems: 'flex-start',
                        }}>
                          <span style={{ fontSize: '0.9rem', marginTop: '2px', flexShrink: 0 }}>
                            {row.icon}
                          </span>
                          <div>
                            <p style={{
                              fontFamily: '"DM Sans", sans-serif',
                              fontSize: '0.68rem', fontWeight: 600,
                              color: '#61aa45', textTransform: 'uppercase',
                              letterSpacing: '0.08em', marginBottom: '2px',
                            }}>
                              {row.label}
                            </p>
                            <p style={{
                              fontFamily: '"DM Sans", sans-serif',
                              fontSize: '0.88rem', color: '#1a3d10',
                              lineHeight: 1.55, whiteSpace: 'pre-line',
                            }}>
                              {row.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      {/* Feature tags */}
                      <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: '8px',
                        marginTop: '16px', paddingTop: '16px',
                        borderTop: '1px solid rgba(97,170,69,0.08)',
                      }}>
                        {branch.features.map(f => (
                          <span key={f} style={{
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '0.72rem', fontWeight: 500,
                            padding: '5px 12px',
                            background: 'rgba(97,170,69,0.07)',
                            color: '#61aa45',
                            borderRadius: '50px',
                            border: '1px solid rgba(97,170,69,0.12)',
                          }}>
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* Direction CTA */}
                      {branch.mapUrl && (
                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            marginTop: '20px',
                            padding: '10px 22px',
                            background: branch.color, color: '#fff',
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '0.82rem', fontWeight: 500,
                            borderRadius: '50px', textDecoration: 'none',
                            transition: 'opacity 0.3s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                          Get Directions →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#edf7e8', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '0.68rem',
                letterSpacing: '0.4em', color: '#61aa45',
                textTransform: 'uppercase', marginBottom: '12px',
              }}>Our Philosophy</p>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 300, color: '#1a3d10',
              }}>
                Three Pillars of{' '}
                <em style={{ fontStyle: 'italic', color: '#61aa45' }}>Healing</em>
              </h2>
            </div>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {PHILOSOPHY.map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.14}>
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  textAlign: 'center',
                  boxShadow: '0 4px 24px rgba(26,61,16,0.07)',
                  border: '1px solid rgba(97,170,69,0.07)',
                  transition: 'box-shadow 0.4s, transform 0.4s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(26,61,16,0.14)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,61,16,0.07)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    width: '56px', height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(97,170,69,0.08)',
                    color: '#61aa45',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}>
                    {icon}
                  </div>
                  <h3 style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.4rem', fontWeight: 400,
                    color: '#1a3d10', marginBottom: '12px',
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.88rem', color: '#1a3d10',
                    lineHeight: 1.6,
                  }}>
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#edf7e8', padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '0.68rem',
                letterSpacing: '0.4em', color: '#61aa45',
                textTransform: 'uppercase', marginBottom: '12px',
              }}>Our Experts</p>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 300, color: '#1a3d10',
              }}>
                Meet Our{' '}
                <em style={{ fontStyle: 'italic', color: '#61aa45' }}>Physicians</em>
              </h2>
            </div>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            justifyContent: 'center',
          }}>
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.12}>
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '40px 24px',
                  textAlign: 'center',
                  boxShadow: '0 4px 24px rgba(26,61,16,0.07)',
                  border: '1px solid rgba(97,170,69,0.07)',
                }}>
                  <div style={{
                    width: '80px', height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #61aa45, #00919e)',
                    color: '#FFF',
                    fontSize: '1.5rem', fontWeight: 300,
                    fontFamily: '"Cormorant Garamond", serif',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 8px 20px rgba(97,170,69,0.2)',
                  }}>
                    {member.initials}
                  </div>
                  <h3 style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.4rem', fontWeight: 400,
                    color: '#1a3d10', marginBottom: '6px',
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.8rem', fontWeight: 600,
                    color: '#00919e', textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: '12px',
                  }}>
                    {member.role}
                  </p>
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.75rem', color: '#1a3d10',
                    background: 'rgba(97,170,69,0.06)',
                    padding: '4px 12px', borderRadius: '20px',
                  }}>
                    Experience: {member.exp}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
