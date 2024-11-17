<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectSelectItemContext } from './select-item.vue';

export interface SelectItemIndicatorProps extends PrimitiveProps {}

const props = withDefaults(defineProps<SelectItemIndicatorProps>(), {
  as: 'span'
});

const itemContext = injectSelectItemContext();
</script>

<template>
  <Primitive v-if="itemContext.isSelected.value" aria-hidden="true" v-bind="props">
    <slot />
  </Primitive>
</template>
