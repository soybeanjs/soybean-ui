<script setup lang="ts">
import { computed } from 'vue';
import { AccordionContent, useForwardExpose, useForwardProps } from '@soybean-ui/primitive';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionContentProps } from './types';

defineOptions({
  name: 'SAccordionContent'
});

const { class: cls, ...delegatedProps } = defineProps<AccordionContentProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { content } = accordionVariants();

const mergedCls = computed(() => cn(content(), cls));

useForwardExpose();
</script>

<template>
  <AccordionContent v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </AccordionContent>
</template>
