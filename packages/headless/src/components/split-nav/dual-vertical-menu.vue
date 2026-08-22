<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { TreeMenuCompact } from '../tree-menu';
import { toMountedTarget, toTreeMenuOptions } from './shared';
import { useSplitNavRootContext, useSplitNavUi } from './context';
import { useSplitNavDerived } from './hooks';
import type { DualVerticalMenuProps, SplitNavRootSlots } from './types';
import VerticalFirstLevelMenu from './vertical-first-level-menu.vue';

defineOptions({
  name: 'SplitNavDualVerticalMenu'
});

const props = defineProps<DualVerticalMenuProps>();

const slots = defineSlots<SplitNavRootSlots>();

const ui = useSplitNavUi();

const { dir, modelValue, verticalMountedId, onItemActivate } = useSplitNavRootContext('SplitNavDualVerticalMenu');

const { firstLevelItems, childItems } = useSplitNavDerived(() => props.items);

const treeItems = computed(() => toTreeMenuOptions(childItems.value));

const mountTarget = computed(() => toMountedTarget(verticalMountedId.value));

const treeSlotNames = computed(() =>
  keysOf(slots).filter(name => name === 'item' || name === 'item-leading' || name === 'item-trailing')
);

function handleTreeSelect(value: string) {
  onItemActivate(value);
}
</script>

<template>
  <Teleport defer :to="mountTarget" :disabled="!mountTarget">
    <div data-soybean-split-nav-dual-vertical :class="ui.verticalPane" :dir="dir">
      <VerticalFirstLevelMenu :items="firstLevelItems">
        <template v-if="slots['first-level-item']" #first-level-item="slotProps">
          <slot name="first-level-item" v-bind="slotProps" />
        </template>
      </VerticalFirstLevelMenu>
      <div v-if="treeItems.length" data-soybean-split-nav-sub-vertical :class="ui.subVertical">
        <TreeMenuCompact
          :items="treeItems"
          :model-value="modelValue"
          expand-strategy="active"
          @update:model-value="handleTreeSelect"
        >
          <template v-for="slotName in treeSlotNames" :key="slotName" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
          </template>
        </TreeMenuCompact>
      </div>
    </div>
  </Teleport>
</template>
