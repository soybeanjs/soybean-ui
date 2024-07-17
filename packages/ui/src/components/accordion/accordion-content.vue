<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { AccordionContent, useForwardProps } from 'radix-vue';
import { cn } from '../../shared';
import type { AccordionContentProps } from './types';

defineOptions({
  name: 'SAccordionContent'
});

const props = defineProps<AccordionContentProps>();

const delegatedProps = reactiveOmit(props, ['class', 'bodyClass']);

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AccordionContent
    v-bind="forwardedProps"
    :class="
      cn(
        'overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
        props.class
      )
    "
  >
    <div :class="cn('pb-4 pt-0', props.bodyClass)">
      <slot />
    </div>
  </AccordionContent>
</template>
