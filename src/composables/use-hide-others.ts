import { onWatcherCleanup, toValue, watchPostEffect } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { hideOthers } from 'aria-hidden';
import { isClient } from '../shared';

/**
 * The `useHideOthers` function is a TypeScript function that takes a target element reference and hides all other
 * elements in ARIA when the target element is present, and restores the visibility of the hidden elements when the
 * target element is removed.
 *
 * @param target - reference to the element that you want to hide other elements when it is clicked or focused.
 * @param enabled - whether to enable the hide others functionality (supports reactive values)
 */
export function useHideOthers(
  target: MaybeRefOrGetter<HTMLElement | undefined>,
  enabled: MaybeRefOrGetter<boolean | undefined>
) {
  watchPostEffect(() => {
    // Ensure we're in a browser environment
    if (!isClient) {
      return;
    }

    const el = toValue(target);
    // Early return if no target element
    if (!el) {
      return;
    }

    const isEnabled = toValue(enabled);
    // Early return if not enabled or in test mode
    if (!isEnabled || import.meta.env.MODE === 'test') {
      return;
    }

    // Hide other elements using aria-hidden
    const undo = hideOthers(el);

    onWatcherCleanup(() => {
      // Restore visibility when target changes, component unmounts, or enabled becomes false
      undo();
    });
  });
}
