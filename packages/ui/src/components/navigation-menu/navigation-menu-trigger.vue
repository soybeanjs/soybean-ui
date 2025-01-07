<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuTrigger } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuTriggerProps } from './types';
import SNavigationMenuTriggerIcon from './navigation-menu-trigger-icon.vue';

defineOptions({
  name: 'SNavigationMenuTrigger'
});

const { class: cls, disabled, iconClass } = defineProps<NavigationMenuTriggerProps>();

const { trigger } = navigationMenuVariants();

const mergedCls = computed(() => cn(trigger(), cls));
</script>

<template>
  <NavigationMenuTrigger :class="mergedCls" :disabled="disabled">
    <slot />
    <slot name="icon">
      <SNavigationMenuTriggerIcon :class="iconClass" aria-hidden="true" />
    </slot>
  </NavigationMenuTrigger>
</template>
