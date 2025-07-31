import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// S25 Ultra specific optimizations
const isS25Ultra = () => {
  const { width, height } = window.screen;
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check for Samsung Galaxy S25 Ultra characteristics
  return (
    (width >= 1440 && height >= 3120) || // S25 Ultra resolution
    userAgent.includes('sm-s928') || // S25 Ultra model code
    (window.devicePixelRatio >= 3 && width >= 900) // High DPI large screen
  );
};

// Apply global styles optimized for S25 Ultra
const setupS25Ultra = () => {
  // Set CSS custom properties for viewport height
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // S25 Ultra specific viewport adjustments
    if (isS25Ultra()) {
      document.documentElement.style.setProperty('--s25-vh', `${vh}px`);
      document.documentElement.classList.add('s25-ultra');
    }
  };
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', () => {
    setTimeout(setVH, 100);
  });
};

setupS25Ultra();

// Detect system preferences
const setupSystemPreferences = () => {
  // Dark mode detection
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDarkMode) {
    document.body.classList.add('dark-mode');
  }
  
  // High refresh rate detection
  if (window.screen && window.screen.refreshRate && window.screen.refreshRate >= 120) {
    document.documentElement.classList.add('high-refresh-rate');
  }
  
  // Reduced motion detection
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  // Battery API for performance optimization
  if ('getBattery' in navigator) {
    navigator.getBattery().then((battery) => {
      if (battery.level < 0.2) {
        document.documentElement.classList.add('low-battery-mode');
      }
      
      battery.addEventListener('levelchange', () => {
        if (battery.level < 0.2) {
          document.documentElement.classList.add('low-battery-mode');
        } else {
          document.documentElement.classList.remove('low-battery-mode');
        }
      });
    });
  }
};

setupSystemPreferences();

// S25 Ultra specific performance optimizations
const setupPerformanceOptimizations = () => {
  // Passive event listeners for better scrolling performance
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
        return true;
      }
    });
    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
  } catch (e) {}
  
  // Enhanced touch handling for S25 Ultra
  let lastTouchY = 0;
  let touchStartTime = 0;
  let maybePreventPullToRefresh = false;
  
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    touchStartTime = Date.now();
    lastTouchY = e.touches[0].clientY;
    maybePreventPullToRefresh = window.scrollY === 0;
  };
  
  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    const touchYDelta = touchY - lastTouchY;
    const touchDuration = Date.now() - touchStartTime;
    lastTouchY = touchY;
    
    // Enhanced pull-to-refresh prevention for S25 Ultra
    if (maybePreventPullToRefresh && touchDuration < 500) {
      maybePreventPullToRefresh = false;
      if (touchYDelta > 0) {
        e.preventDefault();
      }
    }
  };
  
  // Add touch event listeners with passive option when supported
  const eventOptions = supportsPassive ? { passive: false } : false;
  document.addEventListener('touchstart', handleTouchStart, eventOptions);
  document.addEventListener('touchmove', handleTouchMove, eventOptions);
  
  // Memory management for S25 Ultra
  if ('memory' in performance) {
    const memoryInfo = performance.memory;
    if (memoryInfo.totalJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.9) {
      console.warn('High memory usage detected, enabling memory optimization mode');
      document.documentElement.classList.add('memory-optimization-mode');
    }
  }
  
  // Frame rate optimization
  let isHighPerformanceMode = true;
  let frameCount = 0;
  let lastTime = performance.now();
  
  const checkFrameRate = (currentTime) => {
    frameCount++;
    if (currentTime - lastTime >= 1000) {
      const fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
      
      // If FPS drops below 30, enable performance mode
      if (fps < 30 && isHighPerformanceMode) {
        isHighPerformanceMode = false;
        document.documentElement.classList.add('performance-mode');
      } else if (fps >= 60 && !isHighPerformanceMode) {
        isHighPerformanceMode = true;
        document.documentElement.classList.remove('performance-mode');
      }
    }
    requestAnimationFrame(checkFrameRate);
  };
  
  requestAnimationFrame(checkFrameRate);
};

setupPerformanceOptimizations();

// Create root element with error boundary
const root = ReactDOM.createRoot(document.getElementById('root'));

// Error boundary component for S25 Ultra
class S25UltraErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('S25 Ultra Error Boundary caught an error:', error, errorInfo);
    
    // Send error to analytics if available
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '24px',
          textAlign: 'center',
          fontFamily: 'Nexus Sherif, Playfair Display, serif'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2D2D2F' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ fontSize: '16px', color: '#7A7D85', marginBottom: '24px' }}>
            We're sorry for the inconvenience. Please refresh the page to try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '16px 24px',
              fontSize: '16px',
              backgroundColor: '#5B5BD6',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              minHeight: '48px'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Render app with enhanced error handling
