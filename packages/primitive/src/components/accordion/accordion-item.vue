<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleRoot } from '../collapsible';
import { useArrowNavigation, useForwardExpose } from '../../composables';
import { injectAccordionRootContext, provideAccordionItemContext } from './context';
import type { AccordionItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'AccordionItem'
});

const props = defineProps<AccordionItemPropsWithPrimitive>();

const { currentRef, currentElement } = useForwardExpose();
const { isSingle, modelValue, disabled, parentElement, collapsible, orientation, direction, unmountOnHide } =
  injectAccordionRootContext();

const open = computed(() => {
  return isSingle.value
    ? props.value === modelValue.value
    : Array.isArray(modelValue.value) && modelValue.value.includes(props.value);
});

const propDisabled = computed(() => {
  return disabled.value || props.disabled || (isSingle.value && open.value && !collapsible.value);
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
  value: computed(() => props.value)
});

defineExpose({ open, dataDisabled });
</script>

<template>
  <CollapsibleRoot
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :disabled="propDisabled"
    :open="open"
    :data-state="dataState"
    :data-disabled="dataDisabled"
    :data-orientation="orientation"
    :unmount-on-hide="unmountOnHide"
    @keydown.up.down.left.right.home.end="handleArrowKey"
  >
    <slot :open="open" />
  </CollapsibleRoot>
</template>
