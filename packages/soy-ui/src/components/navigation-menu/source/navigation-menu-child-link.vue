<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuLink, useForwardProps } from '@soybean-ui/primitives';
import type { NavigationMenuLinkEmits } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import { SLink } from '../../link';
import type { NavigationMenuChildLinkProps } from '../types';

defineOptions({
  name: 'SNavigationMenuChildLink'
});

const {
  class: cls,
  size,
  active,
  ui,
  label,
  icon,
  description,
  ...delegatedProps
} = defineProps<NavigationMenuChildLinkProps>();

const emit = defineEmits<NavigationMenuLinkEmits>();

const forwardedLinkProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { childLink, childLinkIcon, childLinkContent, childLinkLabel, childLinkDescription } = navigationMenuVariants({
    size
  });

  return {
    cls: cn(childLink(), cls || ui?.childLink),
    icon: cn(childLinkIcon(), ui?.childLinkIcon),
    content: cn(childLinkContent(), ui?.childLinkContent),
    label: cn(childLinkLabel(), ui?.childLinkLabel),
    description: cn(childLinkDescription(), ui?.childLinkDescription)
  };
});
</script>

<template>
  <NavigationMenuLink :class="mergedCls.cls" :active="active" as-child @select="emit('select', $event)">
    <SLink v-bind="forwardedLinkProps">
      <component :is="icon" v-if="icon" :class="mergedCls.icon" />
      <div :class="mergedCls.content">
        <div :class="mergedCls.label">{{ label }}</div>
        <p v-if="description" :class="mergedCls.description">{{ description }}</p>
      </div>
    </SLink>
  </NavigationMenuLink>
</template>
