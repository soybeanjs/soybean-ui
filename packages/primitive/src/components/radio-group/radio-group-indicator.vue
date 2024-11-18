<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';
import Primitive from '../primitive/primitive';
import { Presence } from '../presence';
import { useForwardExpose } from '../../composables';

import { injectRadioGroupItemContext } from './radio-group-item.vue';

export interface RadioGroupIndicatorProps extends PrimitiveProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

withDefaults(defineProps<RadioGroupIndicatorProps>(), {
  as: 'span'
});

const { forwardRef } = useForwardExpose();
const itemContext = injectRadioGroupItemContext();
</script>

<template>
  <Presence :present="forceMount || itemContext.checked.value">
    <Primitive
      :ref="forwardRef"
      :data-state="itemContext.checked.value ? 'checked' : 'unchecked'"
      :data-disabled="itemContext.disabled.value ? '' : undefined"
      :as-child
      :as
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </Presence>
</template>
