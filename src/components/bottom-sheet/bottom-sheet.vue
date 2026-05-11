<script setup lang="ts">
import { computed } from 'vue';
import { BottomSheetCompact, provideBottomSheetUi } from '@soybeanjs/headless/bottom-sheet';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants, miniSizeMap } from '@/theme';
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
  const variants = Object.assign(
    bottomSheetVariants({ size: props.size }),
    dialogVariants({
      size: props.size,
      pure: props.pure
    }),
    drawerVariants({
      size: props.size,
      side: 'bottom'
    }),
    {
      $base: {
        cancel: buttonVariants({
          variant: 'pure',
          size: miniSizeMap[props.size ?? 'md']
        }),
        confirm: buttonVariants({
          variant: 'solid',
          size: miniSizeMap[props.size ?? 'md']
        }),
        close: buttonIconVariants({
          size: miniSizeMap[props.size ?? 'md']
        })
      }
    }
  );

  return mergeVariants(variants, props.ui, { popup: props.class });
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
