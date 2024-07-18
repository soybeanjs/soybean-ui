<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { AccordionItem, useForwardProps } from 'radix-vue';
import { cn } from '../../shared';
import type { AccordionItemProps } from './types';

defineOptions({
  name: 'SAccordionItem'
});

const props = defineProps<AccordionItemProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AccordionItem v-slot="slotProps" v-bind="forwardedProps" :class="cn('border-b', props.class)">
    <slot v-bind="slotProps"></slot>
  </AccordionItem>
</template>
