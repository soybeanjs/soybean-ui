<script setup lang="ts">
import { computed } from 'vue';
import { AvatarFallback } from '@soybean-ui/primitive';
import { avatarVariants, cn } from '@soybean-ui/variants';
import type { AvatarFallbackProps } from './types';

defineOptions({
  name: 'SAvatarFallback'
});

const { class: cls, delayMs } = defineProps<AvatarFallbackProps>();

const { fallback } = avatarVariants();

const mergedCls = computed(() => cn(fallback(), cls));
</script>

<template>
  <AvatarFallback :delay-ms :class="mergedCls">
    <slot></slot>
  </AvatarFallback>
</template>
