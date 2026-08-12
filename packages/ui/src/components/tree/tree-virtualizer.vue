<script setup lang="ts" generic="T extends TreeItemData, U extends MaybeArray<string> | undefined, M extends boolean">
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { TreeVirtualizerRoot } from '@soybeanjs/headless/tree';
import type { TreeItemData } from '@soybeanjs/headless/tree';
import type { MaybeArray } from '@soybeanjs/headless/types';
import { VirtualizerContent } from '@soybeanjs/headless/virtualizer';
import STreeVirtualizerAnimated from './tree-virtualizer-animated.vue';
import type { TreeVirtualizerProps, TreeVirtualizerEmits } from './types';

defineOptions({
  name: 'STreeVirtualizer'
});

const props = withDefaults(defineProps<TreeVirtualizerProps<T, U, M>>(), {
  // Mirror the loop: true default of headless TreeRoot to avoid the missing Boolean prop being cast to false and overriding it when passed through
  loop: true,
  animated: false
});

const emit = defineEmits<TreeVirtualizerEmits<TreeVirtualizerProps<T, U, M>['multiple']>>();

const forwardedProps = useOmitProps(props, ['contentProps', 'dynamicContentProps', 'animated']);

const listeners = useForwardListeners(emit);
</script>

<template>
  <TreeVirtualizerRoot
    v-slot="{ virtualItems, totalSize, flattenItems, modelValue, expanded }"
    v-bind="forwardedProps"
    :dynamic="props.animated || props.dynamic"
    v-on="listeners"
  >
    <VirtualizerContent
      v-if="!props.animated"
      v-bind="props.contentProps"
      :dynamic-content-props="props.dynamicContentProps"
    >
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

    <STreeVirtualizerAnimated
      v-else
      :flatten-items="flattenItems"
      :virtual-items="virtualItems"
      :total-size="totalSize"
      :model-value="modelValue"
      :expanded="expanded"
    >
      <template #item="{ item, virtualItem }">
        <slot name="item" :item="item" :virtual-item="virtualItem" :model-value="modelValue" :expanded="expanded" />
      </template>
    </STreeVirtualizerAnimated>
  </TreeVirtualizerRoot>
</template>
