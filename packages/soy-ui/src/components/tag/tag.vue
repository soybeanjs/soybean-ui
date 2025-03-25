<script setup lang="ts">
import { computed } from 'vue';
import { cn, tagVariants } from '@soybean-ui/variants';
import { useThemeSize } from '../../context/theme';
import type { TagProps } from './types';

defineOptions({
  name: 'STag'
});

const { class: cls, color, variant, size: _size, shape } = defineProps<TagProps>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);

const mergedCls = computed(() => cn(tagVariants({ color, variant, size: size.value, shape }), cls));
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
