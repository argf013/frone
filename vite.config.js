// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,   // Port yang Anda inginkan
    host: '0.0.0.0',  // Mengikat server ke semua IP jaringan lokal
  },
});
