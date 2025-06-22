<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import type { DefinedValue } from '@headless';
import { useOmitProps } from '@headless/composables';
import SSelectSingleOption from './select-single-option.vue';
import SSelectGroupOption from './select-group-option.vue';
import { isGroupOption } from './shared';
import type { SelectGroupOptionData, SelectOptionEmits, SelectOptionProps, SelectSingleOptionData } from './types';

defineOptions({
  name: 'SSelectOption',
  inheritAttrs: false
});

const props = defineProps<SelectOptionProps<T>>();

const emit = defineEmits<SelectOptionEmits<T>>();

type Slots = {
  'group-label'?: (props: { item: SelectGroupOptionData<T> }) => any;
  'item-text'?: (props: { item: SelectSingleOptionData<T> }) => any;
  'item-leading'?: (props: { item: SelectSingleOptionData<T> }) => any;
  'item-trailing'?: (props: { item: SelectSingleOptionData<T> }) => any;
  'item-indicator'?: (props: { item: SelectSingleOptionData<T> }) => any;
};

const slots = defineSlots<Slots>();

type SingleSlotKeys = Exclude<keyof Slots, 'group-label'>;

const singleSlotKeys = computed(() => Object.keys(slots).filter(key => key !== 'group-label') as SingleSlotKeys[]);

const forwardedProps = useOmitProps(props, [
  'item',
  'groupProps',
  'groupLabelProps',
  'itemProps',
  'itemTextProps',
  'itemIndicatorProps',
  'separatorProps'
]);

const groupProps = computed(() => ({
  ...forwardedProps.value,
  ...props.groupProps
}));

const singleProps = computed(() => ({
  ...forwardedProps.value,
  ...props.itemProps
}));
</script>

<template>
  <SSelectGroupOption
    v-if="isGroupOption(item)"
    v-bind="groupProps"
    :item="item"
    :group-props="groupProps"
    :group-label-props="groupLabelProps"
    :item-props="itemProps"
    :item-text-props="itemTextProps"
    :item-indicator-props="itemIndicatorProps"
    :separator-props="separatorProps"
    @select="emit('select', $event)"
  >
    <template #group-label>
      <slot name="group-label" :item="item">{{ item.label }}</slot>
    </template>
    <template v-for="slotKey in singleSlotKeys" :key="slotKey" #[slotKey]="slotProps">
      <slot :name="slotKey" v-bind="slotProps" />
    </template>
  </SSelectGroupOption>
  <SSelectSingleOption
    v-else
    v-bind="singleProps"
    :item="item"
    :value="item.value"
    :text-value="item.textValue"
    :disabled="item.disabled"
    :item-text-props="itemTextProps"
    :item-indicator-props="itemIndicatorProps"
    :separator-props="separatorProps"
    @select="emit('select', $event)"
  >
    <template v-for="slotKey in singleSlotKeys" :key="slotKey">
      <slot :name="slotKey" :item="item" />
    </template>
  </SSelectSingleOption>
</template>
