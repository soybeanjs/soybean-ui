<script setup lang="ts" generic="T extends TreeItemData, U extends MaybeArray<string> | undefined, M extends boolean">
import { TreeRoot } from '@soybeanjs/headless';
import { useForwardListeners } from '@soybeanjs/headless/composables';
import type { MaybeArray, TreeItemData, TreeRootEmits, TreeRootProps } from '@soybeanjs/headless';
import { vAutoAnimate } from '@formkit/auto-animate';

defineOptions({
  name: 'STree'
});

const props = withDefaults(defineProps<TreeRootProps<T, U, M>>(), {
  loop: true
});

const emit = defineEmits<TreeRootEmits<TreeRootProps<T, U, M>['multiple']>>();

const listeners = useForwardListeners(emit);
</script>

<template>
  <TreeRoot v-slot="{ flattenItems, modelValue, expanded }" v-auto-animate v-bind="props" v-on="listeners">
    <slot name="top" />
    <slot
      v-for="item in flattenItems"
      :key="item.value"
      name="item"
      :item="item"
      :model-value="modelValue"
      :expanded="expanded"
    />
    <slot name="bottom" />
  </TreeRoot>
</template>
