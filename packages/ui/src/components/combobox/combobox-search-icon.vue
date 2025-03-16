<script setup lang="ts">
import { computed } from 'vue';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import { Search } from 'lucide-vue-next';
import type { ComboboxSearchIconProps } from './types';

defineOptions({
  name: 'SComboboxSearchIcon'
});

const { class: cls, size } = defineProps<ComboboxSearchIconProps>();

const mergedCls = computed(() => {
  const { searchIcon } = comboboxVariants({ size });

  return cn(searchIcon(), cls);
});
</script>

<template>
  <span :class="mergedCls">
    <Search />
  </span>
</template>
