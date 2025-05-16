<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleRoot, useCombinedPropsEmits } from '@soybean-ui/primitives';
import { cn, collapsibleVariants } from '@soybean-ui/variants';
import type { CollapsibleRootEmits, CollapsibleRootProps } from '../types';

defineOptions({
  name: 'SCollapsibleRoot'
});

const { class: cls, size, ...delegatedProps } = defineProps<CollapsibleRootProps>();

const emit = defineEmits<CollapsibleRootEmits>();

const forwarded = useCombinedPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = collapsibleVariants();

  return cn(root({ size }), cls);
});
</script>

<template>
  <CollapsibleRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </CollapsibleRoot>
</template>
