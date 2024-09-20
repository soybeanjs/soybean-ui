<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionContentBodyProps } from './types';

defineOptions({
  name: 'SAccordionContentBody'
});

const props = defineProps<AccordionContentBodyProps>();

const { contentBody } = accordionVariants();
</script>

<template>
  <Primitive as="div" :class="cn(contentBody(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
