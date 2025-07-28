import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Apply global styles
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
});

// Detect system dark mode preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
  document.body.classList.add('dark-mode');
}

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals();

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful:', registration);
      },
      (err) => {
        console.log('ServiceWorker registration failed:', err);
      }
    );
  });
}

// Handle app install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // You can show an install button here
});

// Log app version
console.log('%cWishful Mind v1.0.0', 'color: #2a2a2a; font-size: 14px; font-weight: bold;');
console.log('%cA mindful space for your wishes and dreams', 'color: #666666; font-size: 12px;');