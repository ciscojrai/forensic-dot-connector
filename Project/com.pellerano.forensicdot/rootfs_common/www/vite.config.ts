import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { UgosViteBuilder } from '@ugreen-nas/builder-open';
import path from 'node:path';

// ==============================================================================
// Official UGREEN Vite Builder Configuration
// Reference: https://developer.ugnas.com/en/doc/frontend/ugos-builder/buildConfig.html
// Reference: https://developer.ugnas.com/en/doc/frontend/demo/react.html
// ==============================================================================

const builder = new UgosViteBuilder({
  windowConfig: {
    width: 1280,
    height: 800,
    title: 'Forensic Dot Connector',
  },
  getIgnoreFolder: (patterns: unknown) => patterns,
  langPath: 'src/locales',
});

export default defineConfig({
  plugins: [
    react(),
    ...builder.pluginEntry(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
