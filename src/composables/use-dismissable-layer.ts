import { computed, nextTick, onBeforeUnmount, onMounted, onWatcherCleanup, shallowReactive, toValue, watch } from 'vue';
import type { CSSProperties, MaybeRefOrGetter, Ref } from 'vue';
import { handleAndDispatchCustomEvent, isClient } from '../shared';
import type { DismissableLayerEmits, EmitsToHookProps, FocusOutsideEvent, PointerDownOutsideEvent } from '../types';
import { useEscapeKeydown } from './use-escape-keydown';

// Event type constants
const POINTER_DOWN_OUTSIDE_EVENT = 'dismissableLayer.pointerDownOutside';
const FOCUS_OUTSIDE_EVENT = 'dismissableLayer.focusOutside';
const DISMISSABLE_LAYER_DATA_ATTRIBUTE = 'data-dismissable-layer';

// Layer management with better isolation and performance
interface LayerInfo {
  element: HTMLElement;
  hasDisabledOutsidePointerEvents: boolean;
  ownerDocument: Document;
}

class DismissableLayerManager {
  private activeLayers = shallowReactive(new Set<HTMLElement>());
  private layersWithDisabledPointerEvents = shallowReactive(new Set<HTMLElement>());
  private exemptBranches = shallowReactive(new Set<HTMLElement>());
  private layerInfoCache = new WeakMap<HTMLElement, LayerInfo>();
  private documentPointerEventsState = new WeakMap<Document, string | undefined>();

  // Cached arrays to avoid repeated Array.from() calls
  private cachedActiveLayers: HTMLElement[] = [];
  private cachedDisabledLayers: HTMLElement[] = [];

  private updateCache(): void {
    this.cachedActiveLayers = Array.from(this.activeLayers);
    this.cachedDisabledLayers = Array.from(this.layersWithDisabledPointerEvents);
  }

  registerLayer(element: HTMLElement, hasDisabledPointerEvents: boolean): void {
    const ownerDocument = element.ownerDocument;

    // Cache layer info for faster lookups
    this.layerInfoCache.set(element, {
      element,
      hasDisabledOutsidePointerEvents: hasDisabledPointerEvents,
      ownerDocument
    });

    this.activeLayers.add(element);

    if (hasDisabledPointerEvents) {
      // Only modify body pointer events if this is the first layer with disabled events
      if (this.layersWithDisabledPointerEvents.size === 0) {
        this.documentPointerEventsState.set(ownerDocument, ownerDocument.body.style.pointerEvents);
        ownerDocument.body.style.pointerEvents = 'none';
      }
      this.layersWithDisabledPointerEvents.add(element);
    }

    this.updateCache();
  }

  unregisterLayer(element: HTMLElement): void {
    const layerInfo = this.layerInfoCache.get(element);
    if (!layerInfo) return;

    this.activeLayers.delete(element);

    if (layerInfo.hasDisabledOutsidePointerEvents) {
      this.layersWithDisabledPointerEvents.delete(element);

      // Restore body pointer events if this was the last layer with disabled events
      if (this.layersWithDisabledPointerEvents.size === 0) {
        const savedPointerEvents = this.documentPointerEventsState.get(layerInfo.ownerDocument);
        if (savedPointerEvents === undefined) {
          layerInfo.ownerDocument.body.style.removeProperty('pointer-events');
        } else {
          layerInfo.ownerDocument.body.style.pointerEvents = savedPointerEvents;
        }
        this.documentPointerEventsState.delete(layerInfo.ownerDocument);
      }
    }

    this.layerInfoCache.delete(element);
    this.updateCache();
  }

  getLayerIndex(element: HTMLElement): number {
    return this.cachedActiveLayers.indexOf(element);
  }

  hasLayersWithDisabledPointerEvents(): boolean {
    return this.layersWithDisabledPointerEvents.size > 0;
  }

  isLayerPointerEventsEnabled(element: HTMLElement): boolean {
    if (this.cachedDisabledLayers.length === 0) return true;

    const layerIndex = this.getLayerIndex(element);
    const topMostDisabledLayer = this.cachedDisabledLayers[this.cachedDisabledLayers.length - 1];
    const topMostDisabledLayerIndex = this.cachedActiveLayers.indexOf(topMostDisabledLayer);

    return layerIndex >= topMostDisabledLayerIndex;
  }

  isTopMostLayer(element: HTMLElement): boolean {
    return this.getLayerIndex(element) === this.activeLayers.size - 1;
  }

  addExemptBranch(element: HTMLElement): void {
    this.exemptBranches.add(element);
  }

  removeExemptBranch(element: HTMLElement): void {
    this.exemptBranches.delete(element);
  }

  isTargetInExemptBranch(target: HTMLElement): boolean {
    // Use for...of for better performance with early exit
    for (const exemptBranch of this.exemptBranches) {
      if (exemptBranch.contains(target)) {
        return true;
      }
    }
    return false;
  }

