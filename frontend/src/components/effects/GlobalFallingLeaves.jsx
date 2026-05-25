import { useEffect, useRef } from 'react';

// ─── Antigravity Leaf Animation ─────────────────────────────────────────────
// A premium full-screen ambient background animation of Ayurvedic herb leaves
// floating UPWARD from the bottom of the screen.
//
// Performance Features:
// - GPU-Accelerated: Modifies only transform3d and opacity.
// - Will-change optimization for compositing layers.
// - Recycles a fixed pool of 16 leaf DOM elements (no continuous DOM creation/destruction).
// - Pauses when tab is backgrounded (requestAnimationFrame native behavior).
// - Accessibility: Fully respects prefers-reduced-motion.
// ────────────────────────────────────────────────────────────────────────────

// 5 distinct Ayurvedic herb colors
const LEAF_COLORS = ['#61aa45', '#4d9035', '#7dc45e', '#00919e', '#a8dba2'];

// 5 distinct detailed herb SVGs
const LEAF_SVGS = [
  // 1. Tulsi (Holy Basil) - ovate leaf with slight waves and center vein
  (color) => `<svg viewBox="0 0 100 100" fill="${color}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,15 C68,32 75,52 71,72 C68,85 50,90 50,90 C50,90 32,85 29,72 C25,52 32,32 50,15 Z" />
    <path d="M50,17 L50,90" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" fill="none" />
    <path d="M50,35 C58,40 62,45 65,50" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
    <path d="M50,35 C42,40 38,45 35,50" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
    <path d="M50,55 C58,60 63,65 67,70" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
    <path d="M50,55 C42,60 37,65 33,70" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
  </svg>`,
  
  // 2. Neem - narrow, curved leaf with serrated edges
  (color) => `<svg viewBox="0 0 100 100" fill="${color}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,95 C46,80 38,62 46,38 C49,30 45,18 48,8 C46,25 32,45 35,68 C38,78 44,88 50,95 Z" />
    <path d="M50,95 C45,70 41,45 48,10" stroke="rgba(255,255,255,0.25)" stroke-width="2" fill="none" />
  </svg>`,
  
  // 3. Ashwagandha - broader, egg-shaped (ovate) smooth leaf
  (color) => `<svg viewBox="0 0 100 100" fill="${color}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,10 C72,30 78,58 70,78 C64,88 50,92 50,92 C50,92 36,88 30,78 C22,58 28,30 50,10 Z" />
    <path d="M50,12 L50,92" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" fill="none" />
    <path d="M50,30 Q65,35 68,45" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
    <path d="M50,30 Q35,35 32,45" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
    <path d="M50,52 Q68,58 72,70" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
    <path d="M50,52 Q32,58 28,70" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
  </svg>`,
  
  // 4. Banyan - large heart-shaped leaf with thick vein details
  (color) => `<svg viewBox="0 0 100 100" fill="${color}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,18 C68,8 85,20 80,52 C75,72 50,90 50,90 C50,90 25,72 20,52 C15,20 32,8 50,18 Z" />
    <path d="M50,20 L50,90" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" fill="none" />
    <path d="M50,35 C64,30 72,38 73,48" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
    <path d="M50,35 C36,30 28,38 27,48" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
    <path d="M50,55 C65,55 70,62 72,72" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
    <path d="M50,55 C35,55 30,62 28,72" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none" />
  </svg>`,
  
  // 5. Lotus Petal - elegant pointed teardrop petal silhouette
  (color) => `<svg viewBox="0 0 100 100" fill="${color}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,5 C65,35 75,60 50,95 C25,60 35,35 50,5 Z" />
    <path d="M50,7 L50,93" stroke="rgba(255,255,255,0.22)" stroke-width="2" fill="none" />
  </svg>`
];

const LEAF_COUNT = 18; // pool size between 14-20

