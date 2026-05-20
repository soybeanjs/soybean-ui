<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { TimeFieldCompact, provideTimeFieldUi } from '@soybeanjs/headless/time-field';
import { dateFieldVariants } from '@/styles/date-field';
import type { TimeFieldProps, TimeFieldEmits } from './types';

defineOptions({
  name: 'STimeField'
});

const props = defineProps<TimeFieldProps>();

const emit = defineEmits<TimeFieldEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const ui = computed(() => dateFieldVariants({ size: props.size }, props.ui, { root: props.class }));

provideTimeFieldUi(ui);
</script>

<template>
  <TimeFieldCompact v-bind="forwardedProps" v-on="listeners" />
</template>
