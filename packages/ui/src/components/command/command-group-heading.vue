<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxLabel } from '@soybean-ui/primitive';
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
  <ComboboxLabel :class="mergedCls">
    <slot />
  </ComboboxLabel>
</template>
