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
 * The recipes are imported eagerly *before* that sheet on purpose. UnoCSS
 * extracts candidates on demand from the modules it transforms, so a sheet
 * evaluated before a recipe has been transformed omits that recipe's utilities —
 * including one-off arbitrary ones such as `max-h-fit` and `h-[70vh]` that no
 * other module produces. The element then keeps its class list but the rules are
 * missing, which made geometry assertions flake depending on module-graph timing.
 * Importing every `@unocss-include` recipe first makes the extraction complete
 * for the styles directory before any sheet is served.
 *
 * `vitest-browser-vue` registers its own `afterEach` cleanup that unmounts the
 * previously rendered component, so per-test teardown is automatic.
 */

import.meta.glob('../../src/styles/*.ts', { eager: true });

import 'virtual:uno.css';
