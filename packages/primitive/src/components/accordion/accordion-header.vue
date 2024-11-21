<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectAccordionItemContext, injectAccordionRootContext } from './context';
import type { AccordionHeaderPropsWithPrimitive } from './types';

defineOptions({
  name: 'AccordionHeader'
});

const props = withDefaults(defineProps<AccordionHeaderPropsWithPrimitive>(), {
  as: 'h3'
});

const { orientation } = injectAccordionRootContext();
const { dataState, dataDisabled } = injectAccordionItemContext();

useForwardExpose();
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :data-orientation="orientation"
    :data-state="dataState"
    :data-disabled="dataDisabled"
  >
    <slot />
  </Primitive>
</template>
