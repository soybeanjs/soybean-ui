<script setup lang="ts">
import { SelectItemText } from '@soybean-ui/primitive';
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
  <SSelectItem :value="option.value" :size :text-value="option.label" :disabled="option.disabled" :class="itemClass">
    <SelectItemText :class="itemTextClass">{{ option.label }}</SelectItemText>
    <SSelectItemIndicator :class="itemIndicatorClass" :size>
      <slot name="itemIndicatorIcon" />
    </SSelectItemIndicator>
  </SSelectItem>
  <SSelectSeparator v-if="separator" :key="`separator_${option.value}`" :class="separatorClass" />
</template>
