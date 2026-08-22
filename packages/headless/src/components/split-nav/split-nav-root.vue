<script setup lang="ts" generic="T extends SplitNavBaseOptionData = SplitNavBaseOptionData">
import { computed } from 'vue';
import type { Component } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { transformPropsToContext } from '../../shared';
import { useControllableState, useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { findNode, hasVisibleChildren } from './shared';
import { provideSplitNavRootContext, useSplitNavUi } from './context';
import DualVerticalMenu from './dual-vertical-menu.vue';
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
  name: 'SplitNavRoot'
});

const props = withDefaults(defineProps<SplitNavRootProps<T>>(), {
  mode: 'dual-vertical',
  defaultValue: '',
  loop: true,
  as: 'nav'
});

const emit = defineEmits<SplitNavRootEmits>();

const slots = defineSlots<SplitNavRootSlots<T>>();

const cls = useSplitNavUi('root');

const forwardedProps = useOmitProps(props, [
  'class',
  'mode',
  'modelValue',
  'defaultValue',
  'items',
  'horizontalMountedId',
  'verticalMountedId',
  'dir',
  'loop'
]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  props.defaultValue
);

const menus: Record<SplitNavMode, Component> = {
  'dual-vertical': DualVerticalMenu,
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

  modelValue.value = value;

  if (node && !hasVisibleChildren(node)) {
    emit('select', value, event);
  }
}

provideSplitNavRootContext({
  modelValue,
  onItemActivate,
  ...transformPropsToContext(props, ['mode', 'items', 'horizontalMountedId', 'verticalMountedId', 'loop', 'dir'])
});
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :as="as"
    :as-child="asChild"
    data-soybean-split-nav-root
    :class="cls"
    :data-mode="mode"
    :dir="dir"
  >
    <component :is="activeMenu">
      <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps" />
      </template>
    </component>
  </Primitive>
</template>
