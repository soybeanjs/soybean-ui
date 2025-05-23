export const isBrowser = () => typeof document !== 'undefined';

export const isClient = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const isIOS = () => {
  if (!isClient()) {
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
};
