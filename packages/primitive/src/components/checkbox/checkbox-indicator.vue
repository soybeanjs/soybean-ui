<script lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { Presence } from '../presence';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { injectCheckboxRootContext } from './checkbox-root.vue';
import { getState, isIndeterminate } from './utils';

export interface CheckboxIndicatorProps extends PrimitiveProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

withDefaults(defineProps<CheckboxIndicatorProps>(), {
  as: 'span'
});
const { forwardRef } = useForwardExpose();

const rootContext = injectCheckboxRootContext();
</script>

<template>
  <Presence :present="forceMount || isIndeterminate(rootContext.state.value) || rootContext.state.value === true">
    <Primitive
      :ref="forwardRef"
      :data-state="getState(rootContext.state.value)"
      :data-disabled="rootContext.disabled.value ? '' : undefined"
      :style="{ pointerEvents: 'none' }"
      :as-child
      :as
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </Presence>
</template>
