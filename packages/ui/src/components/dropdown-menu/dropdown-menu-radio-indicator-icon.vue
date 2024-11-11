<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuRadioIndicatorIconProps } from './types';

defineOptions({
  name: 'SDropdownMenuRadioIndicatorIcon'
});

const { class: cls } = defineProps<DropdownMenuRadioIndicatorIconProps>();

const { radioIndicatorIcon } = dropdownMenuVariants();

const mergedCls = computed(() => {
  return cn(radioIndicatorIcon(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls" />
</template>

<style scoped></style>
