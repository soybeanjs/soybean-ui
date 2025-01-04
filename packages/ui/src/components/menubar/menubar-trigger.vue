<script setup lang="ts">
import { computed } from 'vue';
import { MenubarTrigger } from '@soybean-ui/primitive';
import { cn, menubarVariants } from '@soybean-ui/variants';
import type { MenubarTriggerProps } from './types';

defineOptions({
  name: 'SMenubarTrigger'
});

const { class: cls, disabled } = defineProps<MenubarTriggerProps>();

const { trigger } = menubarVariants();

const mergedCls = computed(() => cn(trigger(), cls));
</script>

<template>
  <MenubarTrigger :class="mergedCls" :disabled="disabled">
    <slot />
  </MenubarTrigger>
</template>
