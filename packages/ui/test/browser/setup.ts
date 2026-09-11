/**
 * Browser e2e test setup — runs once per browser test file before any spec.
 *
 * Unlike the happy-dom setup (`packages/ui/test/setup.ts`), no `fetch` mock is
 * needed here: a real browser handles Iconify CDN requests natively, and
 * ResizeObserver / pointer capture / scrollIntoView are all real, which is the
 * whole reason browser-mode e2e exists (it removes the mocks that the happy-dom
 * select spec has to maintain).
 *
 * The generated UnoCSS stylesheet must be imported explicitly: unlike a Vite
 * app entry (where the plugin injects it into `index.html`), the Vitest
 * browser page is provided by Vitest itself, so the virtual module is the only
 * way to load the utility classes + theme preflights.
 *
 * `vitest-browser-vue` registers its own `afterEach` cleanup that unmounts the
 * previously rendered component, so per-test teardown is automatic.
 */

import 'virtual:uno.css';
