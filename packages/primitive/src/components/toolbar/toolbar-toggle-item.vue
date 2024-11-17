<script lang="ts">
import type { ToggleGroupItemProps } from '../toggle-group';
import { ToggleGroupItem } from '../toggle-group';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import ToolbarButton from './toolbar-button.vue';

export interface ToolbarToggleItemProps extends ToggleGroupItemProps {}

const props = defineProps<ToolbarToggleItemProps>();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <ToolbarButton as-child>
    <ToggleGroupItem v-bind="props" :ref="forwardRef">
      <slot />
    </ToggleGroupItem>
  </ToolbarButton>
</template>
