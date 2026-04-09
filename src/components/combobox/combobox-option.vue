<script setup lang="ts">
import { computed } from 'vue';
import type { SelectEvent } from '@soybeanjs/headless';
import SComboboxGroupOption from './combobox-group-option.vue';
import SComboboxSingleOption from './combobox-single-option.vue';
import { isGroupOption } from './shared';
import type {
  ComboboxGroupOptionData,
  ComboboxOptionEmits,
  ComboboxOptionProps,
  ComboboxSingleOptionData
} from './types';

defineOptions({
  name: 'SComboboxOption'
});

defineProps<ComboboxOptionProps>();

const emit = defineEmits<ComboboxOptionEmits>();

type Slots = {
  'group-label'?: (props: { item: ComboboxGroupOptionData }) => any;
  'item-text'?: (props: { item: ComboboxSingleOptionData }) => any;
  'item-leading'?: (props: { item: ComboboxSingleOptionData }) => any;
  'item-trailing'?: (props: { item: ComboboxSingleOptionData }) => any;
  'item-indicator'?: (props: { item: ComboboxSingleOptionData }) => any;
};

const slots = defineSlots<Slots>();

const singleSlotKeys = computed(
  () => Object.keys(slots).filter(key => key !== 'group-label') as Exclude<keyof Slots, 'group-label'>[]
);

const onSelect = (event: SelectEvent<string>) => {
  emit('itemSelect', event);
};
</script>

<template>
  <SComboboxGroupOption
    v-if="isGroupOption(item)"
    v-bind="groupProps"
    :item="item"
    :group-label-props="groupLabelProps"
    :item-props="itemProps"
    :item-indicator-props="itemIndicatorProps"
    :separator-props="separatorProps"
    @item-select="onSelect"
  >
    <template #group-label>
      <slot name="group-label" :item="item">{{ item.label }}</slot>
    </template>
    <template v-for="slotKey in singleSlotKeys" :key="slotKey" #[slotKey]="slotProps">
      <slot :name="slotKey" v-bind="slotProps" />
    </template>
  </SComboboxGroupOption>
  <SComboboxSingleOption
    v-else
    v-bind="itemProps"
    :item="item"
    :item-indicator-props="itemIndicatorProps"
    :separator-props="separatorProps"
    @item-select="onSelect"
  >
    <template v-for="slotKey in singleSlotKeys" :key="slotKey" #[slotKey]>
      <slot :name="slotKey" :item="item" />
    </template>
  </SComboboxSingleOption>
</template>
