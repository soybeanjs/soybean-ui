<script setup lang="ts">
import { computed } from 'vue';
import { PopoverCompact, providePopoverUi } from '@soybeanjs/headless/popover';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants, miniSizeMap } from '@/theme';
import { buttonIconVariants } from '../button/variants';
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
  const miniSize = miniSizeMap[props.size ?? 'md'];

  const variants = Object.assign(
    popoverVariants({
      size: props.size
    }),
    {
      $base: {
        close: buttonIconVariants({
          size: miniSize
        })
      }
    }
  );

  return mergeVariants(variants, props.ui, { popup: props.class });
});

providePopoverUi(ui);
</script>

<template>
  <PopoverCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <!-- @vue-expect-error ignore slot type error -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </PopoverCompact>
</template>
