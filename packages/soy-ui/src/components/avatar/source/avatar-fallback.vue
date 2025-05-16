<script setup lang="ts">
import { computed } from 'vue';
import { AvatarFallback } from '@soybean-ui/primitives';
import { avatarVariants, cn } from '@soybean-ui/variants';
import type { AvatarFallbackProps } from '../types';

defineOptions({
  name: 'SAvatarFallback'
});

const { class: cls, delayMs } = defineProps<AvatarFallbackProps>();

const { fallback } = avatarVariants();

const mergedCls = computed(() => cn(fallback(), cls));
</script>

<template>
  <AvatarFallback :class="mergedCls" :delay-ms="delayMs">
    <slot />
  </AvatarFallback>
</template>
