<script setup lang="ts">
import { computed } from 'vue';
import { TagsInputInput } from '@soybean-ui/primitives';
import { cn, tagsInputVariants } from '@soybean-ui/variants';
import type { TagsInputInputProps } from '../types';

defineOptions({
  name: 'STagsInputInput'
});

const { class: cls, size, ...delegatedProps } = defineProps<TagsInputInputProps>();

const mergedCls = computed(() => {
  const { input } = tagsInputVariants({ size });

  return cn(input(), cls);
});
</script>

<template>
  <TagsInputInput v-bind="delegatedProps" :class="mergedCls">
    <slot />
  </TagsInputInput>
</template>
