<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxTrigger } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxTriggerProps } from '../types';

defineOptions({
  name: 'SComboboxTrigger'
});

const { class: cls, size, mode, ...delegatedProps } = defineProps<ComboboxTriggerProps>();

const mergedCls = computed(() => {
  const { trigger } = comboboxVariants({ size, mode });

  return cn(trigger(), cls);
});
</script>

<template>
  <ComboboxTrigger :class="mergedCls" v-bind="delegatedProps">
    <slot />
  </ComboboxTrigger>
</template>
