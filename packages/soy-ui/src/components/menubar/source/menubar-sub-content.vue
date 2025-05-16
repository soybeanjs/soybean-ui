<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { MenubarSubContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenubarSubContentEmits, MenubarSubContentProps } from '../types';

defineOptions({
  name: 'SMenubarSubContent'
});

const { class: cls, size, ...delegatedProps } = defineProps<MenubarSubContentProps>();

const emit = defineEmits<MenubarSubContentEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { subContent } = menuVariants({ size });

  return cn(subContent(), cls);
});
</script>

<template>
  <MenubarSubContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </MenubarSubContent>
</template>
