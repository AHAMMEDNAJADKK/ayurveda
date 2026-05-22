import { useEffect, useRef } from 'react';

// Color palette for the leaves matching HCA's brand guidelines
const LEAF_COLORS = [
  '#4A7C3F', // Forest green
  '#8AB87A', // Sage/accent green
  '#608A56', // Mid-green
  '#C8A96E', // Muted gold leaf
];

// Leaf shapes rendered via Canvas path instructions
const LEAF_SHAPES = [
  // Teardrop shape (Tulsi style)
  (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.bezierCurveTo(8, -8, 10, 0, 6, 8);
    ctx.bezierCurveTo(3, 12, 0, 12, 0, 12);
    ctx.bezierCurveTo(0, 12, -3, 12, -6, 8);
    ctx.bezierCurveTo(-10, 0, -8, -8, 0, -12);
    ctx.closePath();
  },
  // Long slender shape (Neem style)
  (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.bezierCurveTo(4, -10, 5, 2, 2, 14);
    ctx.bezierCurveTo(1, 16, 0, 16, 0, 16);
    ctx.bezierCurveTo(0, 16, -1, 16, -2, 14);
    ctx.bezierCurveTo(-5, 2, -4, -10, 0, -16);
    ctx.closePath();
  },
  // Rounder shape (Mint/Sage style)
  (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.bezierCurveTo(9, -6, 9, 4, 4, 8);
    ctx.bezierCurveTo(2, 10, 0, 10, 0, 10);
    ctx.bezierCurveTo(0, 10, -2, 10, -4, 8);
    ctx.bezierCurveTo(-9, 4, -9, -6, 0, -10);
    ctx.closePath();
  }
];

function drawLeafInstance(ctx, leaf) {
  ctx.save();
  
  // Apply blur filter depending on leaf depth for premium photographic parallax focus
  if (leaf.depth === 0) {
    ctx.filter = 'blur(2.5px)';
  } else if (leaf.depth === 1) {
    ctx.filter = 'blur(0.5px)';
  } else {
    ctx.filter = 'none';
  }

  ctx.globalAlpha = leaf.opacity;
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate(leaf.rotation);
  ctx.scale(leaf.size / 24, leaf.size / 24);

  // Call the shape drawing function
  LEAF_SHAPES[leaf.shapeIdx](ctx);
  
  // Fill color
  ctx.fillStyle = leaf.color;
  ctx.fill();

  // Draw delicate leaf vein
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(0, 10);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

function createLeaf(width, height, randomY = false, depthValue = null) {
  // Distribute leaves across three layers of depth
  // 0: background (small, blurry, slow), 1: midground, 2: foreground (large, sharp, fast)
  const depth = depthValue !== null ? depthValue : Math.floor(Math.random() * 3);
  
  let size, speedY, opacity, parallaxFactor;
  if (depth === 0) {
    size = 8 + Math.random() * 6;           // 8px - 14px
    speedY = 0.35 + Math.random() * 0.3;     // Slow fall
    opacity = 0.08 + Math.random() * 0.1;    // Very faint
    parallaxFactor = 0.12;                  // Minimal scroll reaction
  } else if (depth === 1) {
    size = 14 + Math.random() * 8;          // 14px - 22px
    speedY = 0.65 + Math.random() * 0.55;    // Medium speed
    opacity = 0.16 + Math.random() * 0.14;   // Soft visibility
    parallaxFactor = 0.35;                  // Moderate scroll reaction
  } else {
    size = 22 + Math.random() * 10;         // 22px - 32px
    speedY = 1.2 + Math.random() * 0.7;     // Fast fall
    opacity = 0.25 + Math.random() * 0.15;   // Higher contrast
    parallaxFactor = 0.7;                   // High scroll reaction
  }

  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -40,
    size,
    depth,
    speedY,
    speedX: (Math.random() - 0.5) * 0.4,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.02,
    opacity,
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    shapeIdx: Math.floor(Math.random() * LEAF_SHAPES.length),
    swayAngle: Math.random() * Math.PI * 2,
    swaySpeed: 0.005 + Math.random() * 0.01,
    swayAmp: 15 + Math.random() * 20,
    parallaxFactor
  };
}

export default function GlobalFallingLeaves() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    leaves: [],
    width: 0,
    height: 0,
    animId: null,
    scrollYTarget: 0,
    scrollYCurrent: 0,
    lastScrollY: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    // Responsive Canvas Resizing
    function resize() {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      canvas.width = state.width;
      canvas.height = state.height;
    }
    resize();

    // Initial state tracking of scroll
    state.scrollYTarget = window.scrollY;
    state.scrollYCurrent = window.scrollY;
    state.lastScrollY = window.scrollY;

    // Seed initial leaves evenly spread across the screen
    // Total count scaled by screen size for visual balance
    const leafCount = Math.min(32, Math.floor((state.width * state.height) / 45000));
    state.leaves = Array.from({ length: leafCount }, () =>
      createLeaf(state.width, state.height, true)
    );

    // Animation Loop
    function tick() {
      ctx.clearRect(0, 0, state.width, state.height);

      // Smoothly interpolate scroll changes (lerp) to create elastic drift
      state.scrollYCurrent += (state.scrollYTarget - state.scrollYCurrent) * 0.08;
      const deltaScroll = state.scrollYCurrent - state.lastScrollY;
      state.lastScrollY = state.scrollYCurrent;

      state.leaves.forEach((leaf, i) => {
        // Continuous wind sway
        leaf.swayAngle += leaf.swaySpeed;
        const swayX = Math.sin(leaf.swayAngle) * leaf.swayAmp * 0.016;

        // Apply motion vectors and parallax offset
        leaf.x += leaf.speedX + swayX;
        leaf.y += leaf.speedY - (deltaScroll * leaf.parallaxFactor);
        leaf.rotation += leaf.rotSpeed;

        // Boundary looping (wrap-around horizontal)
        if (leaf.x < -40) {
          leaf.x = state.width + 40;
        } else if (leaf.x > state.width + 40) {
          leaf.x = -40;
        }

        // Recycle leaf if it floats out of vertical bounds
        // Floating above top or below bottom
        if (leaf.y > state.height + 40) {
          state.leaves[i] = createLeaf(state.width, state.height, false);
        } else if (leaf.y < -40) {
          // If scrolled down rapidly, place the leaf at the bottom to float back up/down
          state.leaves[i] = createLeaf(state.width, state.height, false);
          state.leaves[i].y = state.height + 30;
        }

        drawLeafInstance(ctx, leaf);
      });

      state.animId = requestAnimationFrame(tick);
    }

    tick();

    // Scroll and Resize Event Handlers
    const handleScroll = () => {
      state.scrollYTarget = window.scrollY;
    };

    const handleResize = () => {
      resize();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(state.animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10, // Renders on top of backgrounds but behind interactive text overlay
      }}
      aria-hidden="true"
    />
  );
}
