<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuLink, useForwardProps } from '@soybean-ui/primitives';
import type { NavigationMenuLinkEmits } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import { ArrowUpRight } from 'lucide-vue-next';
import { SLink } from '../../link';
import type { NavigationMenuLinkProps } from '../types';

defineOptions({
  name: 'SNavigationMenuLink'
});

const { class: cls, size, ui, label, icon, active, ...delegatedProps } = defineProps<NavigationMenuLinkProps>();

const emit = defineEmits<NavigationMenuLinkEmits>();

const forwardedLinkProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { link, linkLabel, itemIcon, linkIcon } = navigationMenuVariants({ size });

  return {
    cls: cn(link(), cls || ui?.link),
    icon: cn(itemIcon(), ui?.itemIcon),
    label: cn(linkLabel(), ui?.linkLabel),
    linkIcon: cn(linkIcon(), ui?.linkIcon)
  };
});
</script>

<template>
  <NavigationMenuLink
    :class="mergedCls.cls"
    :disabled="disabled"
    :active="active"
    as-child
    @select="emit('select', $event)"
  >
    <component :is="disabled ? 'button' : SLink" v-bind="forwardedLinkProps">
      <slot>
        <component :is="icon" v-if="icon" :class="mergedCls.icon" />
        <span :class="mergedCls.label">{{ label }}</span>
        <ArrowUpRight :class="mergedCls.linkIcon" />
      </slot>
    </component>
  </NavigationMenuLink>
</template>
