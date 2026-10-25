import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the static build works from any path (a subfolder, GitHub Pages, a file server).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
