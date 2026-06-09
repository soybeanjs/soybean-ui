<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { DateFieldCompact, provideDateFieldUi } from '@soybeanjs/headless/date-field';
import { dateFieldVariants } from '@/styles/date-field';
import type { DateFieldProps, DateFieldEmits } from './types';

defineOptions({
  name: 'SDateField'
});

const props = defineProps<DateFieldProps>();

const emit = defineEmits<DateFieldEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const ui = computed(() => dateFieldVariants({ size: props.size }, props.ui, { root: props.class }));

provideDateFieldUi(ui);
</script>

<template>
  <DateFieldCompact v-bind="forwardedProps" v-on="listeners" />
</template>
