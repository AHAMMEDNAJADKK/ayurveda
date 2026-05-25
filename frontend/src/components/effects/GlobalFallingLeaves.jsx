import { useEffect, useRef } from 'react';

// ─── Antigravity Leaf Animation ─────────────────────────────────────────────
// Leaves rise upward from the bottom with a gentle sine-wave horizontal drift,
// slow rotation, and randomized parameters for an organic, premium feel.
//
// GPU-accelerated: only uses CSS transform + opacity (no layout thrashing).
// Respects prefers-reduced-motion: animation is fully disabled for a11y.
// ────────────────────────────────────────────────────────────────────────────

// ── Leaf palette ─────────────────────────────────────────────────────────────
const LEAF_COLORS = [
  { fill: '#4a7c3f', opacity: 0.75 }, // deep forest green
  { fill: '#7db954', opacity: 0.70 }, // vibrant sage green
  { fill: '#a8d5a2', opacity: 0.65 }, // soft mint green
  { fill: '#2d6a2d', opacity: 0.80 }, // dark evergreen
  { fill: '#5a9e4e', opacity: 0.72 }, // medium green
];

// ── Five distinct leaf SVG shapes ─────────────────────────────────────────────
// Each returns an SVG path string; all fit within a 40×40 viewBox
const LEAF_PATHS = [
  // 1. Classic teardrop / Tulsi leaf
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <path d="M20 4 C28 8 32 18 28 28 C25 34 20 36 20 36
             C20 36 15 34 12 28 C8 18 12 8 20 4Z" />
    <line x1="20" y1="6" x2="20" y2="34" stroke="rgba(255,255,255,0.28)" stroke-width="1" />
  </svg>`,

  // 2. Slender neem / eucalyptus leaf
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <path d="M20 3 C24 10 25 20 22 32 C21 36 20 37 20 37
             C20 37 19 36 18 32 C15 20 16 10 20 3Z" />
    <line x1="20" y1="5" x2="20" y2="35" stroke="rgba(255,255,255,0.25)" stroke-width="0.9" />
  </svg>`,

  // 3. Round mint / basil leaf
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <path d="M20 6 C30 6 34 14 30 24 C27 31 20 34 20 34
             C20 34 13 31 10 24 C6 14 10 6 20 6Z" />
    <line x1="20" y1="8" x2="20" y2="32" stroke="rgba(255,255,255,0.3)" stroke-width="1.1" />
  </svg>`,

  // 4. Asymmetric heart leaf (Paan / Betel)
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <path d="M20 8 C26 4 34 8 33 17 C32 24 26 30 20 36
             C14 30 8 24 7 17 C6 8 14 4 20 8Z" />
    <line x1="20" y1="10" x2="20" y2="34" stroke="rgba(255,255,255,0.27)" stroke-width="1" />
  </svg>`,

  // 5. Elongated oval / Curry leaf
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <path d="M20 2 C26 6 29 16 27 26 C25 33 22 38 20 38
             C18 38 15 33 13 26 C11 16 14 6 20 2Z" />
    <path d="M20 4 C22 12 22 22 20 36" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="0.8" />
    <path d="M20 10 C23 14 24 20 22 28" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.6" />
    <path d="M20 10 C17 14 16 20 18 28" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.6" />
  </svg>`,
];

// ── Leaf config ranges ────────────────────────────────────────────────────────
const CONFIG = {
  minLeaves:     12,
  maxLeaves:     18,
  minSize:       20,   // px
  maxSize:       55,   // px
  minDuration:   8,    // seconds per rise cycle
  maxDuration:   16,
  minDrift:     -80,   // px horizontal drift
  maxDrift:      80,
  minDelay:      0,    // seconds
  maxDelay:      6,
  spawnInterval: 900,  // ms between new leaf spawns
};

// ── Utilities ─────────────────────────────────────────────────────────────────
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ── Spawn a single leaf DOM element ──────────────────────────────────────────
function spawnLeaf(container) {
  const size     = rand(CONFIG.minSize, CONFIG.maxSize);
  const duration = rand(CONFIG.minDuration, CONFIG.maxDuration);
  const delay    = rand(CONFIG.minDelay, CONFIG.maxDelay);
  const driftMid = rand(CONFIG.minDrift, CONFIG.maxDrift);
  const driftEnd = driftMid * rand(1.2, 2.0) * (Math.random() > 0.5 ? 1 : -1);
  const xStart   = rand(0, window.innerWidth);
  const color    = pick(LEAF_COLORS);
  const pathSVG  = pick(LEAF_PATHS);

  const wrapper = document.createElement('div');
  wrapper.className = 'ag-leaf';

  // Inline styles that override the CSS base
  Object.assign(wrapper.style, {
    width:           `${size}px`,
    height:          `${size}px`,
    left:            `${xStart}px`,
    bottom:          `-${size + 10}px`,
    opacity:         String(color.opacity),
    // CSS custom properties used by antigravity-rise keyframe
    '--drift-mid':   `${driftMid}px`,
    '--drift-end':   `${driftEnd}px`,
    animationDuration:        `${duration}s`,
    animationDelay:           `${delay}s`,
    animationTimingFunction:  'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  });

  // Inject the colored SVG
  const coloredSVG = pathSVG.replace(
    /<path /g,
    `<path fill="${color.fill}" `
  );
  wrapper.innerHTML = coloredSVG;

  container.appendChild(wrapper);

  // Remove leaf from DOM after its animation ends (avoids DOM bloat)
  const totalMs = (duration + delay) * 1000 + 200;
  setTimeout(() => {
    if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
  }, totalMs);

  return wrapper;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function GlobalFallingLeaves() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion — do nothing if user opts out
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Seed initial batch of leaves (spread across the viewport vertically
    // using bottom values so they appear already mid-flight on page load)
    const initialCount = randInt(CONFIG.minLeaves, CONFIG.maxLeaves);
    for (let i = 0; i < initialCount; i++) {
      const leaf = spawnLeaf(container);
      // Scatter initial leaves at different vertical positions by overriding
      // the animation-delay to simulate leaves already in flight
      const initialDelay = -rand(0, rand(CONFIG.minDuration, CONFIG.maxDuration));
      leaf.style.animationDelay = `${initialDelay}s`;
    }

    // Continuously spawn new leaves to replace the ones that have exited
    const intervalId = setInterval(() => {
      // Only spawn if current leaf count is below max
      const currentLeaves = container.querySelectorAll('.ag-leaf').length;
      if (currentLeaves < CONFIG.maxLeaves) {
        spawnLeaf(container);
      }
    }, CONFIG.spawnInterval);

    // Handle resize: update xStart for any future leaves automatically
    // (no recalculation needed — each spawned leaf reads window.innerWidth)

    return () => {
      clearInterval(intervalId);
      // Clean up all remaining leaf nodes
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100vw',
        height:        '100vh',
        pointerEvents: 'none',
        overflow:      'hidden',
        zIndex:        9,      // above backgrounds, below interactive content
      }}
    />
  );
}
