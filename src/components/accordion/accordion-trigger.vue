<script setup lang="ts">
import { CollapsibleTrigger } from '../collapsible';
import { useAccordionItemContext, useAccordionRootContext } from './context';
import type { AccordionTriggerProps } from './types';

defineOptions({
  name: 'AccordionTrigger'
});

const props = defineProps<AccordionTriggerProps>();

const { collapsible, orientation, toggleModelValue, isSingle } = useAccordionRootContext('AccordionTrigger');
const { setTriggerElement, triggerId, initTriggerId, open, value, dataDisabled, dataState, disabled } =
  useAccordionItemContext('AccordionTrigger');

const onClick = () => {
  if (disabled.value) return;

  const disabledTrigger = isSingle.value && open.value && !collapsible.value;
  if (disabledTrigger) return;

  toggleModelValue(value.value);
};

initTriggerId();
</script>

<template>
  <CollapsibleTrigger
    v-bind="props"
    :id="triggerId"
    :ref="setTriggerElement"
    data-soybean-collection-item
    :aria-disabled="disabled || undefined"
    :aria-expanded="open || false"
    :data-disabled="dataDisabled"
    :data-orientation="orientation"
    :data-state="dataState"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </CollapsibleTrigger>
</template>
