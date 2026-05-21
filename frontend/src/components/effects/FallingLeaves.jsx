import { useEffect, useRef } from 'react'

// ── Leaf configuration ────────────────────────────────────────────────────────
// Each leaf has independent: start position, fall speed, size, opacity, drift
// Renders on a fixed full-screen canvas behind all content (z-index: 0)
// Uses requestAnimationFrame — zero CSS animation overhead, smooth 60fps

const LEAF_COUNT  = 18   // total simultaneous leaves
const LEAF_COLOR  = '#4A7C3F'  // primary-light green — matches brand
const LEAF_COLOR2 = '#8AB87A'  // accent sage — second variant

// Leaf SVG path drawn on canvas — botanical teardrop shape
function drawLeaf(ctx, x, y, size, rotation, color, opacity) {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.scale(size / 24, size / 24)  // normalize to 24x24 base

  ctx.beginPath()
  // Teardrop leaf shape
  ctx.moveTo(0, -12)
  ctx.bezierCurveTo(8, -8,  10, 0,  6,  8)
  ctx.bezierCurveTo(3, 12,  0, 12,  0, 12)
  ctx.bezierCurveTo(0, 12, -3, 12, -6,  8)
  ctx.bezierCurveTo(-10, 0, -8, -8,  0, -12)
  ctx.closePath()

  ctx.fillStyle = color
  ctx.fill()

  // Midrib line
  ctx.beginPath()
  ctx.moveTo(0, -10)
  ctx.lineTo(0, 10)
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 0.8
  ctx.stroke()

  ctx.restore()
}

// Generate initial leaf state
function createLeaf(canvasWidth, canvasHeight, randomY = false) {
  return {
    x:          Math.random() * canvasWidth,
    y:          randomY ? Math.random() * canvasHeight : -40,
    size:       14 + Math.random() * 18,           // 14px – 32px
    speedY:     0.6 + Math.random() * 1.2,         // fall speed px/frame
    speedX:     (Math.random() - 0.5) * 0.6,       // horizontal drift
    rotation:   Math.random() * Math.PI * 2,        // initial angle
    rotSpeed:   (Math.random() - 0.5) * 0.03,      // spin speed rad/frame
    opacity:    0.15 + Math.random() * 0.45,        // 0.15 – 0.60
    color:      Math.random() > 0.5 ? LEAF_COLOR : LEAF_COLOR2,
    swayAngle:  Math.random() * Math.PI * 2,        // sway phase offset
    swaySpeed:  0.008 + Math.random() * 0.012,      // sway frequency
    swayAmp:    18 + Math.random() * 28,            // sway amplitude px
  }
}

export default function FallingLeaves() {
  const canvasRef = useRef(null)
  const stateRef  = useRef({ leaves: [], animId: null, width: 0, height: 0 })

  useEffect(() => {
    const canvas  = canvasRef.current
    if (!canvas) return
    const ctx     = canvas.getContext('2d')
    const state   = stateRef.current

    // Size canvas to viewport
    function resize() {
      state.width  = window.innerWidth
      state.height = window.innerHeight
      canvas.width  = state.width
      canvas.height = state.height
    }
    resize()

    // Seed leaves spread across screen on init (not all at top)
    state.leaves = Array.from({ length: LEAF_COUNT }, () =>
      createLeaf(state.width, state.height, true)
    )

    // Animation loop
    function tick() {
      ctx.clearRect(0, 0, state.width, state.height)

      state.leaves.forEach((leaf, i) => {
        // Sinusoidal horizontal sway
        leaf.swayAngle += leaf.swaySpeed
        const swayX = Math.sin(leaf.swayAngle) * leaf.swayAmp * 0.016

        leaf.x        += leaf.speedX + swayX
        leaf.y        += leaf.speedY
        leaf.rotation += leaf.rotSpeed

        // Wrap left/right edges
        if (leaf.x < -40)              leaf.x = state.width  + 40
        if (leaf.x > state.width + 40) leaf.x = -40

        // Recycle leaf when it falls off bottom
        if (leaf.y > state.height + 40) {
          state.leaves[i] = createLeaf(state.width, state.height, false)
        }

        drawLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.rotation, leaf.color, leaf.opacity)
      })

      state.animId = requestAnimationFrame(tick)
    }

    tick()

    // Resize handler — recalculate on window resize
    const onResize = () => {
      resize()
      // Keep existing leaves, just update bounds
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(state.animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',   // absolute positioning inside parent container
        top:           0,
        left:          0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',       // never blocks clicks
        zIndex:        2,            // above background and images, below arch card
        opacity:       1,
      }}
      aria-hidden="true"
    />
  )
}
