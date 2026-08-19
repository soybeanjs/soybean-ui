import { onBeforeUnmount, onMounted, shallowRef } from 'vue';
import type { ShallowRef } from 'vue';
import { isClient } from '../shared';

/**
 * Options for the useOverflow composable.
 */
export interface UseOverflowOptions {
  /**
   * Minimum delta between the scroll size and the client size required to
   * consider the content overflowed.
   *
   * @default 1
   */
  threshold?: number;
}

/**
 * Track whether an element's content overflows its box, and capture its text.
 *
 * Uses a `ResizeObserver` (layout/size changes) plus a `MutationObserver`
 * (text content changes) so the result stays correct for CSS line-clamp
 * truncation and for dynamically inserted content.
 *
 * @param target - A shallow ref holding the element to observe.
 * @param options - Additional options.
 * @returns `overflowed` and the element's `textContent` as reactive values.
 */
export function useOverflow(target: ShallowRef<HTMLElement | undefined>, options: UseOverflowOptions = {}) {
  const overflowed = shallowRef(false);
  const text = shallowRef('');
  const { threshold = 1 } = options;

  let resizeObserver: ResizeObserver | undefined;
  let mutationObserver: MutationObserver | undefined;

  const update = () => {
    const el = target.value;

    if (!el) {
      overflowed.value = false;
      text.value = '';
      return;
    }

    overflowed.value = el.scrollWidth - el.clientWidth > threshold || el.scrollHeight - el.clientHeight > threshold;
    text.value = el.textContent ?? '';
  };

  if (!isClient) return { overflowed, text };

  onMounted(() => {
    const el = target.value;

    if (!el) return;

    resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);

    mutationObserver = new MutationObserver(update);
    mutationObserver.observe(el, { childList: true, subtree: true, characterData: true });

    update();
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    mutationObserver?.disconnect();
  });

  return { overflowed, text };
}
