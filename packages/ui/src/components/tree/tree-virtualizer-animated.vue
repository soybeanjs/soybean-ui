<script setup lang="ts" generic="T extends TreeItemData">
import { computed } from 'vue';
import type { FlattenedItem, TreeItemData } from '@soybeanjs/headless/tree';
import type { MaybeArray } from '@soybeanjs/headless/types';
import type { VirtualItem } from '@tanstack/vue-virtual';
import { vAutoAnimate } from '@formkit/auto-animate';

defineOptions({
  name: 'STreeVirtualizerAnimated'
});

interface Props {
  /** Flattened items of the whole tree. */
  flattenItems: FlattenedItem<T>[];
  /** Current virtualized (visible) items. */
  virtualItems: VirtualItem[];
  /** Total size of the virtual scroll content. */
  totalSize: number;
  /** Current selected value. */
  modelValue: MaybeArray<string> | undefined;
  /** Current expanded keys. */
  expanded: string[];
}

const props = defineProps<Props>();

// This component is rendered inside the virtualizer scroll container.
// Visible items are rendered with "document flow + top and bottom padding": the padding provides scroll height (virtualization is retained, only visible items are rendered), and items are in normal document flow, so auto-animate can perform FLIP position transition for expand/collapse.
const topSpacer = computed(() => props.virtualItems[0]?.start ?? 0);

const bottomSpacer = computed(() => {
  const items = props.virtualItems;

  return items.length ? Math.max(0, props.totalSize - items[items.length - 1].end) : 0;
});

function itemKey(index: number) {
  return props.flattenItems[index]?.value ?? index;
}
</script>

<template>
  <div
    v-auto-animate
    :style="{ position: 'relative', paddingTop: `${topSpacer}px`, paddingBottom: `${bottomSpacer}px` }"
  >
    <slot
      v-for="item in virtualItems"
      :key="itemKey(item.index)"
      name="item"
      :item="flattenItems[item.index]"
      :virtual-item="item"
      :model-value="modelValue"
      :expanded="expanded"
    />
  </div>
</template>
