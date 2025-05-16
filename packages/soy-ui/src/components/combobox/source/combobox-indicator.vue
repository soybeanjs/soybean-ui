<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxItemIndicator } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import { Check } from 'lucide-vue-next';
import type { ComboboxItemIndicatorProps } from '../types';

defineOptions({
  name: 'SComboboxItemIndicator'
});

const { class: cls } = defineProps<ComboboxItemIndicatorProps>();

const { itemIndicator } = comboboxVariants();

const mergedCls = computed(() => cn(itemIndicator(), cls));
</script>

<template>
  <ComboboxItemIndicator :class="mergedCls" as-child>
    <slot>
      <Check />
    </slot>
  </ComboboxItemIndicator>
</template>
