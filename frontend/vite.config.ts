import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    strictPort: true
  },
  resolve: {
    alias: {
      "@app-contracts": path.resolve(__dirname, "src/contracts"),
      "@app-components": path.resolve(__dirname, "src/components"),
      "@app-chains": path.resolve(__dirname, "src/chains/index.ts"),
      "@app-types": path.resolve(__dirname, "types/index.ts")
    }
  }
});
