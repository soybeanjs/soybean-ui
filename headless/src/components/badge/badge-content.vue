<script setup lang="ts">
import { useBadgeRootContext, useBadgeUi } from './context';
import type { BadgeContentProps } from './types';

defineOptions({
  name: 'BadgeContent'
});

defineProps<BadgeContentProps>();

const { open } = useBadgeRootContext('BadgeContent');

const cls = useBadgeUi('content');
</script>

<template>
  <span v-if="open" data-soybean-badge-content :class="cls">
    <slot />
  </span>
</template>
