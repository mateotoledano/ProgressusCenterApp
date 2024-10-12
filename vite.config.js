import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para el backend en C# .NET
      '/api': {
        target: 'https://localhost:44329', // URL de tu backend
        changeOrigin: true,
        secure: false, // Esto ignora los certificados SSL en localhost
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina el prefijo /api en la solicitud
      },
    },
  },
});