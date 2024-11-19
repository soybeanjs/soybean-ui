<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectListboxItemContext } from './context';
import type { ListboxItemIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'ListboxItemIndicator'
});

const props = withDefaults(defineProps<ListboxItemIndicatorPropsWithPrimitive>(), {
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
