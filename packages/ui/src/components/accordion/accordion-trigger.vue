<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { AccordionTrigger, useForwardProps } from 'radix-vue';
import { ChevronDown } from 'lucide-vue-next';
import { accordionVariants, cn } from '@soybean-unify/ui-variants';
import type { AccordionTriggerProps } from './types';

defineOptions({
  name: 'SAccordionTrigger'
});

const props = defineProps<AccordionTriggerProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { trigger, triggerIcon } = accordionVariants();
</script>

<template>
  <AccordionTrigger v-bind="forwardedProps" :class="cn(trigger(), props.class)">
    <slot />
    <slot name="icon">
      <ChevronDown :size="16" :class="cn(triggerIcon())" />
    </slot>
  </AccordionTrigger>
</template>
