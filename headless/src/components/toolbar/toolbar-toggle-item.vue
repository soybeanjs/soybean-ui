<script setup lang="ts" generic="T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '../../types';
import { useOmitProps } from '../../composables';
import { ToggleGroupItem } from '../toggle-group';
import { useToggleGroupRootContext } from '../toggle-group/context';
import { RovingFocusItem } from '../roving-focus';
import { useToolbarUi } from './context';
import type { ToolbarToggleItemProps } from './types';

defineOptions({
  name: 'ToolbarToggleItem'
});

const props = defineProps<ToolbarToggleItemProps<T>>();

const buttonCls = useToolbarUi('button');

const toggleItemCls = useToolbarUi('toggleItem');

const forwardedProps = useOmitProps(props, ['class']);

const { disabled: rootDisabled } = useToggleGroupRootContext('ToolbarToggleItem');

const disabled = computed(() => rootDisabled.value || props.disabled);

const mergedClass = computed(() => [buttonCls.value, toggleItemCls.value, props.class]);
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled">
    <ToggleGroupItem v-bind="forwardedProps" :class="mergedClass">
      <slot />
    </ToggleGroupItem>
  </RovingFocusItem>
</template>
