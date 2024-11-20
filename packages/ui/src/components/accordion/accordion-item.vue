<script setup lang="ts">
import { computed } from 'vue';
import { AccordionItem } from '@soybean-ui/primitive';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionItemProps } from './types';

defineOptions({
  name: 'SAccordionItem'
});

const { class: cls, value, disabled } = defineProps<AccordionItemProps>();

const { item } = accordionVariants();

const mergedCls = computed(() => cn(item(), cls));
</script>

<template>
  <AccordionItem v-slot="slotProps" :class="mergedCls" :value :disabled>
    <slot v-bind="slotProps"></slot>
  </AccordionItem>
</template>
