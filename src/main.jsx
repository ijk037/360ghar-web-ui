import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './index.scss'
import MobileMenuProvider from './contextApi/MobileMenuContext.jsx'
import OffCanvasProvider from './contextApi/OffCanvasContext.jsx'
import ScrollHideProvider from './contextApi/ScrollHideContext.jsx'
import BlogDataProvider from './contextApi/BlogDataContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { reportWebVitals } from './seo/reportWebVitals'
import LazyToastProvider from './common/LazyToast.jsx'

// Lazy load PostHog analytics after initial render
const loadAnalytics = () => {
  // Load Google Tag Manager
  if (import.meta.env.PROD) {
    const gtmId = 'GTM-XXXXXXX'
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
    document.head.appendChild(script)
  }

  // Load PostHog
  // Only load in production
  if (import.meta.env.PROD && import.meta.env.VITE_PUBLIC_POSTHOG_KEY) {
    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        // Reduce initial network impact
        autocapture: false,
        capture_pageview: false,
        loaded: (posthog) => {
          // Manually capture page view after load
          posthog.capture('$pageview')
        },
      })
    }).catch(() => {
      // Silently fail if PostHog fails to load
    })
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BlogDataProvider>
    <HelmetProvider>
      <ScrollHideProvider>
        <OffCanvasProvider>
          <MobileMenuProvider>
            <LazyToastProvider>
              <App />
            </LazyToastProvider>
          </MobileMenuProvider>
        </OffCanvasProvider>
      </ScrollHideProvider>
    </HelmetProvider>
  </BlogDataProvider>
)

// Load analytics after app renders and is idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(loadAnalytics)
} else {
  // Fallback for Safari
  setTimeout(loadAnalytics, 2000)
}

// Start measuring Core Web Vitals after paint
requestAnimationFrame(() => {
  reportWebVitals()
})
