<script setup lang="ts">
import { computed } from 'vue';
import { badgeVariants, cn } from '@soybean-ui/variants';
import type { BadgeProps } from '../types';

defineOptions({
  name: 'SBadge'
});

const { class: cls, color, variant, size, shape, content } = defineProps<BadgeProps>();

const mergedCls = computed(() => cn(badgeVariants({ color, variant, size, shape }), cls));
</script>

<template>
  <div :class="mergedCls">
    <slot>{{ content }}</slot>
  </div>
</template>
