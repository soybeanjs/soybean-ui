<script setup lang="ts" generic="T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '../../types';
import { ToggleGroupItem } from '../toggle-group';
import { useToggleGroupRootContext } from '../toggle-group/context';
import { RovingFocusItem } from '../roving-focus';
import { useToolbarUi } from './context';
import type { ToolbarToggleItemProps } from './types';

defineOptions({
  name: 'ToolbarToggleItem'
});

const props = defineProps<ToolbarToggleItemProps<T>>();

const cls = useToolbarUi('toggleItem');

const { disabled: rootDisabled } = useToggleGroupRootContext('ToolbarToggleItem');

const disabled = computed(() => rootDisabled.value || props.disabled);
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled">
    <ToggleGroupItem v-bind="props" data-soybean-toolbar-toggle-item :class="cls" :disabled="disabled">
      <slot />
    </ToggleGroupItem>
  </RovingFocusItem>
</template>
