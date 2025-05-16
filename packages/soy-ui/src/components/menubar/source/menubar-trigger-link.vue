<script setup lang="ts">
import { computed } from 'vue';
import { MenubarTrigger, useForwardProps } from '@soybean-ui/primitives';
import { cn, menuVariants, menubarVariants } from '@soybean-ui/variants';
import { ArrowUpRight } from 'lucide-vue-next';
import { SLink } from '../../link';
import type { MenubarTriggerLinkProps } from '../types';

defineOptions({
  name: 'SMenubarTriggerLink'
});

const { class: cls, size, ui, label, icon, disabled, ...delegatedProps } = defineProps<MenubarTriggerLinkProps>();

const forwardedLinkProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { triggerLink } = menubarVariants({ size });

  return cn(triggerLink(), cls || ui?.triggerLink);
});

const mergedIconCls = computed(() => {
  const { itemIcon, itemLinkIcon } = menuVariants({ size });

  return {
    icon: cn(itemIcon(), ui?.itemIcon),
    linkIcon: cn(itemLinkIcon(), ui?.itemLinkIcon)
  };
});
</script>

<template>
  <MenubarTrigger as-child :disabled="disabled">
    <SLink v-bind="forwardedLinkProps" :class="mergedCls">
      <slot>
        <slot name="leading">
          <component :is="icon" :class="mergedIconCls.icon" />
        </slot>
        <span>{{ label }}</span>
        <ArrowUpRight :class="mergedIconCls.linkIcon" />
        <slot name="trailing" />
      </slot>
    </SLink>
  </MenubarTrigger>
</template>
