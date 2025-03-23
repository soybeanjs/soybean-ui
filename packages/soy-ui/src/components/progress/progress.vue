<script setup lang="ts">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import SProgressRoot from './progress-root.vue';
import SProgressIndicator from './progress-indicator.vue';
import type { ProgressEmits, ProgressProps } from './types';

defineOptions({
  name: 'SProgress'
});

const { class: cls, ui, ...delegatedProps } = defineProps<ProgressProps>();

const emit = defineEmits<ProgressEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <SProgressRoot v-bind="forwarded" :class="cls || ui?.root">
    <SProgressIndicator :class="ui?.indicator" :model-value="modelValue" :color="color" />
  </SProgressRoot>
</template>
