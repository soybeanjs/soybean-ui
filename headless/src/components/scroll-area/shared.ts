import type { Direction } from '../../types';
import type { ScrollAreaOrientation } from './types';

const MIN_THUMB_SIZE = 18;

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getAxisValue(orientation: ScrollAreaOrientation, sizes: { horizontal: number; vertical: number }) {
  return orientation === 'horizontal' ? sizes.horizontal : sizes.vertical;
}

export function getThumbSize(viewportSize: number, contentSize: number, trackSize: number) {
  if (viewportSize <= 0 || contentSize <= 0 || trackSize <= 0) {
    return 0;
  }

  return clamp((viewportSize / contentSize) * trackSize, MIN_THUMB_SIZE, trackSize);
}

export function getThumbOffset(
  scrollPosition: number,
  maxScrollPosition: number,
  maxThumbOffset: number,
  orientation: ScrollAreaOrientation,
  dir: Direction
) {
  if (maxScrollPosition <= 0 || maxThumbOffset <= 0) {
    return 0;
  }

  const ratio = clamp(scrollPosition / maxScrollPosition, 0, 1);

  if (orientation === 'horizontal' && dir === 'rtl') {
    return maxThumbOffset - ratio * maxThumbOffset;
  }

  return ratio * maxThumbOffset;
}

export function getScrollPosition(viewport: HTMLElement, orientation: ScrollAreaOrientation) {
  return orientation === 'horizontal' ? Math.abs(viewport.scrollLeft) : viewport.scrollTop;
}

export function getScrollSize(viewport: HTMLElement, content: HTMLElement, orientation: ScrollAreaOrientation) {
  const viewportSize = getAxisValue(orientation, {
    horizontal: viewport.clientWidth,
    vertical: viewport.clientHeight
  });
  const contentSize = getAxisValue(orientation, {
    horizontal: Math.max(content.scrollWidth, content.offsetWidth),
    vertical: Math.max(content.scrollHeight, content.offsetHeight)
  });

  return {
    viewportSize,
    contentSize,
    maxScrollPosition: Math.max(contentSize - viewportSize, 0)
  };
}
