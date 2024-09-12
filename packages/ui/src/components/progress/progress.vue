<script setup lang="ts">
import { useForwardPropsEmits } from 'radix-vue';
import type { ProgressRootEmits } from 'radix-vue';
import { computedOmit } from '../../shared';
import SProgressRoot from './progress-root.vue';
import SProgressIndicator from './progress-indicator.vue';
import type { ProgressProps } from './types';

defineOptions({
  name: 'SProgress'
});

const props = defineProps<ProgressProps>();

const emit = defineEmits<ProgressRootEmits>();

const delegatedProps = computedOmit(props, ['indicatorClass']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <SProgressRoot v-bind="forwarded">
    <SProgressIndicator :model-value="modelValue" :class="indicatorClass" :color="color" />
  </SProgressRoot>
</template>

<style scoped></style>
