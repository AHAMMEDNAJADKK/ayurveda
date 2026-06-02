import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global graceful image error fallback
window.addEventListener('error', (event) => {
  const target = event.target;
  if (target && target.nodeName === 'IMG') {
    if (!target.getAttribute('data-fallback-applied')) {
      target.setAttribute('data-fallback-applied', 'true');
      if (!target.alt || target.alt.trim() === '') {
        target.alt = 'Health Care Ayurveda wellness image';
      }
      // Branded inline SVG fallback that never fails to load (light green theme, leaf icon, brand text)
      target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100" style="background-color:%23edf7e8;"><rect width="100" height="100" fill="%23edf7e8"/><path d="M50 25 C40 35, 40 50, 50 65 C60 50, 60 35, 50 25" fill="%2361aa45" opacity="0.3"/><text x="50" y="80" font-family="sans-serif" font-size="6" fill="%2361aa45" text-anchor="middle" font-weight="bold">Health Care Ayurveda</text></svg>`;
    }
  }
}, true);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
