export const isBrowser = typeof document !== 'undefined';
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

// iOS检测 - 延迟计算并缓存结果
let cachedIOSResult: boolean | null = null;

function detectIOS(): boolean {
  if (!isClient) {
    return false;
  }

  if (!window?.navigator?.userAgent) {
    return false;
  }

  return (
    /iP(?:ad|hone|od)/.test(window.navigator.userAgent) ||
    // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
    // https://github.com/vueuse/vueuse/issues/3577
    (window.navigator.maxTouchPoints > 2 && /iPad|Macintosh/.test(window.navigator.userAgent))
  );
}

export function isIOS(): boolean {
  if (cachedIOSResult === null) {
    cachedIOSResult = detectIOS();
  }
  return cachedIOSResult;
}

// 如果需要在某些特殊情况下重新检测iOS（比如测试环境）
export function refreshIOSDetection(): boolean {
  cachedIOSResult = null;
  return isIOS();
}
