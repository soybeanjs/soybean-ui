<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import Button from '../button/button.vue';
import { useInputNumberRootContext, useInputNumberUi } from './context';
import { usePressedHold } from './shared';
import type { InputNumberIncrementProps } from './types';

defineOptions({
  name: 'InputNumberIncrement'
});

const props = defineProps<InputNumberIncrementProps>();

const { disabled, readonly, isIncreaseDisabled, onIncrease } = useInputNumberRootContext('InputNumberIncrement');

const cls = useInputNumberUi('increment');

const [incrementElement, setIncrementElement] = useForwardElement();

const isDisabled = computed(() => disabled.value || readonly.value || props.disabled || isIncreaseDisabled.value);

const { isPressed, onTrigger } = usePressedHold({ target: incrementElement, disabled: isDisabled });

const style = computed(() => (isPressed.value ? 'user-select:none;' : undefined));

onTrigger(() => {
  onIncrease();
});
</script>

<template>
  <Button
    :ref="setIncrementElement"
    v-bind="props"
    :class="cls"
    tabindex="-1"
    aria-label="Increase"
    :disabled="isDisabled"
    :data-pressed="isPressed ? 'true' : undefined"
    :style="style"
    @contextmenu.prevent
  >
    <slot />
  </Button>
</template>
