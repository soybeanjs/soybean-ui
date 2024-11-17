<script setup lang="ts">
import { CollapsibleTrigger } from '../collapsible';
import { injectAccordionItemContext, injectAccordionRootContext } from './context';
import type { AccordionTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'AccordionTrigger'
});

const { class: className } = defineProps<AccordionTriggerPropsWithPrimitive>();

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
    :class="className"
    :as
    :as-child
    data-soybean-accordion-trigger
    :aria-disabled="disabled || undefined"
    :aria-expanded="open || false"
    :data-disabled="dataDisabled"
    :data-orientation="orientation"
    :data-state="dataState"
    :disabled="disabled"
    @click="changeItem"
  >
    <slot />
  </CollapsibleTrigger>
</template>
