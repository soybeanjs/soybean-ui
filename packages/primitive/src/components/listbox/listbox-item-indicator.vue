<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectListboxItemContext } from './listbox-item.vue';

export interface ListboxItemIndicatorProps extends PrimitiveProps {}

const props = withDefaults(defineProps<ListboxItemIndicatorProps>(), {
  as: 'span'
});

useForwardExpose();
const itemContext = injectListboxItemContext();
</script>

<template>
  <Primitive v-if="itemContext.isSelected.value" aria-hidden="true" v-bind="props">
    <slot />
  </Primitive>
</template>
