<script setup lang="ts">
import { computed } from 'vue';
import { transformPropsToContext } from '../../shared';
import RovingFocusItem from '../roving-focus/roving-focus-item.vue';
import { usePageTabsUi, usePageTabsRootContext, providePageTabsItemContext } from './context';
import type { PageTabsItemProps, PageTabsItemEmits } from './types';

defineOptions({
  name: 'PageTabsItem'
});

const props = withDefaults(defineProps<PageTabsItemProps>(), {
  as: 'button'
});

const emit = defineEmits<PageTabsItemEmits>();

const cls = usePageTabsUi('item');
const { middleClickClose, modelValue } = usePageTabsRootContext('PageTabsItem');

const isActive = computed(() => props.value === modelValue.value);
const closable = computed(() => !props.pinned);

const onClick = () => {
  if (isActive.value) return;

  modelValue.value = props.value;
  emit('click');
};

const onClose = async () => {
  if (!closable.value) return;

  emit('close');
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    onClick();

    return;
  }
  if (event.key === 'Backspace') {
    onClose();
  }
};

const onMouseDown = (event: MouseEvent) => {
  if (event.button === 1 && middleClickClose.value) {
    event.preventDefault();
    onClose();
  }
};

const onPin = () => {
  emit('pin', !props.pinned);
};

providePageTabsItemContext({
  ...transformPropsToContext(props, ['pinned']),
  closable,
  onClose,
  onPin
});
</script>

<template>
  <RovingFocusItem
    :class="cls"
    data-soybean-page-tabs-item
    :data-value="value"
    :data-active="isActive"
    :data-pinned="pinned"
    :active="isActive"
    :focusable="true"
    @click="onClick"
    @mousedown="onMouseDown"
    @keydown.enter.backspace="onKeydown"
  >
    <slot />
  </RovingFocusItem>
</template>
