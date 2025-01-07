<script setup lang="ts">
import { PopperArrow } from '../popper';
import { injectSelectContentContext, injectSelectRootContext } from './context';
import type { SelectArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectArrow'
});

const props = withDefaults(defineProps<SelectArrowPropsWithPrimitive>(), {
  width: 10,
  height: 5,
  as: 'svg'
});

const rootContext = injectSelectRootContext();
const contentContext = injectSelectContentContext();
</script>

<template>
  <PopperArrow v-if="rootContext.open.value && contentContext.position === 'popper'" v-bind="props">
    <slot />
  </PopperArrow>
</template>
