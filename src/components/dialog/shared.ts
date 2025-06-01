import type { ComputedRef, ShallowRef } from 'vue';
import type { FocusOutsideEvent, PointerDownOutsideEvent, ShortEmits } from '../../types';
import type { DialogContentEmits } from './types';

interface UseDialogContentOptions {
  modal: ComputedRef<boolean | undefined>;
  triggerElement: ShallowRef<HTMLElement | undefined>;
  emit: ShortEmits<DialogContentEmits>;
}

export function useDialogContentEvents(options: UseDialogContentOptions) {
  const { modal, triggerElement, emit } = options;

  let hasInteractedOutsideRef = false;
  let hasPointerDownOutsideRef = false;

  const escapeKeyDown = (event: KeyboardEvent) => {
    emit('escapeKeyDown', event);
  };

  const pointerDownOutside = (event: PointerDownOutsideEvent) => {
    emit('pointerDownOutside', event);

    if (event.defaultPrevented) return;
    const originalEvent = event.detail.originalEvent;
    const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
    const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

    // If the event is a right-click, we shouldn't close because
    // it is effectively as if we right-clicked the `Overlay`.
    if (isRightClick) {
      event.preventDefault();
    }
  };

  const focusOutside = (event: FocusOutsideEvent) => {
    emit('focusOutside', event);

    // When focus is trapped, a `focusout` event may still happen.
    // We make sure we don't trigger our `onDismiss` in such case.
    event.preventDefault();
  };

  const interactOutside = (event: PointerDownOutsideEvent | FocusOutsideEvent) => {
    emit('interactOutside', event);

    if (!event.defaultPrevented) {
      hasInteractedOutsideRef = true;
      if (event.detail.originalEvent.type === 'pointerdown') {
        hasPointerDownOutsideRef = true;
      }
    }

    // Prevent dismissing when clicking the trigger.
    // As the trigger is already setup to close, without doing so would
    // cause it to close and immediately open.
    const target = event.target as HTMLElement;
    const targetIsTrigger = triggerElement.value?.contains(target);
    if (targetIsTrigger) {
      event.preventDefault();
    }

    // On Safari if the trigger is inside a container with tabIndex={0}, when clicked
    // we will get the pointer down outside event on the trigger, but then a subsequent
    // focus outside event on the container, we ignore any focus outside event when we've
    // already had a pointer down outside event.
    if (event.detail.originalEvent.type === 'focusin' && hasPointerDownOutsideRef) {
      event.preventDefault();
    }
  };

  const openAutoFocus = (event: Event) => {
    emit('openAutoFocus', event);
  };

  const closeAutoFocus = (event: Event) => {
    emit('closeAutoFocus', event);

    if (modal.value) {
      if (!event.defaultPrevented) {
        event.preventDefault();
        triggerElement.value?.focus();
      }

      return;
    }

    if (!event.defaultPrevented) {
      if (!hasInteractedOutsideRef) {
        triggerElement.value?.focus();
      }
      // Always prevent auto focus because we either focus manually or want user agent focus
      event.preventDefault();
    }
    hasInteractedOutsideRef = false;
    hasPointerDownOutsideRef = false;
  };

  return {
    escapeKeyDown,
    pointerDownOutside,
    focusOutside,
    interactOutside,
    openAutoFocus,
    closeAutoFocus
  };
}
