<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuTrigger, Slot } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import { ChevronDown } from 'lucide-vue-next';
import type { NavigationMenuTriggerProps } from './types';

defineOptions({
  name: 'SNavigationMenuTrigger'
});

const { class: cls, size, disabled, iconClass } = defineProps<NavigationMenuTriggerProps>();

const mergedCls = computed(() => {
  const { trigger, triggerIcon } = navigationMenuVariants({ size });

  return {
    cls: cn(trigger(), cls),
    icon: cn(triggerIcon(), iconClass)
  };
});
</script>

<template>
  <NavigationMenuTrigger :class="mergedCls.cls" :disabled="disabled">
    <slot />
    <Slot :class="mergedCls.icon" aria-hidden="true">
      <slot name="icon">
        <ChevronDown />
      </slot>
    </Slot>
  </NavigationMenuTrigger>
</template>
