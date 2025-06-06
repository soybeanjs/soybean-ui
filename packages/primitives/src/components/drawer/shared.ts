import type { DrawerDirection } from './types';

export const CLOSE_THRESHOLD = 0.25;

export const SCROLL_LOCK_TIMEOUT = 100;

export const BORDER_RADIUS = 8;

export const NESTED_DISPLACEMENT = 16;

export const WINDOW_TOP_OFFSET = 26;

export const DRAG_CLASS = 'soybean-drawer-dragging';

export const TRANSITIONS = {
  DURATION: 0.5,
  EASE: [0.32, 0.72, 0, 1]
};

export const VELOCITY_THRESHOLD = 0.4;

interface Style {
  [key: string]: string;
}

const cache = new WeakMap();

export function isInView(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();

  if (!window.visualViewport) return false;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    // Need + 40 for safari detection
    rect.bottom <= window.visualViewport.height - 40 &&
    rect.right <= window.visualViewport.width
  );
}

export function set(el?: Element | HTMLElement | null, styles?: Style, ignoreCache = false) {
  if (!el || !(el instanceof HTMLElement) || !styles) return;
  const originalStyles: Style = {};

  Object.entries(styles).forEach(([key, value]: [string, string]) => {
    if (key.startsWith('--')) {
      el.style.setProperty(key, value);
      return;
    }

    originalStyles[key] = (el.style as any)[key];
    (el.style as any)[key] = value;
  });

  if (ignoreCache) return;

  cache.set(el, originalStyles);
}

export function reset(el: Element | HTMLElement | null, prop?: string) {
  if (!el || !(el instanceof HTMLElement)) return;
  const originalStyles = cache.get(el);

  if (!originalStyles) return;

  if (prop) {
    (el.style as any)[prop] = originalStyles[prop];
  } else {
    Object.entries(originalStyles).forEach(([key, value]) => {
      (el.style as any)[key] = value;
    });
  }
}

export function getTranslate(element: HTMLElement, direction: DrawerDirection): number | null {
  const style = window.getComputedStyle(element);
  const transform =
    // @ts-expect-error some custom style only exist in certain browser
    style.transform || style.webkitTransform || style.mozTransform;
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
    return Number.parseFloat(mat[1].split(', ')[isVertical(direction) ? 13 : 12]);
  }
  // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? Number.parseFloat(mat[1].split(', ')[isVertical(direction) ? 5 : 4]) : null;
}

export function dampenValue(v: number) {
  return 8 * (Math.log(v + 1) - 2);
}

export function isVertical(direction: DrawerDirection) {
  return direction === 'top' || direction === 'bottom';
}

export function assignStyle(element: HTMLElement | null | undefined, style: Partial<CSSStyleDeclaration>) {
  if (!element) return () => {};

  const prevStyle = element.style.cssText;
  Object.assign(element.style, style);

  return () => {
    element.style.cssText = prevStyle;
  };
}

export type AnyFunction = (...args: any) => any;

/** Receives functions as arguments and returns a new function that calls all. */
export function chain<T>(...fns: T[]) {
  return (...args: T extends AnyFunction ? Parameters<T> : never) => {
    for (const fn of fns) {
      if (typeof fn === 'function') {
        fn(...args);
      }
    }
  };
}

export function isMobileFirefox(): boolean | undefined {
  const userAgent = navigator.userAgent;
  return (
    typeof window !== 'undefined' &&
    ((/Firefox/.test(userAgent) && /Mobile/.test(userAgent)) || // Android Firefox
      /FxiOS/.test(userAgent)) // iOS Firefox
  );
}

export function isMac(): boolean | undefined {
  return testPlatform(/^Mac/);
}

export function isIPhone(): boolean | undefined {
  return testPlatform(/^iPhone/);
}

export function isSafari(): boolean | undefined {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function isIPad(): boolean | undefined {
  return (
    testPlatform(/^iPad/) ||
    // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
    (isMac() && navigator.maxTouchPoints > 1)
  );
}

export function isIOS(): boolean | undefined {
  return isIPhone() || isIPad();
}

export function testPlatform(re: RegExp): boolean | undefined {
  return typeof window !== 'undefined' && window.navigator !== null ? re.test(window.navigator.platform) : undefined;
}
