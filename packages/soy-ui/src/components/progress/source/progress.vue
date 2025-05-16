<script setup lang="ts">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { ProgressEmits, ProgressProps } from '../types';
import SProgressRoot from './progress-root.vue';
import SProgressIndicator from './progress-indicator.vue';

defineOptions({
  name: 'SProgress'
});

const { class: cls, size, ui, ...delegatedProps } = defineProps<ProgressProps>();

const emit = defineEmits<ProgressEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <SProgressRoot v-bind="forwarded" :class="cls || ui?.root" :size="size">
    <SProgressIndicator :class="ui?.indicator" :model-value="modelValue" :color="color" />
  </SProgressRoot>
</template>
