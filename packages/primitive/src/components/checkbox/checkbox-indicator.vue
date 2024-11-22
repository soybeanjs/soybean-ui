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

const { class: className, as = 'span', forceMount } = defineProps<CheckboxIndicatorPropsWithPrimitive>();
const { forwardRef } = useForwardExpose();

const { state, disabled } = injectCheckboxRootContext();

const present = computed(() => forceMount || isIndeterminate(state.value) || state.value === true);

const dataState = computed(() => getCheckedState(state.value));

const dataDisabled = computed(() => (disabled.value ? '' : undefined));
</script>

<template>
  <Presence :present>
    <Primitive
      v-bind="$attrs"
      :ref="forwardRef"
      :class="className"
      :as
      :as-child
      :data-state
      :data-disabled
      :style="{ pointerEvents: 'none' }"
    >
      <slot />
    </Primitive>
  </Presence>
</template>
