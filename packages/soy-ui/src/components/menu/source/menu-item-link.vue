<script setup lang="ts">
import { computed } from 'vue';
import { MenuItem, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import { ArrowUpRight } from 'lucide-vue-next';
import { SLink } from '../../link';
import type { MenuItemLinkEmits, MenuItemLinkProps } from '../types';

defineOptions({
  name: 'SMenuItemLink'
});

const { class: cls, size, ui, label, icon, disabled, textValue, ...delegatedProps } = defineProps<MenuItemLinkProps>();

const emit = defineEmits<MenuItemLinkEmits>();

const forwardedLink = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { itemLink, itemIcon, itemLinkIcon } = menuVariants({ size });

  return {
    cls: cn(itemLink(), cls || ui?.itemLink),
    icon: cn(itemIcon(), ui?.itemIcon),
    linkIcon: cn(itemLinkIcon(), ui?.itemLinkIcon)
  };
});
</script>

<template>
  <MenuItem :class="mergedCls.cls" as-child :disabled="disabled" :text-value="textValue">
    <SLink v-bind="forwardedLink" :disabled="disabled">
      <slot>
        <slot name="leading">
          <component :is="icon" :class="mergedCls.icon" />
        </slot>
        <span>{{ label }}</span>
        <ArrowUpRight :class="mergedCls.linkIcon" />
        <slot name="trailing" />
      </slot>
    </SLink>
  </MenuItem>
</template>
