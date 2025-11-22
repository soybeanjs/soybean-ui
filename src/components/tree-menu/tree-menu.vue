<script setup lang="ts" generic="T extends TreeMenuOptionData = TreeMenuOptionData">
import { computed, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { TreeRoot } from '@soybeanjs/headless';
import { useControllableState, useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { vAutoAnimate } from '@formkit/auto-animate';
import { mergeSlotVariants, themeSizeMap, themeSizeRatio } from '@/theme';
import { treeMenuVariants } from '@/variants/tree-menu';
import { provideTreeMenuContext, provideTreeMenuThemeContext } from './context';
import { isTreeMenuGroupOption, transformTreeMenuItems, treeMenuCssVars } from './shared';
import TreeMenuItem from './tree-menu-item.vue';
import type { TreeMenuEmits, TreeMenuOptionData, TreeMenuProps, TreeMenuState } from './types';

defineOptions({
  name: 'TreeMenu'
});

const props = withDefaults(defineProps<TreeMenuProps<T>>(), {
  collapsed: undefined,
  defaultCollapsed: false,
  collapsedWidth: 50
});

const emit = defineEmits<TreeMenuEmits>();

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'items',
  'expanded',
  'defaultExpanded',
  'collapsed',
  'defaultCollapsed',
  'collapsedWidth',
  'tooltipProps',
  'dropdownMenuProps',
  'badgeProps',
  'tagProps',
  'actionMenuProps'
]);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = treeMenuVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

const items = computed(() => transformTreeMenuItems(props.items ?? []));

const expandedKeys = useControllableState(
  () => props.expanded,
  value => {
    emit('update:expanded', value ?? []);
  },
  props.defaultExpanded ?? []
);

const collapsed = useControllableState(
  () => props.collapsed,
  value => {
    emit('update:collapsed', value ?? false);
  },
  props.defaultCollapsed
);

const style = computed<CSSProperties>(() => {
  const collapsedWidth = props.collapsedWidth * themeSizeRatio[props.size || 'md'];

  return {
    [treeMenuCssVars.collapsedWidth]: `${collapsedWidth / themeSizeMap.md}rem`
  };
});

const state = computed<TreeMenuState>(() => (collapsed.value ? 'collapsed' : 'expanded'));

const size = computed(() => props.size ?? 'md');

provideTreeMenuContext({
  collapsed,
  size,
  ...transformPropsToContext(props, ['showLinkIcon'])
});

provideTreeMenuThemeContext({
  ui
});

let backupExpanded: string[] | null = null;

watch(collapsed, value => {
  if (value) {
    backupExpanded = [...(expandedKeys.value ?? [])];
    expandedKeys.value = [];

    return;
  }

  if (backupExpanded?.length) {
    expandedKeys.value = [...backupExpanded];
    backupExpanded = null;
  }
});
</script>

<template>
  <TreeRoot
    v-slot="{ flattenItems, select, toggle }"
    v-bind="forwardedProps"
    v-model:expanded="expandedKeys"
    v-auto-animate
    :items="items"
    :class="ui.root"
    :data-state="state"
    :data-collapsed="collapsed ? '' : undefined"
    :style="style"
    v-on="listeners"
  >
    <slot name="top" />
    <template v-for="{ data, value, level } in flattenItems" :key="value">
      <li v-if="isTreeMenuGroupOption(data)" :class="ui.groupLabel">
        <slot name="group-label" :item="data">
          <span>{{ data.label }}</span>
        </slot>
      </li>
      <TreeMenuItem
        v-else
        v-bind="data"
        :level="level"
        :tooltip-props="tooltipProps"
        :dropdown-menu-props="dropdownMenuProps"
        :action-menu-props="actionMenuProps"
        @select-dropdown="
          value => {
            select(value);
            toggle(value);
          }
        "
      >
        <template #default>
          <slot name="item" :item="data" :level="level" />
        </template>
        <template #leading>
          <slot name="item-leading" :item="data" :level="level" />
        </template>
        <template #trailing>
          <slot name="item-trailing" :item="data" :level="level" />
        </template>
      </TreeMenuItem>
    </template>
    <slot name="bottom" />
  </TreeRoot>
</template>
