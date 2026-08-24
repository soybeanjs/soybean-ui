import { computed, nextTick, onBeforeUnmount, shallowRef, watchEffect } from 'vue';
import type { ComputedRef } from 'vue';
import type { PopperV2RootContext, PopperV2TriggerProps } from './types';
import { useVirtualPointReference } from './use-virtual-point-reference';

interface UsePopperTriggerOptions {
  /**
   * Invoked when the contextmenu virtual point moves; should request a positioner update so an
   * already-open popup repositions without rebuilding `autoUpdate`.
   */
  onVirtualPointChange: () => void;
}

interface UsePopperTriggerReturn {
  reference: ComputedRef<PopperV2TriggerProps['reference']>;
  onBlur: (event: FocusEvent) => void;
  onClick: (event: PointerEvent) => Promise<void>;
  onContextMenu: (event: MouseEvent) => Promise<void>;
  onFocus: (event: FocusEvent) => void;
  onPointerCancel: () => void;
  onPointerDown: (event: PointerEvent) => Promise<void>;
  onPointerEnter: (event: PointerEvent) => void;
  onPointerLeave: (event: PointerEvent) => void;
  onPointerMove: (event: PointerEvent) => void;
  onPointerUp: () => void;
}

interface Point {
  x: number;
  y: number;
}

const longPressMoveTolerance = 8;

