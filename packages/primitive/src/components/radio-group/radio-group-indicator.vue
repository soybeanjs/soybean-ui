<script setup lang="ts">
import { Primitive } from '../primitive';
import { Presence } from '../presence';
import { useForwardExpose } from '../../composables';
import type { RadioGroupIndicatorPropsWithPrimitive } from './types';
import { injectRadioGroupItemContext } from './context';

defineOptions({
  name: 'RadioGroupIndicator',
  inheritAttrs: false
});

const props = withDefaults(defineProps<RadioGroupIndicatorPropsWithPrimitive>(), {
  as: 'span'
});

const { forwardRef } = useForwardExpose();
const itemContext = injectRadioGroupItemContext();
</script>

<template>
  <Presence :present="forceMount || itemContext.checked.value">
    <Primitive
      v-bind="$attrs"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :data-state="itemContext.checked.value ? 'checked' : 'unchecked'"
      :data-disabled="itemContext.disabled.value ? '' : undefined"
    >
      <slot />
    </Primitive>
  </Presence>
</template>
