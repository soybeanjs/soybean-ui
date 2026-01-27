<script setup lang="ts" generic="T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import {
  TreeMenuGroup,
  TreeMenuGroupLabel,
  TreeMenuGroupRoot,
  TreeMenuRoot,
  provideTreeMenuUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { mergeSlotVariants, themeSizeMap, themeSizeRatio } from '@/theme';
import { treeMenuVariants } from '@/variants/tree-menu';
import Icon from '../icon/icon.vue';
import TreeMenuOption from './tree-menu-option.vue';
import { provideTreeMenuContext, provideTreeMenuExtraUi } from './context';
import { isGroupTreeMenu, treeMenuCssVars } from './shared';
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
};

const slots = defineSlots<Slots>();

const itemSlotKeys = computed(() => Object.keys(slots).filter(key => key.startsWith('item-')) as (keyof Slots)[]);

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'side',
  'ui',
  'items',
  'collapsedWidth',
  'indent',
  'groupRootProps',
  'groupProps',
  'groupLabelProps',
  'buttonProps',
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

const ui = computed(() => {
  const variants = treeMenuVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTreeMenuUi(ui);
provideTreeMenuExtraUi(ui);

provideTreeMenuContext(transformPropsToContext(props, ['size', 'side']));
</script>

<template>
  <TreeMenuRoot v-bind="forwardedProps" :style="style" v-on="listeners">
    <slot name="top" />
    <template v-for="item in items" :key="item.value">
      <TreeMenuGroupRoot v-if="isGroupTreeMenu(item)">
        <TreeMenuGroupLabel>
          <Icon v-if="item.icon" :icon="item.icon" />
          <span>{{ item.label }}</span>
        </TreeMenuGroupLabel>
        <TreeMenuGroup>
          <TreeMenuOption v-for="child in item.children" :key="child.value" :item="child">
            <template v-for="slotKey in itemSlotKeys" :key="slotKey" #[slotKey]="slotProps">
              <slot :name="slotKey" v-bind="slotProps" />
            </template>
          </TreeMenuOption>
        </TreeMenuGroup>
      </TreeMenuGroupRoot>
      <TreeMenuOption v-else as="div" :item="item">
        <template v-for="slotKey in itemSlotKeys" :key="slotKey" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </TreeMenuOption>
    </template>
    <slot name="bottom" />
  </TreeMenuRoot>
</template>
