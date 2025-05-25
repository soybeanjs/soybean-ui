import { isClient, isIOS } from '../shared';

const DATA_SCROLL_LOCK = 'data-scroll-lock';

/**
 * High-performance scroll lock using CSS classes
 *
 * @returns A function to unlock the scroll
 */
export function useBodyScrollLock(): () => void {
  if (!isClient()) {
    return () => {};
  }

  const body = document.body;

  if (body.hasAttribute(DATA_SCROLL_LOCK)) {
    return () => {};
  }

  ensureScrollLockCSS();

  const scrollY = window.scrollY;

  // Apply CSS classes for maximum performance
  body.style.top = `-${scrollY}px`;
  body.classList.add('scroll-lock-body');

  if (shouldShowVerticalScrollbar()) {
    body.classList.add('scroll-lock-body-with-scrollbar');
  }

  document.documentElement.classList.add('scroll-lock-html');
  body.setAttribute(DATA_SCROLL_LOCK, 'true');

  let stopTouchMoveListener: (() => void) | undefined;

  if (isIOS()) {
    stopTouchMoveListener = setupIOSTouchPrevention();
  }

  return () => {
    // Remove CSS classes
    body.classList.remove('scroll-lock-body', 'scroll-lock-body-with-scrollbar');
    document.documentElement.classList.remove('scroll-lock-html');

    // Reset inline styles
    body.style.top = '';
    body.removeAttribute(DATA_SCROLL_LOCK);

    // Restore scroll position
    window.scrollTo(0, scrollY);

    stopTouchMoveListener?.();
  };
}

/** Determines if vertical scrollbar should be shown */
function shouldShowVerticalScrollbar(): boolean {
  return document.body.scrollHeight > window.innerHeight;
}

/** Sets up touch event prevention for iOS devices */
function setupIOSTouchPrevention(): () => void {
  const onTouchMove = (event: TouchEvent) => {
    if (shouldPreventTouchMove(event)) {
      event.preventDefault();
    }
  };

  document.addEventListener('touchmove', onTouchMove, { passive: false });

  return () => {
    document.removeEventListener('touchmove', onTouchMove);
  };
}

/** Determines if touch move event should be prevented */
function shouldPreventTouchMove(event: TouchEvent): boolean {
  const target = event.target as Element;

  // Allow scrolling in scrollable containers
  if (hasScrollableOverflow(target)) {
    return false;
  }

  // Allow multi-touch gestures (pinch to zoom, etc.)
  if (event.touches.length > 1) {
    return false;
  }

  return true;
}

/** Checks if element or its parents have scrollable overflow */
function hasScrollableOverflow(element: Element): boolean {
  const style = window.getComputedStyle(element);

  // Check if current element is scrollable
  if (isElementScrollable(style, element)) {
    return true;
  }

  // Check parent elements recursively
  const parent = element.parentNode as Element;
  if (!parent || parent.tagName === 'BODY') {
    return false;
  }

  return hasScrollableOverflow(parent);
}

/** Determines if a single element is scrollable based on its computed styles */
function isElementScrollable(style: CSSStyleDeclaration, element: Element): boolean {
  const hasScrollOverflow = style.overflowX === 'scroll' || style.overflowY === 'scroll';
  const hasAutoOverflowWithContent =
    (style.overflowX === 'auto' && element.clientWidth < element.scrollWidth) ||
    (style.overflowY === 'auto' && element.clientHeight < element.scrollHeight);

  return hasScrollOverflow || hasAutoOverflowWithContent;
}

/**
 * Alternative high-performance implementation using CSS classes This approach is even more performant as it avoids
 * inline styles entirely
 */

const SCROLL_LOCK_CSS = `
  .scroll-lock-body {
    position: fixed !important;
    overflow-x: hidden !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
  }

  .scroll-lock-body-with-scrollbar {
    overflow-y: scroll !important;
  }

  .scroll-lock-html {
    scroll-behavior: auto !important;
  }
`;

/** Injects CSS for scroll lock if not already present */
function ensureScrollLockCSS(): void {
  const styleId = 'scroll-lock-styles';

  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = SCROLL_LOCK_CSS;
    document.head.appendChild(style);
  }
}
