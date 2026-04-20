<script setup lang="ts">
import { computed } from 'vue';
import { DialogCompact, provideDialogUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants, mergeBaseVariants, miniSizeMap } from '@/theme';
import { buttonVariants } from '../button/variants';
import { dialogVariants } from '../dialog/variants';
import { drawerVariants } from './variants';
import type { DrawerEmits, DrawerProps, DrawerSlots } from './types';

defineOptions({
  name: 'SDrawer'
});

const props = withDefaults(defineProps<DrawerProps>(), {
  open: undefined,
  modal: true,
  showClose: true
});

const emit = defineEmits<DrawerEmits>();

const slots = defineSlots<DrawerSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const baseVariants = dialogVariants({
    size: props.size,
    pure: props.pure
  });

  const currentVariants = drawerVariants({
    size: props.size,
    side: props.side
  });

  baseVariants.popup = currentVariants.popup;

  const variants = mergeBaseVariants(baseVariants, {
    cancel: buttonVariants({
      variant: 'pure',
      size: miniSizeMap[props.size ?? 'md']
    }),
    confirm: buttonVariants({
      variant: 'solid',
      size: miniSizeMap[props.size ?? 'md']
    }),
    close: buttonVariants({
      variant: 'ghost',
      color: 'accent',
      size: miniSizeMap[props.size ?? 'md'],
      shape: 'square',
      fitContent: true
    })
  });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

provideDialogUi(ui);
</script>

<template>
  <DialogCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </DialogCompact>
</template>
