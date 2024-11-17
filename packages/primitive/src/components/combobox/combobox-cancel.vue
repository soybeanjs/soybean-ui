<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectComboboxRootContext } from './combobox-root.vue';

export interface ComboboxCancelProps extends PrimitiveProps {}

const props = withDefaults(defineProps<ComboboxCancelProps>(), {
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
