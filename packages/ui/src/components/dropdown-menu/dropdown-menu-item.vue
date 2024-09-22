<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuItem, useForwardPropsEmits } from 'radix-vue';
import type { DropdownMenuItemEmits } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { DropdownMenuItemProps } from './types';

defineOptions({
  name: 'SDropdownMenuItem'
});

const props = defineProps<DropdownMenuItemProps>();

const emit = defineEmits<DropdownMenuItemEmits>();

const delegatedProps = computedOmit(props, ['class', 'size']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { item } = dropdownMenuVariants({ size: props.size });

  return cn(item(), props.class);
});
</script>

<template>
  <DropdownMenuItem v-bind="forwarded" :class="cls">
    <slot />
  </DropdownMenuItem>
</template>

<style scoped></style>
