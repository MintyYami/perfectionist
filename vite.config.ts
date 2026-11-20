import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this repo at https://<USERNAME>.github.io/perfectionist/,
  // so production builds need that prefix. The dev server stays at the root.
  base: command === 'build' ? '/perfectionist/' : '/',
}))
