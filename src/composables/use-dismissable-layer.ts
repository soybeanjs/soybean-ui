import { computed, nextTick, onBeforeUnmount, onMounted, onWatcherCleanup, shallowReactive, toValue, watch } from 'vue';
import type { CSSProperties, MaybeRefOrGetter, Ref } from 'vue';
import { handleAndDispatchCustomEvent, isClient } from '../shared';
import type { DismissableLayerEmits, EmitsToHookProps, FocusOutsideEvent, PointerDownOutsideEvent } from '../types';
import { useEscapeKeyDown } from './use-escape-key-down';

// Event type constants
const POINTER_DOWN_OUTSIDE_EVENT = 'dismissableLayer.pointerDownOutside';
const FOCUS_OUTSIDE_EVENT = 'dismissableLayer.focusOutside';
const DISMISSABLE_LAYER_DATA_ATTRIBUTE = 'data-dismissable-layer';

export interface UseDismissableLayerOptions extends EmitsToHookProps<DismissableLayerEmits> {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside the `DismissableLayer`. Users will
   * need to click twice on outside elements to interact with them: once to close the `DismissableLayer`, and again to
   * trigger the element.
   */
  disableOutsidePointerEvents?: MaybeRefOrGetter<boolean>;
  /** Handler called when the `DismissableLayer` should be dismissed */
  onDismiss?: () => void;
}

export const layerContext = {
  layers: shallowReactive(new Set<HTMLElement>()),
  layersWithOutsidePointerEventsDisabled: shallowReactive(new Set<HTMLElement>()),
  branches: shallowReactive(new Set<HTMLElement>())
};

let originalBodyPointerEvents: string | undefined;

/**
 * Composable for creating dismissable layers with outside interaction handling
 *
 * @param layerElementRef - Reference to the dismissable layer element
 * @param options - Configuration options for the dismissable layer
 * @returns Properties and handlers for the dismissable layer
 */
export function useDismissableLayer(
  layerElementRef: Ref<HTMLElement | undefined>,
  options: UseDismissableLayerOptions = {}
) {
  const {
    disableOutsidePointerEvents,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss
  } = options;

  const getElementOwnerDocument = (): Document => layerElementRef.value?.ownerDocument ?? globalThis?.document;

  const index = computed(() =>
    layerElementRef.value ? Array.from(layerContext.layers).indexOf(layerElementRef.value) : -1
  );

  const isBodyPointerEventsDisabled = computed(() => layerContext.layersWithOutsidePointerEventsDisabled.size > 0);

  const isPointerEventsEnabled = computed(() => {
    const layers = Array.from(layerContext.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [
      ...layerContext.layersWithOutsidePointerEventsDisabled
    ].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled
      ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled)
      : -1;

    return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
  });

  const computedPointerEvents = computed(() => {
    if (!isBodyPointerEventsDisabled.value) return undefined;
    return isPointerEventsEnabled.value ? 'auto' : 'none';
  });

  const computedStyle = computed<CSSProperties>(() => ({
    pointerEvents: computedPointerEvents.value
  }));

  // Handle pointer down outside the layer
  useOutsidePointerDown(async event => {
    if (!isPointerEventsEnabled.value) return;

    const target = event.target as HTMLElement;
    const isPointerdownOnBranch = [...layerContext.branches].some(branch => branch.contains(target));
    if (isPointerdownOnBranch) return;

    onPointerDownOutside?.(event);
    onInteractOutside?.(event);

    if (!event.defaultPrevented) {
      onDismiss?.();
    }
  }, layerElementRef);

  // Handle focus outside the layer
  useOutsideFocus(event => {
    const target = event.target as HTMLElement;
    const isFocusInBranch = [...layerContext.branches].some(branch => branch.contains(target));
    if (isFocusInBranch) return;

    onFocusOutside?.(event);
    onInteractOutside?.(event);

    if (!event.defaultPrevented) {
      onDismiss?.();
    }
  }, layerElementRef);

  // Handle escape key press
  useEscapeKeyDown(event => {
    const isHighestLayer = index.value === layerContext.layers.size - 1;
    if (!isHighestLayer) return;

    onEscapeKeyDown?.(event);

    if (!event.defaultPrevented) {
      event.preventDefault();
      onDismiss?.();
    }
  }, getElementOwnerDocument);

  // Manage layer registration and pointer events state
  watch(layerElementRef, el => {
    if (!el) return;

    const ownerDocument = getElementOwnerDocument();

    const shouldDisableOutsidePointerEvents = toValue(disableOutsidePointerEvents);
    if (shouldDisableOutsidePointerEvents) {
      if (layerContext.layersWithOutsidePointerEventsDisabled.size === 0) {
        originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
        ownerDocument.body.style.pointerEvents = 'none';
      }
      layerContext.layersWithOutsidePointerEventsDisabled.add(el);
    }

    layerContext.layers.add(el);

    onWatcherCleanup(() => {
      if (shouldDisableOutsidePointerEvents && layerContext.layersWithOutsidePointerEventsDisabled.size === 1) {
        if (!originalBodyPointerEvents) {
          const styles = ownerDocument.body.style;
          styles.removeProperty('pointer-events');
        } else {
          ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
        }
      }

      /**
       * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect because a change to
       * `disableOutsidePointerEvents` would remove this layer from the stack and add it to the end again so the
       * layering order wouldn't be _creation order_. We only want them to be removed from context stacks when
       * unmounted.
       */
      layerContext.layers.delete(el);
      layerContext.layersWithOutsidePointerEventsDisabled.delete(el);
    });
  });

  return {
    DISMISSABLE_LAYER_DATA_ATTRIBUTE,
    computedPointerEvents,
    computedStyle,
    layerProps: {
      [DISMISSABLE_LAYER_DATA_ATTRIBUTE]: ''
    }
  };
}

