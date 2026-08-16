/**
 * Browser e2e test setup — runs once per browser test file before any spec.
 *
 * A real browser handles Iconify CDN icon requests natively and provides real
 * Teleport, ResizeObserver, pointer capture and scrollIntoView, so no mocks are
 * needed here (unlike the happy-dom unit setup in `packages/admin/test/setup.ts`).
 *
 * `vitest-browser-vue` registers its own `afterEach` cleanup that unmounts the
 * previously rendered component, so per-test teardown is automatic.
 */

export {};
