import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@atoms': path.resolve(__dirname, './src/shared/components/atoms'),
      '@molecules': path.resolve(__dirname, './src/shared/components/molecules'),
      '@organisms': path.resolve(__dirname, './src/shared/components/organisms'),
      '@templates': path.resolve(__dirname, './src/shared/components/templates'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
      '@routes': path.resolve(__dirname, './src/core/router'),
      '@store': path.resolve(__dirname, './src/core/store'),
      '@api': path.resolve(__dirname, './src/core/api'),
    },
  }
})