/**
 * Composable for creating dismissable layer branches that don't trigger dismissal
 *
 * @param branchElementRef - Reference to the branch element
 */
export function useDismissableLayerBranch(branchElementRef: Ref<HTMLElement | undefined>): void {
  onMounted(() => {
    if (branchElementRef.value) {
      layerContext.branches.add(branchElementRef.value);
    }
  });

  onBeforeUnmount(() => {
    if (branchElementRef.value) {
      layerContext.branches.delete(branchElementRef.value);
    }
  });
}

/**
 * Listens for `pointerdown` outside a DOM subtree. We use `pointerdown` rather than `pointerup` to mimic layer
 * dismissing behavior present in OS.
 *
 * @param onOutsidePointerDown - Handler for pointer down outside events
 * @param watchedElementRef - Reference to the element to check for outside events
 * @returns Event handlers to attach to the element
 */
export function useOutsidePointerDown(
  onOutsidePointerDown: (event: PointerDownOutsideEvent) => void,
  watchedElementRef: Ref<HTMLElement | undefined>,
  enable?: MaybeRefOrGetter<boolean>
) {
  let isPointerCurrentlyInsideElement = false;
  let pendingTouchClickHandler: (() => void) | null = null;

  const captureHandlers = {
    onPointerdownCapture: () => {
      if (!toValue(enable)) return;

      isPointerCurrentlyInsideElement = true;
    }
  };

  if (!isClient) {
    return captureHandlers;
  }

  const cleanupPendingTouchClickHandler = (ownerDocument: Document): void => {
    if (pendingTouchClickHandler) {
      ownerDocument.removeEventListener('click', pendingTouchClickHandler);
      pendingTouchClickHandler = null;
    }
  };

  watch(watchedElementRef, currentWatchedElement => {
    if (!currentWatchedElement) return;

    const ownerDocument = currentWatchedElement.ownerDocument;

    const handleDocumentPointerDown = async (pointerEvent: PointerEvent): Promise<void> => {
      if (!watchedElementRef.value) return;

      const pointerEventTarget = pointerEvent.target as HTMLElement;
      isPointerCurrentlyInsideElement = isTargetInsideLayerTree(watchedElementRef.value, pointerEventTarget);

      if (pointerEventTarget && !isPointerCurrentlyInsideElement) {
        const outsideEventDetail = { originalEvent: pointerEvent };

        const dispatchOutsidePointerDownEvent = (): void => {
          handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE_EVENT, onOutsidePointerDown, outsideEventDetail);
        };

        /**
         * On touch devices, we need to wait for a click event because browsers implement a ~350ms delay between the
         * time the user stops touching the display and when the browser executes events. We need to ensure we don't
         * reactivate pointer-events within this timeframe otherwise the browser may execute events that should have
         * been prevented.
         */
        if (pointerEvent.pointerType === 'touch') {
          cleanupPendingTouchClickHandler(ownerDocument);
          pendingTouchClickHandler = dispatchOutsidePointerDownEvent;
          ownerDocument.addEventListener('click', pendingTouchClickHandler, { once: true });
        } else {
          dispatchOutsidePointerDownEvent();
        }
      } else {
        // Clean up pending click handler if pointer was inside
        cleanupPendingTouchClickHandler(ownerDocument);
      }

      isPointerCurrentlyInsideElement = false;
    };

    /** Delay event listener registration to avoid triggering on the same pointerdown event that mounted the component */
    const registrationTimerId = window.setTimeout(() => {
      ownerDocument.addEventListener('pointerdown', handleDocumentPointerDown);
    }, 0);

    onWatcherCleanup(() => {
      window.clearTimeout(registrationTimerId);
      ownerDocument.removeEventListener('pointerdown', handleDocumentPointerDown);
      cleanupPendingTouchClickHandler(ownerDocument);
    });
  });

  return captureHandlers;
}

