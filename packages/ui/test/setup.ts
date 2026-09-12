/**
 * Global test setup — runs once per test worker before any specs.
 *
 * Problem: @iconify/vue makes fetch requests to the Iconify CDN when an icon name is
 * encountered for the first time (e.g. "lucide:check" in SCheckbox, icon props in SAccordion).
 * happy-dom registers these as async tasks in its AsyncTaskManager. When vitest calls
 * `window.happyDOM.abort()` during environment teardown at the end of each test file,
 * those in-flight fetches are cancelled, and happy-dom emits DOMException [AbortError].
 *
 * Fix: replace window.fetch with a synchronous mock that resolves immediately with a
 * 404 response. @iconify/vue receives an error response and silently skips the icon (renders
 * nothing), but crucially, the call never goes through happy-dom's Fetch class, so no async
 * tasks are registered and teardown is clean.
 */
import { vi } from 'vitest';

// Must run before any component is mounted so the mock is in place when icons first render.
globalThis.fetch = vi.fn(() =>
  Promise.resolve(
    new Response(JSON.stringify({ not_found: 1 }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  )
);
