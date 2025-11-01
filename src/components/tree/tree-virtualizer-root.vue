<script setup lang="ts" generic="T extends TreeItemData, U extends MaybeArray<string> | undefined, M extends boolean">
import { useForwardListeners, useOmitProps } from '../../composables';
import type { MaybeArray } from '../../types';
import VirtualizerRoot from '../virtualizer/virtualizer-root.vue';
import TreeRoot from './tree-root.vue';
import type { TreeItemData, TreeVirtualizerRootEmits, TreeVirtualizerRootProps } from './types';

defineOptions({
  name: 'TreeVirtualizerRoot'
});

const props = withDefaults(defineProps<TreeVirtualizerRootProps<T, U, M>>(), {
  items: () => []
});

const emit = defineEmits<TreeVirtualizerRootEmits<TreeVirtualizerRootProps<T, U, M>['multiple']>>();

const forwardedProps = useOmitProps(props, ['as', 'asChild', 'options', 'height']);

const listeners = useForwardListeners(emit);
</script>

<template>
  <TreeRoot v-slot="{ flattenItems, modelValue, expanded }" v-bind="forwardedProps" as-child v-on="listeners">
    <VirtualizerRoot
      v-slot="{ virtualItems }"
      :as="as"
      :as-child="asChild"
      :items="flattenItems"
      :options="options"
      :height="height"
    >
      <slot
        :virtual-items="virtualItems"
        :flatten-items="flattenItems"
        :model-value="modelValue"
        :expanded="expanded"
      />
    </VirtualizerRoot>
  </TreeRoot>
</template>
