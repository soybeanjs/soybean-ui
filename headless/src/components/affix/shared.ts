import type { AffixTargetElement } from './types';

export interface RafThrottle {
  (): void;
  cancel: () => void;
}

export function createRafThrottle(fn: () => void): RafThrottle {
  let frameId: number | undefined;

  const throttled = () => {
    if (typeof window === 'undefined') {
      fn();

      return;
    }

    if (frameId !== undefined) {
      return;
    }

    frameId = window.requestAnimationFrame(() => {
      frameId = undefined;
      fn();
    });
  };

  throttled.cancel = () => {
    if (frameId === undefined || typeof window === 'undefined') {
      return;
    }

    window.cancelAnimationFrame(frameId);
    frameId = undefined;
  };

  return throttled;
}

export function getDefaultTarget(): Window | null {
  return typeof window === 'undefined' ? null : window;
}

export function getTargetRect(target: AffixTargetElement): DOMRect {
  if (target && target !== getDefaultTarget() && 'getBoundingClientRect' in target) {
    return target.getBoundingClientRect();
  }

  return {
    bottom: window.innerHeight,
    height: window.innerHeight,
    left: 0,
    right: window.innerWidth,
    top: 0,
    width: window.innerWidth,
    x: 0,
    y: 0,
    toJSON() {
      return {};
    }
  } as DOMRect;
}

export function getFixedTop(placeholderRect: DOMRect, targetRect: DOMRect, offsetTop?: number) {
  if (offsetTop !== undefined && Math.round(targetRect.top) > Math.round(placeholderRect.top) - offsetTop) {
    return offsetTop + targetRect.top;
  }

  return undefined;
}

export function getFixedBottom(placeholderRect: DOMRect, targetRect: DOMRect, offsetBottom?: number) {
  if (offsetBottom !== undefined && Math.round(targetRect.bottom) < Math.round(placeholderRect.bottom) + offsetBottom) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;

    return offsetBottom + targetBottomOffset;
  }

  return undefined;
}

export function isZeroRect(rect: DOMRect) {
  return rect.top === 0 && rect.left === 0 && rect.width === 0 && rect.height === 0;
}
