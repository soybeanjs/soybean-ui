<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerFooterProps } from './types';

defineOptions({
  name: 'SDrawerFooter'
});

const { class: cls } = defineProps<DrawerFooterProps>();

const { footer } = drawerVariants();

const mergedCls = computed(() => cn(footer(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div">
    <slot />
  </Primitive>
</template>
