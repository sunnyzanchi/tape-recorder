import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import analyze from 'rollup-plugin-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // This causes the vendor bundle to double load
    // in Firefox (but not Chrome) if enabled.
    // It's a known issue:
    // https://github.com/vitejs/vite/issues/5532
    polyfillModulePreload: false,
  },
  plugins: [
    analyze({
      filter: (module) => module.percent > 1,
      onAnalysis: () =>
        console.log('\n\nAnalysis of modules >= 1% of the total bundle size:'),
      summaryOnly: true,
    }),
    preact(),
  ],
})