root.render(
  <React.StrictMode>
    <S25UltraErrorBoundary>
      <App />
    </S25UltraErrorBoundary>
  </React.StrictMode>
);

// Enhanced performance monitoring for S25 Ultra
const setupEnhancedWebVitals = () => {
  reportWebVitals((metric) => {
    // Enhanced logging for S25 Ultra specific metrics
    if (isS25Ultra()) {
      console.log(`S25 Ultra Performance - ${metric.name}:`, metric.value);
    }
    
    // Send to analytics if available
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
  });
};

setupEnhancedWebVitals();

// Service Worker registration with S25 Ultra optimizations
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    }).then(
      (registration) => {
        console.log('ServiceWorker registration successful:', registration);
        
        // Update available notification for S25 Ultra
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Show update notification optimized for S25 Ultra
              if (window.confirm('A new version is available. Would you like to update?')) {
                window.location.reload();
              }
            }
          });
        });
      },
      (err) => {
        console.log('ServiceWorker registration failed:', err);
      }
    );
  });
}

// Enhanced app install prompt for S25 Ultra
let deferredPrompt;
let installPromptShown = false;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install prompt after user engagement (optimized for S25 Ultra)
  if (!installPromptShown && isS25Ultra()) {
    setTimeout(() => {
      showInstallPrompt();
    }, 5000); // Show after 5 seconds on S25 Ultra
  }
});

const showInstallPrompt = () => {
  if (deferredPrompt && !installPromptShown) {
    installPromptShown = true;
    
    // Create custom install prompt optimized for S25 Ultra
    const installBanner = document.createElement('div');
    installBanner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      padding: 20px 24px;
      border-radius: 16px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'Nexus Sherif', 'Playfair Display', serif;
    `;
    
    installBanner.innerHTML = `
      <div>
        <h3 style="margin: 0 0 4px 0; font-size: 16px; color: #2D2D2F;">Install Wishli</h3>
        <p style="margin: 0; font-size: 14px; color: #7A7D85;">Get the best experience on your S25 Ultra</p>
      </div>
      <div>
        <button id="install-dismiss" style="
          background: transparent; 
          border: 1px solid #B5B7C0; 
          color: #7A7D85; 
          padding: 8px 16px; 
          border-radius: 8px; 
          margin-right: 8px;
          min-height: 40px;
          cursor: pointer;
        ">Not now</button>
        <button id="install-accept" style="
          background: #5B5BD6; 
          border: none; 
          color: white; 
          padding: 8px 16px; 
          border-radius: 8px;
          min-height: 40px;
          cursor: pointer;
        ">Install</button>
      </div>
    `;
    
    document.body.appendChild(installBanner);
    
    // Handle install actions
    document.getElementById('install-accept').addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
        document.body.removeChild(installBanner);
      });
    });
    
    document.getElementById('install-dismiss').addEventListener('click', () => {
      document.body.removeChild(installBanner);
    });
    
    // Auto dismiss after 10 seconds
    setTimeout(() => {
      if (document.body.contains(installBanner)) {
        document.body.removeChild(installBanner);
      }
    }, 10000);
  }
};

// Network status monitoring for S25 Ultra
if ('connection' in navigator) {
  const connection = navigator.connection;
  
  const updateNetworkStatus = () => {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      document.documentElement.classList.add('slow-network');
    } else {
      document.documentElement.classList.remove('slow-network');
    }
  };
  
  updateNetworkStatus();
  connection.addEventListener('change', updateNetworkStatus);
}

// App version and device info logging
console.log('%cWishli v1.0.0 - S25 Ultra Optimized', 'color: #5B5BD6; font-size: 16px; font-weight: bold;');
console.log('%cOptimized for Samsung Galaxy S25 Ultra', 'color: #7A7D85; font-size: 14px;');

if (isS25Ultra()) {
  console.log('%cS25 Ultra detected - Enhanced features enabled', 'color: #4ECDC4; font-size: 12px;');
}

// Device info for debugging
console.log('Device Info:', {
  screen: `${window.screen.width}x${window.screen.height}`,
  viewport: `${window.innerWidth}x${window.innerHeight}`,
  devicePixelRatio: window.devicePixelRatio,
  userAgent: navigator.userAgent,
  isS25Ultra: isS25Ultra()
});