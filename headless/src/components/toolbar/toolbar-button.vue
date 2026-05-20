<script setup lang="ts">
import { Button } from '../button';
import { RovingFocusItem } from '../roving-focus';
import { useToolbarUi } from './context';
import type { ToolbarButtonProps, ToolbarButtonEmits } from './types';

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
