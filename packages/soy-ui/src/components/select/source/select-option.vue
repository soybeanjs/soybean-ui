<script setup lang="ts" generic="T extends AcceptableValue">
import { computed } from 'vue';
import { SelectGroup } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { SelectOptionData, SelectOptionProps } from '../types';
import { isGroupOption } from '../shared';
import SSelectLabel from './select-label.vue';
import SSelectSeparator from './select-separator.vue';
import SSelectSingleOption from './select-single-option.vue';

defineOptions({
  name: 'SSelectOption',
  inheritAttrs: false
});

defineProps<SelectOptionProps<T>>();

type Slots = {
  leading?: (props: { item: SelectOptionData<T> }) => any;
  trailing?: (props: { item: SelectOptionData<T> }) => any;
  'indicator-icon'?: (props: { item: SelectOptionData<T> }) => any;
};

const slots = defineSlots<Slots>();
const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);
</script>

<template>
  <SelectGroup v-if="isGroupOption(item)" :class="ui?.group">
    <SSelectLabel :class="ui?.groupLabel" :size="size">{{ item.label }}</SSelectLabel>
    <SSelectSeparator v-if="separator || item.separator" :class="ui?.separator" :size="size" />
    <SSelectSingleOption v-for="(opt, index) in item.items" :key="index" :size="size" :item="opt" :ui="ui">
      <template v-for="slotKey in slotKeys" :key="slotKey">
        <slot :name="slotKey" :item="opt" />
      </template>
    </SSelectSingleOption>
  </SelectGroup>
  <SSelectSingleOption v-else :size="size" :item="item" :ui="ui" :separator="separator">
    <template v-for="slotKey in slotKeys" :key="slotKey">
      <slot :name="slotKey" :item="item" />
    </template>
  </SSelectSingleOption>
</template>
