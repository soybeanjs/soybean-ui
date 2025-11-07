<script setup lang="ts" generic="T extends DefinedValue">
import { SelectGroup, SelectGroupLabel, SelectSeparator } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import SSelectSingleOption from './select-single-option.vue';
import type { SelectGroupOptionEmits, SelectGroupOptionProps } from './types';

defineOptions({
  name: 'SSelectGroupOption'
});

defineProps<SelectGroupOptionProps<T>>();

const emit = defineEmits<SelectGroupOptionEmits<T>>();
</script>

<template>
  <SelectGroup>
    <SelectGroupLabel v-bind="groupLabelProps">
      <slot name="group-label">{{ item.label }}</slot>
    </SelectGroupLabel>
    <SelectSeparator v-if="item.separator" v-bind="separatorProps" />
    <SSelectSingleOption
      v-for="child in item.items"
      :key="String(child.value)"
      v-bind="itemProps"
      :item="child"
      :value="child.value"
      :text-value="child.textValue"
      :disabled="child.disabled"
      :item-text-props="itemTextProps"
      :item-indicator-props="itemIndicatorProps"
      :separator-props="separatorProps"
      @select="emit('select', $event)"
    >
      <template #item-leading>
        <slot name="item-leading" :item="child" />
      </template>
      <template #item-text>
        <slot name="item-text" :item="child" />
      </template>
      <template #item-trailing>
        <slot name="item-trailing" :item="child" />
      </template>
      <template #item-indicator>
        <slot name="item-indicator" :item="child" />
      </template>
    </SSelectSingleOption>
  </SelectGroup>
</template>
