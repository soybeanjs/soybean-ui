<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { AccordionContent, useForwardProps } from 'radix-vue';
import { accordionVariants, cn } from '@soybean-unify/ui-variants';
import type { AccordionContentProps } from './types';

defineOptions({
  name: 'SAccordionContent'
});

const props = defineProps<AccordionContentProps>();

const delegatedProps = reactiveOmit(props, ['class', 'bodyClass']);

const forwardedProps = useForwardProps(delegatedProps);

const { content, contentBody } = accordionVariants();
</script>

<template>
  <AccordionContent v-bind="forwardedProps" :class="cn(content(), props.class)">
    <div :class="cn(contentBody(), bodyClass)">
      <slot />
    </div>
  </AccordionContent>
</template>
