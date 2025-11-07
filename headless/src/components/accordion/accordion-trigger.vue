<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleTrigger } from '../collapsible';
import { useAccordionItemContext, useAccordionRootContext, useAccordionThemeContext } from './context';
import type { AccordionTriggerProps } from './types';

defineOptions({
  name: 'AccordionTrigger'
});

defineProps<AccordionTriggerProps>();

const { collapsible, orientation, onModelValueChange, isMultiple } = useAccordionRootContext('AccordionTrigger');
const { setTriggerElement, triggerId, initTriggerId, open, value, dataDisabled, dataState, disabled } =
  useAccordionItemContext('AccordionTrigger');

const themeContext = useAccordionThemeContext();

const cls = computed(() => themeContext?.ui?.value?.trigger);

const onClick = () => {
  if (disabled.value) return;

  const disabledTrigger = !isMultiple.value && open.value && !collapsible.value;
  if (disabledTrigger) return;

  onModelValueChange(value.value);
};

initTriggerId();
</script>

<template>
  <CollapsibleTrigger
    :id="triggerId"
    :ref="setTriggerElement"
    :as="as"
    :as-child="asChild"
    :class="cls"
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
