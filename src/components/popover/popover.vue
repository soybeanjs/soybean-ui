<script setup lang="ts">
import { computed } from 'vue';
import {
  PopoverArrow,
  PopoverClose,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
  providePopoverUi
} from '@soybeanjs/headless';
import { useForwardListeners, usePickProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { popoverVariants } from '@/variants/popover';
import type { PopoverEmits, PopoverProps } from './types';

defineOptions({
  name: 'SPopover'
});

const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  defaultOpen: false,
  avoidCollisions: true,
  showArrow: true
});

const emit = defineEmits<PopoverEmits>();

const forwardedRootProps = usePickProps(props, ['defaultOpen', 'open', 'modal']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = popoverVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

const positionerProps = computed(() => {
  return {
    placement: props.placement,
    ...props.positionerProps
  };
});

providePopoverUi(ui);
</script>

<template>
  <PopoverRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal v-bind="portalProps">
      <PopoverPositioner v-bind="positionerProps" v-on="listeners">
        <PopoverPopup v-bind="popupProps">
          <slot />
          <PopoverArrow v-if="showArrow" v-bind="arrowProps" />
        </PopoverPopup>
        <PopoverClose v-if="$slots.close" as-child>
          <slot name="close" />
        </PopoverClose>
      </PopoverPositioner>
    </PopoverPortal>
  </PopoverRoot>
</template>
