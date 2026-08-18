<script setup lang="ts">
import { computed, ref } from 'vue';
import type { DefinedValue } from '../../types';
import { isCascaderNodeAncestor } from './shared';
import { useCascaderRootContext, useCascaderUi } from './context';
import CascaderOption from './cascader-option.vue';
import type { CascaderMenuProps, CascaderNode } from './types';

defineOptions({
  name: 'CascaderMenu'
});

const props = withDefaults(defineProps<CascaderMenuProps>(), {
  level: 0,
  optionProps: () => ({})
});

const {
  menus,
  isSearchMode,
  searchResults,
  virtualScroll,
  itemSize,
  height,
  highlighted,
  loadingKeys,
  isChecked,
  isIndeterminate,
  isSelected,
  expandNode
} = useCascaderRootContext('CascaderMenu');

const cls = useCascaderUi('menu');

/** The column rendered by the menu: a linked menu level or the flat search results. */
const column = computed(() => {
  if (isSearchMode.value) return searchResults.value;
  return menus.value[props.level] ?? [];
});

const isVirtual = computed(() => Boolean(virtualScroll.value) && column.value.length > 0);

const rowHeight = computed(() => itemSize.value ?? 34);
const viewportHeight = computed(() => height.value ?? 204);

const scrollTop = ref(0);

const startIndex = computed(() => {
  if (!isVirtual.value) return 0;
  return Math.floor(scrollTop.value / rowHeight.value);
});

const visibleCount = computed(() => {
  if (!isVirtual.value) return column.value.length;
  return Math.ceil(viewportHeight.value / rowHeight.value) + 2;
});

const endIndex = computed(() => Math.min(column.value.length, startIndex.value + visibleCount.value));

const visibleNodes = computed(() => column.value.slice(startIndex.value, endIndex.value));

const paddingTop = computed(() => (isVirtual.value ? startIndex.value * rowHeight.value : 0));
const paddingBottom = computed(() => (isVirtual.value ? (column.value.length - endIndex.value) * rowHeight.value : 0));

const onScroll = (event: Event) => {
  scrollTop.value = (event.target as HTMLElement).scrollTop;
};

/** Whether a descendant of the node is currently highlighted. */
const isChildActive = (node: CascaderNode<DefinedValue>) => {
  const highlightedNode = highlighted.value;
  return highlightedNode ? isCascaderNodeAncestor(highlightedNode, node) : false;
};

/** Slot props forwarded to every option, matching the option slot contract. */
const getSlotProps = (node: CascaderNode<DefinedValue>) => ({
  node,
  checked: isChecked(node),
  indeterminate: isIndeterminate(node),
  selected: isSelected(node),
  highlighted: highlighted.value?.uid === node.uid,
  childActive: isChildActive(node),
  loading: loadingKeys.value.has(node.uid),
  expand: () => expandNode(node)
});
</script>

<template>
  <div
    data-soybean-cascader-menu
    :class="cls"
    :style="isVirtual ? { height: `${viewportHeight}px`, overflowY: 'auto' } : undefined"
    @scroll="onScroll"
  >
    <div v-if="paddingTop > 0" :style="{ height: `${paddingTop}px` }" aria-hidden="true" />
    <CascaderOption
      v-for="(node, index) in visibleNodes"
      :key="node.uid"
      :node="node"
      :index="index"
      :level="level"
      v-bind="optionProps"
    >
      <slot v-bind="getSlotProps(node)" />
    </CascaderOption>
    <div v-if="paddingBottom > 0" :style="{ height: `${paddingBottom}px` }" aria-hidden="true" />
  </div>
</template>
