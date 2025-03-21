<script setup lang="ts">
import { computed } from 'vue';
import { AccordionTrigger, Slot, useForwardProps } from '@soybean-ui/primitives';
import { accordionVariants, cn } from '@soybean-ui/variants';
import { ChevronDown } from 'lucide-vue-next';
import type { AccordionTriggerProps } from './types';

defineOptions({
  name: 'SAccordionTrigger'
});

const { class: cls, size, iconClass, ...delegatedProps } = defineProps<AccordionTriggerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { trigger, triggerIcon } = accordionVariants({ size });

  return {
    cls: cn(trigger(), cls),
    icon: cn(triggerIcon(), iconClass)
  };
});
</script>

<template>
  <AccordionTrigger v-bind="forwardedProps" :class="mergedCls.cls">
    <slot />
    <Slot :class="mergedCls.icon">
      <slot name="icon">
        <ChevronDown />
      </slot>
    </Slot>
  </AccordionTrigger>
</template>
