<script setup lang="ts">
import { computed } from 'vue';
import { ContextMenuContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { ContextMenuContentEmits, ContextMenuContentProps } from '../types';

defineOptions({
  name: 'SContextMenuContent'
});

const { class: cls, size, ...delegatedProps } = defineProps<ContextMenuContentProps>();

const emit = defineEmits<ContextMenuContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = menuVariants({ size });

  return cn(content(), cls);
});
</script>

<template>
  <ContextMenuContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </ContextMenuContent>
</template>
