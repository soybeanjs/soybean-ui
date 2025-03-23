<script setup lang="ts">
import { computed } from 'vue';
import { badgeVariants, cn } from '@soybean-ui/variants';
import type { BadgeRootProps } from './types';

defineOptions({
  name: 'SBadgeRoot'
});

const { class: cls } = defineProps<BadgeRootProps>();

const { root } = badgeVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
