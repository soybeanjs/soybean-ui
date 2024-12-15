<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxSeparator } from '@soybean-ui/primitive';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandSeparatorProps } from './types';

defineOptions({
  name: 'SCommandSeparator'
});

const { class: cls } = defineProps<CommandSeparatorProps>();

const { separator } = commandVariants();

const mergedCls = computed(() => cn(separator(), cls));
</script>

<template>
  <ComboboxSeparator :class="mergedCls" />
</template>
