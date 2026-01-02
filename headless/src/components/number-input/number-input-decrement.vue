<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import { Primitive } from '../primitive';
import { useNumberInputRootContext, useNumberInputUi } from './context';
import { usePressedHold } from './shared';
import type { NumberInputDecrementProps } from './types';

defineOptions({
  name: 'NumberInputDecrement'
});

const props = withDefaults(defineProps<NumberInputDecrementProps>(), {
  as: 'button'
});

const { disabled, readonly, isIncreaseDisabled, onDecrease } = useNumberInputRootContext('NumberInputDecrement');

const cls = useNumberInputUi('decrement');

const [decrementElement, setDecrementElement] = useForwardElement();

const isDisabled = computed(() => disabled.value || readonly.value || props.disabled || isIncreaseDisabled.value);

const { isPressed, onTrigger } = usePressedHold({ target: decrementElement, disabled: isDisabled });

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const style = computed(() => (isPressed.value ? 'user-select:none;' : undefined));

onTrigger(() => {
  onDecrease();
});
</script>

<template>
  <Primitive
    :ref="setDecrementElement"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :type="tag"
    tabindex="-1"
    aria-label="Decrease"
    :disabled="isDisabled ? '' : undefined"
    :data-disabled="isDisabled ? '' : undefined"
    :data-pressed="isPressed ? 'true' : undefined"
    :style="style"
    @contextmenu.prevent
  >
    <slot />
  </Primitive>
</template>
