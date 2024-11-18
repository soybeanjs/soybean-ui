<script setup lang="ts">
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';
import { injectComboboxRootContext } from './context';
import type { ComboboxCancelPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxCancel'
});

const props = withDefaults(defineProps<ComboboxCancelPropsWithPrimitive>(), {
  as: 'button'
});

useForwardExpose();

const rootContext = injectComboboxRootContext();

function handleClick() {
  if (rootContext.inputElement.value) {
    rootContext.inputElement.value.value = '';
    rootContext.inputElement.value.focus();
  }
}
</script>

<template>
  <Primitive :type="as === 'button' ? 'button' : undefined" v-bind="props" tabindex="-1" @click="handleClick">
    <slot />
  </Primitive>
</template>
