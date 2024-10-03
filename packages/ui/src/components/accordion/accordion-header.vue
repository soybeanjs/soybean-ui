<script setup lang="ts">
import { computed } from 'vue';
import { AccordionHeader } from 'radix-vue';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionHeaderProps } from './types';

defineOptions({
  name: 'SAccordionHeader'
});

const { class: cls } = defineProps<AccordionHeaderProps>();

const { header } = accordionVariants();

const mergedCls = computed(() => cn(header(), cls));
</script>

<template>
  <AccordionHeader :class="mergedCls">
    <slot />
  </AccordionHeader>
</template>