export function usePopperV2Trigger(
  props: PopperV2TriggerProps,
  context: PopperV2RootContext,
  options: UsePopperTriggerOptions
): UsePopperTriggerReturn {
  const { reference: virtualReference, setPoint } = useVirtualPointReference({
    onPointChange: options.onVirtualPointChange
  });

  const reference = computed(() => (props.trigger === 'contextmenu' ? virtualReference : props.reference));
  const openOnFocus = computed(() => props.openOnFocus ?? props.trigger === 'hover');
  const pressOpenDelay = computed(() => props.pressOpenDelay ?? 700);

  const pointerDownPoint = shallowRef<Point>();

  let isPointerDown = false;
  let longPressTimer: ReturnType<typeof setTimeout> | undefined;
  let pointerEndTimer: ReturnType<typeof setTimeout> | undefined;
  let pointerOwnerDocument: Document | undefined;

  function clearLongPressTimer() {
    if (longPressTimer === undefined) return;
    clearTimeout(longPressTimer);
    longPressTimer = undefined;
  }

  function clearPointerEndTimer() {
    if (pointerEndTimer === undefined) return;
    clearTimeout(pointerEndTimer);
    pointerEndTimer = undefined;
  }

  function removeDocumentPointerListeners() {
    pointerOwnerDocument?.removeEventListener('pointerup', onDocumentPointerEnd);
    pointerOwnerDocument?.removeEventListener('pointercancel', onDocumentPointerEnd);
    pointerOwnerDocument = undefined;
  }

  function onDocumentPointerEnd() {
    clearLongPressTimer();
    removeDocumentPointerListeners();

    // Deferred (rather than synchronous) so focus/click events dispatched after pointerup in the
    // same task still observe `isPointerDown === true`; the timer is tracked and cleared on
    // unmount so no async work outlives the component.
    clearPointerEndTimer();
    pointerEndTimer = setTimeout(() => {
      isPointerDown = false;
      pointerEndTimer = undefined;
    }, 0);
  }

  function registerDocumentPointerListeners(ownerDocument: Document) {
    removeDocumentPointerListeners();
    pointerOwnerDocument = ownerDocument;
    ownerDocument.addEventListener('pointerup', onDocumentPointerEnd, { once: true });
    ownerDocument.addEventListener('pointercancel', onDocumentPointerEnd, { once: true });
  }

  function isTouchOrPen(event: PointerEvent) {
    return event.pointerType !== 'mouse';
  }

  function hasPointerMoved(event: PointerEvent) {
    if (!pointerDownPoint.value) return false;

    const deltaX = event.clientX - pointerDownPoint.value.x;
    const deltaY = event.clientY - pointerDownPoint.value.y;

    return Math.hypot(deltaX, deltaY) > longPressMoveTolerance;
  }

  function onPointerEnter(event: PointerEvent) {
    context.onTriggerPointerInsideChange(true);
    context.cancelHoverClose();

    if (props.trigger !== 'hover' || event.pointerType === 'touch') return;
    context.onHoverOpen('trigger-hover');
  }

  function onPointerLeave(event: PointerEvent) {
    context.onTriggerPointerInsideChange(false);

    if (props.trigger !== 'hover' || event.pointerType === 'touch') return;
    context.onHoverClose('trigger-hover');
  }

  async function onPointerDown(event: PointerEvent) {
    isPointerDown = true;
    registerDocumentPointerListeners((event.currentTarget as HTMLElement).ownerDocument);

    if (props.trigger !== 'contextmenu' || !isTouchOrPen(event)) return;

    await nextTick();
    if (event.defaultPrevented || context.disabled.value) return;

    clearLongPressTimer();
    setPoint(event.clientX, event.clientY);
    pointerDownPoint.value = { x: event.clientX, y: event.clientY };
    longPressTimer = setTimeout(() => {
      context.onOpenChange(true, 'trigger-contextmenu');
      longPressTimer = undefined;
    }, pressOpenDelay.value);
  }

  function onPointerMove(event: PointerEvent) {
    if (props.trigger !== 'contextmenu' || !isTouchOrPen(event) || !hasPointerMoved(event)) return;
    clearLongPressTimer();
  }

  function onPointerUp() {
    onDocumentPointerEnd();
  }

  function onPointerCancel() {
    onDocumentPointerEnd();
  }

  async function onClick(event: PointerEvent) {
    if (props.trigger !== 'click') return;

    await nextTick();
    if (event.defaultPrevented || context.disabled.value) return;

    if (event.button !== 0 || event.ctrlKey) return;
    context.onOpenToggle('trigger-click');
  }

  async function onContextMenu(event: MouseEvent) {
    if (props.trigger !== 'contextmenu') return;

    await nextTick();
    if (event.defaultPrevented || context.disabled.value) return;

    clearLongPressTimer();
    setPoint(event.clientX, event.clientY);
    context.onOpenChange(true, 'trigger-contextmenu');
    event.preventDefault();
  }

  function onFocus(event: FocusEvent) {
    if (!openOnFocus.value || isPointerDown || context.disabled.value) return;

    if (props.focusVisibleOnly && !(event.target as HTMLElement | null)?.matches?.(':focus-visible')) {
      return;
    }

    context.onHoverOpen('trigger-focus');
  }

  function onBlur(event: FocusEvent) {
    if (!openOnFocus.value) return;

    const relatedTarget = event.relatedTarget;
    if (relatedTarget instanceof Node && context.positionerElement.value?.contains(relatedTarget)) {
      return;
    }

    context.onHoverClose('trigger-focus');
  }

  watchEffect(() => {
    const type = props.trigger ?? 'click';

    context.configureTrigger({
      type,
      openDelay: props.openDelay ?? (type === 'hover' ? 150 : 0),
      focusOpenDelay: props.focusOpenDelay ?? props.openDelay ?? (type === 'hover' ? 150 : 0),
      closeDelay: props.closeDelay ?? 0,
      skipDelayDuration: props.skipDelayDuration ?? 300,
      pressOpenDelay: props.pressOpenDelay ?? 700,
      openOnFocus: props.openOnFocus ?? type === 'hover',
      disabled: props.disabled ?? false
    });

    if (props.id) {
      context.triggerId.value = props.id;
    }
  });

  onBeforeUnmount(() => {
    clearLongPressTimer();
    clearPointerEndTimer();
    removeDocumentPointerListeners();
    isPointerDown = false;
    context.onTriggerPointerInsideChange(false);
  });

  return {
    reference,
    onBlur,
    onClick,
    onContextMenu,
    onFocus,
    onPointerCancel,
    onPointerDown,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
    onPointerUp
  };
}
