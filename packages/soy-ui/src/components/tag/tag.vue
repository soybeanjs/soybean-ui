<script setup lang="ts">
import { computed } from 'vue';
import { cn, tagVariants } from '@soybean-ui/variants';
import type { TagProps } from './types';

defineOptions({
  name: 'STag'
});

const { class: cls, color, variant, size, shape } = defineProps<TagProps>();

const mergedCls = computed(() => cn(tagVariants({ color, variant, size, shape }), cls));
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
