<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuRadioIndicatorIconRootProps } from './types';

defineOptions({
  name: 'SDropdownMenuRadioIndicatorIconRoot'
});

const { class: cls } = defineProps<DropdownMenuRadioIndicatorIconRootProps>();

const { radioIndicatorIconRoot } = dropdownMenuVariants();

const mergedCls = computed(() => {
  return cn(radioIndicatorIconRoot(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
