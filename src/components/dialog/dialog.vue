<script setup lang="ts">
import { computed } from 'vue';
import { DialogCompact, provideDialogUi } from '@soybeanjs/headless/dialog';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants, miniSizeMap } from '@/theme';
import { buttonVariants, buttonIconVariants } from '../button/variants';
import { dialogVariants } from './variants';
import type { DialogProps, DialogEmits, DialogSlots } from './types';

defineOptions({
  name: 'SDialog'
});

const props = withDefaults(defineProps<DialogProps>(), {
  open: undefined,
  modal: true,
  showClose: true
});

const emit = defineEmits<DialogEmits>();

const slots = defineSlots<DialogSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const miniSize = miniSizeMap[props.size ?? 'md'];

  const variants = Object.assign(
    dialogVariants({
      size: props.size,
      pure: props.pure
    }),
    {
      $base: {
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
      }
    }
  );

  return mergeVariants(variants, props.ui, { popup: props.class });
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
