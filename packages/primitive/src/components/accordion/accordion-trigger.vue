<script setup lang="ts">
import { CollapsibleTrigger } from '../collapsible';
import { injectAccordionItemContext, injectAccordionRootContext } from './context';
import type { AccordionTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'AccordionTrigger'
});

const props = defineProps<AccordionTriggerPropsWithPrimitive>();

const { orientation, changeModelValue } = injectAccordionRootContext();

const { dataState, dataDisabled, value, triggerId, currentRef, disabled, open, initTriggerId } =
  injectAccordionItemContext();
initTriggerId();

function changeItem() {
  if (dataDisabled.value) return;

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
