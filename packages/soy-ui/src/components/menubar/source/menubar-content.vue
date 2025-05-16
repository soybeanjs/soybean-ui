<script setup lang="ts">
import { computed } from 'vue';
import { MenubarContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenubarContentEmits, MenubarContentProps } from '../types';

defineOptions({
  name: 'SMenubarContent'
});

const { class: cls, size, ...delegatedProps } = defineProps<MenubarContentProps>();

const emit = defineEmits<MenubarContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = menuVariants({ size });

  return cn(content(), cls);
});
</script>

<template>
  <MenubarContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </MenubarContent>
</template>
