<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { MenuRadioGroup } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { MenuOptionData, MenuRadioGroupEmits, MenuRadioGroupProps } from '../types';
import SMenuLabel from './menu-label.vue';
import SMenuRadioItem from './menu-radio-item.vue';
import SMenuSeparator from './menu-separator.vue';

defineOptions({
  name: 'SMenuRadioGroup'
});

const props = defineProps<MenuRadioGroupProps<T>>();

const emit = defineEmits<MenuRadioGroupEmits<T>>();

type Slots = {
  item: (props: MenuOptionData<T>) => any;
  'item-leading': (props: MenuOptionData<T>) => any;
  'item-trailing': (props: MenuOptionData<T>) => any;
  'item-indicator-icon': (props: MenuOptionData<T>) => any;
};

defineSlots<Slots>();

const radioValue = computed({
  get() {
    return (props.modelValue || props.defaultValue || '') as T;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const itemSlotMap = {
  leading: 'item-leading',
  default: 'item',
  trailing: 'item-trailing'
} satisfies Record<string, keyof Slots>;
</script>

<template>
  <MenuRadioGroup v-model="radioValue" :class="props.class || ui?.group">
    <template v-for="item in items" :key="item.value">
      <SMenuLabel v-if="item.isGroupLabel" :size="size" :ui="ui" :label="item.label" :icon="item.icon">
        <template v-for="(slotKey, slotName) in itemSlotMap" :key="slotKey" #[slotName]>
          <slot :name="slotKey" v-bind="item" />
        </template>
      </SMenuLabel>
      <SMenuRadioItem
        v-else
        :size="size"
        :ui="ui"
        :label="item.label"
        :icon="item.icon"
        :shortcut="item.shortcut"
        :disabled="item.disabled"
        :text-value="item.textValue || item.label"
        :value="item.value"
      >
        <template #icon>
          <slot name="item-indicator-icon" v-bind="item" />
        </template>
        <template v-for="(slotKey, slotName) in itemSlotMap" :key="slotKey" #[slotName]>
          <slot :name="slotKey" v-bind="item" />
        </template>
      </SMenuRadioItem>
      <SMenuSeparator v-if="separator || item.separator" :class="ui?.separator" />
    </template>
  </MenuRadioGroup>
</template>
