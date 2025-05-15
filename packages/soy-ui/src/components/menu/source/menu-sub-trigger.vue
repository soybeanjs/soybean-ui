<script setup lang="ts">
import { computed } from 'vue';
import { MenuSubTrigger, useForwardProps } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import { ChevronRight } from 'lucide-vue-next';
import type { MenuSubTriggerProps } from '../types';

defineOptions({
  name: 'SMenuSubTrigger'
});

const { class: cls, size, ui, label, icon, ...delegatedProps } = defineProps<MenuSubTriggerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { subTrigger, itemIcon, subTriggerIcon } = menuVariants({ size });

  return {
    cls: cn(subTrigger(), cls || ui?.subTrigger),
    itemIcon: cn(itemIcon(), ui?.itemIcon),
    icon: cn(subTriggerIcon(), ui?.subTriggerIcon)
  };
});
</script>

<template>
  <MenuSubTrigger v-bind="forwardedProps" :class="mergedCls.cls">
    <slot>
      <slot name="leading">
        <component :is="icon" :class="mergedCls.itemIcon" />
      </slot>
      <span>{{ label }}</span>
      <slot name="trailing" />
      <slot name="icon">
        <ChevronRight :class="mergedCls.icon" />
      </slot>
    </slot>
  </MenuSubTrigger>
</template>
