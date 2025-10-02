<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import { Primitive } from '../primitive';
import { useNumberInputRootContext, useNumberInputThemeContext } from './context';
import { usePressedHold } from './shared';
import type { NumberInputIncrementProps } from './types';

defineOptions({
  name: 'NumberInputIncrement'
});

const props = withDefaults(defineProps<NumberInputIncrementProps>(), {
  as: 'button'
});

const { disabled, readonly, isIncreaseDisabled, onIncrease } = useNumberInputRootContext('NumberInputIncrement');

const themeContext = useNumberInputThemeContext();

const cls = computed(() => themeContext?.ui?.value?.increment);

const [incrementElement, setIncrementElement] = useForwardElement();

const isDisabled = computed(() => disabled.value || readonly.value || props.disabled || isIncreaseDisabled.value);

const { isPressed, onTrigger } = usePressedHold({ target: incrementElement, disabled: isDisabled });

onTrigger(() => {
  onIncrease();
});
</script>

<template>
  <Primitive
    :ref="setIncrementElement"
    :class="cls"
    :type="as === 'button' ? 'button' : undefined"
    tabindex="-1"
    aria-label="Increase"
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
