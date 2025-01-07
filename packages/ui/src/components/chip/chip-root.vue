<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { chipVariants, cn } from '@soybean-ui/variants';
import type { ChipRootProps } from './types';

defineOptions({
  name: 'SChipRoot'
});

const { class: cls } = defineProps<ChipRootProps>();

const { root } = chipVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>
