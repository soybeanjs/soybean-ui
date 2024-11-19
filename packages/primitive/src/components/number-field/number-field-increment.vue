<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { usePrimitiveElement } from '../../composables';
import type { NumberFieldIncrementPropsWithPrimitive } from './types';
import { injectNumberFieldRootContext } from './context';
import { usePressedHold } from './shared';

defineOptions({
  name: 'NumberFieldIncrement'
});

const props = withDefaults(defineProps<NumberFieldIncrementPropsWithPrimitive>(), {
  as: 'button'
});

const rootContext = injectNumberFieldRootContext();
const isDisabled = computed(
  () => rootContext.disabled?.value || props.disabled || rootContext.isIncreaseDisabled.value
);

const { primitiveElement, currentElement } = usePrimitiveElement();
const { isPressed, onTrigger } = usePressedHold({ target: currentElement, disabled: isDisabled });

onTrigger(() => {
  rootContext.handleIncrease();
});
</script>

<template>
  <Primitive
    v-bind="props"
    ref="primitiveElement"
    tabindex="-1"
    aria-label="Increase"
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
