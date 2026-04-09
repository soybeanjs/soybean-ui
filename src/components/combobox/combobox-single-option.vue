<script setup lang="ts">
import { useAttrs } from 'vue';
import {
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxSeparator
} from '@soybeanjs/headless';
import Icon from '../icon/icon.vue';
import type { ComboboxSingleOptionEmits, ComboboxSingleOptionProps } from './types';

defineOptions({
  name: 'SComboboxSingleOption',
  inheritAttrs: false
});

defineProps<ComboboxSingleOptionProps>();

const emit = defineEmits<ComboboxSingleOptionEmits>();
const attrs = useAttrs();
</script>

<template>
  <ComboboxSeparator v-if="item.separator" v-bind="separatorProps" />
  <ComboboxItem
    v-bind="attrs"
    :value="item.value"
    :text-value="item.textValue ?? item.label"
    :disabled="item.disabled"
    @select="emit('itemSelect', $event)"
  >
    <slot name="item-leading" :item="item">
      <Icon v-if="item.icon" :icon="item.icon" aria-hidden="true" />
    </slot>
    <slot name="item-text" :item="item">
      <span class="truncate">{{ item.label }}</span>
    </slot>
    <slot name="item-trailing" :item="item" />
    <ComboboxItemIndicator v-bind="itemIndicatorProps">
      <slot name="item-indicator" :item="item">
        <Icon icon="lucide:check" aria-hidden="true" />
      </slot>
    </ComboboxItemIndicator>
  </ComboboxItem>
</template>
