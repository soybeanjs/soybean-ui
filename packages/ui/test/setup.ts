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

// @formkit/auto-animate (used by SForm's control wrapper via vAutoAnimate) calls
// `el.animate()` on DOM mutations and removes leaving elements when the returned
// animation fires its "finish" event. happy-dom does not implement Element.animate,
// so stub it with a shim that fires "finish" immediately — otherwise exit animations
// never complete and removed elements linger in the DOM.
if (!Element.prototype.animate) {
  Element.prototype.animate = vi.fn(() => {
    const animation = {
      cancel: vi.fn(),
      finish: vi.fn(),
      pause: vi.fn(),
      play: vi.fn(),
      reverse: vi.fn(),
      commitStyles: vi.fn(),
      addEventListener: (type: string, callback: () => void) => {
        if (type === 'finish') {
          // auto-animate 在拿到 animate() 返回值后才注册 finish 监听，因此异步触发
          queueMicrotask(callback);
        }
      },
      removeEventListener: vi.fn(),
      onfinish: null,
      oncancel: null,
      currentTime: 0,
      playbackRate: 1,
      playState: 'running',
      finished: Promise.resolve(),
      ready: Promise.resolve(),
      effect: null,
      timeline: null
    };

    return animation as unknown as Animation;
  });
}
