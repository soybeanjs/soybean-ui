<script setup lang="ts">
import { computedOmit } from '../../shared';
import SProgressRoot from './progress-root.vue';
import SProgressIndicator from './progress-indicator.vue';
import type { ProgressProps } from './types';

defineOptions({
  name: 'SProgress'
});

const props = defineProps<ProgressProps>();

const delegatedProps = computedOmit(props, ['class', 'indicatorClass', 'modelValue']);

const modelValue = defineModel<number>({
  default: 0
});
</script>

<template>
  <SProgressRoot v-bind="delegatedProps" :class="props.class">
    <SProgressIndicator v-model="modelValue" :class="indicatorClass" :color="color" />
  </SProgressRoot>
</template>

<style scoped></style>
