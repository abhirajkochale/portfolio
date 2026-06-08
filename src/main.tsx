import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// @ts-ignore
import '@fontsource-variable/plus-jakarta-sans';
// @ts-ignore
import '@fontsource/dm-mono';

import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
