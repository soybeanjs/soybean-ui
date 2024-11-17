import { computed, nextTick, ref, useId, watch } from 'vue';
import { createSharedComposable, useEventListener } from '@vueuse/core';
import { isClient, isIOS, tryOnBeforeUnmount } from '@vueuse/shared';
import type { Fn } from '@vueuse/shared';
import { defu } from 'defu';
import { injectConfigProviderContext } from '../components/config-provider/context';
import type { ScrollBodyOption } from '../types';

const useBodyLockStackCount = createSharedComposable(() => {
  const map = ref<Map<string, boolean>>(new Map());
  const initialOverflow = ref<string | undefined>();

  const locked = computed(() => Array.from(map.value.values()).some(Boolean));

  const context = injectConfigProviderContext({
    scrollBody: ref(true)
  });

  let stopTouchMoveListener: Fn | null = null;

  function resetBodyStyle() {
    document.body.style.paddingRight = '';
    document.body.style.marginRight = '';
    document.body.style.pointerEvents = '';
    document.body.style.removeProperty('--scrollbar-width');
    document.body.style.overflow = initialOverflow.value ?? '';

    if (isIOS) {
      stopTouchMoveListener?.();
    }

    initialOverflow.value = undefined;
  }

  async function handleLocked() {
    if (initialOverflow.value === undefined) {
      initialOverflow.value = document.body.style.overflow;
    }

    const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const defaultConfig = { padding: verticalScrollbarWidth, margin: 0 };

    let config: ScrollBodyOption = defaultConfig;
    if (context.scrollBody?.value) {
      if (typeof context.scrollBody.value === 'object') {
        const { padding, margin } = context.scrollBody.value;
        config = defu(
          {
            padding: padding === true ? verticalScrollbarWidth : padding,
            margin: margin === true ? verticalScrollbarWidth : margin
          },
          defaultConfig
        );
      }
    } else {
      config = { padding: 0, margin: 0 };
    }

    if (verticalScrollbarWidth > 0) {
      document.body.style.paddingRight = addPx(config.padding);
      document.body.style.marginRight = addPx(config.margin);
      document.body.style.setProperty('--scrollbar-width', `${verticalScrollbarWidth}px`);
      document.body.style.overflow = 'hidden';
    }

    if (isIOS) {
      stopTouchMoveListener = useEventListener(
        document,
        'touchmove',
        (e: TouchEvent) => {
          if (e.target !== document.documentElement) return;

          if (e.touches.length > 1) return;
          e.preventDefault?.();
        },
        { passive: false }
      );
    }

    // let dismissableLayer set previous pointerEvent first
    await nextTick();

    document.body.style.pointerEvents = 'none';
    document.body.style.overflow = 'hidden';
  }

  watch(
    locked,
    (val, oldVal) => {
      if (!isClient) return;

      if (!val) {
        if (oldVal) {
          resetBodyStyle();
        }
        return;
      }

      handleLocked();
    },
    { immediate: true, flush: 'sync' }
  );

  return map;
});

function addPx(value?: number | string | undefined | boolean) {
  return typeof value === 'number' ? `${value}px` : String(value);
}

export function useBodyScrollLock(initialState?: boolean | undefined) {
  const id = useId();
  const map = useBodyLockStackCount();

  map.value.set(id, initialState ?? false);

  const locked = computed({
    get: () => map.value.get(id) ?? false,
    set: value => map.value.set(id, value)
  });

  tryOnBeforeUnmount(() => {
    map.value.delete(id);
  });

  return locked;
}
