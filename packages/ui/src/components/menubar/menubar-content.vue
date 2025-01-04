<script setup lang="ts">
import { computed } from 'vue';
import { MenubarContent, useForwardPropsEmits } from '@soybean-ui/primitive';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenubarContentEmits, MenubarContentProps } from './types';

defineOptions({
  name: 'SMenubarContent'
});

const { class: cls, ...delegatedProps } = defineProps<MenubarContentProps>();

const emit = defineEmits<MenubarContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { content } = menuVariants();

const mergedCls = computed(() => cn(content(), cls));
</script>

<template>
  <MenubarContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </MenubarContent>
</template>
