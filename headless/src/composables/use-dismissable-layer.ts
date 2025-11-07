import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onWatcherCleanup,
  shallowReactive,
  toValue,
  watch,
  watchEffect
} from 'vue';
import type { CSSProperties, MaybeRefOrGetter, ShallowRef } from 'vue';
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
  layerElementRef: ShallowRef<HTMLElement | undefined>,
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

  const ownerDocument = (): Document => layerElementRef.value?.ownerDocument ?? globalThis?.document;

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

  usePointerdownOutside(layerElementRef, event => {
    if (!isPointerEventsEnabled.value) return;

    const target = event.target as HTMLElement;

    const isPointerdownOnBranch = [...layerContext.branches].some(branch => branch.contains(target));
    if (isPointerdownOnBranch) return;

    onPointerDownOutside?.(event);
    onInteractOutside?.(event);

    if (!event.defaultPrevented) {
      onDismiss?.();
    }
  });

  useFocusOutside(layerElementRef, event => {
    const target = event.target as HTMLElement;

    const isFocusInBranch = [...layerContext.branches].some(branch => branch.contains(target));
    if (isFocusInBranch) return;

    onFocusOutside?.(event);
    onInteractOutside?.(event);

    if (!event.defaultPrevented) {
      onDismiss?.();
    }
  });

  useEscapeKeyDown(ownerDocument, event => {
    const isHighestLayer = index.value === layerContext.layers.size - 1;

    if (!isHighestLayer) return;

    onEscapeKeyDown?.(event);

    if (!event.defaultPrevented) {
      event.preventDefault();
      onDismiss?.();
    }
  });

  watch(layerElementRef, nodeVal => {
    if (!nodeVal) return;

    const ownerNode = ownerDocument();

    const shouldDisableOutsidePointerEvents = toValue(disableOutsidePointerEvents);
    if (shouldDisableOutsidePointerEvents) {
      if (layerContext.layersWithOutsidePointerEventsDisabled.size === 0) {
        originalBodyPointerEvents = ownerNode.body.style.pointerEvents;
        ownerNode.body.style.pointerEvents = 'none';
      }
      layerContext.layersWithOutsidePointerEventsDisabled.add(nodeVal);
    }

    layerContext.layers.add(nodeVal);

    onWatcherCleanup(() => {
      if (shouldDisableOutsidePointerEvents && layerContext.layersWithOutsidePointerEventsDisabled.size === 1) {
        if (!originalBodyPointerEvents) {
          const styles = ownerNode.body.style;
          styles.removeProperty('pointer-events');
        } else {
          ownerNode.body.style.pointerEvents = originalBodyPointerEvents;
        }
      }

      /**
       * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect because a change to
       * `disableOutsidePointerEvents` would remove this layer from the stack and add it to the end again so the
       * layering order wouldn't be _creation order_. We only want them to be removed from context stacks when
       * unmounted.
       */
      layerContext.layers.delete(nodeVal);
      layerContext.layersWithOutsidePointerEventsDisabled.delete(nodeVal);
    });
  });

  return {
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
export function useDismissableLayerBranch(branchElementRef: ShallowRef<HTMLElement | undefined>): void {
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
 * dismissing behavior present in OS. Returns props to pass to the node we want to check for outside events.
 */
export function usePointerdownOutside(
  node: ShallowRef<HTMLElement | undefined>,
  onPointerDownOutside: (event: PointerDownOutsideEvent) => void,
  enable: MaybeRefOrGetter<boolean> = true
) {
  let isPointerInsideDOMTree = false;

  let handleClick = () => {};

  watchEffect(() => {
    if (!isClient || !toValue(enable) || !node.value) return;

    const ownerDocument = node.value.ownerDocument;

    async function handlePointerDown(event: PointerEvent) {
      if (!node.value) return;

      const target = event.target as HTMLElement;

      isPointerInsideDOMTree = isInsideDOMTree(node.value, target);

      if (target && !isPointerInsideDOMTree) {
        const eventDetail = { originalEvent: event };

        function handleAndDispatchPointerDownOutsideEvent() {
          handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE_EVENT, onPointerDownOutside, eventDetail);
        }

        /**
         * On touch devices, we need to wait for a click event because browsers implement a ~350ms delay between the
         * time the user stops touching the display and when the browser executes events. We need to ensure we don't
         * reactivate pointer-events within this timeframe otherwise the browser may execute events that should have
         * been prevented.
         *
         * Additionally, this also lets us deal automatically with cancellations when a click event isn't raised because
         * the page was considered scrolled/drag-scrolled, long-pressed, etc.
         *
         * This is why we also continuously remove the previous listener, because we cannot be certain that it was
         * raised, and therefore cleaned-up.
         */
        if (event.pointerType === 'touch') {
          ownerDocument.removeEventListener('click', handleClick);
          handleClick = handleAndDispatchPointerDownOutsideEvent;
          ownerDocument.addEventListener('click', handleClick, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent();
        }
      } else {
        // We need to remove the event listener in case the outside click has been canceled.
        // See: https://github.com/radix-ui/primitives/issues/2171
        ownerDocument.removeEventListener('click', handleClick);
      }
      isPointerInsideDOMTree = false;
    }

    /**
     * if this hook executes in a component that mounts via a `pointerdown` event, the event would bubble up to the
     * document and trigger a `pointerDownOutside` event. We avoid this by delaying the event listener registration on
     * the document. This is how the DOM works, ie:
     *
     *     button.addEventListener('pointerdown', () => {
     *       console.log('I will log');
     *       document.addEventListener('pointerdown', () => {
     *         console.log('I will also log');
     *       });
     *     });
     */
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener('pointerdown', handlePointerDown);
    }, 0);

    onWatcherCleanup(() => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener('pointerdown', handlePointerDown);
      ownerDocument.removeEventListener('click', handleClick);
    });
  });

  return {
    onPointerdownCapture: () => {
      if (!toValue(enable)) return;

      isPointerInsideDOMTree = true;
    }
  };
}

