<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuShortcutProps } from './types';

defineOptions({
  name: 'SDropdownMenuShortcut'
});

const { class: cls, size } = defineProps<DropdownMenuShortcutProps>();

const mergedCls = computed(() => {
  const { shortcut } = dropdownMenuVariants({ size });

  return cn(shortcut(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
