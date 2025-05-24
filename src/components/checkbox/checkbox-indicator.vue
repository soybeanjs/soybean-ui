<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { usePresence } from '../../composables';
import { useCheckboxRootContext } from './context';
import { getState, isIndeterminate } from './shared';
import type { CheckboxIndicatorProps } from './types';

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {
  as: 'span',
  forceMount: false
});

const indicatorElement = useTemplateRef('indicatorRef');
const rootContext = useCheckboxRootContext('CheckboxIndicator');

const shouldShow = computed(
  () => props.forceMount || isIndeterminate(rootContext.state.value) || rootContext.state.value === true
);

const isPresent = usePresence(indicatorElement, shouldShow);
</script>

<template>
  <span
    v-if="isPresent"
    ref="indicatorRef"
    :class="props.class"
    :data-state="getState(rootContext.state.value)"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :style="{ pointerEvents: 'none' }"
  >
    <slot />
  </span>
</template>
