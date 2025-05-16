<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxGroup } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxGroupProps } from '../types';

defineOptions({
  name: 'SComboboxGroup'
});

const { class: cls } = defineProps<ComboboxGroupProps>();

const { group } = comboboxVariants();

const mergedCls = computed(() => cn(group(), cls));
</script>

<template>
  <ComboboxGroup :class="mergedCls">
    <slot />
  </ComboboxGroup>
</template>
