<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogFooterProps } from './types';

defineOptions({
  name: 'SDialogFooter'
});

const { class: cls } = defineProps<DialogFooterProps>();

const { footer } = dialogVariants();

const mergedCls = computed(() => cn(footer(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div">
    <slot />
  </Primitive>
</template>

<style scoped></style>
