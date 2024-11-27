import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", 
      // "@": ".", // Add this if you want manual aliasing
    },
  },
});
