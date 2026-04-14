<script setup lang="ts">
import type { SelectEvent } from '@soybeanjs/headless';
import { ComboboxGroup, ComboboxGroupLabel, ComboboxSeparator } from '@soybeanjs/headless';
import SComboboxSingleOption from './combobox-single-option.vue';
import type { ComboboxGroupOptionEmits, ComboboxGroupOptionProps, ComboboxSingleOptionData } from './types';

defineOptions({
  name: 'SComboboxGroupOption'
});

defineProps<ComboboxGroupOptionProps>();

const emit = defineEmits<ComboboxGroupOptionEmits>();

const onSelect = (event: SelectEvent<string>) => {
  emit('itemSelect', event);
};
</script>

<template>
  <ComboboxSeparator v-if="item.separator" v-bind="separatorProps" />
  <ComboboxGroup v-bind="$attrs">
    <ComboboxGroupLabel v-bind="groupLabelProps">
      <slot name="group-label" :item="item">{{ item.label }}</slot>
    </ComboboxGroupLabel>
    <SComboboxSingleOption
      v-for="child in item.items"
      v-bind="itemProps"
      :key="child.value"
      :item="child"
      :item-indicator-props="itemIndicatorProps"
      :separator-props="separatorProps"
      @item-select="onSelect"
    >
      <template #item-leading="slotProps">
        <slot name="item-leading" :item="slotProps.item as ComboboxSingleOptionData" />
      </template>
      <template #item-text="slotProps">
        <slot name="item-text" :item="slotProps.item as ComboboxSingleOptionData" />
      </template>
      <template #item-trailing="slotProps">
        <slot name="item-trailing" :item="slotProps.item as ComboboxSingleOptionData" />
      </template>
      <template #item-indicator="slotProps">
        <slot name="item-indicator" :item="slotProps.item as ComboboxSingleOptionData" />
      </template>
    </SComboboxSingleOption>
  </ComboboxGroup>
</template>
