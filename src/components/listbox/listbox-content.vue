<script setup lang="ts">
import { computed } from 'vue';
import { refAutoReset } from '@vueuse/shared';
import { useForwardElement } from '../../composables';
import { useCollectionContext, useListboxRootContext, useListboxThemeContext } from './context';
import type { ListboxContentProps } from './types';

defineOptions({
  name: 'ListboxContent'
});

defineProps<ListboxContentProps>();

const {
  orientation,
  focusable,
  highlightedElement,
  isMultiple,
  onEnter,
  onKeydownNavigation,
  onKeydownEnter,
  onKeydownTypeahead
} = useListboxRootContext('ListboxContent');
const { onContainerElementChange } = useCollectionContext('ListboxContent');
const [_, setContentElement] = useForwardElement(el => {
  onContainerElementChange(el);
});

const themeContext = useListboxThemeContext();
const cls = computed(() => themeContext?.ui?.value?.content);

const isClickFocus = refAutoReset(false, 10);

const tabindex = computed(() => {
  if (!focusable.value) return undefined;

  return highlightedElement.value ? '-1' : '0';
});

const onFocus = (event: FocusEvent) => {
  if (isClickFocus.value) return;
  onEnter(event);
};

const onKeydownNav = (event: KeyboardEvent) => {
  if (!focusable.value) return;
  onKeydownNavigation(event);
};

const onMousedown = () => {
  isClickFocus.value = true;
};
</script>

<template>
  <div
    :ref="setContentElement"
    :class="cls"
    role="listbox"
    :tabindex="tabindex"
    :aria-orientation="orientation"
    :aria-multiselectable="isMultiple"
    :data-orientation="orientation"
    @mousedown.left="onMousedown"
    @focus="onFocus"
    @keydown.down.up.left.right.home.end.prevent="onKeydownNav"
    @keydown.enter="onKeydownEnter"
    @keydown="onKeydownTypeahead"
  >
    <slot />
  </div>
</template>
