<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuTrigger, Slot, useForwardProps } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import { ChevronDown } from 'lucide-vue-next';
import { SLink } from '../link';
import type { NavigationMenuTriggerProps } from './types';

defineOptions({
  name: 'SNavigationMenuTrigger'
});

const { class: cls, size, ui, label, icon, ...delegatedProps } = defineProps<NavigationMenuTriggerProps>();

const forwardedLinkProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { trigger, triggerLeadingIcon, triggerIcon } = navigationMenuVariants({ size });

  return {
    cls: cn(trigger(), cls || ui?.trigger),
    leadingIcon: cn(triggerLeadingIcon(), ui?.triggerLeadingIcon),
    icon: cn(triggerIcon(), ui?.triggerIcon)
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
        <component :is="icon" v-if="icon" :class="mergedCls.leadingIcon" />
        <span>{{ label }}</span>
      </slot>
      <Slot :class="mergedCls.icon" aria-hidden="true">
        <slot name="icon">
          <ChevronDown />
        </slot>
      </Slot>
    </component>
  </NavigationMenuTrigger>
</template>
