<script setup lang="ts">
import { computed } from 'vue';
import { ListboxContent, useForwardProps } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandListProps } from '../types';

defineOptions({
  name: 'SCommandList'
});

const { class: cls, size, ...delegatedProps } = defineProps<CommandListProps>();

const forwarded = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { list } = commandVariants({ size });

  return cn(list(), cls);
});
</script>

<template>
  <ListboxContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </ListboxContent>
</template>
