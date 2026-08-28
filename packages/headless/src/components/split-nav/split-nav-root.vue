<script setup lang="ts" generic="T extends SplitNavBaseOptionData = SplitNavBaseOptionData">
import { computed, shallowRef, useAttrs, watch } from 'vue';
import type { Component } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { transformPropsToContext } from '../../shared';
import { useControllableState, useOmitProps } from '../../composables';
import { findNode, hasVisibleChildren, toOpenPath } from './shared';
import { provideSplitNavRootContext } from './context';
import DualVerticalPane from './dual-vertical-pane.vue';
import HorizontalDualVerticalMenu from './horizontal-dual-vertical-menu.vue';
import HorizontalVerticalMenu from './horizontal-vertical-menu.vue';
import type {
  SplitNavBaseOptionData,
  SplitNavMode,
  SplitNavRootEmits,
  SplitNavRootProps,
  SplitNavRootSlots
} from './types';
import VerticalHorizontalMenu from './vertical-horizontal-menu.vue';

defineOptions({
  name: 'SplitNavRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SplitNavRootProps<T>>(), {
  mode: 'dual-vertical',
  defaultValue: '',
  loop: true,
  collapsed: undefined,
  defaultCollapsed: false,
  collapsedWidth: 50,
  as: 'nav'
});

const emit = defineEmits<SplitNavRootEmits>();

const slots = defineSlots<SplitNavRootSlots<T>>();

const attrs = useAttrs();

const rootAttrs = useOmitProps(
  props,
  [
    'mode',
    'modelValue',
    'defaultValue',
    'items',
    'horizontalMountedId',
    'verticalMountedId',
    'dir',
    'loop',
    'collapsed',
    'defaultCollapsed',
    'collapsedWidth'
  ],
  attrs
);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  props.defaultValue
);

const collapsed = useControllableState(
  () => props.collapsed,
  value => {
    emit('update:collapsed', value);
  },
  props.defaultCollapsed
);

const openPath = shallowRef(toOpenPath(props.items, modelValue.value));

const menus: Record<SplitNavMode, Component> = {
  'dual-vertical': DualVerticalPane,
  'vertical-horizontal': VerticalHorizontalMenu,
  'horizontal-vertical': HorizontalVerticalMenu,
  'horizontal-dual-vertical': HorizontalDualVerticalMenu
};

const activeMenu = computed(() => menus[props.mode]);

const slotNames = computed(() => keysOf(slots));

function onItemActivate(value: string, event?: Event) {
  const node = findNode(props.items, value);

  if (node?.disabled) {
    return;
  }

  openPath.value = toOpenPath(props.items, value);

  if (!node || hasVisibleChildren(node)) {
    return;
  }

  modelValue.value = value;
  emit('select', value, event);
}

provideSplitNavRootContext({
  modelValue,
  collapsed,
  openPath,
  rootAttrs,
  onItemActivate,
  ...transformPropsToContext(props, [
    'mode',
    'items',
    'horizontalMountedId',
    'verticalMountedId',
    'loop',
    'dir',
    'collapsedWidth'
  ])
});

watch(modelValue, value => {
  openPath.value = toOpenPath(props.items, value);
});
</script>

<template>
  <component :is="activeMenu">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </component>
</template>
