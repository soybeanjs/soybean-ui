<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleRoot } from '../collapsible';
import { useArrowNavigation } from '../../composables';
import { COLLECTION_ITEM_ATTRIBUTE } from '../../constants';
import { getOpenFromSingleOrMultiple, transformPropsToContext } from '../../shared';
import { provideAccordionItemContext, useAccordionRootContext } from './context';
import type { AccordionItemProps } from './types';

const props = defineProps<AccordionItemProps>();

const {
  modelValue,
  disabled: rootDisabled,
  isSingle,
  rootElement,
  orientation,
  direction,
  unmountOnHide
} = useAccordionRootContext('AccordionItem');

const open = computed(() => getOpenFromSingleOrMultiple(props.value, modelValue.value, isSingle.value));
const disabled = computed(() => rootDisabled.value || props.disabled);

const { dataDisabled, dataState, triggerElement } = provideAccordionItemContext({
  open,
  disabled,
  ...transformPropsToContext(props, ['value'])
});

const onKeydown = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement;
  const allCollectionItems: HTMLElement[] = Array.from(
    rootElement.value?.querySelectorAll(`[${COLLECTION_ITEM_ATTRIBUTE}]`) ?? []
  );

  const collectionItemIndex = allCollectionItems.findIndex(item => item === target);
  if (collectionItemIndex === -1) return;

  if (!triggerElement.value || !rootElement.value) return;

  useArrowNavigation(e, triggerElement.value, rootElement.value, {
    arrowKeyOptions: orientation.value,
    dir: direction.value,
    focus: true
  });
};

defineExpose({
  open,
  dataDisabled
});
</script>

<template>
  <CollapsibleRoot
    :class="props.class"
    :as="as"
    :open="open"
    :disabled="disabled"
    :unmount-on-hide="unmountOnHide"
    :data-disabled="dataDisabled"
    :data-orientation="orientation"
    :data-state="dataState"
    @keydown="onKeydown"
  >
    <slot :open="open" />
  </CollapsibleRoot>
</template>
