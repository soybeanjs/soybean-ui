import { computed, nextTick, ref, watch } from 'vue';
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
    document.documentElement.style.removeProperty('--scrollbar-width');
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
      document.documentElement.style.setProperty('--scrollbar-width', `${verticalScrollbarWidth}px`);
      document.body.style.overflow = 'hidden';
    }

    if (isIOS) {
      stopTouchMoveListener = useEventListener(document, 'touchmove', (e: TouchEvent) => preventDefault(e), {
        passive: false
      });
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
  const id = Math.random().toString(36).substring(2, 7); // just simple random id, need not to be cryptographically secure
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

// Adapt from https://github.com/vueuse/vueuse/blob/main/packages/core/useScrollLock/index.ts#L28C10-L28C24
function checkOverflowScroll(ele: Element): boolean {
  const style = window.getComputedStyle(ele);
  if (
    style.overflowX === 'scroll' ||
    style.overflowY === 'scroll' ||
    (style.overflowX === 'auto' && ele.clientWidth < ele.scrollWidth) ||
    (style.overflowY === 'auto' && ele.clientHeight < ele.scrollHeight)
  ) {
    return true;
  }

  const parent = ele.parentNode;

  if (!(parent instanceof Element) || parent.tagName === 'BODY') {
    return false;
  }

  return checkOverflowScroll(parent);
}

function preventDefault(rawEvent: TouchEvent): boolean {
  const e = rawEvent || window.event;

  const _target = e.target as Element;

  // Do not prevent if element or parentNodes have overflow: scroll set.
  if (_target instanceof Element && checkOverflowScroll(_target)) return false;

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault && e.cancelable) e.preventDefault();

  return false;
}
