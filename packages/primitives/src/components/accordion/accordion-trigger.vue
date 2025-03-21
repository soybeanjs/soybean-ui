<script setup lang="ts">
import { CollapsibleTrigger } from '../collapsible';
import { injectAccordionItemContext, injectAccordionRootContext } from './context';
import type { AccordionTriggerProps } from './types';

defineOptions({
  name: 'AccordionTrigger'
});

const props = defineProps<AccordionTriggerProps>();

const { orientation, collapsible, isSingle, changeModelValue } = injectAccordionRootContext();

const { dataState, dataDisabled, value, triggerId, currentRef, disabled, open, initTriggerId } =
  injectAccordionItemContext();
initTriggerId();

function changeItem() {
  const triggerDisabled = isSingle.value && open.value && !collapsible.value;
  if (disabled.value || triggerDisabled) return;

  changeModelValue(value.value);
}
</script>

<template>
  <CollapsibleTrigger
    :id="triggerId"
    :ref="currentRef"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :aria-disabled="disabled || undefined"
    :aria-expanded="open || false"
    :data-state="dataState"
    :data-disabled="dataDisabled"
    :data-orientation="orientation"
    data-soybean-accordion-trigger
    :disabled="disabled"
    @click="changeItem"
  >
    <slot />
  </CollapsibleTrigger>
</template>
