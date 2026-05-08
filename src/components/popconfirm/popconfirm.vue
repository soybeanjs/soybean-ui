<script setup lang="ts">
import { computed } from 'vue';
import type {
  PopconfirmCancelProps as HeadlessPopconfirmCancelProps,
  PopconfirmConfirmProps as HeadlessPopconfirmConfirmProps
} from '@soybeanjs/headless/popconfirm';
import { PopconfirmCompact, providePopconfirmUi } from '@soybeanjs/headless/popconfirm';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { keysOf } from '@soybeanjs/utils';
import { mergeBaseVariants, mergeSlotVariants } from '@/theme';
import { providePopconfirmContext } from './context';
import { omitPopconfirmButtonStyleProps, resolvePopconfirmButtonVariants } from './shared';
import { popconfirmVariants } from './variants';
import type { PopconfirmEmits, PopconfirmProps, PopconfirmSlots } from './types';

defineOptions({
  name: 'SPopconfirm'
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: false,
  showArrow: true,
  showIcon: true,
  showCancel: 'onlyWarning'
});

const emit = defineEmits<PopconfirmEmits>();

const slots = defineSlots<PopconfirmSlots>();

const forwardedProps = useOmitProps(props, ['cancelProps', 'class', 'confirmProps', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = keysOf(slots);

const confirmProps = computed<HeadlessPopconfirmConfirmProps | undefined>(() => omitPopconfirmButtonStyleProps(props.confirmProps));

const cancelProps = computed<HeadlessPopconfirmCancelProps | undefined>(() => omitPopconfirmButtonStyleProps(props.cancelProps));

const ui = computed(() => {
  const baseVariants = popconfirmVariants({
    size: props.size,
    type: props.type
  });

  const variants = mergeBaseVariants(baseVariants, {
    cancel: resolvePopconfirmButtonVariants(props.cancelProps, props.size, { variant: 'pure' }),
    confirm: resolvePopconfirmButtonVariants(props.confirmProps, props.size)
  });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

providePopconfirmUi(ui);
providePopconfirmContext({
  ...transformPropsToContext(props, ['size'])
});
</script>

<template>
  <PopconfirmCompact v-bind="forwardedProps" :cancel-props="cancelProps" :confirm-props="confirmProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </PopconfirmCompact>
</template>
