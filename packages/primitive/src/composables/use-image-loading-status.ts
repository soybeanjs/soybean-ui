import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { Ref, WatchHandle } from 'vue';
import type { HTMLAttributeReferrerPolicy, ImageLoadingStatus } from '../types';

export function useImageLoadingStatus(src: Ref<string>, referrerPolicy?: Ref<HTMLAttributeReferrerPolicy>) {
  const loadingStatus = ref<ImageLoadingStatus>('idle');
  const isMounted = ref(false);

  function updateStatus(status: ImageLoadingStatus) {
    return () => {
      if (isMounted.value) {
        loadingStatus.value = status;
      }
    };
  }

  let watchHandle: WatchHandle;

  onMounted(() => {
    isMounted.value = true;

    watchHandle = watch(
      [() => src.value, () => referrerPolicy?.value],
      ([srcValue, referrerValue]) => {
        if (!srcValue) {
          loadingStatus.value = 'error';
        } else {
          const image = new window.Image();
          loadingStatus.value = 'loading';
          image.onload = updateStatus('loaded');
          image.onerror = updateStatus('error');
          image.src = srcValue;
          if (referrerValue) {
            image.referrerPolicy = referrerValue;
          }
        }
      },
      { immediate: true }
    );
  });

  onUnmounted(() => {
    isMounted.value = false;
    watchHandle();
  });

  return loadingStatus;
}
