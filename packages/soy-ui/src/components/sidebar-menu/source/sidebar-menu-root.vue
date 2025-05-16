<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import type { CSSProperties, Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { Primitive } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, sidebarMenuVariants } from '@soybean-ui/variants';
import { themeSizeRatio } from '../../../constant';
import { provideSidebarMenuRootContext } from '../context';
import type { SidebarMenuRootEmits, SidebarMenuRootProps, SidebarMenuState } from '../types';

defineOptions({
  name: 'SSidebarMenuRoot'
});

const props = withDefaults(defineProps<SidebarMenuRootProps<T>>(), {
  collapsedWidth: 50
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

const collapsed = useVModel<SidebarMenuRootProps<T>, 'collapsed', 'update:collapsed'>(props, 'collapsed', emit, {
  defaultValue: props.collapsed || false
}) as Ref<boolean>;

const style = computed<CSSProperties>(() => {
  const collapsedWidth = props.collapsedWidth * themeSizeRatio[props.size || 'md'];

  return {
    '--sidebar-collapsed-menu-width': `${collapsedWidth / 16}rem`
  };
});

const dataState = computed<SidebarMenuState>(() => (props.collapsed ? 'collapsed' : 'expanded'));

provideSidebarMenuRootContext({
  modelValue,
  onModelValueChange: value => {
    modelValue.value = value as T;
  },
  expandedKeys,
  onExpandedKeysChange: keys => {
    expandedKeys.value = keys as T[];
  },
  collapsed,
  onCollapsedChange: value => {
    collapsed.value = value as boolean;
  }
});
</script>

<template>
  <div class="sidebar-menu-root" :class="mergedCls" :style="style" :data-state="dataState">
    <slot />
  </div>
  <Primitive as="style">
    .sidebar-menu-root { scrollbar-width: thin; scrollbar-color: rgba(0, 0, 0, 0.3) transparent; border-style: solid;
    border-color: hsl(var(--border)); } .dark .sidebar-menu-root { scrollbar-color: rgba(255, 255, 255, 0.2)
    transparent; }
  </Primitive>
</template>
