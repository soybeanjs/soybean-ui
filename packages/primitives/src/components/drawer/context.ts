import type { ComponentPublicInstance, Ref } from 'vue';
import { computed, onUnmounted, ref, watch, watchEffect } from 'vue';
import { isClient } from '@vueuse/core';
import { useContext } from '../../composables';
import { usePositionFixed } from './use-position-fixed';
import { useSnapPoints } from './use-snap-points';
import {
  BORDER_RADIUS,
  DRAG_CLASS,
  NESTED_DISPLACEMENT,
  TRANSITIONS,
  VELOCITY_THRESHOLD,
  WINDOW_TOP_OFFSET,
  dampenValue,
  getTranslate,
  isVertical,
  reset,
  set
} from './shared';
import type { DrawerRootContext, DrawerRootContextParams } from './types';

export const [provideDrawerRootContext, injectDrawerRootContext] = useContext(
  'DrawerRoot',
  (params: DrawerRootContextParams): DrawerRootContext => {
    return useDrawer(params);
  }
);

export function useDrawer(props: DrawerRootContextParams): DrawerRootContext {
  const {
    emitDrag,
    emitRelease,
    emitClose,
    emitOpenChange,
    open,
    dismissible,
    nested,
    // fixed,
    modal,
    shouldScaleBackground,
    scrollLockTimeout,
    closeThreshold,
    activeSnapPoint,
    fadeFromIndex,
    direction
  } = props;

  const isOpen = ref(open.value ?? false);
  const hasBeenOpened = ref(false);
  const isVisible = ref(false);
  const isDragging = ref(false);
  const justReleased = ref(false);

  const overlayRef = ref<ComponentPublicInstance | null>(null);

  const openTime = ref<Date | null>(null);
  const dragStartTime = ref<Date | null>(null);
  const dragEndTime = ref<Date | null>(null);
  const lastTimeDragPrevented = ref<Date | null>(null);
  const isAllowedToDrag = ref(true);

  const nestedOpenChangeTimer = ref<number | null>(null);

  const pointerStart = ref(0);
  const keyboardIsOpen = ref(false);

  // const previousDiffFromInitial = ref(0);

  const drawerRef = ref<ComponentPublicInstance | null>(null);
  // const initialDrawerHeight = ref(0);
  const drawerHeightRef = computed(() => drawerRef.value?.$el.getBoundingClientRect().height || 0);

  const snapPoints = usePropOrDefaultRef(props.snapPoints, ref<(number | string)[] | undefined>(undefined));

  // const onCloseProp = ref<(() => void) | undefined>(undefined)
  // const onOpenChangeProp = ref<((open: boolean) => void) | undefined>(undefined)
  // const onDragProp = ref<((event: PointerEvent, percentageDragged: number) => void) | undefined>(
  //   undefined
  // )
  // const onReleaseProp = ref<((event: PointerEvent, open: boolean) => void) | undefined>(undefined)

  // const fadeFromIndex = ref(
  //   props.fadeFromIndex ?? (snapPoints.value && snapPoints.value.length - 1)
  // )

  const {
    activeSnapPointIndex,
    onRelease: onReleaseSnapPoints,
    snapPointsOffset,
    onDrag: onDragSnapPoints,
    shouldFade,
    getPercentageDragged: getSnapPointsPercentageDragged
  } = useSnapPoints({
    snapPoints,
    activeSnapPoint,
    drawerRef,
    fadeFromIndex,
    overlayRef,
    onSnapPointChange,
    direction
  });

  function onSnapPointChange(activeSnapPointIndexValue: number, snapPointsOffsetValue: number[]) {
    // Change openTime ref when we reach the last snap point to prevent dragging for 500ms incase it's scrollable.
    if (snapPoints.value && activeSnapPointIndexValue === snapPointsOffsetValue.length - 1) openTime.value = new Date();
  }

  const { restorePositionSetting } = usePositionFixed({
    isOpen,
    modal,
    nested,
    hasBeenOpened
  });

  function getScale() {
    return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
  }

  // eslint-disable-next-line complexity
  function shouldDrag(el: EventTarget | null, isDraggingInDirection: boolean) {
    if (!el) return false;
    let element = el as HTMLElement;
    const highlightedText = window.getSelection()?.toString();
    const swipeAmount = drawerRef.value ? getTranslate(drawerRef.value.$el, direction.value) : null;
    const date = new Date();

    if (element.hasAttribute('data-soybean-drawer-no-drag') || element.closest('[data-soybean-drawer-no-drag]')) {
      return false;
    }

    if (direction.value === 'right' || direction.value === 'left') return true;

    // Allow scrolling when animating
    if (openTime.value && date.getTime() - openTime.value.getTime() < 500) return false;

    if (swipeAmount !== null) {
      if (direction.value === 'bottom' ? swipeAmount > 0 : swipeAmount < 0) return true;
    }

    // Don't drag if there's highlighted text
    if (highlightedText && highlightedText.length > 0) return false;

    // Disallow dragging if drawer was scrolled within `scrollLockTimeout`
    if (
      lastTimeDragPrevented.value &&
      date.getTime() - lastTimeDragPrevented.value.getTime() < scrollLockTimeout.value &&
      swipeAmount === 0
    ) {
      lastTimeDragPrevented.value = date;
      return false;
    }

    if (isDraggingInDirection) {
      lastTimeDragPrevented.value = date;

      // We are dragging down so we should allow scrolling
      return false;
    }

    // Keep climbing up the DOM tree as long as there's a parent
    while (element) {
      // Check if the element is scrollable
      if (element.scrollHeight > element.clientHeight) {
        if (element.scrollTop !== 0) {
          lastTimeDragPrevented.value = new Date();

          // The element is scrollable and not scrolled to the top, so don't drag
          return false;
        }

        if (element.getAttribute('role') === 'dialog') return true;
      }

      // Move up to the parent element
      element = element.parentNode as HTMLElement;
    }

    // No scrollable parents not scrolled to the top found, so drag
    return true;
  }

  function onPress(event: PointerEvent) {
    if (!dismissible.value && !snapPoints.value) return;
    if (drawerRef.value && !drawerRef.value.$el.contains(event.target as Node)) return;
    isDragging.value = true;
    dragStartTime.value = new Date();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    pointerStart.value = isVertical(direction.value) ? event.clientY : event.clientX;
  }

  // eslint-disable-next-line complexity
  function onDrag(event: PointerEvent) {
    if (!drawerRef.value || !isDragging.value) return;

    // We need to know how much of the drawer has been dragged in percentages so that we can transform background accordingly
    const directionMultiplier = direction.value === 'bottom' || direction.value === 'right' ? 1 : -1;
    const draggedDistance =
      (pointerStart.value - (isVertical(direction.value) ? event.clientY : event.clientX)) * directionMultiplier;
    const isDraggingInDirection = draggedDistance > 0;

    // Pre condition for disallowing dragging in the close direction.
    const noCloseSnapPointsPreCondition = snapPoints.value && !dismissible.value && !isDraggingInDirection;

    // Disallow dragging down to close when first snap point is the active one and dismissible prop is set to false.
    if (noCloseSnapPointsPreCondition && activeSnapPointIndex.value === 0) return;

    // We need to capture last time when drag with scroll was triggered and have a timeout between
    const absDraggedDistance = Math.abs(draggedDistance);
    const wrapper = document.querySelector('[soybean-drawer-wrapper]');

    // Calculate the percentage dragged, where 1 is the closed position
    let percentageDragged = absDraggedDistance / drawerHeightRef.value;
    const snapPointPercentageDragged = getSnapPointsPercentageDragged(absDraggedDistance, isDraggingInDirection);

    if (snapPointPercentageDragged !== null) percentageDragged = snapPointPercentageDragged;

    // Disallow close dragging beyond the smallest snap point.
    if (noCloseSnapPointsPreCondition && percentageDragged >= 1) return;

    if (!isAllowedToDrag.value && !shouldDrag(event.target, isDraggingInDirection)) return;
    drawerRef?.value?.$el.classList.add(DRAG_CLASS);
    // If shouldDrag gave true once after pressing down on the drawer, we set isAllowedToDrag to true and it will remain true until we let go, there's no reason to disable dragging mid way, ever, and that's the solution to it
    isAllowedToDrag.value = true;
    set(drawerRef.value?.$el, {
      transition: 'none'
    });

    set(overlayRef.value?.$el, {
      transition: 'none'
    });

    if (snapPoints.value) onDragSnapPoints({ draggedDistance });

    // Run this only if snapPoints are not defined or if we are at the last snap point (highest one)
    if (isDraggingInDirection && !snapPoints.value) {
      const dampenedDraggedDistance = dampenValue(draggedDistance);

      const translateValue = Math.min(dampenedDraggedDistance * -1, 0) * directionMultiplier;
      set(drawerRef.value?.$el, {
        transform: isVertical(direction.value)
          ? `translate3d(0, ${translateValue}px, 0)`
          : `translate3d(${translateValue}px, 0, 0)`
      });
      return;
    }

    const opacityValue = 1 - percentageDragged;

    if (shouldFade.value || (fadeFromIndex.value && activeSnapPointIndex.value === fadeFromIndex.value - 1)) {
      emitDrag(percentageDragged);

      set(
        overlayRef.value?.$el,
        {
          opacity: `${opacityValue}`,
          transition: 'none'
        },
        true
      );
    }

    if (wrapper && overlayRef.value && shouldScaleBackground.value) {
      // Calculate percentageDragged as a fraction (0 to 1)
      const scaleValue = Math.min(getScale() + percentageDragged * (1 - getScale()), 1);
      const borderRadiusValue = 8 - percentageDragged * 8;

      const translateValue = Math.max(0, 14 - percentageDragged * 14);

      set(
        wrapper,
        {
          borderRadius: `${borderRadiusValue}px`,
          transform: isVertical(direction.value)
            ? `scale(${scaleValue}) translate3d(0, ${translateValue}px, 0)`
            : `scale(${scaleValue}) translate3d(${translateValue}px, 0, 0)`,
          transition: 'none'
        },
        true
      );
    }

    if (!snapPoints.value) {
      const translateValue = absDraggedDistance * directionMultiplier;

      set(drawerRef.value?.$el, {
        transform: isVertical(direction.value)
          ? `translate3d(0, ${translateValue}px, 0)`
          : `translate3d(${translateValue}px, 0, 0)`
      });
    }
  }

  function resetDrawer() {
    if (!drawerRef.value) return;
    const wrapper = document.querySelector('[soybean-drawer-wrapper]');
    const currentSwipeAmount = getTranslate(drawerRef.value.$el, direction.value);

    set(drawerRef.value.$el, {
      transform: 'translate3d(0, 0, 0)',
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`
    });

    set(overlayRef.value?.$el, {
      transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
      opacity: '1'
    });

    // Don't reset background if swiped upwards
    if (shouldScaleBackground.value && currentSwipeAmount && currentSwipeAmount > 0 && isOpen.value) {
      set(
        wrapper,
        {
          borderRadius: `${BORDER_RADIUS}px`,
          overflow: 'hidden',
          ...(isVertical(direction.value)
            ? {
                transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
                transformOrigin: 'top'
              }
            : {
                transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
                transformOrigin: 'left'
              }),
          transitionProperty: 'transform, border-radius',
          transitionDuration: `${TRANSITIONS.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`
        },
        true
      );
    }
  }

  function closeDrawer() {
    if (!drawerRef.value) return;

    emitClose();
    set(drawerRef.value.$el, {
      transform: isVertical(direction.value)
        ? `translate3d(0, ${direction.value === 'bottom' ? '100%' : '-100%'}, 0)`
        : `translate3d(${direction.value === 'right' ? '100%' : '-100%'}, 0, 0)`,
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`
    });

    set(overlayRef.value?.$el, {
      opacity: '0',
      transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`
    });

    scaleBackground(false);

    window.setTimeout(() => {
      isVisible.value = false;
      isOpen.value = false;
    }, 300);

    window.setTimeout(() => {
      if (snapPoints.value) activeSnapPoint.value = snapPoints.value[0];
    }, TRANSITIONS.DURATION * 1000); // seconds to ms
  }

  watchEffect(() => {
    if (!isOpen.value && shouldScaleBackground.value && isClient) {
      // Can't use `onAnimationEnd` as the component will be invisible by then
      const id = setTimeout(() => {
        reset(document.body);
      }, 200);

      return () => clearTimeout(id);
    }
  });

  onUnmounted(() => {
    scaleBackground(false);
    restorePositionSetting();
  });

  function onRelease(event: PointerEvent) {
    if (!isDragging.value || !drawerRef.value) return;

    drawerRef.value.$el.classList.remove(DRAG_CLASS);
    isAllowedToDrag.value = false;
    isDragging.value = false;
    dragEndTime.value = new Date();
    const swipeAmount = getTranslate(drawerRef.value.$el, direction.value);

    if (!shouldDrag(event.target, false) || !swipeAmount || Number.isNaN(swipeAmount)) return;

    if (dragStartTime.value === null) return;

    const timeTaken = dragEndTime.value.getTime() - dragStartTime.value.getTime();
    const distMoved = pointerStart.value - (isVertical(direction.value) ? event.clientY : event.clientX);
    const velocity = Math.abs(distMoved) / timeTaken;

    if (velocity > 0.05) {
      // `justReleased` is needed to prevent the drawer from focusing on an input when the drag ends, as it's not the intent most of the time.
      justReleased.value = true;

      window.setTimeout(() => {
        justReleased.value = false;
      }, 200);
    }

    if (snapPoints.value) {
      const directionMultiplier = direction.value === 'bottom' || direction.value === 'right' ? 1 : -1;

      onReleaseSnapPoints({
        draggedDistance: distMoved * directionMultiplier,
        closeDrawer,
        velocity,
        dismissible: dismissible.value
      });
      emitRelease(true);
      return;
    }

    // Moved upwards, don't do anything
    if (direction.value === 'bottom' || direction.value === 'right' ? distMoved > 0 : distMoved < 0) {
      resetDrawer();
      emitRelease(true);
      return;
    }

    if (velocity > VELOCITY_THRESHOLD) {
      closeDrawer();
      emitRelease(false);
      return;
    }

    const visibleDrawerHeight = Math.min(drawerRef.value.$el.getBoundingClientRect().height ?? 0, window.innerHeight);

    if (swipeAmount >= visibleDrawerHeight * closeThreshold.value) {
      closeDrawer();
      emitRelease(false);
      return;
    }

    emitRelease(true);
    resetDrawer();
  }

  watch(
    isOpen,
    o => {
      if (o) {
        openTime.value = new Date();
        scaleBackground(true);
      }
      emitOpenChange(o);
    },
    { immediate: true }
  );

  watch(
    open,
    o => {
      if (o) {
        isOpen.value = o;
        hasBeenOpened.value = true;
      } else {
        closeDrawer();
      }
    },
    { immediate: true }
  );

  function scaleBackground(openState: boolean) {
    const wrapper = document.querySelector('[soybean-drawer-wrapper]');
    if (!wrapper || !shouldScaleBackground.value) return;

    if (openState) {
      // setting original styles initially
      set(document.body, {
        background: document.body.style.backgroundColor || document.body.style.background
      });
      // setting body styles, with cache ignored, so that we can get correct original styles in reset
      set(
        document.body,
        {
          background: 'black'
        },
        true
      );

      set(wrapper, {
        borderRadius: `${BORDER_RADIUS}px`,
        overflow: 'hidden',
        ...(isVertical(direction.value)
          ? {
              transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
              transformOrigin: 'top'
            }
          : {
              transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
              transformOrigin: 'left'
            }),
        transitionProperty: 'transform, border-radius',
        transitionDuration: `${TRANSITIONS.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`
      });
    } else {
      // Exit
      reset(wrapper, 'overflow');
      reset(wrapper, 'transform');
      reset(wrapper, 'borderRadius');
      set(wrapper, {
        transitionProperty: 'transform, border-radius',
        transitionDuration: `${TRANSITIONS.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`
      });
    }
  }

  function onNestedOpenChange(o: boolean) {
    const scale = o ? (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth : 1;
    const y = o ? -NESTED_DISPLACEMENT : 0;

    if (nestedOpenChangeTimer.value) window.clearTimeout(nestedOpenChangeTimer.value);

    set(drawerRef.value?.$el, {
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
      transform: `scale(${scale}) translate3d(0, ${y}px, 0)`
    });

    if (!o && drawerRef.value?.$el) {
      nestedOpenChangeTimer.value = window.setTimeout(() => {
        const translateValue = getTranslate(drawerRef.value?.$el, direction.value);
        set(drawerRef.value?.$el, {
          transition: 'none',
          transform: isVertical(direction.value)
            ? `translate3d(0, ${translateValue}px, 0)`
            : `translate3d(${translateValue}px, 0, 0)`
        });
      }, 500);
    }
  }

  function onNestedDrag(percentageDragged: number) {
    if (percentageDragged < 0) return;

    const initialDim = isVertical(direction.value) ? window.innerHeight : window.innerWidth;
    const initialScale = (initialDim - NESTED_DISPLACEMENT) / initialDim;
    const newScale = initialScale + percentageDragged * (1 - initialScale);
    const newTranslate = -NESTED_DISPLACEMENT + percentageDragged * NESTED_DISPLACEMENT;

    set(drawerRef.value?.$el, {
      transform: isVertical(direction.value)
        ? `scale(${newScale}) translate3d(0, ${newTranslate}px, 0)`
        : `scale(${newScale}) translate3d(${newTranslate}px, 0, 0)`,
      transition: 'none'
    });
  }

  function onNestedRelease(o: boolean) {
    const dim = isVertical(direction.value) ? window.innerHeight : window.innerWidth;
    const scale = o ? (dim - NESTED_DISPLACEMENT) / dim : 1;
    const translate = o ? -NESTED_DISPLACEMENT : 0;

    if (o) {
      set(drawerRef.value?.$el, {
        transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
        transform: isVertical(direction.value)
          ? `scale(${scale}) translate3d(0, ${translate}px, 0)`
          : `scale(${scale}) translate3d(${translate}px, 0, 0)`
      });
    }
  }

  return {
    open,
    isOpen,
    modal,
    keyboardIsOpen,
    hasBeenOpened,
    isVisible,
    drawerRef,
    drawerHeightRef,
    overlayRef,
    isDragging,
    dragStartTime,
    isAllowedToDrag,
    snapPoints,
    activeSnapPoint,
    pointerStart,
    dismissible,
    snapPointsOffset,
    direction,
    shouldFade,
    fadeFromIndex,
    shouldScaleBackground,
    onPress,
    onDrag,
    onRelease,
    closeDrawer,
    onNestedDrag,
    onNestedRelease,
    onNestedOpenChange,
    emitClose,
    emitDrag,
    emitRelease,
    emitOpenChange,
    nested
  };
}

function usePropOrDefaultRef<T>(prop: Ref<T | undefined> | undefined, defaultRef: Ref<T>): Ref<T> {
  return prop && Boolean(prop.value) ? (prop as Ref<T>) : defaultRef;
}
