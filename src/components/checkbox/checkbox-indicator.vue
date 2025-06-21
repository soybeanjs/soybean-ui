<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardElement, usePresence } from '../../composables';
import { Primitive } from '../primitive';
import { isIndeterminate } from '../../shared';
import { useCheckboxRootContext, useCheckboxThemeContext } from './context';
import type { CheckboxIndicatorProps } from './types';

defineOptions({
  name: 'CheckboxIndicator'
});

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {
  as: 'span'
});

const themeContext = useCheckboxThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.indicator, props.class]);

const [indicatorElement, setIndicatorElement] = useForwardElement();

const { state, dataDisabled, dataState } = useCheckboxRootContext('CheckboxIndicator');

const isPresent = props.forceMount
  ? shallowRef(true)
  : usePresence(indicatorElement, () => isIndeterminate(state.value) || state.value === true);
</script>

<template>
  <Primitive
    v-if="isPresent"
    v-bind="props"
    :ref="setIndicatorElement"
    :class="cls"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :style="{ pointerEvents: 'none' }"
  >
    <slot />
  </Primitive>
</template>
