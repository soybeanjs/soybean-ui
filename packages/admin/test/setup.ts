import { vi } from 'vitest';

// @iconify/vue makes CDN fetch requests for icon names; stub fetch to keep
// happy-dom teardown clean (mirrors @soybeanjs/ui test setup).
globalThis.fetch = vi.fn(() =>
  Promise.resolve(
    new Response(JSON.stringify({ not_found: 1 }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  )
);
