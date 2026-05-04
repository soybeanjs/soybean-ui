import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      include: ['test/specs/**/*.spec.ts'],
      environment: 'happy-dom',
      setupFiles: ['./test/setup.ts']
    }
  })
);