  // Cleanup method for testing or manual cleanup
  clear(): void {
    this.activeLayers.clear();
    this.layersWithDisabledPointerEvents.clear();
    this.exemptBranches.clear();
    this.layerInfoCache = new WeakMap();
    this.documentPointerEventsState = new WeakMap();
    this.cachedActiveLayers = [];
    this.cachedDisabledLayers = [];
  }
}

// Create a singleton instance with better encapsulation
const layerManager = new DismissableLayerManager();

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

export interface UseDismissableLayerReturn {
  DISMISSABLE_LAYER_DATA_ATTRIBUTE: string;
  computedPointerEvents: Ref<string | undefined>;
  computedStyle: Ref<CSSProperties>;
  layerProps: {
    [DISMISSABLE_LAYER_DATA_ATTRIBUTE]: true;
  };
}

export interface UseOutsidePointerDownReturn {
  onPointerdownCapture: () => void;
}

export interface UseOutsideFocusReturn {
  onFocusCapture: () => void;
  onBlurCapture: () => void;
}

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
): UseDismissableLayerReturn {
  const {
    disableOutsidePointerEvents,
    onEscapeKeydown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss
  } = options;

  const getElementOwnerDocument = (): Document => layerElementRef.value?.ownerDocument ?? globalThis?.document;

  const hasAnyLayerWithDisabledPointerEvents = computed(() => layerManager.hasLayersWithDisabledPointerEvents());

  const isCurrentLayerPointerEventsEnabled = computed(() => {
    if (!layerElementRef.value) return true;
    return layerManager.isLayerPointerEventsEnabled(layerElementRef.value);
  });

  const computedPointerEvents = computed(() => {
    if (!hasAnyLayerWithDisabledPointerEvents.value) return undefined;
    return isCurrentLayerPointerEventsEnabled.value ? 'auto' : 'none';
  });

  const computedStyle = computed<CSSProperties>(() => ({
    pointerEvents: computedPointerEvents.value
  }));

  // Handle pointer down outside the layer
  useOutsidePointerDown(async outsidePointerEvent => {
    if (!isCurrentLayerPointerEventsEnabled.value) return;

    const eventTarget = outsidePointerEvent.target as HTMLElement;
    if (layerManager.isTargetInExemptBranch(eventTarget)) return;

    onPointerDownOutside?.(outsidePointerEvent);
    onInteractOutside?.(outsidePointerEvent);

    if (!outsidePointerEvent.defaultPrevented) {
      onDismiss?.();
    }
  }, layerElementRef);

  // Handle focus outside the layer
  useOutsideFocus(outsideFocusEvent => {
    const eventTarget = outsideFocusEvent.target as HTMLElement;
    if (layerManager.isTargetInExemptBranch(eventTarget)) return;

    onFocusOutside?.(outsideFocusEvent);
    onInteractOutside?.(outsideFocusEvent);

    if (!outsideFocusEvent.defaultPrevented) {
      onDismiss?.();
    }
  }, layerElementRef);

  // Handle escape key press
  useEscapeKeydown(escapeKeyEvent => {
    if (!layerElementRef.value || !layerManager.isTopMostLayer(layerElementRef.value)) return;

    onEscapeKeydown?.(escapeKeyEvent);

    if (!escapeKeyEvent.defaultPrevented) {
      escapeKeyEvent.preventDefault();
      onDismiss?.();
    }
  }, getElementOwnerDocument);

  // Manage layer registration and pointer events state
  watch(layerElementRef, currentLayerElement => {
    if (!currentLayerElement) return;

    const shouldDisableOutsidePointerEvents = toValue(disableOutsidePointerEvents) ?? false;
    layerManager.registerLayer(currentLayerElement, shouldDisableOutsidePointerEvents);

    onWatcherCleanup(() => {
      layerManager.unregisterLayer(currentLayerElement);
    });
  });

  return {
    DISMISSABLE_LAYER_DATA_ATTRIBUTE,
    computedPointerEvents,
    computedStyle,
    layerProps: {
      [DISMISSABLE_LAYER_DATA_ATTRIBUTE]: true
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
      layerManager.addExemptBranch(branchElementRef.value);
    }
  });

  onBeforeUnmount(() => {
    if (branchElementRef.value) {
      layerManager.removeExemptBranch(branchElementRef.value);
    }
  });
}

// Export the layer manager for testing purposes
export { layerManager as _layerManagerForTesting };

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
  watchedElementRef: Ref<HTMLElement | undefined>
): UseOutsidePointerDownReturn {
  let isPointerCurrentlyInsideElement = false;
  let pendingTouchClickHandler: (() => void) | null = null;

  const captureHandlers: UseOutsidePointerDownReturn = {
    onPointerdownCapture: () => {
      isPointerCurrentlyInsideElement = true;
    }
  };

  if (!isClient()) {
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

  if (!isClient()) {
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
