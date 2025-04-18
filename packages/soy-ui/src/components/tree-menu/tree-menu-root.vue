<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import type { CSSProperties, Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import { themeSizeRatio } from '../../constant';
import type { ThemeSize } from '../../types';
import { provideTreeMenuRootContext } from './context';
import type { TreeMenuRootEmits, TreeMenuRootProps } from './types';

defineOptions({
  name: 'STreeMenuRoot'
});

const props = withDefaults(defineProps<TreeMenuRootProps<T>>(), {
  width: 240
});

const emit = defineEmits<TreeMenuRootEmits<T>>();

const mergedCls = computed(() => {
  const { root } = treeMenuVariants({ size: props.size });

  return cn(root(), props.class);
});

const modelValue = useVModel<TreeMenuRootProps<T>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false,
  deep: true
});

const expandedKeys = useVModel<TreeMenuRootProps<T>, 'expandedKeys', 'update:expandedKeys'>(
  props,
  'expandedKeys',
  emit,
  {
    defaultValue: props.defaultExpandedKeys || [],
    passive: (props.expandedKeys === undefined) as false,
    deep: true
  }
) as Ref<T[]>;

const collapsible = useVModel<TreeMenuRootProps<T>, 'collapsible', 'update:collapsible'>(props, 'collapsible', emit, {
  defaultValue: props.collapsible || false
}) as Ref<boolean>;

const collapsibleWidthMap: Record<ThemeSize, number> = {
  xs: 34 / 16,
  sm: 42 / 16,
  md: 50 / 16,
  lg: 58 / 16,
  xl: 66 / 16,
  '2xl': 78 / 16
};

const style = computed<CSSProperties>(() => {
  const fullWidth = props.width * themeSizeRatio[props.size || 'md'];
  const collapsibleWidth = collapsibleWidthMap[props.size || 'md'];

  const width = props.collapsible ? collapsibleWidth : fullWidth;

  return {
    '--tree-menu-width': `${width}px`,
    '--tree-menu-collapsible-width': `${collapsibleWidth}rem`
  };
});

provideTreeMenuRootContext({
  modelValue,
  onModelValueChange: value => {
    modelValue.value = value as T;
  },
  expandedKeys,
  onExpandedKeysChange: keys => {
    expandedKeys.value = keys as T[];
  },
  collapsible,
  onCollapsibleChange: value => {
    collapsible.value = value as boolean;
  }
});
</script>

<template>
  <div :class="mergedCls" :style="style">
    <slot />
  </div>
</template>
