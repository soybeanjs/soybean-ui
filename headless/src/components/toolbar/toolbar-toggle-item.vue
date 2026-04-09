<script setup lang="ts" generic="T extends DefinedValue = string">
import type { DefinedValue } from '../../types';
import { ToggleGroupItem } from '../toggle-group';
import ToolbarButton from './toolbar-button.vue';
import type { ToolbarToggleItemProps } from './types';

defineOptions({
  name: 'ToolbarToggleItem'
});

const props = defineProps<ToolbarToggleItemProps<T>>();
</script>

<template>
  <ToolbarButton as-child>
    <ToggleGroupItem v-bind="props">
      <slot />
    </ToggleGroupItem>
  </ToolbarButton>
</template>
