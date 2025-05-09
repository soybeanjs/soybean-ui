<script setup lang="ts">
import { computed } from 'vue';
import { usePrimitiveElement } from '../../composables';
import { Primitive } from '../primitive';
import { injectNumberFieldRootContext } from './context';
import { usePressedHold } from './shared';
import type { NumberFieldDecrementPropsWithPrimitive } from './types';

defineOptions({
  name: 'NumberFieldDecrement'
});

const props = withDefaults(defineProps<NumberFieldDecrementPropsWithPrimitive>(), {
  as: 'button'
});

const rootContext = injectNumberFieldRootContext();
const isDisabled = computed(
  () => rootContext.disabled?.value || props.disabled || rootContext.isDecreaseDisabled.value
);

const { primitiveElement, currentElement } = usePrimitiveElement();
const { isPressed, onTrigger } = usePressedHold({ target: currentElement, disabled: isDisabled });

onTrigger(() => {
  rootContext.handleDecrease();
});
</script>

<template>
  <Primitive
    v-bind="props"
    ref="primitiveElement"
    tabindex="-1"
    aria-label="Decrease"
    :type="as === 'button' ? 'button' : undefined"
    :style="{
      userSelect: isPressed ? 'none' : undefined
    }"
    :disabled="isDisabled ? '' : undefined"
    :data-disabled="isDisabled ? '' : undefined"
    :data-pressed="isPressed ? 'true' : undefined"
    @contextmenu.prevent
  >
    <slot />
  </Primitive>
</template>
