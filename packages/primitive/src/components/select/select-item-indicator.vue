<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';
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
