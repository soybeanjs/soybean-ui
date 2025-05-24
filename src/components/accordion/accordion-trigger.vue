<script setup lang="ts">
import { CollapsibleTrigger } from '../collapsible';
import { COLLECTION_ITEM_ATTRIBUTE } from '../../constants';
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
    :id="triggerId"
    :ref="setTriggerElement"
    :class="props.class"
    :as="as"
    :[COLLECTION_ITEM_ATTRIBUTE]="true"
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
