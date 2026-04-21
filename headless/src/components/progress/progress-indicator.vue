<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useProgressRootContext, useProgressUi } from './context';
import { getValuePercent } from './shared';
import type { ProgressIndicatorProps } from './types';

defineOptions({
  name: 'ProgressIndicator'
});

withDefaults(defineProps<ProgressIndicatorProps>(), {
  as: 'div'
});

const cls = useProgressUi('indicator');

const { dir, max, modelValue, progressState, valuePercent } = useProgressRootContext('ProgressIndicator');

const style = computed(() => {
  const value = getValuePercent(valuePercent.value, dir.value);
  return value !== undefined ? { '--progress-indicator-value': `${value}%` } : {};
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-state="progressState"
    :data-value="modelValue ?? undefined"
    :data-max="max"
    data-slot="indicator"
    :style="style"
  >
    <slot />
  </Primitive>
</template>
