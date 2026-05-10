<script setup lang="ts">
import { computed, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useControllableState } from '../../composables';
import { provideTreeMenuRootContext, useTreeMenuUi } from './context';
import { treeMenuCssVars } from './shared';
import type { TreeMenuCollapsedState, TreeMenuRootEmits, TreeMenuRootProps } from './types';

defineOptions({
  name: 'TreeMenuRoot'
});

const props = withDefaults(defineProps<TreeMenuRootProps>(), {
  defaultValue: '',
  defaultExpanded: () => [] as string[],
  collapsed: undefined,
  defaultCollapsed: false,
  collapsedWidth: 50,
  indent: 16,
  pxToRem: (px: number) => px / 16
});

const emit = defineEmits<TreeMenuRootEmits>();

const cls = useTreeMenuUi('root');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  props.defaultValue
);

const expanded = useControllableState(
  () => props.expanded,
  value => {
    emit('update:expanded', value);
  },
  props.defaultExpanded
);

const collapsed = useControllableState(
  () => props.collapsed,
  value => {
    emit('update:collapsed', value);
  },
  props.defaultCollapsed
);

const dataState = computed<TreeMenuCollapsedState>(() => (collapsed.value ? 'collapsed' : 'expanded'));

const style = computed<CSSProperties>(() => {
  const collapsedWidth = props.pxToRem(props.collapsedWidth);
  const indent = props.pxToRem(props.indent);

  return {
    [treeMenuCssVars.collapsedWidth]: `${collapsedWidth}rem`,
    [treeMenuCssVars.indent]: `${indent}rem`
  };
});

let backupExpanded: string[] | null = null;

watch(collapsed, value => {
  if (value) {
    backupExpanded = [...(expanded.value ?? [])];
    expanded.value = [];

    return;
  }

  if (backupExpanded?.length) {
    expanded.value = [...backupExpanded];
    backupExpanded = null;
  }
});

provideTreeMenuRootContext({
  modelValue,
  expanded,
  collapsed
});
</script>

<template>
  <div data-soybean-tree-menu-root :class="cls" :data-state="dataState" :style="style">
    <slot />
  </div>
</template>
