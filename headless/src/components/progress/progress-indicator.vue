<script setup lang="ts">
import { Primitive } from '../primitive';
import { useProgressRootContext, useProgressUi } from './context';
import type { ProgressIndicatorProps } from './types';

defineOptions({
  name: 'ProgressIndicator'
});

withDefaults(defineProps<ProgressIndicatorProps>(), {
  as: 'div'
});

const cls = useProgressUi('indicator');

const { max, modelValue, progressState } = useProgressRootContext('ProgressIndicator');
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-state="progressState"
    :data-value="modelValue ?? undefined"
    :data-max="max"
  >
    <slot />
  </Primitive>
</template>
