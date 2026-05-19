import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,

    // allow external domains (Render, etc.)
    allowedHosts: true,

    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },

    hmr: {
      overlay: false,
    },
  },

  assetsInclude: ['**/*.PNG', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],

  plugins: [
    react(),
    // NOTE: lovable-tagger injects embed/search scripts during development.
    // Disable to prevent console noise like: "Reporting Header: invalid JSON value received".
    // If you need it back, explicitly re-enable via env (e.g. VITE_ENABLE_TAGGER=true).
    mode === "development" && process.env.VITE_ENABLE_TAGGER === 'true' && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));

