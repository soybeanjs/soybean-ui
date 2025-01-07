<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
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
  <Primitive :class="mergedCls" />
</template>
