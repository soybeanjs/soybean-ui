<script setup lang="ts">
import { computed, onBeforeUnmount, shallowRef, useAttrs, watchEffect } from 'vue';
import { useOmitProps } from '../../composables';
import { ProgressState } from './state';
import { DEFAULT_MAX, getProgressIndicatorStyle } from './shared';
import ProgressIndicator from './progress-indicator.vue';
import ProgressRoot from './progress-root.vue';
import type { ProgressProviderProps } from './types';

defineOptions({
  name: 'ProgressProvider',
  inheritAttrs: false
});

const props = defineProps<ProgressProviderProps>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(
  props,
  [
    'minimum',
    'maximum',
    'startPosition',
    'delay',
    'stopDelay',
    'forcedStopDelay',
    'easing',
    'speed',
    'trickle',
    'trickleSpeed',
    'direction',
    'indeterminate',
    'indicatorProps'
  ],
  attrs
);

const renderState = shallowRef(ProgressState.getState());

const stopSubscribe = ProgressState.subscribe(state => {
  renderState.value = state;
});

const stopMount = ProgressState.mount();

const indicatorStyle = computed(() =>
  getProgressIndicatorStyle(
    renderState.value.value === null
      ? null
      : (renderState.value.value / renderState.value.settings.maximum) * DEFAULT_MAX,
    renderState.value.settings.direction,
    renderState.value.settings.speed,
    renderState.value.settings.easing
  )
);

const ariaLabel = computed(() => {
  const label = attrs['aria-label'];

  return typeof label === 'string' && label.trim().length > 0 ? label : 'Loading';
});

watchEffect(() => {
  ProgressState.configure({
    minimum: props.minimum,
    maximum: props.maximum,
    startPosition: props.startPosition,
    delay: props.delay,
    stopDelay: props.stopDelay,
    forcedStopDelay: props.forcedStopDelay,
    easing: props.easing,
    speed: props.speed,
    trickle: props.trickle,
    trickleSpeed: props.trickleSpeed,
    direction: props.direction,
    indeterminate: props.indeterminate
  });
});

onBeforeUnmount(() => {
  stopSubscribe();
  stopMount();
});
</script>

<template>
  <ProgressRoot
    v-if="renderState.visible"
    v-bind="forwardedProps"
    :model-value="renderState.value"
    :max="renderState.settings.maximum"
    :dir="renderState.settings.direction"
    :aria-label="ariaLabel"
    data-slot="root"
  >
    <ProgressIndicator v-bind="indicatorProps" :style="[indicatorProps?.style, indicatorStyle]" data-slot="indicator" />
  </ProgressRoot>
  <slot />
</template>
