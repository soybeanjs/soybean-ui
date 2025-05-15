<script setup lang="ts">
import { computed } from 'vue';
import { MenuArrow, useForwardProps } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuArrowProps } from '../types';

defineOptions({
  name: 'SMenuArrow'
});

const { class: cls, ...delegatedProps } = defineProps<MenuArrowProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { arrow } = menuVariants();

const mergedCls = computed(() => cn(arrow(), cls));
</script>

<template>
  <MenuArrow v-bind="forwardedProps" :class="mergedCls" />
</template>
