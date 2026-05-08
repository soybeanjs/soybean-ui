<script setup lang="ts">
import { computed } from 'vue';
import { BottomSheetCompact, provideBottomSheetUi } from '@soybeanjs/headless/bottom-sheet';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants, mergeBaseVariants, miniSizeMap } from '@/theme';
import { buttonVariants, buttonIconVariants } from '../button/variants';
import { dialogVariants } from '../dialog/variants';
import { drawerVariants } from '../drawer/variants';
import { bottomSheetVariants } from './variants';
import type { BottomSheetProps, BottomSheetEmits, BottomSheetSlots } from './types';

defineOptions({
  name: 'SBottomSheet'
});

const props = withDefaults(defineProps<BottomSheetProps>(), {
  open: undefined,
  modal: true,
  shouldScaleBackground: true,
  setBackgroundColorOnScale: true,
  dismissible: true,
  showClose: true,
  showConfirm: true
});

const emit = defineEmits<BottomSheetEmits>();

const slots = defineSlots<BottomSheetSlots>();

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
    side: 'bottom'
  });

  const currentVariants = bottomSheetVariants({ size: props.size });

  const baseVariants = Object.assign({}, currentVariants, dialog, drawer);

  const miniSize = miniSizeMap[props.size ?? 'md'];

  const variants = mergeBaseVariants(baseVariants, {
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

provideBottomSheetUi(ui);
</script>

<template>
  <BottomSheetCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </BottomSheetCompact>
</template>
