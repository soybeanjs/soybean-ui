<script setup lang="ts">
import { computed } from 'vue';
import { TagsInputItemText } from '@soybean-ui/primitives';
import { cn, tagsInputVariants } from '@soybean-ui/variants';
import type { TagsInputItemTextProps } from '../types';

defineOptions({
  name: 'STagsInputItemText'
});

const { class: cls, size } = defineProps<TagsInputItemTextProps>();

const mergedCls = computed(() => {
  const { itemText } = tagsInputVariants({ size });

  return cn(itemText(), cls);
});
</script>

<template>
  <TagsInputItemText :class="mergedCls">
    <slot />
  </TagsInputItemText>
</template>
