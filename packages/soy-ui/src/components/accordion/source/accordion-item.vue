<script setup lang="ts">
import { computed } from 'vue';
import { AccordionItem, useForwardProps } from '@soybean-ui/primitives';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionItemProps } from '../types';

defineOptions({
  name: 'SAccordionItem'
});

const { class: cls, ...delegatedProps } = defineProps<AccordionItemProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { item } = accordionVariants();

const mergedCls = computed(() => cn(item(), cls));
</script>

<template>
  <AccordionItem v-slot="slotProps" v-bind="forwardedProps" :class="mergedCls">
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>
