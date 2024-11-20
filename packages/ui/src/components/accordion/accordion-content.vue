<script setup lang="ts">
import { computed } from 'vue';
import { AccordionContent } from '@soybean-ui/primitive';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionContentProps } from './types';

defineOptions({
  name: 'SAccordionContent'
});

const { class: cls } = defineProps<AccordionContentProps>();

const { content } = accordionVariants();

const mergedCls = computed(() => cn(content(), cls));
</script>

<template>
  <AccordionContent :class="mergedCls">
    <slot />
  </AccordionContent>
</template>
