<script setup lang="ts">
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';
import { injectAccordionItemContext, injectAccordionRootContext } from './context';
import type { AccordionHeaderPropsWithPrimitive } from './types';

defineOptions({
  name: 'AccordionHeader'
});

const { class: className, as = 'h3' } = defineProps<AccordionHeaderPropsWithPrimitive>();

const { orientation } = injectAccordionRootContext();
const { dataState, dataDisabled } = injectAccordionItemContext();

useForwardExpose();
</script>

<template>
  <Primitive :class="className" :as :as-child :data-orientation="orientation" :data-state :data-disabled>
    <slot />
  </Primitive>
</template>
