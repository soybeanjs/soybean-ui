<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { AccordionHeader, useForwardProps } from 'radix-vue';
import { cn } from '@soybean-unify/ui-variants';
import type { AccordionHeaderProps } from './types';

defineOptions({
  name: 'SAccordionHeader'
});

const props = defineProps<AccordionHeaderProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AccordionHeader v-bind="forwardedProps" :class="cn('flex', props.class)">
    <slot />
  </AccordionHeader>
</template>
