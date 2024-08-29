<script setup lang="ts">
import { AccordionHeader } from 'radix-vue';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionHeaderProps } from './types';

defineOptions({
  name: 'SAccordionHeader'
});

const props = defineProps<AccordionHeaderProps>();

const { header } = accordionVariants();
</script>

<template>
  <AccordionHeader :as="as" :as-child="asChild" :class="cn(header(), props.class)">
    <slot />
  </AccordionHeader>
</template>
