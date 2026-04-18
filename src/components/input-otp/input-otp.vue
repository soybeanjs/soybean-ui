<script setup lang="ts">
import { computed } from 'vue';
import { InputOtpCompact, provideInputOtpUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { inputOtpVariants } from './variants';
import type { InputOtpEmits, InputOtpProps, InputOtpSlots } from './types';

defineOptions({
  name: 'SInputOtp'
});

const props = defineProps<InputOtpProps>();

const emit = defineEmits<InputOtpEmits>();

defineSlots<InputOtpSlots>();

const listeners = useForwardListeners(emit);

const rootProps = useOmitProps(props, ['class', 'size', 'align', 'ui']);

const ui = computed(() => {
  const variants = inputOtpVariants({
    size: props.size,
    align: props.align
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideInputOtpUi(ui);
</script>

<template>
  <InputOtpCompact v-slot="slotProps" v-bind="rootProps" v-on="listeners">
    <slot v-bind="slotProps" />
  </InputOtpCompact>
</template>
