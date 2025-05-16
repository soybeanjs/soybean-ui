<script setup lang="ts">
import { computed } from 'vue';
import { TagsInputItemDelete } from '@soybean-ui/primitives';
import { cn, tagsInputVariants } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';
import type { TagsInputItemDeleteProps } from '../types';

defineOptions({
  name: 'STagsInputItemDelete'
});

const { class: cls, size } = defineProps<TagsInputItemDeleteProps>();

const mergedCls = computed(() => {
  const { itemDelete } = tagsInputVariants({ size });

  return cn(itemDelete(), cls);
});
</script>

<template>
  <TagsInputItemDelete :class="mergedCls">
    <X />
  </TagsInputItemDelete>
</template>
