<script setup lang="ts" generic="T extends AcceptableValue">
import { computed } from 'vue';
import { SelectGroup } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import SSelectLabel from './select-label.vue';
import SSelectSeparator from './select-separator.vue';
import SSelectSingleOption from './select-single-option.vue';
import type { SelectOptionProps, SelectOptionType } from './types';
import { isGroupOption } from './shared';

defineOptions({
  name: 'SSelectOption'
});

defineProps<SelectOptionProps<T>>();

type Slots = {
  leading?: (props: { item: SelectOptionType<T> }) => any;
  trailing?: (props: { item: SelectOptionType<T> }) => any;
  itemIndicatorIcon?: (props: { item: SelectOptionType<T> }) => any;
};

const slots = defineSlots<Slots>();
const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);
</script>

<template>
  <SelectGroup v-if="isGroupOption(item)" :class="ui?.group">
    <SSelectLabel :class="ui?.groupLabel">{{ item.label }}</SSelectLabel>
    <SSelectSeparator v-if="item.separator" :class="ui?.separator" />
    <SSelectSingleOption v-for="(opt, index) in item.items" :key="index" :size="size" :item="opt" :ui="ui">
      <template v-for="slotKey in slotKeys" :key="slotKey">
        <slot :name="slotKey" :item="opt" />
      </template>
    </SSelectSingleOption>
  </SelectGroup>
  <SSelectSingleOption v-else :size="size" :item="item" :ui="ui">
    <template v-for="slotKey in slotKeys" :key="slotKey">
      <slot :name="slotKey" :item="item" />
    </template>
  </SSelectSingleOption>
</template>
