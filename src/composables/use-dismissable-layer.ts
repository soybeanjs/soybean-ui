import { computed, nextTick, onBeforeUnmount, onMounted, onWatcherCleanup, shallowReactive, toValue, watch } from 'vue';
import type { CSSProperties, MaybeRefOrGetter, Ref } from 'vue';
import { handleAndDispatchCustomEvent, isClient } from '../shared';
import type { DismissableLayerEmits, EmitsToHookProps, FocusOutsideEvent, PointerDownOutsideEvent } from '../types';
import { useEscapeKeydown } from './use-escape-keydown';

const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside';
const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside';
const DISMISSABLE_LAYER_ATTRIBUTE = 'data-dismissable-layer';

const context = {
  layers: shallowReactive(new Set<HTMLElement>()),
  layersWithOutsidePointerEventsDisabled: shallowReactive(new Set<HTMLElement>()),
  branches: shallowReactive(new Set<HTMLElement>())
};

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

let originalBodyPointerEvents: string | undefined;

export function useDismissableLayer(elRef: Ref<HTMLElement | undefined>, options?: UseDismissableLayerOptions) {
  const {
    disableOutsidePointerEvents,
    onEscapeKeydown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss
  } = options || {};

  const ownerDocument = () => elRef.value?.ownerDocument ?? globalThis?.document;

  const index = computed(() => (elRef.value ? Array.from(context.layers).indexOf(elRef.value) : -1));

  const isBodyPointerEventsDisabled = computed(() => context.layersWithOutsidePointerEventsDisabled.size > 0);

  const isPointerEventsEnabled = computed(() => {
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(
      -1
    );
    const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled
      ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled)
      : -1;

    return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
  });

  const pointerEvents = computed(() => {
    if (!isBodyPointerEventsDisabled.value) {
      return undefined;
    }

    return isPointerEventsEnabled.value ? 'auto' : 'none';
  });

  const style = computed<CSSProperties>(() => ({
    pointerEvents: pointerEvents.value
  }));

  usePointerdownOutside(async event => {
    if (!isPointerEventsEnabled.value) return;

    const target = event.target as HTMLElement;

    const isPointerdownOnBranch = [...context.branches].some(branch => branch.contains(target));
    if (isPointerdownOnBranch) return;

    onPointerDownOutside?.(event);
    onInteractOutside?.(event);

    if (!event.defaultPrevented) {
      onDismiss?.();
    }
  }, elRef);

  useFocusOutside(event => {
    const target = event.target as HTMLElement;

    const isFocusInBranch = [...context.branches].some(branch => branch.contains(target));
    if (isFocusInBranch) return;

    onFocusOutside?.(event);
    onInteractOutside?.(event);

    if (!event.defaultPrevented) {
      onDismiss?.();
    }
  }, elRef);

  useEscapeKeydown(event => {
    const isHighestLayer = index.value === context.layers.size - 1;

    if (!isHighestLayer) return;

    onEscapeKeydown?.(event);

    if (!event.defaultPrevented) {
      event.preventDefault();
      onDismiss?.();
    }
  }, ownerDocument);

  watch(elRef, nodeVal => {
    if (!nodeVal) return;

    const ownerDocumentVal = ownerDocument();

    const disabledEvents = toValue(disableOutsidePointerEvents);

    if (disabledEvents) {
      if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
        originalBodyPointerEvents = ownerDocumentVal.body.style.pointerEvents;
        ownerDocumentVal.body.style.pointerEvents = 'none';
      }
      context.layersWithOutsidePointerEventsDisabled.add(nodeVal);
    }

    context.layers.add(nodeVal);

    onWatcherCleanup(() => {
      if (disabledEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
        if (!originalBodyPointerEvents) {
          const styles = ownerDocumentVal.body.style;
          styles.removeProperty('pointer-events');
        } else {
          ownerDocumentVal.body.style.pointerEvents = originalBodyPointerEvents;
        }
      }

      /**
       * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect because a change to
       * `disableOutsidePointerEvents` would remove this layer from the stack and add it to the end again so the
       * layering order wouldn't be _creation order_. We only want them to be removed from context stacks when
       * unmounted.
       */
      context.layers.delete(nodeVal);
      context.layersWithOutsidePointerEventsDisabled.delete(nodeVal);
    });
  });

  return {
    DISMISSABLE_LAYER_ATTRIBUTE,
    pointerEvents,
    style
  };
}

