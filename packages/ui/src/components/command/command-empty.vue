<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxEmpty } from '@soybean-ui/primitive';
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
  <ComboboxEmpty :class="mergedCls">
    <slot />
  </ComboboxEmpty>
</template>
