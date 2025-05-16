<script setup lang="ts">
import { computed } from 'vue';
import { AccordionContent, useForwardProps } from '@soybean-ui/primitives';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionContentProps } from '../types';

defineOptions({
  name: 'SAccordionContent'
});

const { class: cls, size, content: desc, ...delegatedProps } = defineProps<AccordionContentProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { content } = accordionVariants({ size });

  return cn(content(), cls);
});
</script>

<template>
  <AccordionContent v-bind="forwardedProps" :class="mergedCls">
    <slot>{{ desc }}</slot>
  </AccordionContent>
</template>
