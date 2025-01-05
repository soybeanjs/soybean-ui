<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { badgeVariants, cn } from '@soybean-ui/variants';
import type { BadgeProps } from './types';

defineOptions({
  name: 'SBadge'
});

const { class: cls, color, variant } = defineProps<BadgeProps>();

const mergedCls = computed(() => cn(badgeVariants({ color, variant }), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>
