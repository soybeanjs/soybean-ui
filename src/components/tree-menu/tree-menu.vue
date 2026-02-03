<script setup lang="ts" generic="T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData">
import { computed, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import {
  TreeMenuGroup,
  TreeMenuGroupLabel,
  TreeMenuGroupRoot,
  TreeMenuRoot,
  provideTreeMenuUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps, usePickProps } from '@soybeanjs/headless/composables';
import { getTreePaths, transformPropsToContext } from '@soybeanjs/headless/shared';
import { mergeSlotVariants, themeSizeMap, themeSizeRatio } from '@/theme';
import { treeMenuVariants } from '@/variants/tree-menu';
import Icon from '../icon/icon.vue';
import TreeMenuOption from './tree-menu-option.vue';
import { provideTreeMenuContext, provideTreeMenuExtraUi } from './context';
import { filterHiddenMenus, treeMenuCssVars } from './shared';
import type { TreeMenuBaseOptionData, TreeMenuEmits, TreeMenuProps } from './types';

defineOptions({
  name: 'STreeMenu'
});

const props = withDefaults(defineProps<TreeMenuProps<T>>(), {
  size: 'md',
  side: 'left',
  loop: true,
  collapsed: undefined,
  collapsedWidth: 50,
  indent: 16
});

const emit = defineEmits<TreeMenuEmits>();

type Slots = {
  top: () => any;
  bottom: () => any;
  item: (props: { item: T }) => any;
  'item-leading': (props: { item: T }) => any;
  'item-trailing': (props: { item: T }) => any;
  'group-label': (props: { item: T }) => any;
};

const slots = defineSlots<Slots>();

const itemSlotKeys = computed(() => Object.keys(slots).filter(key => key.startsWith('item-')) as (keyof Slots)[]);

const forwardedRootProps = useOmitProps(props, [
  'class',
  'size',
  'side',
  'ui',
  'items',
  'collapsedWidth',
  'indent',
  'showGroupIcon',
  'groupRootProps',
  'groupProps',
  'groupLabelProps',
  'itemProps',
  'buttonProps',
  'linkProps',
  'collapsibleProps',
  'subProps'
]);

const forwardedOptionProps = usePickProps(props, [
  'itemProps',
  'buttonProps',
  'linkProps',
  'collapsibleProps',
  'subProps'
]);

const listeners = useForwardListeners(emit);

const style = computed<CSSProperties>(() => {
  const collapsedWidth = props.collapsedWidth * themeSizeRatio[props.size];
  const indent = props.indent * themeSizeRatio[props.size];

  return {
    [treeMenuCssVars.collapsedWidth]: `${collapsedWidth / themeSizeMap.md}rem`,
    [treeMenuCssVars.indent]: `${indent / themeSizeMap.md}rem`
  };
});

const modelValue = shallowRef(props.modelValue ?? props.defaultValue ?? '');

const updateModelValue = (value: string) => {
  modelValue.value = value;
};

const items = computed(() => filterHiddenMenus(props.items));

const activePaths = computed(() => getTreePaths(modelValue.value, items.value));

const ui = computed(() => {
  const variants = treeMenuVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTreeMenuUi(ui);
provideTreeMenuExtraUi(ui);

provideTreeMenuContext({
  ...transformPropsToContext(props, ['size', 'side']),
  activePaths
});
</script>

<template>
  <TreeMenuRoot v-bind="forwardedRootProps" :style="style" v-on="listeners" @update:model-value="updateModelValue">
    <slot name="top" />
    <template v-for="item in items" :key="item.value">
      <TreeMenuGroupRoot v-if="item.isGroup" v-bind="groupRootProps">
        <TreeMenuGroupLabel v-bind="groupLabelProps">
          <slot name="group-label" :item="item">
            <Icon v-if="showGroupIcon" :icon="item.icon" />
            <span>{{ item.label }}</span>
          </slot>
        </TreeMenuGroupLabel>
        <TreeMenuGroup v-bind="groupProps">
          <TreeMenuOption
            v-for="child in item.children"
            :key="child.value"
            v-bind="forwardedOptionProps"
            :item="child"
            @select-dropdown="emit('selectDropdown', $event)"
          >
            <template v-for="slotKey in itemSlotKeys" :key="slotKey" #[slotKey]="slotProps">
              <slot :name="slotKey" v-bind="slotProps" />
            </template>
          </TreeMenuOption>
        </TreeMenuGroup>
      </TreeMenuGroupRoot>
      <TreeMenuOption
        v-else
        as="div"
        v-bind="forwardedOptionProps"
        :item="item"
        @select-dropdown="emit('selectDropdown', $event)"
      >
        <template v-for="slotKey in itemSlotKeys" :key="slotKey" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </TreeMenuOption>
    </template>
    <slot name="bottom" />
  </TreeMenuRoot>
</template>
