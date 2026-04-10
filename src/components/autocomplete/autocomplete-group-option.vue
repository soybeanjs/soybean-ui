<script setup lang="ts" generic="T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData">
import { AutocompleteGroup, AutocompleteGroupLabel, AutocompleteSeparator } from '@soybeanjs/headless';
import SAutocompleteSingleOption from './autocomplete-single-option.vue';
import type {
  AutocompleteGroupOptionEmits,
  AutocompleteGroupOptionProps,
  AutocompleteSingleOptionData
} from './types';

defineOptions({
  name: 'SAutocompleteGroupOption'
});

defineSlots<{
  'group-label'?: (props: { item: AutocompleteGroupOptionProps<T>['item'] }) => any;
  'item-leading'?: (props: { item: T }) => any;
  'item-label'?: (props: { item: T }) => any;
  'item-trailing'?: (props: { item: T }) => any;
  'item-indicator'?: (props: { item: T }) => any;
}>();

defineProps<AutocompleteGroupOptionProps<T>>();

const emit = defineEmits<AutocompleteGroupOptionEmits<T>>();
</script>

<template>
  <AutocompleteGroup v-bind="groupProps">
    <AutocompleteGroupLabel v-bind="groupLabelProps">
      <slot name="group-label" :item="item">{{ item.label }}</slot>
    </AutocompleteGroupLabel>
    <SAutocompleteSingleOption
      v-for="child in item.items"
      :key="child.value"
      v-bind="itemProps"
      :item="child"
      :item-indicator-props="itemIndicatorProps"
      :separator-props="separatorProps"
      @select="emit('select', $event)"
    >
      <template #item-leading="slotProps">
        <slot name="item-leading" v-bind="slotProps" />
      </template>
      <template #item-label="slotProps">
        <slot name="item-label" v-bind="slotProps" />
      </template>
      <template #item-trailing="slotProps">
        <slot name="item-trailing" v-bind="slotProps" />
      </template>
      <template #item-indicator="slotProps">
        <slot name="item-indicator" v-bind="slotProps" />
      </template>
    </SAutocompleteSingleOption>
  </AutocompleteGroup>
  <AutocompleteSeparator v-if="item.separator" v-bind="separatorProps" />
</template>
