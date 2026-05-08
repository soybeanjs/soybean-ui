<script setup lang="ts">
import { computed } from 'vue';
import { DialogCompact, provideDialogUi } from '@soybeanjs/headless/dialog';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants, mergeBaseVariants, miniSizeMap } from '@/theme';
import { buttonVariants, buttonIconVariants } from '../button/variants';
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
  const dialog = dialogVariants({
    size: props.size,
    pure: props.pure
  });

  const drawer = drawerVariants({
    size: props.size,
    side: props.side
  });

  const miniSize = miniSizeMap[props.size ?? 'md'];

  const variants = mergeBaseVariants(Object.assign({}, dialog, drawer), {
    cancel: buttonVariants({
      variant: 'pure',
      size: miniSize
    }),
    confirm: buttonVariants({
      variant: 'solid',
      size: miniSize
    }),
    close: buttonIconVariants({
      size: miniSize
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
