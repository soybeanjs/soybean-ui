<script setup lang="ts">
import { computed } from 'vue';
import { MenubarTrigger } from '@soybean-ui/primitives';
import { cn, menuVariants, menubarVariants } from '@soybean-ui/variants';
import SMenuShortcut from '../../menu/source/menu-shortcut.vue';
import type { MenubarTriggerProps } from '../types';

defineOptions({
  name: 'SMenubarTrigger'
});

const { class: cls, size, ui, label, icon, shortcut, disabled } = defineProps<MenubarTriggerProps>();

const mergedCls = computed(() => {
  const { trigger } = menubarVariants({ size });

  return cn(trigger(), cls || ui?.trigger);
});

const mergedItemIconCls = computed(() => {
  const { itemIcon } = menuVariants({ size });

  return cn(itemIcon(), ui?.itemIcon);
});
</script>

<template>
  <MenubarTrigger :class="mergedCls" :disabled="disabled">
    <slot>
      <slot name="leading">
        <component :is="icon" :class="mergedItemIconCls" />
      </slot>
      <span>{{ label }}</span>
      <slot name="trailing" />
      <SMenuShortcut v-if="shortcut" :class="ui?.shortcut" :size="size" :value="shortcut" />
    </slot>
  </MenubarTrigger>
</template>
