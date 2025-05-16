<script setup lang="ts">
import { computed } from 'vue';
import { chipVariants, cn } from '@soybean-ui/variants';
import type { ChipRootProps } from '../types';

defineOptions({
  name: 'SChipRoot'
});

const { class: cls } = defineProps<ChipRootProps>();

const { root } = chipVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
