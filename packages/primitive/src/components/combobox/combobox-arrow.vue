<script lang="ts">
import type { PopperArrowProps } from '../popper';
</script>

<script setup lang="ts">
import { PopperArrow } from '../popper';
import { useForwardExpose } from '../../composables';
import { injectComboboxRootContext } from './combobox-root.vue';
import { injectComboboxContentContext } from './combobox-content-impl.vue';

export interface ComboboxArrowProps extends PopperArrowProps {}

const props = withDefaults(defineProps<ComboboxArrowProps>(), {
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
