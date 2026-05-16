import { defineConfig } from 'vite'        // imports helper for type-safe config
import react from '@vitejs/plugin-react'   // imports React plugin for Vite

// https://vite.dev/config/                // link to official Vite config docs

export default defineConfig({              // exports your Vite configuration
  plugins: [react()],                      // enables React support + Fast Refresh (hot reload)
  server: {                                // settings for the local dev server
    port: 3000                             // run dev server on http://localhost:3000
  }
})