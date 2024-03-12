import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: process.env.NODE_ENV === 'production' ? `/${packageJson.name}/` : '/',
  resolve: {
    alias: {
      '@babel/polyfill/lib/noConflict': './src/utils/noop.ts',
    },
  },
})
