<script setup lang="ts">
import { computed } from 'vue';
import { SelectIcon } from '@soybean-ui/primitive';
import { ChevronsUpDown } from 'lucide-vue-next';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectIconProps } from './types';

defineOptions({
  name: 'SSelectIcon'
});

const { class: cls, size } = defineProps<SelectIconProps>();

const mergedCls = computed(() => {
  const { icon } = selectVariants({ size });

  return cn(icon(), cls);
});
</script>

<template>
  <SelectIcon :class="mergedCls">
    <slot>
      <ChevronsUpDown />
    </slot>
  </SelectIcon>
</template>

<style scoped></style>
