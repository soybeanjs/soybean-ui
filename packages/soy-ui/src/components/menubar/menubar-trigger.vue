<script setup lang="ts">
import { computed } from 'vue';
import { MenubarTrigger } from '@soybean-ui/primitives';
import { cn, menubarVariants } from '@soybean-ui/variants';
import type { MenubarTriggerProps } from './types';

defineOptions({
  name: 'SMenubarTrigger'
});

const { class: cls, size, disabled } = defineProps<MenubarTriggerProps>();

const mergedCls = computed(() => {
  const { trigger } = menubarVariants({ size });

  return cn(trigger(), cls);
});
</script>

<template>
  <MenubarTrigger :class="mergedCls" :disabled="disabled">
    <slot />
  </MenubarTrigger>
</template>
