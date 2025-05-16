<script setup lang="ts">
import { computed } from 'vue';
import { MenuLabel } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuLabelProps } from '../types';

defineOptions({
  name: 'SMenuLabel'
});

const { class: cls, size, ui } = defineProps<MenuLabelProps>();

const mergedCls = computed(() => {
  const { label, itemIcon } = menuVariants({ size });

  return {
    cls: cn(label(), cls || ui?.label),
    icon: cn(itemIcon(), ui?.itemIcon)
  };
});
</script>

<template>
  <MenuLabel :class="mergedCls.cls">
    <slot>
      <slot name="leading">
        <component :is="icon" :class="mergedCls.icon" />
      </slot>
      <span>{{ label }}</span>
      <slot name="trailing" />
    </slot>
  </MenuLabel>
</template>
