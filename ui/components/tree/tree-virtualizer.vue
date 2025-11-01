<script setup lang="ts" generic="T extends TreeItemData, U extends MaybeArray<string> | undefined, M extends boolean">
import { TreeVirtualizerRoot, VirtualizerContent } from '@headless';
import type { MaybeArray, TreeItemData } from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import type { TreeVirtualizerEmits, TreeVirtualizerProps } from './types';

defineOptions({
  name: 'STreeVirtualizer'
});

const props = defineProps<TreeVirtualizerProps<T, U, M>>();

const emit = defineEmits<TreeVirtualizerEmits<TreeVirtualizerProps<T, U, M>['multiple']>>();

const forwardedProps = useOmitProps(props, ['contentProps', 'dynamicContentProps']);

const listeners = useForwardListeners(emit);
</script>

<template>
  <TreeVirtualizerRoot
    v-slot="{ virtualItems, flattenItems, modelValue, expanded }"
    v-bind="forwardedProps"
    v-on="listeners"
  >
    <VirtualizerContent v-bind="contentProps" :dynamic-content-props="dynamicContentProps">
      <slot
        v-for="item in virtualItems"
        :key="item.index"
        name="item"
        :virtual-item="item"
        :item="flattenItems[item.index]"
        :model-value="modelValue"
        :expanded="expanded"
      />
    </VirtualizerContent>
  </TreeVirtualizerRoot>
</template>
