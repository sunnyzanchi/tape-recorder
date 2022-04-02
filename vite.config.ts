import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // This causes the vendor bundle to double load
    // in Firefox (but not Chrome) if enabled.
    // It's a known issue:
    // https://github.com/vitejs/vite/issues/5532
    polyfillModulePreload: false,
  },
  plugins: [preact()],
})
