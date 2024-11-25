<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectSelectItemContext } from './context';
import type { SelectItemIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectItemIndicator'
});

const props = withDefaults(defineProps<SelectItemIndicatorPropsWithPrimitive>(), {
  as: 'span'
});

const itemContext = injectSelectItemContext();
</script>

<template>
  <Primitive v-if="itemContext.isSelected.value" v-bind="props" aria-hidden="true">
    <slot />
  </Primitive>
</template>
