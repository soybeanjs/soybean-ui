<script setup lang="ts" generic="T extends string | string[]">
import { computed } from 'vue';
import { AccordionRoot, useCombinedPropsEmits } from '@soybean-ui/primitives';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionRootEmits, AccordionRootProps } from '../types';

defineOptions({
  name: 'SAccordionRoot'
});

const { class: cls, size, ...delegatedProps } = defineProps<AccordionRootProps<T>>();

const emit = defineEmits<AccordionRootEmits>();

const forwarded = useCombinedPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = accordionVariants({ size });

  return cn(root(), cls);
});
</script>

<template>
  <AccordionRoot v-slot="slotProps" v-bind="forwarded" :class="mergedCls">
    <slot v-bind="slotProps" />
  </AccordionRoot>
</template>
