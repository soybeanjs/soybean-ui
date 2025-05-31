<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardElement, usePresence } from '../../composables';
import { Primitive } from '../primitive';
import { useCheckboxRootContext } from './context';
import { isIndeterminate } from './shared';
import type { CheckboxIndicatorProps } from './types';

defineOptions({
  name: 'CheckboxIndicator'
});

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {
  as: 'span'
});

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
    :as="as"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :style="{ pointerEvents: 'none' }"
  >
    <slot />
  </Primitive>
</template>
