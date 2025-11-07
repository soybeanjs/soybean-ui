<script setup lang="ts" generic="T extends DefinedValue">
import { useAttrs } from 'vue';
import { SelectItem, SelectItemIndicator, SelectItemText, SelectSeparator } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import Icon from '../icon/icon.vue';
import type { SelectSingleOptionEmits, SelectSingleOptionProps } from './types';

defineOptions({
  name: 'SSelectSingleOption',
  inheritAttrs: false
});

defineProps<SelectSingleOptionProps<T>>();

const emit = defineEmits<SelectSingleOptionEmits<T>>();

const attrs = useAttrs();
</script>

<template>
  <SelectItem
    v-bind="attrs"
    :value="item.value"
    :text-value="item.textValue"
    :disabled="item.disabled"
    @select="emit('select', $event as any)"
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
