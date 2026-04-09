<script setup lang="ts">
import { RovingFocusItem } from '../roving-focus';
import { Button } from '../button';
import type { ToolbarButtonEmits, ToolbarButtonProps } from './types';

defineOptions({
  name: 'ToolbarButton'
});

const props = defineProps<ToolbarButtonProps>();

const emit = defineEmits<ToolbarButtonEmits>();
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled">
    <Button v-bind="props" @click="emit('click', $event)">
      <slot />
    </Button>
  </RovingFocusItem>
</template>
