import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize production builds
      babel: process.env.NODE_ENV === 'production' ? {
        plugins: [
          ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]
        ]
      } : undefined
    }),
    splitVendorChunkPlugin()
  ],

  // Build optimizations
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        reduce_vars: true,
        unused: true,
        dead_code: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    
    // Chunk size optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-ui': ['lucide-react'],
          'vendor-socket': ['socket.io-client']
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name!.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name!)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(css)$/i.test(assetInfo.name!)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name!)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/${ext}/[name]-[hash][extname]`;
        }
      }
    },
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 500,
    
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    
    // Target modern browsers for better optimization
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    exclude: ['lucide-react']
  },

  // Development server configuration
  server: {
    host: true,
    port: 5176,
    allowedHosts: [
      'skillgame.pro'
    ],
    // Enable compression in dev
    middlewareMode: false,
    // Optimize HMR
    hmr: {
      overlay: true
    }
  },

  // Preview server configuration
  preview: {
    port: 5176,
    host: true
  },

  // Enable advanced optimizations
  esbuild: {
    // Remove debug info in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Enable pure annotation for better tree shaking
    pure: ['console.log', 'console.info'],
    // Target modern JavaScript
    target: 'es2020'
  },

  // CSS optimization
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      // Add any CSS preprocessor options here if needed
    }
  },

  // Define global constants for optimization
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
    __PROD__: process.env.NODE_ENV === 'production'
  }
});
