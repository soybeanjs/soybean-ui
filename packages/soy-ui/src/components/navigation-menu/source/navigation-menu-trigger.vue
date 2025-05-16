<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuTrigger, useForwardProps } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import { ChevronDown } from 'lucide-vue-next';
import { SLink } from '../../link';
import type { NavigationMenuTriggerProps } from '../types';

defineOptions({
  name: 'SNavigationMenuTrigger'
});

const { class: cls, size, ui, label, icon, ...delegatedProps } = defineProps<NavigationMenuTriggerProps>();

const forwardedLinkProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { trigger, itemIcon, triggerIcon } = navigationMenuVariants({ size });

  return {
    cls: cn(trigger(), cls || ui?.trigger),
    icon: cn(itemIcon(), ui?.itemIcon),
    triggerIcon: cn(triggerIcon(), ui?.triggerIcon)
  };
});

const as = computed(() => {
  if (delegatedProps.disabled) {
    return 'button';
  }

  if (delegatedProps.href || delegatedProps.to) {
    return SLink;
  }

  return 'button';
});
</script>

<template>
  <NavigationMenuTrigger :class="mergedCls.cls" as-child :disabled="disabled">
    <component :is="as" v-bind="forwardedLinkProps">
      <slot>
        <component :is="icon" v-if="icon" :class="mergedCls.icon" />
        <span>{{ label }}</span>
      </slot>
      <slot name="icon">
        <ChevronDown :class="mergedCls.triggerIcon" aria-hidden="true" />
      </slot>
    </component>
  </NavigationMenuTrigger>
</template>
