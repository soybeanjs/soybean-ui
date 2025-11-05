<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { SelectItem, SelectItemIndicator, SelectItemText, SelectSeparator } from '@headless';
import type { DefinedValue } from '@headless';
import { useOmitProps } from '@headless/composables';
import Icon from '../icon/icon.vue';
import type { SelectSingleOptionEmits, SelectSingleOptionProps } from './types';

defineOptions({
  name: 'SSelectSingleOption',
  inheritAttrs: false
});

const props = defineProps<SelectSingleOptionProps<T>>();

const emit = defineEmits<SelectSingleOptionEmits<T>>();

const forwardedProps = useOmitProps(props, ['item', 'itemTextProps', 'itemIndicatorProps', 'separatorProps']);
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :value="item.value"
    :text-value="item.textValue"
    :disabled="item.disabled"
    @select="emit('select', $event)"
  >
    <slot name="item-leading">
      <Icon v-if="item.icon" :icon="item.icon" />
    </slot>
    <SelectItemText v-bind="itemTextProps">
      <slot name="item-text">{{ item.label }}</slot>
    </SelectItemText>
    <slot name="item-trailing" />
    <SelectItemIndicator v-bind="itemIndicatorProps">
      <slot name="item-indicator">
        <Icon icon="lucide:check" />
      </slot>
    </SelectItemIndicator>
  </SelectItem>
  <SelectSeparator v-if="item.separator" v-bind="separatorProps" />
</template>
