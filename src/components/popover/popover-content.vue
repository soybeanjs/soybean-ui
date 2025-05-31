<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { usePresence } from '../../composables';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { usePopoverRootContext } from './context';
import PopoverContentImpl from './popover-content-impl.vue';
import type { PopoverContentEmits, PopoverContentProps } from './types';

defineOptions({
  name: 'PopoverContent'
});

const props = defineProps<PopoverContentProps>();

const emit = defineEmits<PopoverContentEmits>();

const { contentElement, open, modal, triggerElement } = usePopoverRootContext('PopoverContent');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const trapFocus = computed(() => modal.value && open.value);

let hasInteractedOutsideRef = false;
let hasPointerDownOutsideRef = false;

const onCloseAutoFocus = (event: Event) => {
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

const onPointerDownOutside = (event: PointerDownOutsideEvent) => {
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

const onFocusOutside = (event: FocusOutsideEvent) => {
  emit('focusOutside', event);

  // When focus is trapped, a `focusout` event may still happen.
  // We make sure we don't trigger our `onDismiss` in such case.
  event.preventDefault();
};

const onInteractOutside = (event: PointerDownOutsideEvent | FocusOutsideEvent) => {
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
</script>

<template>
  <PopoverContentImpl
    v-if="isPresent"
    v-bind="props"
    :trap-focus="trapFocus"
    :disable-outside-pointer-events="modal"
    @escape-keydown="emit('escapeKeydown', $event)"
    @pointer-down-outside="onPointerDownOutside"
    @focus-outside="onFocusOutside"
    @interact-outside="onInteractOutside"
    @open-auto-focus="emit('openAutoFocus', $event)"
    @close-auto-focus="onCloseAutoFocus"
  >
    <slot />
  </PopoverContentImpl>
</template>
