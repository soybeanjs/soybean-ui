<script lang="ts" setup generic="T extends AcceptableValue = AcceptableValue">
import type { AcceptableValue } from '@soybean-ui/primitives';
import SComboboxGroup from './combobox-group.vue';
import SComboboxGroupLabel from './combobox-group-label.vue';
import SComboboxSeparator from './combobox-separator.vue';
import SComboboxSingleOption from './combobox-single-option.vue';
import { isComboboxGroupOption } from './shared';
import type { ComboboxOptionEmits, ComboboxOptionProps } from './types';

defineOptions({
  name: 'SComboboxOption'
});

defineProps<ComboboxOptionProps<T>>();

const emit = defineEmits<ComboboxOptionEmits<T>>();
</script>

<template>
  <template v-if="isComboboxGroupOption(item)">
    <SComboboxGroup :class="ui?.group">
      <SComboboxGroupLabel :class="ui?.groupLabel" :size="size">{{ item.label }}</SComboboxGroupLabel>
      <SComboboxSingleOption
        v-for="(opt, index) in item.items"
        :key="index"
        :size="size"
        :item="opt"
        :ui="ui"
        @select="emit('select', opt, $event)"
      >
        <slot :item="opt" />
      </SComboboxSingleOption>
    </SComboboxGroup>
    <SComboboxSeparator v-if="item.separator" :class="ui?.separator" :size="size" />
  </template>
  <SComboboxSingleOption v-else :size="size" :item="item" :ui="ui" @select="emit('select', item, $event)">
    <slot :item="item" />
  </SComboboxSingleOption>
</template>
