<script setup lang="ts">
import { computed } from 'vue';
import { MenuRadioItem, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import { CircleSmall } from 'lucide-vue-next';
import type { MenuRadioItemEmits, MenuRadioItemProps } from '../types';
import SMenuItemIndicator from './menu-item-indicator.vue';
import SMenuShortcut from './menu-shortcut.vue';

defineOptions({
  name: 'SMenuRadioItem'
});

const { class: cls, size, ui, label, icon, shortcut, ...delegatedProps } = defineProps<MenuRadioItemProps>();

const emit = defineEmits<MenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { radioItem, itemIcon, radioIndicatorIcon } = menuVariants({ size });

  return {
    cls: cn(radioItem(), cls || ui?.radioItem),
    icon: cn(itemIcon(), ui?.itemIcon),
    indicatorIcon: cn(radioIndicatorIcon(), ui?.radioIndicatorIcon)
  };
});
</script>

<template>
  <MenuRadioItem v-bind="forwarded" :class="mergedCls.cls">
    <SMenuItemIndicator :class="ui?.itemIndicator" :size="size">
      <slot name="icon">
        <CircleSmall :class="mergedCls.indicatorIcon" />
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
  </MenuRadioItem>
</template>
