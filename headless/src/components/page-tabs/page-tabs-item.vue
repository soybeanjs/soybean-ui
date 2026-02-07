<script setup lang="ts">
import { computed } from 'vue';
import { transformPropsToContext } from '../../shared';
import { usePageTabsUi, usePageTabsRootContext, providePageTabsItemContext } from './context';
import type { PageTabsItemProps, PageTabsItemEmits } from './types';

defineOptions({
  name: 'PageTabsItem'
});

const props = defineProps<PageTabsItemProps>();

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
