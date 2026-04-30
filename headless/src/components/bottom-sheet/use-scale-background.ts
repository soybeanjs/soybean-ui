import { ref, watchEffect } from 'vue';
import { isClient } from '../../shared';
import { useDrawerRootContext } from './context';
import {
  BOTTOM_SHEET_SCALE_SELECTOR,
  BORDER_RADIUS,
  TRANSITIONS,
  WINDOW_TOP_OFFSET,
  assignStyle,
  chain,
  isVertical
} from './shared';

const noop = () => () => {};

export function useScaleBackground() {
  const { direction, isOpen, shouldScaleBackground, setBackgroundColorOnScale, noBodyStyles } =
    useDrawerRootContext('DrawerScaleBackground');
  const timeoutIdRef = ref<number | null>(null);
  const initialBackgroundColor = ref(isClient ? document.body.style.backgroundColor : '');

  function getScale() {
    if (!isClient) return 1;

    return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
  }

  watchEffect(
    onCleanup => {
      if (!isClient) return;

      if (isOpen.value && shouldScaleBackground.value) {
        if (timeoutIdRef.value) clearTimeout(timeoutIdRef.value);
        const wrapper = document.querySelector(`[${BOTTOM_SHEET_SCALE_SELECTOR}]`) as HTMLElement;

        if (!wrapper) return;

        const cleanupChain = chain(
          setBackgroundColorOnScale.value && !noBodyStyles.value
            ? assignStyle(document.body, { background: 'black' })
            : noop,
          assignStyle(wrapper, {
            transformOrigin: isVertical(direction.value) ? 'top' : 'left',
            transitionProperty: 'transform, border-radius',
            transitionDuration: `${TRANSITIONS.DURATION}s`,
            transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`
          })
        );

        const wrapperStylesCleanup = assignStyle(wrapper, {
          borderRadius: `${BORDER_RADIUS}px`,
          overflow: 'hidden',
          ...(isVertical(direction.value)
            ? {
                transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
              }
            : {
                transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
              })
        });

        onCleanup(() => {
          cleanupChain();
          wrapperStylesCleanup();
          timeoutIdRef.value = window.setTimeout(() => {
            if (initialBackgroundColor.value) {
              document.body.style.background = initialBackgroundColor.value;
            } else {
              document.body.style.removeProperty('background');
            }
          }, TRANSITIONS.DURATION * 1000);
        });
      }
    },
    { flush: 'pre' }
  );
}
