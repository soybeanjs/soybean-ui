<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { MenubarSubContent, useForwardPropsEmits } from '@soybean-ui/primitive';
import type { AcceptableValue } from '@soybean-ui/primitive';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenubarSubContentEmits, MenubarSubContentProps } from './types';

defineOptions({
  name: 'SMenubarSubContent'
});

const { class: cls, ...delegatedProps } = defineProps<MenubarSubContentProps>();

const emit = defineEmits<MenubarSubContentEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { subContent } = menuVariants();

const mergedCls = computed(() => cn(subContent(), cls));
</script>

<template>
  <MenubarSubContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </MenubarSubContent>
</template>
