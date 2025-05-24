import { defineConfig } from 'vitest/config';
import vue from 'unplugin-vue/vite';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    include: ['test/specs/**/*.spec.ts'],
    environment: 'happy-dom'
  }
});
