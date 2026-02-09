<script setup lang="ts" generic="T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { TreeMenuRoot, provideTreeMenuUi } from '@soybeanjs/headless';
import { useForwardListeners, usePickProps } from '@soybeanjs/headless/composables';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { mergeSlotVariants, themeSizeMap, themeSizeRatio } from '@/theme';
import { provideTreeMenuContext, provideTreeMenuExtraUi } from './context';
import { treeMenuVariants } from './variants';
import TreeMenuOptions from './tree-menu-options.vue';
import { treeMenuCssVars } from './shared';
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

const itemSlotKeys = computed(() => Object.keys(slots).filter(key => key.startsWith('item')) as (keyof Slots)[]);

const forwardedRootProps = usePickProps(props, [
  'modelValue',
  'defaultValue',
  'expanded',
  'defaultExpanded',
  'collapsed',
  'defaultCollapsed'
]);

const forwardedOptionsProps = usePickProps(props, [
  'items',
  'groupRootProps',
  'groupProps',
  'groupLabelProps',
  'showGroupIcon',
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
  <TreeMenuRoot v-bind="forwardedRootProps" :style="style" v-on="listeners">
    <slot name="top" />
    <TreeMenuOptions v-bind="forwardedOptionsProps" @select-dropdown="emit('selectDropdown', $event)">
      <template v-for="slot in itemSlotKeys" :key="slot" #[slot]="slotProps">
        <slot :name="slot" v-bind="slotProps" />
      </template>
    </TreeMenuOptions>
    <slot name="bottom" />
  </TreeMenuRoot>
</template>
