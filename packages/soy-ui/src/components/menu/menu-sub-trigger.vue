<script setup lang="ts">
import { computed } from 'vue';
import { MenuSubTrigger, useForwardProps } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import { ChevronRight } from 'lucide-vue-next';
import type { MenuSubTriggerProps } from './types';

defineOptions({
  name: 'SMenuSubTrigger'
});

const { class: cls, size, iconClass, ...delegatedProps } = defineProps<MenuSubTriggerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { subTrigger, subTriggerIcon } = menuVariants({ size });

  return {
    subTrigger: cn(subTrigger(), cls),
    subTriggerIcon: cn(subTriggerIcon(), iconClass)
  };
});
</script>

<template>
  <MenuSubTrigger v-bind="forwardedProps" :class="mergedCls.subTrigger">
    <slot />
    <slot name="icon">
      <ChevronRight :class="mergedCls.subTriggerIcon" />
    </slot>
  </MenuSubTrigger>
</template>
