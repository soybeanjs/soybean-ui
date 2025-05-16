<script lang="ts" setup generic="T extends AcceptableValue = AcceptableValue">
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { ComboboxSingleOptionEmits, ComboboxSingleOptionProps } from '../types';
import SComboboxItem from './combobox-item.vue';
import SComboboxIndicator from './combobox-indicator.vue';
import SComboboxSeparator from './combobox-separator.vue';

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
      <SComboboxIndicator :class="ui?.itemIndicator" />
    </slot>
  </SComboboxItem>
  <SComboboxSeparator v-if="separator || item.separator" :class="ui?.separator" :size="size" />
</template>
