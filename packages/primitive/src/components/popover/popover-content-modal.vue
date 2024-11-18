<script setup lang="ts">
import { ref } from 'vue';
import { useForwardExpose, useForwardPropsEmits, useHideOthers } from '../../composables';
import { useBodyScrollLock } from '../../composables/use-body-scroll-lock';
import PopoverContentImpl, {
  type PopoverContentImplEmits,
  type PopoverContentImplProps
} from './popover-content-impl.vue';
import { injectPopoverRootContext } from './popover-root.vue';

const props = defineProps<PopoverContentImplProps>();
const emits = defineEmits<PopoverContentImplEmits>();
const rootContext = injectPopoverRootContext();
const isRightClickOutsideRef = ref(false);

useBodyScrollLock(true);

const forwarded = useForwardPropsEmits(props, emits);

const { forwardRef, currentElement } = useForwardExpose();
useHideOthers(currentElement);
</script>

<template>
  <PopoverContentImpl
    v-bind="forwarded"
    :ref="forwardRef"
    :trap-focus="rootContext.open.value"
    disable-outside-pointer-events
    @close-auto-focus.prevent="
      event => {
        emits('closeAutoFocus', event);

        if (!isRightClickOutsideRef) rootContext.triggerElement.value?.focus();
      }
    "
    @pointer-down-outside="
      event => {
        emits('pointerDownOutside', event);

        const originalEvent = event.detail.originalEvent;
        const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
        const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

        isRightClickOutsideRef = isRightClick;
      }
    "
    @focus-outside.prevent
  >
    <slot />
  </PopoverContentImpl>
</template>
