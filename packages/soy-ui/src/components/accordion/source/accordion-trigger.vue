<script setup lang="ts">
import { computed } from 'vue';
import { AccordionTrigger, Slot, useForwardProps } from '@soybean-ui/primitives';
import { accordionVariants, cn } from '@soybean-ui/variants';
import { ChevronDown } from 'lucide-vue-next';
import type { AccordionTriggerProps } from '../types';

defineOptions({
  name: 'SAccordionTrigger'
});

const { class: cls, size, ui, title, icon, ...delegatedProps } = defineProps<AccordionTriggerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { trigger, triggerLeadingIcon, triggerIcon } = accordionVariants({ size });

  return {
    cls: cn(trigger(), cls),
    leadingIcon: cn(triggerLeadingIcon(), ui?.triggerLeadingIcon),
    icon: cn(triggerIcon(), ui?.triggerIcon)
  };
});
</script>

<template>
  <AccordionTrigger v-bind="forwardedProps" :class="mergedCls.cls">
    <slot name="leading">
      <component :is="icon" v-if="icon" :class="mergedCls.leadingIcon" />
    </slot>
    <slot>
      <span>{{ title }}</span>
    </slot>
    <slot name="trailing" />
    <Slot :class="mergedCls.icon">
      <slot name="icon">
        <ChevronDown />
      </slot>
    </Slot>
  </AccordionTrigger>
</template>
