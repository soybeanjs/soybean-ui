<script setup lang="ts">
import { ref } from 'vue';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { injectDialogRootContext } from './context';
import DialogContentImpl from './dialog-content-impl.vue';
import type { DialogContentImplEmits, DialogContentImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogContentNonModal'
});

const props = defineProps<DialogContentImplPropsWithPrimitive>();
const emit = defineEmits<DialogContentImplEmits>();

const forwarded = useForwardPropsEmits(props, emit);

useForwardExpose();

const { triggerElement } = injectDialogRootContext();

const hasInteractedOutsideRef = ref(false);
const hasPointerDownOutsideRef = ref(false);

function onCloseAutoFocus(event: Event) {
  if (event.defaultPrevented) return;
  if (!hasInteractedOutsideRef.value) {
    // Always prevent auto focus because we either focus manually or want user agent focus
    triggerElement.value?.focus();
  }
  event.preventDefault();
}

function onInteractOutside(event: FocusOutsideEvent | PointerDownOutsideEvent) {
  if (event.defaultPrevented) return;
  hasInteractedOutsideRef.value = true;
  if (event.detail.originalEvent.type === 'pointerdown') {
    hasPointerDownOutsideRef.value = true;
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
}
</script>

<template>
  <DialogContentImpl
    v-bind="forwarded"
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </DialogContentImpl>
</template>
