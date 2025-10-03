import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vite configuration
export default defineConfig({
  plugins: [
    react(),
    // قم بإزالة أي Top-level await من هنا لتجنب أخطاء البناء
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: __dirname, // الجذر يحتوي على index.html
  build: {
    outDir: path.resolve(__dirname, "dist"), // مجلد الإخراج المتوافق مع Vercel
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
