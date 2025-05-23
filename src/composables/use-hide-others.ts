import { onUnmounted, watch } from 'vue';
import { hideOthers } from 'aria-hidden';
import { unrefElement } from '../shared';
import type { MaybeElementRef } from '../types';

/**
 * The `useHideOthers` function is a TypeScript function that takes a target element reference and hides all other
 * elements in ARIA when the target element is present, and restores the visibility of the hidden elements when the
 * target element is removed.
 *
 * @param {MaybeElementRef} target - The `target` parameter is a reference to the element that you want to hide other
 *   elements when it is clicked or focused.
 */
export function useHideOthers(target: MaybeElementRef, enabled = true) {
  let undo: () => void;

  watch(
    () => unrefElement(target),
    el => {
      if (!enabled) return;
      // disable hideOthers on test mode
      if (import.meta.env.MODE === 'test') return;

      if (!el) return;

      if (undo) {
        undo();

        return;
      }

      undo = hideOthers(el);
    }
  );

  onUnmounted(() => {
    if (enabled && undo) {
      undo();
    }
  });
}
