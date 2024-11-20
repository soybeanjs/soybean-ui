<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuItem, useForwardPropsEmits } from '@soybean-ui/primitive';
import type { DropdownMenuItemEmits } from '@soybean-ui/primitive';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuItemProps } from './types';

defineOptions({
  name: 'SDropdownMenuItem'
});

const { class: cls, size, ...delegatedProps } = defineProps<DropdownMenuItemProps>();

const emit = defineEmits<DropdownMenuItemEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { item } = dropdownMenuVariants({ size });

  return cn(item(), cls);
});
</script>

<template>
  <DropdownMenuItem v-bind="forwarded" :class="mergedCls">
    <slot />
  </DropdownMenuItem>
</template>

<style scoped></style>
