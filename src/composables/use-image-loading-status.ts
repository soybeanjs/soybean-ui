import { shallowRef, toValue, watchEffect } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { isClient } from '../shared';
import type { HTMLAttributeCrossOrigin, HTMLAttributeReferrerPolicy, ImageLoadingStatus } from '../types';

interface ImageLoadingOptions {
  referrerPolicy?: MaybeRefOrGetter<HTMLAttributeReferrerPolicy | undefined>;
  crossOrigin?: MaybeRefOrGetter<HTMLAttributeCrossOrigin | undefined>;
}

/**
 * Composable for tracking image loading status
 *
 * @param src - Image source URL (reactive or static)
 * @param options - Additional image loading options
 * @returns Reactive loading status
 */
export function useImageLoadingStatus(src: MaybeRefOrGetter<string>, options: ImageLoadingOptions = {}) {
  const { referrerPolicy, crossOrigin } = options;
  const loadingStatus = shallowRef<ImageLoadingStatus>('idle');

  // Early return for SSR
  if (!isClient()) return loadingStatus;

  watchEffect(onCleanup => {
    const srcValue = toValue(src);
    const referrerPolicyValue = toValue(referrerPolicy);
    const crossOriginValue = toValue(crossOrigin);

    if (!srcValue) {
      loadingStatus.value = 'error';
      return;
    }

    let isMounted = true;
    const image = new window.Image();

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!isMounted) return;
      loadingStatus.value = status;
    };

    // Set loading status immediately
    loadingStatus.value = 'loading';

    // Configure image properties
    if (referrerPolicyValue) {
      image.referrerPolicy = referrerPolicyValue;
    }
    if (crossOriginValue !== undefined) {
      image.crossOrigin = crossOriginValue;
    }

    // Set up event listeners
    image.onload = updateStatus('loaded');
    image.onerror = updateStatus('error');

    // Start loading
    image.src = srcValue;

    onCleanup(() => {
      isMounted = false;
      // Clean up image to prevent memory leaks
      image.onload = null;
      image.onerror = null;
    });
  });

  return loadingStatus;
}
