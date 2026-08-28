<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { Primitive } from '../primitive';
import { TreeMenuCompact } from '../tree-menu';
import { toMountedTarget, toTreeMenuOptions } from './shared';
import { useSplitNavRootContext, useSplitNavUi } from './context';
import { useSplitNavDerived, useSplitNavTreePane } from './hooks';
import type { DualVerticalPaneProps, SplitNavRootSlots } from './types';
import VerticalFirstLevelMenu from './vertical-first-level-menu.vue';

defineOptions({
  name: 'SplitNavDualVerticalPane'
});

const props = defineProps<DualVerticalPaneProps>();

const slots = defineSlots<SplitNavRootSlots>();

const ui = useSplitNavUi();

const { dir, mode, rootAttrs, verticalMountedId } = useSplitNavRootContext('SplitNavDualVerticalPane');

const isStandalone = computed(() => mode.value === 'dual-vertical');

const standaloneBind = computed(() => {
  if (!isStandalone.value) {
    return {};
  }

  return {
    ...rootAttrs.value,
    'data-soybean-split-nav-root': '',
    'data-mode': mode.value
  };
});

const { firstLevelItems, childItems } = useSplitNavDerived(() => props.items);

const { collapsed, collapsedWidth, modelValue, treePaneState, treePaneStyle, handleTreeSelect, handleCollapsedChange } =
  useSplitNavTreePane();

const treeItems = computed(() => toTreeMenuOptions(childItems.value));

const mountTarget = computed(() => toMountedTarget(verticalMountedId.value));

const treeSlotNames = computed(() =>
  keysOf(slots).filter(name => name === 'item' || name === 'item-leading' || name === 'item-trailing')
);
</script>

<template>
  <Teleport defer :to="mountTarget" :disabled="!mountTarget">
    <Primitive v-bind="standaloneBind" :class="ui.verticalPane" :dir="dir" data-soybean-split-nav-dual-vertical>
      <VerticalFirstLevelMenu :items="firstLevelItems">
        <template v-if="slots['first-level-item']" #first-level-item="slotProps">
          <slot name="first-level-item" v-bind="slotProps" />
        </template>
      </VerticalFirstLevelMenu>
      <div
        v-if="treeItems.length"
        data-soybean-split-nav-sub-vertical
        :class="ui.subVertical"
        :data-state="treePaneState"
        :style="treePaneStyle"
      >
        <TreeMenuCompact
          :items="treeItems"
          :model-value="modelValue"
          :collapsed="collapsed"
          :collapsed-width="collapsedWidth"
          expand-strategy="active"
          @update:model-value="handleTreeSelect"
          @update:collapsed="handleCollapsedChange"
        >
          <template v-for="slotName in treeSlotNames" :key="slotName" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
          </template>
        </TreeMenuCompact>
      </div>
    </Primitive>
  </Teleport>
</template>
