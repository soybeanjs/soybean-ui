<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import { Primitive } from '../primitive';
import { useNumberInputRootContext, useNumberInputThemeContext } from './context';
import { usePressedHold } from './shared';
import type { NumberInputDecrementProps } from './types';

defineOptions({
  name: 'NumberInputDecrement'
});

const props = withDefaults(defineProps<NumberInputDecrementProps>(), {
  as: 'button'
});

const { disabled, readonly, isIncreaseDisabled, onDecrease } = useNumberInputRootContext('NumberInputDecrement');

const themeContext = useNumberInputThemeContext();

const cls = computed(() => themeContext?.ui?.value?.decrement);

const [decrementElement, setDecrementElement] = useForwardElement();

const isDisabled = computed(() => disabled.value || readonly.value || props.disabled || isIncreaseDisabled.value);

const { isPressed, onTrigger } = usePressedHold({ target: decrementElement, disabled: isDisabled });

onTrigger(() => {
  onDecrease();
});
</script>

<template>
  <Primitive
    :ref="setDecrementElement"
    :class="cls"
    :type="as === 'button' ? 'button' : undefined"
    tabindex="-1"
    aria-label="Decrease"
    :disabled="isDisabled ? '' : undefined"
    :data-disabled="isDisabled ? '' : undefined"
    :data-pressed="isPressed ? 'true' : undefined"
    :style="{
      userSelect: isPressed ? 'none' : undefined
    }"
    @contextmenu.prevent
  >
    <slot />
  </Primitive>
</template>
