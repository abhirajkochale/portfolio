import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import App from './App.tsx';
import './index.css';

// @ts-ignore
import '@fontsource-variable/plus-jakarta-sans';
// @ts-ignore
import '@fontsource/dm-mono';

const lenis = new Lenis({ 
  duration: 1.4, 
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
