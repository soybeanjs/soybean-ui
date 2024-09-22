<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuShortcutProps } from './types';

defineOptions({
  name: 'SDropdownMenuShortcut'
});

const props = defineProps<DropdownMenuShortcutProps>();

const cls = computed(() => {
  const { shortcut } = dropdownMenuVariants({ size: props.size });

  return cn(shortcut(), props.class);
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
