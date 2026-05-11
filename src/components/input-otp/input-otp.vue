<script setup lang="ts">
import { computed } from 'vue';
import { InputOtpCompact, provideInputOtpUi } from '@soybeanjs/headless/input-otp';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import { inputOtpVariants } from './variants';
import type { InputOtpProps, InputOtpEmits, InputOtpSlots } from './types';

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

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideInputOtpUi(ui);
</script>

<template>
  <InputOtpCompact v-slot="slotProps" v-bind="rootProps" v-on="listeners">
    <slot v-bind="slotProps" />
  </InputOtpCompact>
</template>
