<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { AccordionTrigger, useForwardProps } from 'radix-vue';
import { ChevronDown } from 'lucide-vue-next';
import { cn } from '@soybean-unify/ui-variants';
import type { AccordionTriggerProps } from './types';

defineOptions({
  name: 'SAccordionTrigger'
});

const props = defineProps<AccordionTriggerProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AccordionTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 bg-transparent',
        props.class
      )
    "
  >
    <slot />
    <slot name="icon">
      <ChevronDown :size="16" class="shrink-0 text-muted-foreground transition-transform duration-200" />
    </slot>
  </AccordionTrigger>
</template>
