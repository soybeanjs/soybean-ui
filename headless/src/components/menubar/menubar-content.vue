<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardListeners } from '../../composables';
import { wrapArray } from '../../shared';
import type { FocusOutsideEvent } from '../../types';
import { MenuContent } from '../menu';
import { useMenubarCollectionContext, useMenubarMenuContext, useMenubarRootContext } from './context';
import { isTriggerLink } from './shared';
import type { MenubarContentEmits, MenubarContentProps } from './types';

defineOptions({
  name: 'MenubarContent'
});

const props = withDefaults(defineProps<MenubarContentProps>(), {
  align: 'start'
});

const emit = defineEmits<MenubarContentEmits>();

const listeners = useForwardListeners(emit);

const { dir, loop, modelValue, onMenuOpen, setTriggerLink } = useMenubarRootContext('MenubarContent');
const { value, triggerId, contentId, triggerElement, wasKeyboardTriggerOpen } = useMenubarMenuContext('MenubarContent');
const { getOrderedItems } = useMenubarCollectionContext('MenubarContent');

const hasInteractedOutside = shallowRef(false);

const onCloseAutoFocus = (event: Event) => {
  if (!modelValue.value && !hasInteractedOutside.value) {
    triggerElement.value?.focus();
  }

  hasInteractedOutside.value = false;
  event.preventDefault();
};

const onFocusOutside = (event: FocusOutsideEvent) => {
  const target = event.target as HTMLElement;
  const isMenubarTrigger = getOrderedItems().some(item => item.element.contains(target));

  if (isMenubarTrigger) {
    event.preventDefault();
  }
};

const onInteractOutside = () => {
  hasInteractedOutside.value = true;
};

const onEntryFocus = (event: Event) => {
  if (!wasKeyboardTriggerOpen.value) {
    event.preventDefault();
  }
};

const onArrowNavigation = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement;
  const targetIsSubTrigger = target.hasAttribute('data-soybean-menubar-subtrigger');

  const previousKey = dir.value === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  const isPreviousKey = event.key === previousKey;

  if (!isPreviousKey && targetIsSubTrigger) return;

  const candidateValues = getOrderedItems().map(item => item.data.value);

  if (isPreviousKey) {
    candidateValues.reverse();
  }

  const currentIndex = candidateValues.findIndex(v => v === value.value);
  const nextValues = loop.value
    ? wrapArray(candidateValues, currentIndex + 1)
    : candidateValues.slice(currentIndex + 1);
  const nextValue = nextValues[0];

  if (!nextValue) return;

  if (!isTriggerLink(String(nextValue))) {
    onMenuOpen(nextValue);
  } else {
    setTriggerLink();
    const el = document.getElementById(String(nextValue));
    el?.focus();
  }
};
</script>

<template>
  <MenuContent
    v-bind="props"
    :id="contentId"
    :aria-labelledby="triggerId"
    data-slot="content"
    v-on="listeners"
    @close-auto-focus="onCloseAutoFocus"
    @focus-outside="onFocusOutside"
    @interact-outside="onInteractOutside"
    @entry-focus="onEntryFocus"
    @keydown.arrow-right.arrow-left="onArrowNavigation"
  >
    <slot />
  </MenuContent>
</template>
