<script setup lang="ts">
import { computed } from 'vue';
import { useBadgeRootContext, useBadgeThemeContext } from './context';
import type { BadgeContentProps } from './types';

defineOptions({
  name: 'BadgeContent'
});

defineProps<BadgeContentProps>();

const { open } = useBadgeRootContext('BadgeContent');

const themeContext = useBadgeThemeContext();

const cls = computed(() => themeContext?.ui?.value?.content);
</script>

<template>
  <span v-if="open" :class="cls">
    <slot />
  </span>
</template>
