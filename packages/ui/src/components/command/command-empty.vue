<script setup lang="ts">
import { computed } from 'vue';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandEmptyProps } from './types';

defineOptions({
  name: 'SCommandEmpty'
});

const { class: cls } = defineProps<CommandEmptyProps>();

const { empty } = commandVariants();

const mergedCls = computed(() => cn(empty(), cls));
</script>

<template>
  <div :class="mergedCls">
    <slot></slot>
  </div>
</template>
