<script setup lang="ts">
import { AccordionContent } from 'radix-vue';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionContentProps } from './types';

defineOptions({
  name: 'SAccordionContent'
});

const props = defineProps<AccordionContentProps>();

const { content } = accordionVariants();
</script>

<template>
  <AccordionContent :class="cn(content(), props.class)">
    <slot />
  </AccordionContent>
</template>
