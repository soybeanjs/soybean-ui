<script setup lang="ts">
import { SelectItemText } from 'radix-vue';
import SSelectItem from './select-item.vue';
import SSelectItemIndicator from './select-item-indicator.vue';
import SSelectSeparator from './select-separator.vue';
import type { SelectItemOptionProps } from './types';

defineOptions({
  name: 'SSelectItemOption'
});

defineProps<SelectItemOptionProps>();
</script>

<template>
  <SSelectItem
    :key="option.value"
    :value="option.value"
    :text-value="option.label"
    :disabled="option.disabled"
    :class="itemClass"
  >
    <SelectItemText :class="itemTextClass">{{ option.label }}</SelectItemText>
    <SSelectItemIndicator :class="itemIndicatorClass">
      <slot name="itemIndicatorIcon" />
    </SSelectItemIndicator>
  </SSelectItem>
  <SSelectSeparator v-if="separator" :key="`separator_${option.value}`" :class="separatorClass" />
</template>

<style scoped></style>
