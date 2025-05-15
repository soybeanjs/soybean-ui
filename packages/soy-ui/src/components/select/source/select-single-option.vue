<script setup lang="ts">
import { SelectItemText } from '@soybean-ui/primitives';
import type { SelectSingleOptionProps } from '../types';
import SSelectItem from './select-item.vue';
import SSelectItemIndicator from './select-item-indicator.vue';
import SSelectSeparator from './select-separator.vue';

defineOptions({
  name: 'SSelectSingleOption',
  inheritAttrs: false
});

defineProps<SelectSingleOptionProps>();
</script>

<template>
  <SSelectItem :class="ui?.item" :size="size" :value="item.value" :text-value="item.label" :disabled="item.disabled">
    <slot name="leading" />
    <SelectItemText :class="ui?.itemText">{{ item.label }}</SelectItemText>
    <slot name="trailing" />
    <SSelectItemIndicator :class="ui?.itemIndicator">
      <slot name="indicator-icon" />
    </SSelectItemIndicator>
  </SSelectItem>
  <SSelectSeparator v-if="separator || item.separator" :class="ui?.separator" :size="size" />
</template>
