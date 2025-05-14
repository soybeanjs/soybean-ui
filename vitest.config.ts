import { defineConfig } from 'vitest/config';
import vue from 'unplugin-vue/vite';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom'
  }
});
