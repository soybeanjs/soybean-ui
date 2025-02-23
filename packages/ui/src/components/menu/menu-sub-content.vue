<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { MenuSubContent, useForwardPropsEmits, useOmitForwardProps } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { MenuOptionData } from '../menu/types';
import type { MenuSubContentEmits, MenuSubContentProps } from './types';

defineOptions({
  name: 'SMenuSubContent'
});

const props = defineProps<MenuSubContentProps>();

const emit = defineEmits<MenuSubContentEmits<T>>();

const forwardedProps = useOmitForwardProps(props, ['class']);

const forwarded = useForwardPropsEmits(forwardedProps, emit);

const { subContent } = menuVariants();

const mergedCls = computed(() => cn(subContent(), props.class));
</script>

<template>
  <MenuSubContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </MenuSubContent>
</template>
