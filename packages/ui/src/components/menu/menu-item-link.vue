<script setup lang="ts">
import { computed } from 'vue';
import { MenuItem, useForwardPropsEmits } from '@soybean-ui/primitive';
import { cn, menuVariants } from '@soybean-ui/variants';
import { SLink } from '../link';
import type { MenuItemLinkEmits, MenuItemLinkProps } from './types';

defineOptions({
  name: 'SMenuItemLink'
});

const { class: cls, size, disabled, textValue, ...delegatedProps } = defineProps<MenuItemLinkProps>();

const emit = defineEmits<MenuItemLinkEmits>();

const forwardedLink = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { itemLink } = menuVariants({ size });

  return cn(itemLink(), cls);
});
</script>

<template>
  <MenuItem :class="mergedCls" as-child :disabled="disabled" :text-value="textValue">
    <SLink v-bind="forwardedLink" :disabled="disabled">
      <slot />
    </SLink>
  </MenuItem>
</template>
