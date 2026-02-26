import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: '/offgridpro/',
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'copy-index',
      writeBundle() {
        fs.copyFileSync('dist/index.html', 'dist/404.html');
      }
    }
  ],
})