/**
 * Listens for when focus happens outside a DOM subtree. Returns props to pass to the root (node) of the subtree we want
 * to check.
 */
export function useFocusOutside(
  node: ShallowRef<HTMLElement | undefined>,
  onFocusOutside: (event: FocusOutsideEvent) => void,
  enable: MaybeRefOrGetter<boolean> = true
) {
  let isFocusInsideDOMTree = false;

  const handleFocus = async (event: FocusEvent) => {
    await nextTick();

    if (!node.value) return;

    isFocusInsideDOMTree = isInsideDOMTree(node.value, event.target as HTMLElement);

    if (event.target && !isFocusInsideDOMTree) {
      const eventDetail = { originalEvent: event };
      handleAndDispatchCustomEvent(FOCUS_OUTSIDE_EVENT, onFocusOutside, eventDetail);
    }
  };

  watchEffect(() => {
    if (!isClient || !toValue(enable) || !node.value) return;

    const ownerDocument = node.value.ownerDocument;

    ownerDocument.addEventListener('focusin', handleFocus);

    onWatcherCleanup(() => {
      ownerDocument.removeEventListener('focusin', handleFocus);
    });
  });

  return {
    onFocusCapture: () => {
      if (!toValue(enable)) return;
      isFocusInsideDOMTree = true;
    },
    onBlurCapture: () => {
      if (!toValue(enable)) return;
      isFocusInsideDOMTree = false;
    }
  };
}

function isInsideDOMTree(mainLayer: HTMLElement, targetElement: HTMLElement) {
  if (!mainLayer) return false;

  const targetLayer = targetElement.closest<HTMLElement>(`[${DISMISSABLE_LAYER_DATA_ATTRIBUTE}]`);

  if (!targetLayer) return false;

  if (mainLayer === targetLayer) return true;

  const layerList = Array.from(
    mainLayer.ownerDocument.querySelectorAll<HTMLElement>(`[${DISMISSABLE_LAYER_DATA_ATTRIBUTE}]`)
  );

  if (layerList.indexOf(mainLayer) < layerList.indexOf(targetLayer)) return true;

  return false;
}
