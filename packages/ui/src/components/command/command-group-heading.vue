<script setup lang="ts">
import { computed } from 'vue';
import { ListboxGroupLabel } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandGroupHeadingProps } from './types';

defineOptions({
  name: 'SCommandGroupHeading'
});

const { class: cls } = defineProps<CommandGroupHeadingProps>();

const { groupHeading } = commandVariants();

const mergedCls = computed(() => cn(groupHeading(), cls));
</script>

<template>
  <ListboxGroupLabel :class="mergedCls">
    <slot />
  </ListboxGroupLabel>
</template>
