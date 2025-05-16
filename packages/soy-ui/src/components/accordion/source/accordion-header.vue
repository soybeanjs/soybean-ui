<script setup lang="ts">
import { computed } from 'vue';
import { AccordionHeader, useForwardProps } from '@soybean-ui/primitives';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionHeaderProps } from '../types';

defineOptions({
  name: 'SAccordionHeader'
});

const { class: cls, ...delegatedProps } = defineProps<AccordionHeaderProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { header } = accordionVariants();

const mergedCls = computed(() => cn(header(), cls));
</script>

<template>
  <AccordionHeader v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </AccordionHeader>
</template>
