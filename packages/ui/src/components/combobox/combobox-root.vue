<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { ComboboxRoot } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxRootProps } from './types';

defineOptions({
  name: 'SComboboxRoot'
});

const { class: cls } = defineProps<ComboboxRootProps<T>>();

const { root } = comboboxVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <ComboboxRoot v-slot="slotProps" :class="mergedCls">
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>
