<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { transformPropsToContext } from '../../shared';
import { usePageTabsUi, usePageTabsRootContext, providePageTabsItemContext } from './context';
import type { PageTabsItemProps, PageTabsItemEmits } from './types';

defineOptions({
  name: 'PageTabsItem'
});

const props = withDefaults(defineProps<PageTabsItemProps>(), {
  closable: true
});

const emit = defineEmits<PageTabsItemEmits>();

const cls = usePageTabsUi('item');
const {
  modelValue,
  onModelValueChange,
  middleClickClose,
  isValueExists,
  pins,
  addTabItem,
  removeTabItem,
  onCloseTab,
  beforeClose,
  onPinTab,
  onUnpinTab
} = usePageTabsRootContext('PageTabsItem');

const isExist = computed(() => isValueExists(props.value));

const isActive = computed(() => modelValue.value === props.value);

const pinned = computed(() => pins.value.includes(props.value));

const onClick = () => {
  if (!isActive.value) {
    onModelValueChange(props.value);
  }
};

const onMouseDown = (event: MouseEvent) => {
  if (event.button === 1 && middleClickClose.value) {
    event.preventDefault();
    onClose();
  }
};

const onClose = async () => {
  if (!props.closable || pinned.value) return;

  const closable = await beforeClose(props.value);
  if (!closable) return;

  onCloseTab(props.value);

  emit('close');
};

const onPin = () => {
  const state = pinned.value;

  if (state) {
    onUnpinTab(props.value);
  } else {
    onPinTab(props.value);
  }
};

providePageTabsItemContext({
  ...transformPropsToContext(props, ['closable']),
  pinned,
  onClose,
  onPin
});

onBeforeMount(() => {
  addTabItem(props.value);
});

onBeforeUnmount(() => {
  removeTabItem(props.value);
});
</script>

<template>
  <button
    v-if="isExist"
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
