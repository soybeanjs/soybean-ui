import { defineConfig } from 'vitest/config';
import vue from 'unplugin-vue/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [vue(), tsconfigPaths({ root: '.', ignoreConfigErrors: true })],
  test: {
    globals: true,
    include: ['test/specs/**/*.spec.ts'],
    environment: 'happy-dom'
  }
});
