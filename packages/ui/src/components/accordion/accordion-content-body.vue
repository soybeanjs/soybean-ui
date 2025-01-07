<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionContentBodyProps } from './types';

defineOptions({
  name: 'SAccordionContentBody'
});

const { class: cls } = defineProps<AccordionContentBodyProps>();

const { contentBody } = accordionVariants();

const mergedCls = computed(() => cn(contentBody(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div">
    <slot />
  </Primitive>
</template>
