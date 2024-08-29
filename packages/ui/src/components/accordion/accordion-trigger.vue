<script setup lang="ts">
import { AccordionTrigger } from 'radix-vue';
import { ChevronDown } from 'lucide-vue-next';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionTriggerProps } from './types';

defineOptions({
  name: 'SAccordionTrigger'
});

const props = defineProps<AccordionTriggerProps>();

const { trigger, triggerIcon } = accordionVariants();
</script>

<template>
  <AccordionTrigger :as="as" :as-child="asChild" :class="cn(trigger(), props.class)">
    <slot />
    <slot name="icon">
      <ChevronDown :size="16" :class="cn(triggerIcon())" />
    </slot>
  </AccordionTrigger>
</template>
