<script setup lang="ts">
import { computed } from 'vue';
import { ListboxGroupLabel } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandGroupLabelProps } from '../types';

defineOptions({
  name: 'SCommandGroupLabel'
});

const { class: cls, size } = defineProps<CommandGroupLabelProps>();

const mergedCls = computed(() => {
  const { groupLabel } = commandVariants({ size });

  return cn(groupLabel(), cls);
});
</script>

<template>
  <ListboxGroupLabel :class="mergedCls">
    <slot />
  </ListboxGroupLabel>
</template>
