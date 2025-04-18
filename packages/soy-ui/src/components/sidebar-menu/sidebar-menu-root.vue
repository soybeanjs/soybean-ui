<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import type { CSSProperties, Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, sidebarMenuVariants } from '@soybean-ui/variants';
import { themeSizeRatio } from '../../constant';
import type { ThemeSize } from '../../types';
import { provideSidebarMenuRootContext } from './context';
import type { SidebarMenuRootEmits, SidebarMenuRootProps } from './types';

defineOptions({
  name: 'SSidebarMenuRoot'
});

const props = withDefaults(defineProps<SidebarMenuRootProps<T>>(), {
  width: 240
});

const emit = defineEmits<SidebarMenuRootEmits<T>>();

const mergedCls = computed(() => {
  const { root } = sidebarMenuVariants({ size: props.size });

  return cn(root(), props.class);
});

const modelValue = useVModel<SidebarMenuRootProps<T>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false,
  deep: true
});

const expandedKeys = useVModel<SidebarMenuRootProps<T>, 'expandedKeys', 'update:expandedKeys'>(
  props,
  'expandedKeys',
  emit,
  {
    defaultValue: props.defaultExpandedKeys || [],
    passive: (props.expandedKeys === undefined) as false,
    deep: true
  }
) as Ref<T[]>;

const collapsible = useVModel<SidebarMenuRootProps<T>, 'collapsible', 'update:collapsible'>(
  props,
  'collapsible',
  emit,
  {
    defaultValue: props.collapsible || false
  }
) as Ref<boolean>;

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
    '--sidebar-menu-width': `${width}px`,
    '--sidebar-menu-collapsible-width': `${collapsibleWidth}rem`
  };
});

provideSidebarMenuRootContext({
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
