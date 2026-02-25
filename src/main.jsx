import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Load legacy init scripts after React mounts so they can bind to
// DOM elements created by React (fixes handlers only working on initial page)
function loadScript(src) {
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

// always load common and theme customizer; load dashboard init only on dashboard route
loadScript('/assets/js/common-init.min.js').then(() => {
  if (window.location.pathname === '/') {
    loadScript('/assets/js/dashboard-init.min.js');
  }
});
loadScript('/assets/js/theme-customizer-init.min.js');
