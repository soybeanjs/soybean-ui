<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleRoot } from '../collapsible';
import { useArrowNavigation, useForwardExpose } from '../../composables';
import { injectAccordionRootContext, provideAccordionItemContext } from './context';
import type { AccordionItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'AccordionItem'
});

const { class: className, value, disabled } = defineProps<AccordionItemPropsWithPrimitive>();

const {
  isSingle,
  modelValue,
  disabled: rootDisabled,
  parentElement,
  collapsible,
  orientation,
  direction,
  unmountOnHide
} = injectAccordionRootContext();
const { currentRef, currentElement } = useForwardExpose();

const open = computed(() => {
  return isSingle.value
    ? value === modelValue.value
    : Array.isArray(modelValue.value) && modelValue.value.includes(value);
});

const propDisabled = computed(() => {
  return rootDisabled.value || disabled || (isSingle.value && open.value && !collapsible.value);
});

function handleArrowKey(e: KeyboardEvent) {
  useArrowNavigation(e, currentElement.value, parentElement.value!, {
    arrowKeyOptions: orientation.value,
    dir: direction.value,
    focus: true
  });
}

const { dataState, dataDisabled } = provideAccordionItemContext({
  open,
  disabled: propDisabled,
  currentRef,
  currentElement,
  value: computed(() => value)
});

defineExpose({ open, dataDisabled });
</script>

<template>
  <CollapsibleRoot
    :class="className"
    :as
    :as-child
    :disabled="propDisabled"
    :open
    :data-orientation="orientation"
    :data-state
    :data-disabled
    :unmount-on-hide="unmountOnHide"
    @keydown.up.down.left.right.home.end="handleArrowKey"
  >
    <slot :open="open" />
  </CollapsibleRoot>
</template>
