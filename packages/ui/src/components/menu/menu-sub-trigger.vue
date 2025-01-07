<script setup lang="ts">
import { computed } from 'vue';
import { MenuSubTrigger, useForwardProps } from '@soybean-ui/primitives';
import { ChevronRight } from 'lucide-vue-next';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuSubTriggerProps } from './types';

defineOptions({
  name: 'SMenuSubTrigger'
});

const { class: cls, size, triggerIconClass, ...delegatedProps } = defineProps<MenuSubTriggerProps>();

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
  <MenuSubTrigger v-bind="forwardedProps" :class="mergedCls.subTrigger">
    <slot />
    <slot name="icon">
      <ChevronRight :class="mergedCls.subTriggerIcon" />
    </slot>
  </MenuSubTrigger>
</template>
