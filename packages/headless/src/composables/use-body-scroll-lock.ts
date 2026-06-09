import { isClient, isIOS } from '../shared';

const DATA_SCROLL_LOCK = 'data-scroll-lock';
const SCROLL_LOCK_STYLE_ID = 'scroll-lock-styles';

// CSS classes for scroll lock
const CSS_CLASSES = {
  BODY: 'scroll-lock-body',
  BODY_WITH_SCROLLBAR: 'scroll-lock-body-with-scrollbar',
  HTML: 'scroll-lock-html'
} as const;

// Optimized CSS with better performance
const SCROLL_LOCK_CSS = `
  .${CSS_CLASSES.BODY} {
    position: fixed !important;
    overflow-x: hidden !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    height: auto !important;
  }

  .${CSS_CLASSES.BODY_WITH_SCROLLBAR} {
    overflow-y: scroll !important;
  }

  .${CSS_CLASSES.HTML} {
    scroll-behavior: auto !important;
  }
`;

/**
 * High-performance scroll lock using CSS classes
 *
 * @returns A function to unlock the scroll
 */
export function useBodyScrollLock(): () => void {
  if (!isClient) {
    return () => {};
  }

  const body = document.body;

  // Prevent multiple locks on the same body
  if (body.hasAttribute(DATA_SCROLL_LOCK)) {
    return () => {};
  }

  ensureScrollLockCSS();

  const scrollY = window.scrollY;
  const shouldShowScrollbar = shouldShowVerticalScrollbar();

  // Apply scroll lock
  applyScrollLock(body, scrollY, shouldShowScrollbar);

  // Setup iOS-specific touch prevention
  const stopTouchMoveListener = isIOS() ? setupIOSTouchPrevention() : undefined;

  return () => unlockScroll(body, scrollY, stopTouchMoveListener);
}

/** Apply scroll lock to the body element */
function applyScrollLock(body: HTMLElement, scrollY: number, showScrollbar: boolean): void {
  body.style.top = `-${scrollY}px`;
  body.classList.add(CSS_CLASSES.BODY);

  if (showScrollbar) {
    body.classList.add(CSS_CLASSES.BODY_WITH_SCROLLBAR);
  }

  document.documentElement.classList.add(CSS_CLASSES.HTML);
  body.setAttribute(DATA_SCROLL_LOCK, 'true');
}

/** Remove scroll lock from the body element */
function unlockScroll(body: HTMLElement, scrollY: number, stopTouchMoveListener?: () => void): void {
  // Remove CSS classes
  body.classList.remove(CSS_CLASSES.BODY, CSS_CLASSES.BODY_WITH_SCROLLBAR);
  document.documentElement.classList.remove(CSS_CLASSES.HTML);

  // Reset inline styles
  body.style.top = '';
  body.removeAttribute(DATA_SCROLL_LOCK);

  // Restore scroll position
  window.scrollTo(0, scrollY);

  stopTouchMoveListener?.();
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
  // Allow multi-touch gestures (pinch to zoom, etc.)
  if (event.touches.length > 1) {
    return false;
  }

  const target = event.target as Element;

  // Allow scrolling in scrollable containers
  return !hasScrollableOverflow(target);
}

/** Checks if element or its parents have scrollable overflow */
function hasScrollableOverflow(element: Element): boolean {
  let currentElement: Element | null = element;

  while (currentElement && currentElement.tagName !== 'BODY') {
    const style = window.getComputedStyle(currentElement);

    if (isElementScrollable(style, currentElement)) {
      return true;
    }

    currentElement = currentElement.parentElement;
  }

  return false;
}

/** Determines if a single element is scrollable based on its computed styles */
function isElementScrollable(style: CSSStyleDeclaration, element: Element): boolean {
  const hasScrollOverflow = style.overflowX === 'scroll' || style.overflowY === 'scroll';
  const hasAutoOverflowWithContent =
    (style.overflowX === 'auto' && element.clientWidth < element.scrollWidth) ||
    (style.overflowY === 'auto' && element.clientHeight < element.scrollHeight);

  return hasScrollOverflow || hasAutoOverflowWithContent;
}

/** Injects CSS for scroll lock if not already present */
function ensureScrollLockCSS(): void {
  if (!document.getElementById(SCROLL_LOCK_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = SCROLL_LOCK_STYLE_ID;
    style.textContent = SCROLL_LOCK_CSS;
    document.head.appendChild(style);
  }
}
