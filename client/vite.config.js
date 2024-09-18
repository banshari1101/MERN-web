import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['express', 'safe-buffer']
  },
  server: {
    port: 3001, // Change this to your desired port
  },
});