export function useDismissableLayerBranch(elRef: Ref<HTMLElement | undefined>) {
  onMounted(() => {
    if (!elRef.value) return;
    context.branches.add(elRef.value);
  });

  onBeforeUnmount(() => {
    if (!elRef.value) return;
    context.branches.delete(elRef.value);
  });
}

/**
 * Listens for `pointerdown` outside a DOM subtree. We use `pointerdown` rather than `pointerup` to mimic layer
 * dismissing behavior present in OS. Returns props to pass to the node we want to check for outside events.
 */
export function usePointerdownOutside(
  onPointerDownOutside: (event: PointerDownOutsideEvent) => void,
  node: Ref<HTMLElement | undefined>
) {
  let isPointerInsideDOMTree = false;

  let handleClick = () => {};

  const ret = {
    onPointerdownCapture: () => {
      isPointerInsideDOMTree = true;
    }
  };

  if (!isClient()) {
    return ret;
  }

  watch(node, nodeVal => {
    if (!nodeVal) return;

    const ownerDocument = nodeVal.ownerDocument;

    async function handlePointerDown(event: PointerEvent) {
      if (!node.value) return;

      const target = event.target as HTMLElement;

      isPointerInsideDOMTree = isInsideDOMTree(node.value, target);

      if (target && !isPointerInsideDOMTree) {
        const eventDetail = { originalEvent: event };

        function handleAndDispatchPointerDownOutsideEvent() {
          handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, onPointerDownOutside, eventDetail);
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

  return ret;
}

/**
 * Listens for when focus happens outside a DOM subtree. Returns props to pass to the root (node) of the subtree we want
 * to check.
 */
export function useFocusOutside(
  onFocusOutside: (event: FocusOutsideEvent) => void,
  node: Ref<HTMLElement | undefined>
) {
  let isFocusInsideDOMTree = false;

  const ret = {
    onFocusCapture: () => {
      isFocusInsideDOMTree = true;
    },
    onBlurCapture: () => {
      isFocusInsideDOMTree = false;
    }
  };

  if (!isClient()) {
    return ret;
  }

  const handleFocus = async (event: FocusEvent) => {
    await nextTick();

    if (!node.value) return;

    isFocusInsideDOMTree = isInsideDOMTree(node.value, event.target as HTMLElement);

    if (event.target && !isFocusInsideDOMTree) {
      const eventDetail = { originalEvent: event };
      handleAndDispatchCustomEvent(FOCUS_OUTSIDE, onFocusOutside, eventDetail);
    }
  };

  watch(node, nodeVal => {
    if (!nodeVal) return;

    const ownerDocument = nodeVal.ownerDocument;

    ownerDocument.addEventListener('focusin', handleFocus);

    onWatcherCleanup(() => {
      ownerDocument.removeEventListener('focusin', handleFocus);
    });
  });

  return ret;
}

function isInsideDOMTree(mainLayer: HTMLElement, targetElement: HTMLElement) {
  if (!mainLayer) return false;

  const targetLayer = targetElement.closest<HTMLElement>(`[${DISMISSABLE_LAYER_ATTRIBUTE}]`);

  if (!targetLayer) return false;

  if (mainLayer === targetLayer) return true;

  const layerList = Array.from(
    mainLayer.ownerDocument.querySelectorAll<HTMLElement>(`[${DISMISSABLE_LAYER_ATTRIBUTE}]`)
  );

  if (layerList.indexOf(mainLayer) < layerList.indexOf(targetLayer)) return true;

  return false;
}
