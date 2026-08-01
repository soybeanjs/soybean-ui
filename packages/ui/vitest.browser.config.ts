import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { playwright } from '@vitest/browser-playwright';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vitest/config';

/**
 * Browser e2e config — loaded explicitly via `vitest --config vitest.browser.config.ts`.
 *
 * This file is intentionally NOT named `vitest.config.ts` so Vitest does not
 * auto-discover it; it stays disjoint from the build + unit-test config in
 * `vite.config.ts`. Uses `defineConfig` from `vitest/config` (not `vite-plus`)
 * because this is a test-only config and must not carry the `pack` field.
 *
 * Run with `pnpm test:e2e` (or `pnpm --filter @soybeanjs/ui test:e2e`).
 */
export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    include: ['test/browser/**/*.e2e.spec.ts'],
    setupFiles: ['./test/browser/setup.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }]
    }
  }
});
