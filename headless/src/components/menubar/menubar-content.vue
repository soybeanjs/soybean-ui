<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners } from '../../composables';
import { MenuContent } from '../menu';
import { useCollectionContext, useMenubarMenuContext, useMenubarRootContext } from './context';
import type { MenubarContentEmits, MenubarContentProps } from './types';

defineOptions({
  name: 'MenubarContent'
});

const props = withDefaults(defineProps<MenubarContentProps>(), {
  align: 'start'
});

const emit = defineEmits<MenubarContentEmits>();

const listeners = useForwardListeners(emit);

const { getOrderedItems } = useCollectionContext('MenubarContent');
const { dir, loop, modelValue, onMenuOpen } = useMenubarRootContext('MenubarContent');
const { contentId, initContentId, triggerElement, triggerId, value, wasKeyboardTriggerOpenRef } =
  useMenubarMenuContext('MenubarContent');

const open = computed(() => modelValue.value === value.value);

let hasInteractedOutside = false;

const onCloseAutoFocus = (event: Event) => {
  const menubarOpen = Boolean(modelValue.value);

  if (!menubarOpen && !hasInteractedOutside) {
    triggerElement.value?.focus();
  }

  hasInteractedOutside = false;
  event.preventDefault();
};

const onFocusOutside = (event: Event) => {
  const target = event.target as HTMLElement | null;
  const isMenubarTrigger = getOrderedItems(false).some(item => item.element.contains(target));

  if (isMenubarTrigger) {
    event.preventDefault();
  }
};

const onInteractOutside = () => {
  hasInteractedOutside = true;
};

const onEntryFocus = (event: Event) => {
  if (!wasKeyboardTriggerOpenRef.value) {
    event.preventDefault();
  }
};

const onKeyDown = (event: KeyboardEvent) => {
  if (!open.value || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;

  const target = event.target as HTMLElement;
  const targetIsSubTrigger = Boolean(target.closest('[data-soybean-menubar-subtrigger]'));
  const previousMenuKey = dir.value === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  const isPreviousKey = event.key === previousMenuKey;

  if (!isPreviousKey && targetIsSubTrigger) return;

  const candidateValues = getOrderedItems().map(item => item.data.value);
  const currentIndex = candidateValues.indexOf(value.value);

  const nextValues = isPreviousKey
    ? [...candidateValues].reverse().slice(Math.max(candidateValues.length - currentIndex, 0))
    : candidateValues.slice(currentIndex + 1);
  const loopedValues = loop.value
    ? isPreviousKey
      ? [...candidateValues].reverse().slice(0, Math.max(candidateValues.length - currentIndex, 0))
      : candidateValues.slice(0, Math.max(currentIndex, 0))
    : [];

  const nextValue = [...nextValues, ...loopedValues][0];

  if (nextValue) {
    onMenuOpen(nextValue);
    event.preventDefault();
  }
};

initContentId();
</script>

<template>
  <MenuContent
    v-bind="props"
    :id="contentId"
    aria-orientation="vertical"
    :aria-labelledby="triggerId"
    data-soybean-menubar-content
    v-on="listeners"
    @close-auto-focus="onCloseAutoFocus"
    @entry-focus="onEntryFocus"
    @focus-outside="onFocusOutside"
    @interact-outside="onInteractOutside"
    @keydown="onKeyDown"
  >
    <slot />
  </MenuContent>
</template>
