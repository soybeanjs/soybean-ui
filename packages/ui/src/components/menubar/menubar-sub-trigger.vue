<script setup lang="ts">
import { computed } from 'vue';
import { MenubarSubTrigger, useForwardProps } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import { ChevronRight } from 'lucide-vue-next';
import type { MenubarSubTriggerProps } from './types';

defineOptions({
  name: 'SMenubarSubTrigger'
});

const { class: cls, size, triggerIconClass, ...delegatedProps } = defineProps<MenubarSubTriggerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { subTrigger, subTriggerIcon } = menuVariants({ size });
  return {
    subTrigger: cn(subTrigger(), cls),
    subTriggerIcon: cn(subTriggerIcon(), triggerIconClass)
  };
});
</script>

<template>
  <MenubarSubTrigger v-bind="forwardedProps" :class="mergedCls.subTrigger">
    <slot />
    <slot name="icon">
      <ChevronRight :class="mergedCls.subTriggerIcon" />
    </slot>
  </MenubarSubTrigger>
</template>
