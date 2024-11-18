<script setup lang="ts">
import { ref } from 'vue';
import { useForwardPropsEmits } from '../../composables';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import PopoverContentImpl from './popover-content-impl.vue';
import type { PopoverContentImplEmits, PopoverContentImplPropsWithPrimitive } from './types';
import { injectPopoverRootContext } from './context';

defineOptions({
  name: 'PopoverContentNonModal'
});

const props = defineProps<PopoverContentImplPropsWithPrimitive>();

const emit = defineEmits<PopoverContentImplEmits>();

const rootContext = injectPopoverRootContext();
const hasInteractedOutsideRef = ref(false);
const hasPointerDownOutsideRef = ref(false);

const forwarded = useForwardPropsEmits(props, emit);

function onCloseAutoFocus(event: Event) {
  emit('closeAutoFocus', event);

  if (!event.defaultPrevented) {
    if (!hasInteractedOutsideRef.value) {
      rootContext.triggerElement.value?.focus();
    }
    // Always prevent auto focus because we either focus manually or want user agent focus
    event.preventDefault();
  }

  hasInteractedOutsideRef.value = false;
  hasPointerDownOutsideRef.value = false;
}

function onInteractOutside(event: PointerDownOutsideEvent | FocusOutsideEvent) {
  emit('interactOutside', event);

  if (!event.defaultPrevented) {
    hasInteractedOutsideRef.value = true;
    if (event.detail.originalEvent.type === 'pointerdown') {
      hasPointerDownOutsideRef.value = true;
    }
  }

  // Prevent dismissing when clicking the trigger.
  // As the trigger is already setup to close, without doing so would
  // cause it to close and immediately open.
  const target = event.target as HTMLElement;
  const targetIsTrigger = rootContext.triggerElement.value?.contains(target);
  if (targetIsTrigger) event.preventDefault();

  // On Safari if the trigger is inside a container with tabIndex={0}, when clicked
  // we will get the pointer down outside event on the trigger, but then a subsequent
  // focus outside event on the container, we ignore any focus outside event when we've
  // already had a pointer down outside event.
  if (event.detail.originalEvent.type === 'focusin' && hasPointerDownOutsideRef.value) {
    event.preventDefault();
  }
}
</script>

<template>
  <PopoverContentImpl
    v-bind="forwarded"
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </PopoverContentImpl>
</template>
