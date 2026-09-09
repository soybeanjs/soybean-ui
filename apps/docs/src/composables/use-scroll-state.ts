import { onMounted, onUnmounted, shallowRef } from 'vue';
import type { ShallowRef } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

export interface ScrollState {
  /** True once the page is scrolled past `threshold` px (coarse signal for lift/spacing effects). */
  isScrolled: ShallowRef<boolean>;
  /** True only while the scroll position is at the very top (precise signal, e.g. divider visibility). */
  isAtTop: ShallowRef<boolean>;
}

/**
 * Tracks page scroll geometry via an IntersectionObserver over a top sentinel.
 *
 * `isScrolled` and `isAtTop` are intentionally independent: a divider should
 * react to the first scrolled pixel, while lift effects want a threshold to
 * avoid jitter. Geometry-based detection reacts to scroll, resize, anchor
 * jumps and scroll restoration without wiring any event, and stays correct
 * while `useBodyScrollLock` pins the body with `position: fixed; top: -scrollY`,
 * because the sentinel moves with the body.
 */
export function useScrollState(threshold = 25): ScrollState {
  const isScrolled = shallowRef(false);
  const isAtTop = shallowRef(true);
  const sentinel = shallowRef<HTMLElement | null>(null);

  useIntersectionObserver(
    sentinel,
    entries => {
      const entry = entries[0];
      if (!entry) return;

      isScrolled.value = !entry.isIntersecting;
      // Rounding tolerance: treat near-full visibility as "at top".
      isAtTop.value = entry.intersectionRatio >= 0.99;
    },
    // 0 fires when the sentinel fully leaves the viewport (threshold passed);
    // 1 fires on the first scrolled pixel (top <-> partial visibility).
    { threshold: [0, 1] }
  );

  onMounted(() => {
    const el = createSentinel(threshold);
    document.body.prepend(el);
    sentinel.value = el;
  });

  onUnmounted(() => {
    sentinel.value?.remove();
    sentinel.value = null;
  });

  return { isScrolled, isAtTop };
}

function createSentinel(threshold: number): HTMLElement {
  const el = document.createElement('div');
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = `position:absolute;top:0;left:0;width:1px;height:${threshold}px;pointer-events:none;visibility:hidden;`;
  return el;
}
