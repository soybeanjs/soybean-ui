<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleRoot } from '../collapsible';
import { useArrowNavigation, useOmitProps } from '../../composables';
import { getCollectionItemElements, getOpenFromSingleOrMultiple, transformPropsToContext } from '../../shared';
import { provideAccordionItemContext, useAccordionRootContext, useAccordionThemeContext } from './context';
import type { AccordionItemProps } from './types';

defineOptions({
  name: 'AccordionItem'
});

const props = defineProps<AccordionItemProps>();

const themeContext = useAccordionThemeContext();

const forwardedProps = useOmitProps(props, ['class', 'value']);

const cls = computed(() => [themeContext?.ui?.value?.item, props.class]);

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
  if (!rootElement.value) return;

  const allCollectionItems = getCollectionItemElements(rootElement.value);
  const target = e.target as HTMLElement;
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
    v-bind="forwardedProps"
    :class="cls"
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
