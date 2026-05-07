<script setup lang="ts">
import { computed } from 'vue';
import { PopoverCompact, providePopoverUi } from '@soybeanjs/headless/popover';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeBaseVariants, mergeSlotVariants, miniSizeMap } from '@/theme';
import { buttonVariants } from '../button/variants';
import { popoverVariants } from './variants';
import type { PopoverProps, PopoverEmits, PopoverSlots } from './types';

defineOptions({
  name: 'SPopover'
});

const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  defaultOpen: false,
  showArrow: true
});

const emit = defineEmits<PopoverEmits>();

const slots = defineSlots<PopoverSlots>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const baseVariants = popoverVariants({
    size: props.size
  });

  const variants = mergeBaseVariants(baseVariants, {
    close: buttonVariants({
      size: miniSizeMap[props.size ?? 'md'],
      color: 'accent',
      variant: 'ghost',
      shape: 'square',
      fitContent: true
    })
  });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

providePopoverUi(ui);
</script>

<template>
  <PopoverCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </PopoverCompact>
</template>
