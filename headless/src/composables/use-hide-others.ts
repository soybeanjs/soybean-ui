import { onWatcherCleanup, toValue, watchPostEffect } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { hideOthers } from 'aria-hidden';
import { filterNullish } from '@soybeanjs/utils';
import { isClient } from '../shared';
import type { MaybeArray } from '../types';

/**
 * The `useHideOthers` function is a TypeScript function that takes a target element reference and hides all other
 * elements in ARIA when the target element is present, and restores the visibility of the hidden elements when the
 * target element is removed.
 *
 * @param target - reference to the element that you want to hide other elements when it is clicked or focused.
 * @param enabled - whether to enable the hide others functionality (supports reactive values)
 */
export function useHideOthers(
  target: MaybeRefOrGetter<MaybeArray<HTMLElement | null | undefined>>,
  enabled: MaybeRefOrGetter<boolean | undefined> = true
) {
  watchPostEffect(() => {
    // Ensure we're in a browser environment
    if (!isClient) {
      return;
    }

    const targetValue = toValue(target);
    const elements = filterNullish(Array.isArray(targetValue) ? targetValue : [targetValue]);

    if (elements.length === 0) {
      return;
    }

    if (elements.some(element => element.closest('[popover]:not(:popover-open)'))) {
      // Skip if inside a closed native popover
      return;
    }

    const isEnabled = toValue(enabled);
    // Early return if not enabled or in test mode
    if (!isEnabled || import.meta.env.MODE === 'test') {
      return;
    }

    // Hide other elements using aria-hidden
    const undo = hideOthers(elements);

    onWatcherCleanup(() => {
      // Restore visibility when target changes, component unmounts, or enabled becomes false
      undo();
    });
  });
}
