<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { badgeVariants, cn } from '@soybean-ui/variants';
import type { BadgeContentProps } from './types';

defineOptions({
  name: 'SBadgeContent'
});

const { class: cls, color, size, position } = defineProps<BadgeContentProps>();

const mergedCls = computed(() => {
  const { content } = badgeVariants({ color, size, position });

  return cn(content(), cls);
});
</script>

<template>
  <Primitive as="span" :class="mergedCls">
    <slot />
  </Primitive>
</template>