export default function GlobalFallingLeaves() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion - do not animate
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Array of leaf states
    const leaves = [];

    // Helper to generate fresh random parameters for a leaf
    const randomizeLeaf = (leaf, isInitial = false) => {
      const duration = Math.random() * 9 + 9; // float duration 9s to 18s
      leaf.size = Math.random() * 34 + 18; // sizes between 18px and 52px
      leaf.opacity = Math.random() * 0.27 + 0.55; // opacity between 0.55 and 0.82
      leaf.duration = duration;
      leaf.speed = 130 / duration; // distance is 130% vh (from 110 to -20)
      
      // Spawn at random X across the screen width (represented in percentage)
      leaf.baseX = Math.random() * 100;
      
      // Side-to-side sine drift: translateX oscillates ±60px to ±90px
      leaf.waveAmplitude = Math.random() * 30 + 60;
      leaf.waveFrequency = Math.random() * 1.5 + 1.5; // cycles over height
      leaf.wavePhase = Math.random() * Math.PI * 2;
      
      // Slow rotation parameters
      leaf.initialRotation = Math.random() * 360;
      
      // If initial page load, spread leaves randomly vertically to simulate mid-flight
      // Else, start from the bottom (110vh) with a staggered spawn delay
      if (isInitial) {
        leaf.y = Math.random() * 130 - 20; // anywhere between -20 and 110
        leaf.delay = 0;
      } else {
        leaf.y = 110;
        leaf.delay = Math.random() * 8; // spawn delay 0s to 8s
      }

      // Pick random color and random shape
      const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      const svgIndex = Math.floor(Math.random() * LEAF_SVGS.length);
      
      // Update DOM styles and SVG content
      const element = leaf.element;
      element.innerHTML = LEAF_SVGS[svgIndex](color);
      element.style.width = `${leaf.size}px`;
      element.style.height = `${leaf.size}px`;
      element.style.opacity = '0'; // Hidden initially if delayed
      element.style.filter = 'drop-shadow(1px 3px 6px rgba(0,0,0,0.12))';
    };

    // Create the pool of leaves
    for (let i = 0; i < LEAF_COUNT; i++) {
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.willChange = 'transform, opacity';
      element.style.pointerEvents = 'none';
      container.appendChild(element);

      const leaf = { element };
      // Spread the first half of the pool vertically so the animation is immediately active
      randomizeLeaf(leaf, i < LEAF_COUNT / 2);
      leaves.push(leaf);
    }

    let lastTime = performance.now();
    let animId;

    // Main animation loop
    const update = (time) => {
      const deltaTime = (time - lastTime) / 1000; // in seconds
      lastTime = time;

      for (let i = 0; i < LEAF_COUNT; i++) {
        const leaf = leaves[i];
        
        // Handle staggered spawn delay
        if (leaf.delay > 0) {
          leaf.delay -= deltaTime;
          leaf.element.style.opacity = '0';
          continue;
        }

        // Float Y position upward
        leaf.y -= leaf.speed * deltaTime;

        // Calculate horizontal sine drift
        const progress = (110 - leaf.y) / 130; // 0 at bottom, 1 at top
        const waveAngle = progress * leaf.waveFrequency * Math.PI * 2 + leaf.wavePhase;
        const driftX = Math.sin(waveAngle) * leaf.waveAmplitude;

        // Calculate continuous rotation
        const rot = progress * 360 + leaf.initialRotation;

        // Fade in gently near the bottom, and fade out near the top
        let opacity = leaf.opacity;
        if (leaf.y > 100) {
          // Fade in as it rises from 110 to 100
          opacity = leaf.opacity * (110 - leaf.y) / 10;
        } else if (leaf.y < 0) {
          // Fade out as it exits from 0 to -20
          opacity = leaf.opacity * (leaf.y - (-20)) / 20;
        }
        
        // Ensure bounds
        opacity = Math.max(0, Math.min(leaf.opacity, opacity));

        // Apply transformations using GPU translate3d + rotate
        leaf.element.style.transform = `translate3d(calc(${leaf.baseX}vw + ${driftX}px), ${leaf.y}vh, 0) rotate(${rot}deg)`;
        leaf.element.style.opacity = String(opacity);

        // Recycle leaf if it exits the top (-20vh)
        if (leaf.y <= -20) {
          randomizeLeaf(leaf, false);
        }
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="ag-leaf-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0, // Sits BEHIND all content
      }}
    />
  );
}
