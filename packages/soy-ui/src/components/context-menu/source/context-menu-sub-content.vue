<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { ContextMenuSubContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from '../types';

defineOptions({
  name: 'SContextMenuSubContent'
});

const { class: cls, size, ...delegatedProps } = defineProps<ContextMenuSubContentProps>();

const emit = defineEmits<ContextMenuSubContentEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { subContent } = menuVariants({ size });

  return cn(subContent(), cls);
});
</script>

<template>
  <ContextMenuSubContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </ContextMenuSubContent>
</template>
