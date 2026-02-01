<script setup lang="ts">
import { computed } from 'vue';
import { usePageTabsUi, usePageTabsRootContext, providePageTabsItemContext } from './context';
import type { PageTabsItemProps, PageTabsItemEmits } from './types';

defineOptions({
  name: 'PageTabsItem'
});

const props = defineProps<PageTabsItemProps>();

const emit = defineEmits<PageTabsItemEmits>();

const cls = usePageTabsUi('item');
const {
  middleClickClose,
  operations: { isActiveTab, setActiveTab, isTabPinned, closeTab, togglePinTab, canCloseTab }
} = usePageTabsRootContext('PageTabsItem');

const isActive = computed(() => isActiveTab(props.value));
const pinned = computed(() => isTabPinned(props.value));
const closable = computed(() => canCloseTab(props.value));

const onClick = () => {
  setActiveTab(props.value);
};

const onClose = async () => {
  closeTab(props.value, () => {
    emit('close');
  });
};

const onMouseDown = (event: MouseEvent) => {
  if (event.button === 1 && middleClickClose.value) {
    event.preventDefault();
    onClose();
  }
};

const onPin = () => {
  const state = pinned.value;

  togglePinTab(props.value);

  emit('pin', !state);
};

providePageTabsItemContext({
  closable,
  pinned,
  onClose,
  onPin
});
</script>

<template>
  <button
    :class="cls"
    :data-value="value"
    :data-active="isActive"
    :data-pinned="pinned"
    @click="onClick"
    @mousedown="onMouseDown"
  >
    <slot />
  </button>
</template>
