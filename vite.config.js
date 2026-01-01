import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { VitePWA } from 'vite-plugin-pwa'

// Custom plugin to optimize modulepreload hints
const optimizeModulepreload = () => ({
  name: 'optimize-modulepreload',
  transformIndexHtml(html) {
    // Remove preload hints for heavy, rarely-used chunks to improve initial load
    // IMPORTANT: Keep this list in sync with manualChunks configuration below
    // These chunks are lazy-loaded only when needed (PDF export, markdown rendering, analytics)
    return html
      .replace(/<link rel="modulepreload"[^>]*vendor-pdf[^>]*>/g, '')
      .replace(/<link rel="modulepreload"[^>]*vendor-markdown[^>]*>/g, '')
      .replace(/<link rel="modulepreload"[^>]*vendor-analytics[^>]*>/g, '');
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Optimize modulepreload hints (remove heavy rarely-used chunks)
    optimizeModulepreload(),

    // Image optimization
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: false,
        quality: 80,
      },
    }),

    // Generate gzip compressed files
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),

    // Generate brotli compressed files
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),

    // PWA support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'assets/images/logo/*.png'],
      manifest: {
        name: '360Ghar',
        short_name: '360Ghar',
        description: "India's First AI-Enabled Real Estate Platform",
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/assets/images/logo/favicon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/images/logo/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Exclude large blueprint3d files from precaching
        globIgnores: ['**/blueprint3d/**', '**/data/**'],
        // Increase file size limit for precaching
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.360ghar\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:woff2|woff)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
    }),

    // Bundle analyzer (only in analyze mode)
    process.env.ANALYZE && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),

  build: {
    // Disable source maps for production
    sourcemap: false,

    // Increase chunk size warning limit
    chunkSizeWarningLimit: 500,

    // Manual chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Form libraries
          'vendor-forms': ['formik', 'yup'],

          // UI libraries
          'vendor-ui': ['react-slick', 'react-toastify', 'yet-another-react-lightbox'],

          // Markdown rendering
          'vendor-markdown': ['react-markdown', 'remark-gfm'],

          // Utilities
          'vendor-utils': ['axios', 'zustand', 'dompurify'],

          // Analytics (separate for lazy loading)
          'vendor-analytics': ['posthog-js', 'web-vitals'],

          // PDF/Canvas (heavy, rarely used)
          'vendor-pdf': ['jspdf', 'html2canvas'],
        },
      },
    },

    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:8000',
        target: 'https://api.360ghar.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
})
