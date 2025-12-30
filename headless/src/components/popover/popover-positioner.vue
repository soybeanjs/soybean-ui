<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardListeners, useOmitProps, usePopupEvents, usePresence } from '../../composables';
import { usePopoverRootContext } from './context';
import PopoverPositionerImpl from './popover-positioner-impl.vue';
import type { PopoverPositionerEmits, PopoverPositionerProps } from './types';

defineOptions({
  name: 'PopoverPositioner'
});

const props = defineProps<PopoverPositionerProps>();

const forwardedProps = useOmitProps(props, ['forceMount']);

const emit = defineEmits<PopoverPositionerEmits>();

const listeners = useForwardListeners(emit);

const { popupElement, open, modal, triggerElement } = usePopoverRootContext('PopoverPositioner');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(popupElement, open);

const trapFocus = computed(() => modal.value && open.value);

const { onPointerDownOutside, onFocusOutside, onInteractOutside, onCloseAutoFocus } = usePopupEvents({
  modal,
  triggerElement
});
</script>

<template>
  <PopoverPositionerImpl
    v-if="isPresent"
    v-bind="forwardedProps"
    :trap-focus="trapFocus"
    v-on="listeners"
    @pointer-down-outside="onPointerDownOutside"
    @focus-outside="onFocusOutside"
    @interact-outside="onInteractOutside"
    @close-auto-focus="onCloseAutoFocus"
  >
    <slot />
  </PopoverPositionerImpl>
</template>
