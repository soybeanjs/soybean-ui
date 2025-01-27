<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Presence } from '../presence';
import { Primitive } from '../primitive';
import { injectCheckboxRootContext } from './context';
import { getCheckedState, isIndeterminate } from './shared';
import type { CheckboxIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'CheckboxIndicator',
  inheritAttrs: false
});

const props = withDefaults(defineProps<CheckboxIndicatorPropsWithPrimitive>(), {
  as: 'span'
});

const { forwardRef } = useForwardExpose();

const { disabled, state } = injectCheckboxRootContext();

const present = computed(() => props.forceMount || isIndeterminate(state.value) || state.value === true);

const dataDisabled = computed(() => (disabled.value ? '' : undefined));

const dataState = computed(() => getCheckedState(state.value));
</script>

<template>
  <Presence :present="present">
    <Primitive
      v-bind="$attrs"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :data-disabled="dataDisabled"
      :data-state="dataState"
      :style="{ pointerEvents: 'none' }"
    >
      <slot />
    </Primitive>
  </Presence>
</template>
