<script setup lang="ts">
import { computed } from 'vue';
import { ListboxGroupLabel } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandGroupLabelProps } from './types';

defineOptions({
  name: 'SCommandGroupLabel'
});

const { class: cls } = defineProps<CommandGroupLabelProps>();

const { groupLabel } = commandVariants();

const mergedCls = computed(() => cn(groupLabel(), cls));
</script>

<template>
  <ListboxGroupLabel :class="mergedCls">
    <slot />
  </ListboxGroupLabel>
</template>
