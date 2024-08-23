<script setup lang="ts">
import { AccordionContent } from 'radix-vue';
import { accordionVariants, cn } from '@soybean-unify/ui-variants';
import type { AccordionContentProps } from './types';

defineOptions({
  name: 'SAccordionContent'
});

const props = defineProps<AccordionContentProps>();

const { content, contentBody } = accordionVariants();
</script>

<template>
  <AccordionContent :as="as" :as-child="asChild" :class="cn(content(), props.class)">
    <div :class="cn(contentBody(), bodyClass)">
      <slot />
    </div>
  </AccordionContent>
</template>
