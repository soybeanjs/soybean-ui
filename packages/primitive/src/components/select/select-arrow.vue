<script lang="ts">
import type { PopperArrowProps } from '../popper';
</script>

<script setup lang="ts">
import { PopperArrow } from '../popper';
import { injectSelectRootContext } from './select-root.vue';
import { SelectContentDefaultContextValue, injectSelectContentContext } from './select-content-impl.vue';

export interface SelectArrowProps extends PopperArrowProps {}

const props = withDefaults(defineProps<SelectArrowProps>(), {
  width: 10,
  height: 5,
  as: 'svg'
});
const rootContext = injectSelectRootContext();
const contentContext = injectSelectContentContext(SelectContentDefaultContextValue);
</script>

<template>
  <PopperArrow v-if="rootContext.open.value && contentContext.position === 'popper'" v-bind="props">
    <slot />
  </PopperArrow>
</template>
