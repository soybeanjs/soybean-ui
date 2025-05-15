<script setup lang="ts">
import { computed } from 'vue';
import { MenuCheckboxItem, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import { Check } from 'lucide-vue-next';
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from '../types';
import SMenuItemIndicator from './menu-item-indicator.vue';
import SMenuShortcut from './menu-shortcut.vue';

defineOptions({
  name: 'SMenuCheckboxItem'
});

const { class: cls, size, ui, label, icon, shortcut, ...delegatedProps } = defineProps<MenuCheckboxItemProps>();

const emit = defineEmits<MenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { checkboxItem, itemIcon } = menuVariants({ size });

  return {
    cls: cn(checkboxItem(), cls || ui?.checkboxItem),
    icon: cn(itemIcon(), ui?.itemIcon)
  };
});
</script>

<template>
  <MenuCheckboxItem v-bind="forwarded" :class="mergedCls.cls">
    <SMenuItemIndicator :class="ui?.itemIndicator" :size="size">
      <slot name="icon">
        <Check />
      </slot>
    </SMenuItemIndicator>
    <slot>
      <slot name="leading">
        <component :is="icon" :class="mergedCls.icon" />
      </slot>
      <span>{{ label }}</span>
      <slot name="trailing" />
      <SMenuShortcut v-if="shortcut" :class="ui?.shortcut" :size="size" :value="shortcut" />
    </slot>
  </MenuCheckboxItem>
</template>
