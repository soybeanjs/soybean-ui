<script setup lang="ts">
import { PopperArrow } from '../popper';
import { useForwardExpose } from '../../composables';
import { injectComboboxContentContext, injectComboboxRootContext } from './context';
import type { ComboboxArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxArrow'
});

const props = withDefaults(defineProps<ComboboxArrowPropsWithPrimitive>(), {
  width: 10,
  height: 5,
  as: 'svg'
});

const rootContext = injectComboboxRootContext();
const contentContext = injectComboboxContentContext();

useForwardExpose();
</script>

<template>
  <PopperArrow v-if="rootContext.open.value && contentContext.position.value === 'popper'" v-bind="props">
    <slot />
  </PopperArrow>
</template>
