<script setup lang="ts">
import { computed } from 'vue';
import { PopconfirmCompact, providePopconfirmUi } from '@soybeanjs/headless/popconfirm';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants, miniSizeMap } from '@/theme';
import { buttonVariants, buttonIconVariants } from '../button/variants';
import { popconfirmVariants } from './variants';
import type { PopconfirmProps, PopconfirmEmits, PopconfirmSlots } from './types';

defineOptions({
  name: 'SPopconfirm'
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  open: undefined,
  showArrow: true,
  showIcon: true,
  showCancel: 'onlyWarning'
});

const emit = defineEmits<PopconfirmEmits>();

const slots = defineSlots<PopconfirmSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = keysOf(slots);

const ui = computed(() => {
  const miniSize = miniSizeMap[props.size ?? 'md'];

  const variants = Object.assign(
    popconfirmVariants({
      size: props.size,
      type: props.type
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

providePopconfirmUi(ui);
</script>

<template>
  <PopconfirmCompact v-bind="forwardedProps" :cancel-props="cancelProps" :confirm-props="confirmProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </PopconfirmCompact>
</template>
