<script setup lang="ts">
import { computed } from 'vue';
import { TagsInputItem } from '@soybean-ui/primitives';
import { cn, tagsInputVariants } from '@soybean-ui/variants';
import type { TagsInputItemProps } from '../types';

defineOptions({
  name: 'STagsInputItem'
});

const { class: cls, size, ...delegatedProps } = defineProps<TagsInputItemProps>();

const mergedCls = computed(() => {
  const { item } = tagsInputVariants({ size });

  return cn(item(), cls);
});
</script>

<template>
  <TagsInputItem v-bind="delegatedProps" :class="mergedCls">
    <slot />
  </TagsInputItem>
</template>
