<script setup lang="ts">
import { computed } from 'vue';
import { MenuItem, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuItemEmits, MenuItemProps } from '../types';
import SMenuShortcut from './menu-shortcut.vue';

defineOptions({
  name: 'SMenuItem'
});

const { class: cls, size, ui, label, icon, shortcut, ...delegatedProps } = defineProps<MenuItemProps>();

const emit = defineEmits<MenuItemEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { item, itemIcon } = menuVariants({ size });

  return {
    cls: cn(item(), cls || ui?.item),
    icon: cn(itemIcon(), ui?.itemIcon)
  };
});
</script>

<template>
  <MenuItem v-bind="forwarded" :class="mergedCls.cls">
    <slot>
      <slot name="leading">
        <component :is="icon" :class="mergedCls.icon" />
      </slot>
      <span>{{ label }}</span>
      <slot name="trailing" />
      <SMenuShortcut v-if="shortcut" :class="ui?.shortcut" :size="size" :value="shortcut" />
    </slot>
  </MenuItem>
</template>
