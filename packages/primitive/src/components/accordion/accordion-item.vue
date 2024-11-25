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

const {
  isSingle,
  modelValue,
  disabled: ctxDisabled,
  parentElement,
  collapsible,
  orientation,
  direction,
  unmountOnHide
} = injectAccordionRootContext();

const open = computed(() => {
  return isSingle.value
    ? props.value === modelValue.value
    : Array.isArray(modelValue.value) && modelValue.value.includes(props.value);
});

const disabled = computed(() => {
  return ctxDisabled.value || props.disabled || (isSingle.value && open.value && !collapsible.value);
});

const dataDisabled = computed(() => (disabled.value ? '' : undefined));

defineExpose({ open, dataDisabled });

const { currentRef, currentElement } = useForwardExpose();

function handleArrowKey(e: KeyboardEvent) {
  useArrowNavigation(e, currentElement.value, parentElement.value!, {
    arrowKeyOptions: orientation.value,
    dir: direction.value,
    focus: true
  });
}

const { dataState } = provideAccordionItemContext({
  open,
  disabled,
  currentRef,
  currentElement,
  value: computed(() => props.value)
});
</script>

<template>
  <CollapsibleRoot
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :disabled="disabled"
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
