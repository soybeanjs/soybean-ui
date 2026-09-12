<script setup lang="ts" generic="T extends TreeItemData">
import { computed } from 'vue';
import { isTreeMotionItem } from '@soybeanjs/headless/tree';
import type { FlattenedItem, TreeItemData, TreeMotionState } from '@soybeanjs/headless/tree';
import type { MaybeArray } from '@soybeanjs/headless/types';
import type { VirtualItem } from '@tanstack/vue-virtual';
import STreeMotionBlock from './tree-motion-block.vue';

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
  /** Running expand/collapse motion, if any. */
  motion: TreeMotionState<T> | null;
}

const props = defineProps<Props>();

// This component is rendered inside the virtualizer scroll container.
// Visible items are rendered with "document flow + top and bottom padding": the padding provides scroll height (virtualization is retained, only visible items are rendered), and items stay in normal document flow so dynamic measurement keeps positions stable across expand/collapse.
// While a motion is running the full transition list renders in document flow (spacers collapse to zero), then windowing resumes when the motion ends.
const topSpacer = computed(() => (props.motion ? 0 : (props.virtualItems[0]?.start ?? 0)));

const bottomSpacer = computed(() => {
  if (props.motion) return 0;

  const items = props.virtualItems;

  return items.length ? Math.max(0, props.totalSize - items[items.length - 1].end) : 0;
});

function itemKey(index: number) {
  return props.flattenItems[index]?.value ?? index;
}
</script>

<template>
  <div :style="{ position: 'relative', paddingTop: `${topSpacer}px`, paddingBottom: `${bottomSpacer}px` }">
    <template v-if="motion">
      <template
        v-for="listItem in motion.items"
        :key="isTreeMotionItem(listItem) ? '__soybean_tree_motion__' : listItem.value"
      >
        <STreeMotionBlock
          v-if="isTreeMotionItem(listItem)"
          :type="motion.type"
          :items="motion.blockItems"
          @end="motion.end()"
        >
          <template #item="{ item }">
            <slot name="item" :item="item" :model-value="modelValue" :expanded="expanded" />
          </template>
        </STreeMotionBlock>
        <slot v-else name="item" :item="listItem" :model-value="modelValue" :expanded="expanded" />
      </template>
    </template>
    <template v-else>
      <slot
        v-for="item in virtualItems"
        :key="itemKey(item.index)"
        name="item"
        :item="flattenItems[item.index]"
        :virtual-item="item"
        :model-value="modelValue"
        :expanded="expanded"
      />
    </template>
  </div>
</template>
