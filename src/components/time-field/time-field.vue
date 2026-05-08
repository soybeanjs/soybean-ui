<script setup lang="ts">
import { computed } from 'vue';
import { TimeFieldCompact, provideTimeFieldUi } from '@soybeanjs/headless/time-field';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { dateFieldVariants } from '../date-field/variants';
import type { TimeFieldProps, TimeFieldEmits } from './types';

defineOptions({
  name: 'STimeField'
});

const props = defineProps<TimeFieldProps>();

const emit = defineEmits<TimeFieldEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const ui = computed(() => {
  const variants = dateFieldVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTimeFieldUi(ui);
</script>

<template>
  <TimeFieldCompact v-bind="forwardedProps" v-on="listeners" />
</template>
