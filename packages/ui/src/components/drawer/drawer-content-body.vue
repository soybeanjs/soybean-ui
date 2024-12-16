<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerContentBodyProps } from './types';

defineOptions({
  name: 'SDrawerContentBody'
});

const { class: cls } = defineProps<DrawerContentBodyProps>();

const { contentBody } = drawerVariants();

const mergedCls = computed(() => cn(contentBody(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div">
    <slot />
  </Primitive>
</template>

<style scoped></style>
