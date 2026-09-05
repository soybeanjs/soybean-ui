<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '../../shared';
import { Primitive } from '../primitive';
import { TreeMenuCompact } from '../tree-menu';
import { toMountedTarget, toTreeMenuOptions, isPaneBoundaryKey } from './shared';
import { useSplitNavRootContext, useSplitNavUi } from './context';
import { useSplitNavDerived, useSplitNavPaneFallback, useSplitNavTreePane } from './hooks';
import type { DualVerticalPaneProps, SplitNavRootSlots } from './types';
import VerticalFirstLevelMenu from './vertical-first-level-menu.vue';

defineOptions({
  name: 'SplitNavDualVerticalPane'
});

const props = defineProps<DualVerticalPaneProps>();

const slots = defineSlots<SplitNavRootSlots>();

const ui = useSplitNavUi();

const { dir, mode, openPath, railItemElements, rootAttrs, verticalMountedId } =
  useSplitNavRootContext('SplitNavDualVerticalPane');

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

const { activeItem, firstLevelItems, childItems } = useSplitNavDerived(() => props.items);

const { onPaneKeydown } = useSplitNavPaneFallback(activeItem);

const { collapsed, collapsedWidth, modelValue, treePaneState, treePaneStyle, handleTreeSelect, handleCollapsedChange } =
  useSplitNavTreePane();

const treeItems = computed(() => toTreeMenuOptions(childItems.value));

const mountTarget = computed(() => toMountedTarget(verticalMountedId.value));

const treeSlotNames = computed(() =>
  keysOf(slots).filter(name => name === 'item' || name === 'item-leading' || name === 'item-trailing')
);

// ArrowUp is swallowed by the vertical roving groups even at their boundary, so
// the nested rail's first item falls back to the parent rail (capture phase).
// The standalone layout renders the top-level rail inside this element, so its
// own items are excluded from the fallback.
function handlePaneKeydownCapture(event: KeyboardEvent) {
  const paneElement = event.currentTarget as HTMLElement;

  if (!isPaneBoundaryKey(event, paneElement, key => key === 'ArrowUp')) return;

  const firstItem = paneElement.querySelector<HTMLElement>('[data-soybean-collection-item]');

  if (
    paneElement.hasAttribute('data-soybean-split-nav-root') &&
    firstItem?.closest('[data-soybean-split-nav-first-level-item]')
  ) {
    return;
  }

  const ownerValue =
    firstItem?.getAttribute('data-value') === activeItem.value?.value ? openPath.value[0] : activeItem.value?.value;

  if (!ownerValue) return;

  event.preventDefault();
  railItemElements.get(ownerValue)?.focus();
}
</script>

<template>
  <Teleport defer :to="mountTarget" :disabled="!mountTarget">
    <Primitive
      v-bind="standaloneBind"
      :class="ui.verticalPane"
      :dir="dir"
      data-soybean-split-nav-dual-vertical
      @keydown="onPaneKeydown"
      @keydown-capture="handlePaneKeydownCapture"
    >
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
          expand-strategy="selected"
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
