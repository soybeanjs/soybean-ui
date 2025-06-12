export const isBrowser = typeof document !== 'undefined';
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

// iOS detection - lazy calculation and cached result
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

// Re-detect iOS in special cases (e.g., testing environment)
export function refreshIOSDetection(): boolean {
  cachedIOSResult = null;
  return isIOS();
}

// 更可靠的Nuxt环境检测
function detectNuxtEnvironment(): boolean {
  // 客户端检测
  if (isClient) {
    // eslint-disable-next-line no-underscore-dangle
    return Boolean((window as any).__NUXT__);
  }

  // 服务端检测 - 检查是否有Nuxt特定的全局变量或上下文
  if (typeof globalThis !== 'undefined') {
    // 检查Nuxt的全局上下文标识
    // eslint-disable-next-line no-underscore-dangle
    if ((globalThis as any).__NUXT__ || (globalThis as any).$nuxt) {
      return true;
    }

    // 检查是否在Nuxt的运行时环境中
    // eslint-disable-next-line no-underscore-dangle
    if ((globalThis as any).nuxtApp || (globalThis as any).__nuxtApp) {
      return true;
    }
  }

  return false;
}

export const isNuxt = detectNuxtEnvironment();
