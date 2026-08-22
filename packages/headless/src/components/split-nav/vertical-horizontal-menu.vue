<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import type { MenuOptionData } from '../menu/types';
import { MenubarCompact } from '../menubar';
import { toMenuOptions, toMountedTarget } from './shared';
import { useSplitNavRootContext, useSplitNavUi } from './context';
import { useSplitNavDerived } from './hooks';
import type { SplitNavRootSlots } from './types';
import VerticalFirstLevelMenu from './vertical-first-level-menu.vue';

defineOptions({
  name: 'SplitNavVerticalHorizontalMenu'
});

const slots = defineSlots<SplitNavRootSlots>();

const ui = useSplitNavUi();

const { dir, loop, modelValue, verticalMountedId, horizontalMountedId, onItemActivate } = useSplitNavRootContext(
  'SplitNavVerticalHorizontalMenu'
);

const { firstLevelItems, childItems } = useSplitNavDerived();

const menuItems = computed(() => toMenuOptions(childItems.value));

const verticalTarget = computed(() => toMountedTarget(verticalMountedId.value));

const horizontalTarget = computed(() => toMountedTarget(horizontalMountedId.value));

const menubarSlotNames = computed(() => keysOf(slots).filter(name => name === 'item' || name === 'trigger'));

function handleMenubarSelect(item: MenuOptionData | Event, event?: Event) {
  if (!item || item instanceof Event || typeof item !== 'object' || !('value' in item)) {
    return;
  }

  onItemActivate(String(item.value), event);
}
</script>

<template>
  <Teleport defer :to="verticalTarget" :disabled="!verticalTarget">
    <VerticalFirstLevelMenu :items="firstLevelItems">
      <template v-if="slots['first-level-item']" #first-level-item="slotProps">
        <slot name="first-level-item" v-bind="slotProps" />
      </template>
    </VerticalFirstLevelMenu>
  </Teleport>
  <Teleport defer :to="horizontalTarget" :disabled="!horizontalTarget">
    <div v-if="menuItems.length" data-soybean-split-nav-sub-horizontal :class="ui.subHorizontal">
      <MenubarCompact
        :items="menuItems"
        :active-value="modelValue"
        :dir="dir"
        :loop="loop"
        @select="handleMenubarSelect"
      >
        <template v-for="slotName in menubarSlotNames" :key="slotName" #[slotName]="slotProps">
          <!-- @vue-expect-error ignore slot type -->
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </MenubarCompact>
    </div>
  </Teleport>
</template>
