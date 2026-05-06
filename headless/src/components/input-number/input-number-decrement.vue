<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import Button from '../button/button.vue';
import { useInputNumberRootContext, useInputNumberUi } from './context';
import { usePressedHold } from './shared';
import type { InputNumberDecrementProps } from './types';

defineOptions({
  name: 'InputNumberDecrement'
});

const props = defineProps<InputNumberDecrementProps>();

const { disabled, readonly, isIncreaseDisabled, onDecrease } = useInputNumberRootContext('InputNumberDecrement');

const cls = useInputNumberUi('decrement');

const [decrementElement, setDecrementElement] = useForwardElement();

const isDisabled = computed(() => disabled.value || readonly.value || props.disabled || isIncreaseDisabled.value);

const { isPressed, onTrigger } = usePressedHold({ target: decrementElement, disabled: isDisabled });

const style = computed(() => (isPressed.value ? 'user-select:none;' : undefined));

onTrigger(() => {
  onDecrease();
});
</script>

<template>
  <Button
    :ref="setDecrementElement"
    :class="cls"
    tabindex="-1"
    aria-label="Decrease"
    :disabled="isDisabled"
    :data-pressed="isPressed ? 'true' : undefined"
    :style="style"
    @contextmenu.prevent
  >
    <slot />
  </Button>
</template>
