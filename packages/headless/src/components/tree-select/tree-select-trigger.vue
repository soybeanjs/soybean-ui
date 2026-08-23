<script setup lang="ts">
import { computed } from 'vue';
import { PopperAnchor } from '../popper';
import { Primitive } from '../primitive';
import { useTreeSelectRootContext, useTreeSelectUi } from './context';
import type { TreeSelectTriggerProps } from './types';

defineOptions({
  name: 'TreeSelectTrigger'
});

withDefaults(defineProps<TreeSelectTriggerProps>(), {
  as: 'button'
});

const { open, disabled, dataState, contentId, onOpenChange } = useTreeSelectRootContext('TreeSelectTrigger');

const cls = useTreeSelectUi('trigger');

const isDisabled = computed(() => Boolean(disabled.value));

function onOpen() {
  if (!isDisabled.value) onOpenChange(!open.value);
}

function onKeyDown(event: KeyboardEvent) {
  if ([' ', 'Enter', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
    event.preventDefault();
    onOpenChange(true);
  }
}
</script>

<template>
  <PopperAnchor as-child>
    <Primitive
      :as="as"
      :as-child="asChild"
      data-soybean-tree-select-trigger
      :class="cls"
      :aria-controls="contentId"
      :aria-expanded="open || false"
      aria-haspopup="tree"
      :aria-disabled="isDisabled || undefined"
      :data-state="dataState"
      :data-disabled="isDisabled ? '' : undefined"
      type="button"
      @click="onOpen"
      @keydown="onKeyDown"
    >
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
