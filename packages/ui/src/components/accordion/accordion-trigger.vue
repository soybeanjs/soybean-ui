<script setup lang="ts">
import { computed } from 'vue';
import { AccordionTrigger } from 'reka-ui';
import { ChevronDown } from 'lucide-vue-next';
import { accordionVariants, cn } from '@soybean-ui/variants';
import type { AccordionTriggerProps } from './types';

defineOptions({
  name: 'SAccordionTrigger'
});

const { class: cls, triggerIconClass } = defineProps<AccordionTriggerProps>();

const { trigger, triggerIcon } = accordionVariants();

const mergedCls = computed(() => cn(trigger(), cls));

const mergedIconCls = computed(() => cn(triggerIcon(), triggerIconClass));
</script>

<template>
  <AccordionTrigger :class="mergedCls">
    <slot />
    <slot name="icon">
      <ChevronDown :class="mergedIconCls" />
    </slot>
  </AccordionTrigger>
</template>
