<script lang="ts" setup generic="T extends AcceptableValue = AcceptableValue">
import { ComboboxItemIndicator } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { Check } from 'lucide-vue-next';
import SComboboxItem from './combobox-item.vue';
import SComboboxSeparator from './combobox-separator.vue';
import type { ComboboxSingleOptionEmits, ComboboxSingleOptionProps } from './types';

defineOptions({
  name: 'SComboboxSingleOption'
});

defineProps<ComboboxSingleOptionProps<T>>();

const emit = defineEmits<ComboboxSingleOptionEmits<T>>();
</script>

<template>
  <SComboboxItem
    :class="ui?.item"
    :size="size"
    :value="item.value"
    :disabled="item.disabled"
    @select="emit('select', $event)"
  >
    <slot name="item">
      <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
      <span>{{ item.label }}</span>
      <ComboboxItemIndicator>
        <Check />
      </ComboboxItemIndicator>
    </slot>
  </SComboboxItem>
  <SComboboxSeparator v-if="item.separator" :class="ui?.separator" :size="size" />
</template>
