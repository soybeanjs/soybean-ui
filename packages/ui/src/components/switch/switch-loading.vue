<script lang="ts" setup>
import { computed } from 'vue';
import { LoaderCircle } from 'lucide-vue-next';
import { cn, switchVariants } from '@soybean-ui/variants';
import type { SwitchLoadingProps } from './types';

const props = defineProps<SwitchLoadingProps>();

const cls = computed(() => {
  const { loading } = switchVariants();

  return cn(loading({ color: props.bgColor, size: props.size }), 'animate-spin');
});
</script>

<template>
  <LoaderCircle :class="cls" />
</template>

<style lang="scss" scoped></style>
