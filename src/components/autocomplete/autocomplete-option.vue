<script setup lang="ts" generic="T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData">
import SAutocompleteGroupOption from './autocomplete-group-option.vue';
import SAutocompleteSingleOption from './autocomplete-single-option.vue';
import { isGroupOption } from './shared';
import type { AutocompleteOptionEmits, AutocompleteOptionProps, AutocompleteSingleOptionData } from './types';

defineOptions({
  name: 'SAutocompleteOption'
});

defineSlots<{
  'group-label'?: (props: { item: Extract<AutocompleteOptionProps<T>['item'], { items: T[] }> }) => any;
  'item-leading'?: (props: { item: T }) => any;
  'item-label'?: (props: { item: T }) => any;
  'item-trailing'?: (props: { item: T }) => any;
  'item-indicator'?: (props: { item: T }) => any;
}>();

defineProps<AutocompleteOptionProps<T>>();

const emit = defineEmits<AutocompleteOptionEmits<T>>();
</script>

<template>
  <SAutocompleteGroupOption
    v-if="isGroupOption(item)"
    :item="item"
    :group-props="groupProps"
    :group-label-props="groupLabelProps"
    :item-props="itemProps"
    :item-indicator-props="itemIndicatorProps"
    :separator-props="separatorProps"
    @select="emit('select', $event)"
  >
    <template #group-label="slotProps">
      <slot name="group-label" v-bind="slotProps" />
    </template>
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
  </SAutocompleteGroupOption>
  <SAutocompleteSingleOption
    v-else
    v-bind="itemProps"
    :item="item"
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
</template>
