<script setup lang="ts">
import { RovingFocusItem } from '../roving-focus';
import { Button } from '../button';
import { useToolbarUi } from './context';
import type { ToolbarButtonEmits, ToolbarButtonProps } from './types';

defineOptions({
  name: 'ToolbarButton'
});

const props = defineProps<ToolbarButtonProps>();

const emit = defineEmits<ToolbarButtonEmits>();

const cls = useToolbarUi('button');
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled">
    <Button v-bind="props" data-soybean-toolbar-button :class="cls" @click="emit('click', $event)">
      <slot />
    </Button>
  </RovingFocusItem>
</template>
