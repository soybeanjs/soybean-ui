<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { MenuSubContent, useForwardPropsEmits } from '@soybean-ui/primitive';
import type { AcceptableValue } from '@soybean-ui/primitive';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { MenuSubContentEmits, MenuSubContentProps } from './types';

defineOptions({
  name: 'SMenuSubContent'
});

const { class: cls, ...delegatedProps } = defineProps<MenuSubContentProps>();

const emit = defineEmits<MenuSubContentEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { subContent } = dropdownMenuVariants();

const mergedCls = computed(() => cn(subContent(), cls));
</script>

<template>
  <MenuSubContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </MenuSubContent>
</template>
