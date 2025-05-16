<script setup lang="ts" generic="T extends AcceptableInputValue = AcceptableInputValue">
import { computed } from 'vue';
import { TagsInputRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableInputValue } from '@soybean-ui/primitives';
import { cn, tagsInputVariants } from '@soybean-ui/variants';
import type { TagsInputRootEmits, TagsInputRootProps } from '../types';

defineOptions({
  name: 'STagsInputRoot'
});

const { class: cls, size, ...delegatedProps } = defineProps<TagsInputRootProps<T>>();

const emit = defineEmits<TagsInputRootEmits<T>>();

const mergedCls = computed(() => {
  const { root } = tagsInputVariants({ size });

  return cn(root(), cls);
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <TagsInputRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </TagsInputRoot>
</template>
