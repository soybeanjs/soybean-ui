<script setup lang="ts">
import { computed } from 'vue';
import { ChevronDown } from 'lucide-vue-next';
import { Slot } from '@soybean-ui/primitive';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuTriggerIconProps } from './types';

defineOptions({
  name: 'SNavigationMenuTriggerIcon'
});

const { class: cls } = defineProps<NavigationMenuTriggerIconProps>();

const { triggerIcon } = navigationMenuVariants();

const mergedCls = computed(() => cn(triggerIcon(), cls));
</script>

<template>
  <Slot :class="mergedCls" aria-hidden="true">
    <slot>
      <ChevronDown />
    </slot>
  </Slot>
</template>
