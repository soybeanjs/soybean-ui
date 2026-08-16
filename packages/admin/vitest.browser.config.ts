import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { playwright } from '@vitest/browser-playwright';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vitest/config';

/**
 * Browser e2e config — loaded explicitly via `vitest --config vitest.browser.config.ts`.
 *
 * Deliberately NOT named `vitest.config.ts` so Vitest does not auto-discover it;
 * it stays disjoint from the happy-dom unit-test config in `vite.config.ts`.
 * The browser suite exercises real Teleport + real browser interactions that
 * happy-dom cannot faithfully reproduce (sidebar toggle, menu teleport, mode
 * switching).
 *
 * Run with `pnpm --filter @soybeanjs/admin test:e2e`.
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
