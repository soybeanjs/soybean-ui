<script setup lang="ts">
import { computed } from 'vue';
import { cn, layoutVariants } from '@soybean-ui/variants';
import type { LayoutHeaderProps } from '../types';

defineOptions({
  name: 'SLayoutHeader'
});

const { class: cls } = defineProps<LayoutHeaderProps>();

const { header } = layoutVariants();

const mergedCls = computed(() => cn(header(), cls));
</script>

<template>
  <header :class="mergedCls">
    <slot />
  </header>
</template>
