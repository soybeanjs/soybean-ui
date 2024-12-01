<script setup lang="ts">
import { ref } from 'vue';
import { useBodyScrollLock, useForwardExpose, useForwardPropsEmits, useHideOthers } from '../../composables';
import type { PointerDownOutsideEvent } from '../../types';
import { injectPopoverRootContext } from './context';
import PopoverContentImpl from './popover-content-impl.vue';
import type { PopoverContentImplEmits, PopoverContentImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopoverContentModal'
});

const props = defineProps<PopoverContentImplPropsWithPrimitive>();

const emit = defineEmits<PopoverContentImplEmits>();

const rootContext = injectPopoverRootContext();
const isRightClickOutsideRef = ref(false);

const forwarded = useForwardPropsEmits(props, emit);

const { forwardRef, currentElement } = useForwardExpose();

function onCloseAutoFocus(event: Event) {
  emit('closeAutoFocus', event);

  if (!isRightClickOutsideRef.value) {
    rootContext.triggerElement.value?.focus();
  }
}

function onPointerDownOutside(event: PointerDownOutsideEvent) {
  emit('pointerDownOutside', event);

  const originalEvent = event.detail.originalEvent;
  const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
  const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

  isRightClickOutsideRef.value = isRightClick;
}

useBodyScrollLock(true);
useHideOthers(currentElement);
</script>

<template>
  <PopoverContentImpl
    v-bind="forwarded"
    :ref="forwardRef"
    :trap-focus="rootContext.open.value"
    disable-outside-pointer-events
    @close-auto-focus.prevent="onCloseAutoFocus"
    @pointer-down-outside="onPointerDownOutside"
    @focus-outside.prevent
  >
    <slot />
  </PopoverContentImpl>
</template>
