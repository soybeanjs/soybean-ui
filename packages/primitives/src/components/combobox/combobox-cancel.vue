<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectComboboxRootContext } from './context';
import type { ComboboxCancelPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxCancel'
});

const props = withDefaults(defineProps<ComboboxCancelPropsWithPrimitive>(), {
  as: 'button'
});

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

useForwardExpose();

const { filterSearch, inputElement } = injectComboboxRootContext();

function handleClick() {
  // Reset the search to show all options.
  filterSearch.value = '';

  if (inputElement.value) {
    inputElement.value.value = '';
    inputElement.value.focus();
  }
}
</script>

<template>
  <Primitive v-bind="props" :type="tag" tabindex="-1" @click="handleClick">
    <slot />
  </Primitive>
</template>
