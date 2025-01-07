<script setup lang="ts">
import { computed } from 'vue';
import { MenuItem, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuItemEmits, MenuItemProps } from './types';

defineOptions({
  name: 'SMenuItem'
});

const { class: cls, size, ...delegatedProps } = defineProps<MenuItemProps>();

const emit = defineEmits<MenuItemEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { item } = menuVariants({ size });

  return cn(item(), cls);
});
</script>

<template>
  <MenuItem v-bind="forwarded" :class="mergedCls">
    <slot />
  </MenuItem>
</template>
