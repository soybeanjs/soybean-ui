<script setup lang="ts">
import { computed } from 'vue';
import { badgeVariants, cn } from '@soybean-ui/variants';
import { useThemeSize } from '../../context/theme';
import type { BadgeProps } from './types';

defineOptions({
  name: 'SBadge'
});

const { class: cls, color, variant, size: _size, shape } = defineProps<BadgeProps>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);

const mergedCls = computed(() => cn(badgeVariants({ color, variant, size: size.value, shape }), cls));
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
