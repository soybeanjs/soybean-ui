<script setup lang="ts">
import { computed } from 'vue';
import { AccordionHeader, useForwardExpose, useForwardProps } from '@soybean-ui/primitive';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionHeaderProps } from './types';

defineOptions({
  name: 'SAccordionHeader'
});

const { class: cls, ...delegatedProps } = defineProps<AccordionHeaderProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { header } = accordionVariants();

const mergedCls = computed(() => cn(header(), cls));

useForwardExpose();
</script>

<template>
  <AccordionHeader v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </AccordionHeader>
</template>
