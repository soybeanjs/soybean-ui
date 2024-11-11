<script setup lang="ts">
import { useForwardPropsEmits } from 'reka-ui';
import SProgressRoot from './progress-root.vue';
import SProgressIndicator from './progress-indicator.vue';
import type { ProgressEmits, ProgressProps } from './types';

defineOptions({
  name: 'SProgress'
});

const { indicatorClass, ...delegatedProps } = defineProps<ProgressProps>();

const emit = defineEmits<ProgressEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <SProgressRoot v-bind="forwarded">
    <SProgressIndicator :class="indicatorClass" :model-value="modelValue" :color="color" />
  </SProgressRoot>
</template>

<style scoped></style>
