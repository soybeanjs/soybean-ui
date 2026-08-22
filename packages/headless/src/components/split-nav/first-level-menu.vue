<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { findActivePath, flattenFirstLevelItems } from './shared';
import { useSplitNavRootContext, useSplitNavUi } from './context';
import FirstLevelItem from './first-level-item.vue';
import type { FirstLevelMenuProps, SplitNavOptionData, SplitNavRootSlots } from './types';

defineOptions({
  name: 'SplitNavFirstLevelMenu'
});

const props = defineProps<FirstLevelMenuProps>();

const slots = defineSlots<Pick<SplitNavRootSlots, 'first-level-item'>>();

const cls = useSplitNavUi('firstLevel');

const { dir, loop, items: rootItems, modelValue } = useSplitNavRootContext('SplitNavFirstLevelMenu');

const visibleItems = computed(() => flattenFirstLevelItems(props.items));

const activePath = computed(() => findActivePath(rootItems.value, modelValue.value));

const hasFirstLevelItemSlot = computed(() => Boolean(slots['first-level-item']));

const dataAttr = computed(() =>
  props.orientation === 'vertical'
    ? { 'data-soybean-split-nav-vertical-first-level': '' }
    : { 'data-soybean-split-nav-horizontal-first-level': '' }
);

function isItemActive(item: SplitNavOptionData) {
  return activePath.value.includes(item.value);
}
</script>

<template>
  <RovingFocusGroup as-child :orientation="orientation" :dir="dir" :loop="loop">
    <Primitive
      v-bind="dataAttr"
      data-soybean-split-nav-first-level
      :class="cls"
      role="menubar"
      :aria-label="orientation === 'vertical' ? 'Vertical navigation' : 'Horizontal navigation'"
      :aria-orientation="orientation"
      :data-orientation="orientation"
      :dir="dir"
    >
      <FirstLevelItem v-for="item in visibleItems" :key="item.value" :item="item">
        <template v-if="hasFirstLevelItemSlot">
          <slot name="first-level-item" :item="item" :active="isItemActive(item)" />
        </template>
      </FirstLevelItem>
    </Primitive>
  </RovingFocusGroup>
</template>
