<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { AccordionHeader, useForwardProps } from 'radix-vue';
import { accordionVariants, cn } from '@soybean-unify/ui-variants';
import type { AccordionHeaderProps } from './types';

defineOptions({
  name: 'SAccordionHeader'
});

const props = defineProps<AccordionHeaderProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { header } = accordionVariants();
</script>

<template>
  <AccordionHeader v-bind="forwardedProps" :class="cn(header(), props.class)">
    <slot />
  </AccordionHeader>
</template>
