import { shallowRef, watch } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { tryOnScopeDispose, useMutationObserver } from '@vueuse/core';

export interface FlipOptions {
  /**
   * Animation duration in milliseconds.
   *
   * @default 300
   */
  duration?: number;
  /**
   * Animation easing.
   *
   * @default 'ease-out'
   */
  easing?: string;
}

export interface FlipReturn {
  /**
   * Function ref bound via `:ref` to the container whose children should animate.
   */
  setTarget: (el: Element | ComponentPublicInstance | null) => void;
}

interface FlipRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Animate the direct children of a container with FLIP whenever any change inside
 * the container (at any depth) shifts their layout. Unlike auto-animate, the observer
 * tracks subtree mutations, so nested changes (e.g. a form error toggling, or list
 * items added or removed) move the siblings smoothly.
 */
export function useFlip(options: FlipOptions = {}): FlipReturn {
  const { duration = 300, easing = 'ease-out' } = options;

  const target = shallowRef<HTMLElement | null>(null);

  let rects = new WeakMap<Element, FlipRect>();
  const animations = new WeakMap<Element, Animation>();
  let frame = 0;

  function setTarget(el: Element | ComponentPublicInstance | null) {
    target.value = el instanceof HTMLElement ? el : null;
  }

  function measure(el: Element): FlipRect {
    const { x, y, width, height } = el.getBoundingClientRect();

    return { x, y, width, height };
  }

  function snapshot(parent: Element) {
    for (const child of parent.children) {
      rects.set(child, measure(child));
    }
  }

  function play(child: Element, keyframes: Keyframe[]) {
    animations.get(child)?.cancel();
    animations.set(child, child.animate(keyframes, { duration, easing }));
  }

  function process() {
    const parent = target.value;

    if (!parent) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      snapshot(parent);
      return;
    }

    for (const child of parent.children) {
      // Cancel the running animation first so the measured rect reflects the layout
      // position instead of the in-flight transform.
      animations.get(child)?.cancel();

      const next = measure(child);
      const prev = rects.get(child);

      rects.set(child, next);

      if (!prev) {
        play(child, [{ opacity: '0' }, { opacity: '1' }]);
        continue;
      }

      const dx = prev.x - next.x;
      const dy = prev.y - next.y;

      if (dx || dy) {
        play(child, [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }]);
      }
    }
  }

  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      process();
    });
  }

  watch(target, parent => {
    rects = new WeakMap();
    if (parent) snapshot(parent);
  });

  useMutationObserver(target, schedule, { childList: true, subtree: true });

  tryOnScopeDispose(() => {
    if (frame) cancelAnimationFrame(frame);
  });

  return { setTarget };
}