interface UseOutsideFocusReturn {
  onFocusCapture: () => void;
  onBlurCapture: () => void;
}

/**
 * Listens for when focus happens outside a DOM subtree
 *
 * @param onOutsideFocus - Handler for focus outside events
 * @param watchedElementRef - Reference to the element to check for outside focus
 * @returns Event handlers to attach to the element
 */
export function useOutsideFocus(
  onOutsideFocus: (event: FocusOutsideEvent) => void,
  watchedElementRef: Ref<HTMLElement | undefined>
): UseOutsideFocusReturn {
  let isFocusCurrentlyInsideElement = false;

  const captureHandlers: UseOutsideFocusReturn = {
    onFocusCapture: () => {
      isFocusCurrentlyInsideElement = true;
    },
    onBlurCapture: () => {
      isFocusCurrentlyInsideElement = false;
    }
  };

  if (!isClient) {
    return captureHandlers;
  }

  const handleDocumentFocusIn = async (focusEvent: FocusEvent): Promise<void> => {
    await nextTick();

    if (!watchedElementRef.value || !focusEvent.target) return;

    isFocusCurrentlyInsideElement = isTargetInsideLayerTree(watchedElementRef.value, focusEvent.target as HTMLElement);

    if (!isFocusCurrentlyInsideElement) {
      const outsideEventDetail = { originalEvent: focusEvent };
      handleAndDispatchCustomEvent(FOCUS_OUTSIDE_EVENT, onOutsideFocus, outsideEventDetail);
    }
  };

  watch(watchedElementRef, currentWatchedElement => {
    if (!currentWatchedElement) return;

    const ownerDocument = currentWatchedElement.ownerDocument;
    ownerDocument.addEventListener('focusin', handleDocumentFocusIn);

    onWatcherCleanup(() => {
      ownerDocument.removeEventListener('focusin', handleDocumentFocusIn);
    });
  });

  return captureHandlers;
}

/** Check if a target element is inside a dismissable layer DOM tree */
function isTargetInsideLayerTree(layerElement: HTMLElement, targetElement: HTMLElement): boolean {
  if (!layerElement || !targetElement) return false;

  const targetClosestLayer = targetElement.closest<HTMLElement>(`[${DISMISSABLE_LAYER_DATA_ATTRIBUTE}]`);
  if (!targetClosestLayer) return false;
  if (layerElement === targetClosestLayer) return true;

  const allLayersInDocument = Array.from(
    layerElement.ownerDocument.querySelectorAll<HTMLElement>(`[${DISMISSABLE_LAYER_DATA_ATTRIBUTE}]`)
  );

  const layerElementIndex = allLayersInDocument.indexOf(layerElement);
  const targetLayerIndex = allLayersInDocument.indexOf(targetClosestLayer);

  return layerElementIndex < targetLayerIndex;
}
