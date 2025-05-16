<script setup lang="ts">
import { computed } from 'vue';
import { MenuContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuContentEmits, MenuContentProps } from '../types';

defineOptions({
  name: 'SMenuContent'
});

const { class: cls, size, ...delegatedProps } = defineProps<MenuContentProps>();

const emit = defineEmits<MenuContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = menuVariants({ size });

  return cn(content(), cls);
});
</script>

<template>
  <MenuContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </MenuContent>
</template>
