<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { ComboboxItem, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxItemEmits, ComboboxItemProps } from '../types';

defineOptions({
  name: 'SComboboxItem'
});

const { class: cls, size, ...delegatedProps } = defineProps<ComboboxItemProps<T>>();

const emit = defineEmits<ComboboxItemEmits<T>>();

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { item } = comboboxVariants({ size });

  return cn(item(), cls);
});
</script>

<template>
  <ComboboxItem v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </ComboboxItem>
</template>
