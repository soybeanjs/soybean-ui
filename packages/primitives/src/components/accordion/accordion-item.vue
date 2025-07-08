<script setup lang="ts">
import { computed } from 'vue';
import { useArrowNavigation, useForwardExpose } from '../../composables';
import { CollapsibleRoot } from '../collapsible';
import { injectAccordionRootContext, provideAccordionItemContext } from './context';
import type { AccordionItemProps } from './types';

defineOptions({
  name: 'AccordionItem'
});

const props = defineProps<AccordionItemProps>();

const {
  isSingle,
  modelValue,
  disabled: ctxDisabled,
  parentElement,
  orientation,
  direction,
  unmountOnHide
} = injectAccordionRootContext();

const open = computed(() => {
  return isSingle.value
    ? props.value === modelValue.value
    : Array.isArray(modelValue.value) && modelValue.value.includes(props.value);
});

const disabled = computed(() => ctxDisabled.value || props.disabled);

const dataDisabled = computed(() => (disabled.value ? '' : undefined));

defineExpose({ open, dataDisabled });

const { currentRef, currentElement } = useForwardExpose();

function handleArrowKey(e: KeyboardEvent) {
  const target = e.target as HTMLElement;
  const allCollectionItems: HTMLElement[] = Array.from(
    parentElement.value?.querySelectorAll('[data-soybean-accordion-trigger]') ?? []
  );

  const collectionItemIndex = allCollectionItems.findIndex(item => item === target);
  if (collectionItemIndex === -1) {
    return null;
  }

  useArrowNavigation(e, target, parentElement.value!, {
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
