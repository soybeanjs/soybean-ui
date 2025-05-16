<script setup lang="ts">
import { computed } from 'vue';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandEmptyProps } from '../types';

defineOptions({
  name: 'SCommandEmpty'
});

const { class: cls, size } = defineProps<CommandEmptyProps>();

const mergedCls = computed(() => {
  const { empty } = commandVariants({ size });

  return cn(empty(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
