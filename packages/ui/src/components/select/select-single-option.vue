<script setup lang="ts">
import { SelectItemText } from '@soybean-ui/primitives';
import SSelectItem from './select-item.vue';
import SSelectItemIndicator from './select-item-indicator.vue';
import SSelectSeparator from './select-separator.vue';
import type { SelectSingleOptionProps } from './types';

defineOptions({
  name: 'SSelectSingleOption'
});

defineProps<SelectSingleOptionProps>();
</script>

<template>
  <SSelectItem :class="ui?.item" :value="item.value" :text-value="item.label" :disabled="item.disabled" :size="size">
    <slot name="leading" />
    <SelectItemText :class="ui?.itemText">{{ item.label }}</SelectItemText>
    <slot name="trailing" />
    <SSelectItemIndicator :class="ui?.itemIndicator" :size="size">
      <slot name="itemIndicatorIcon" />
    </SSelectItemIndicator>
  </SSelectItem>
  <SSelectSeparator v-if="item.separator" :class="ui?.separator" />
</template>
