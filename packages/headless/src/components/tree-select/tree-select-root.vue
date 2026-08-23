<script setup lang="ts">
import { computed, useId } from 'vue';
import { transformPropsToContext } from '../../shared';
import { useControllableState } from '../../composables';
import { PopperRoot } from '../popper';
import { provideTreeSelectRootContext } from './context';
import type { TreeSelectBaseItem, TreeSelectModelValue, TreeSelectRootEmits, TreeSelectRootProps } from './types';

defineOptions({
  name: 'TreeSelectRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TreeSelectRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  multiple: false,
  items: () => [],
  placeholder: '',
  open: undefined,
  defaultOpen: false,
  disabled: false,
  clearable: false,
  allowParentSelect: false,
  propagateSelect: false,
  bubbleSelect: false,
  expanded: undefined,
  defaultExpanded: undefined,
  dir: undefined
});

const emit = defineEmits<TreeSelectRootEmits>();

const modelValue = useControllableState<TreeSelectModelValue | undefined, true>(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value as TreeSelectModelValue);
  },
  props.defaultValue ?? (props.multiple ? [] : ''),
  true
);
const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value);
  },
  props.defaultOpen
);

const contentId = useId();

function findLabel(items: TreeSelectBaseItem[], value: string): string | undefined {
  for (const item of items) {
    if (item.value === value) return item.label ?? item.value;

    if (item.children) {
      const found = findLabel(item.children, value);

      if (found !== undefined) return found;
    }
  }

  return undefined;
}

const selectedLabels = computed(() => {
  const value = modelValue.value;
  const values = Array.isArray(value) ? value : value ? [value] : [];

  return values.map(current => findLabel(props.items, current) ?? current);
});

const dataState = computed(() => (open.value ? 'open' : 'closed'));

function handleModelValueChange(value: TreeSelectModelValue) {
  modelValue.value = value ?? (props.multiple ? [] : '');
}

function handleOpenChange(value: boolean) {
  open.value = value;
}

provideTreeSelectRootContext({
  ...transformPropsToContext(props, ['items', 'placeholder', 'disabled', 'clearable', 'multiple', 'dir']),
  open,
  modelValue,
  selectedLabels,
  contentId,
  dataState,
  onOpenChange: handleOpenChange,
  onModelValueChange: handleModelValueChange
});
</script>

<template>
  <PopperRoot :dir="dir">
    <slot
      :model-value="modelValue"
      :open="Boolean(open)"
      :selected-labels="selectedLabels"
      :on-model-value-change="handleModelValueChange"
    />
  </PopperRoot>
</template>
