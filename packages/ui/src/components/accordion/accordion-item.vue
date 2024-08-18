<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { AccordionItem, useForwardProps } from 'radix-vue';
import { accordionVariants, cn } from '@soybean-unify/ui-variants';
import type { AccordionItemProps } from './types';

defineOptions({
  name: 'SAccordionItem'
});

const props = defineProps<AccordionItemProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { item } = accordionVariants();
</script>

<template>
  <AccordionItem v-slot="slotProps" v-bind="forwardedProps" :class="cn(item(), props.class)">
    <slot v-bind="slotProps"></slot>
  </AccordionItem>
</template>
