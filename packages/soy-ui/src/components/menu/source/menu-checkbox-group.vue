<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { MenuGroup } from '@soybean-ui/primitives';
import type { AcceptableValue, CheckAction } from '@soybean-ui/primitives';
import type { MenuCheckboxGroupEmits, MenuCheckboxGroupProps, MenuOptionData } from '../types';
import SMenuLabel from './menu-label.vue';
import SMenuCheckboxItem from './menu-checkbox-item.vue';
import SMenuSeparator from './menu-separator.vue';

defineOptions({
  name: 'SMenuCheckboxGroup'
});

const props = defineProps<MenuCheckboxGroupProps<T>>();

const emit = defineEmits<MenuCheckboxGroupEmits<T>>();

type Slots = {
  item: (props: MenuOptionData<T>) => any;
  'item-leading': (props: MenuOptionData<T>) => any;
  'item-trailing': (props: MenuOptionData<T>) => any;
  'item-indicator-icon': (props: MenuOptionData<T>) => any;
};

defineSlots<Slots>();

const itemSlotMap = {
  leading: 'item-leading',
  default: 'item',
  trailing: 'item-trailing'
} satisfies Record<string, keyof Slots>;

const checkValue = ref(props.modelValue || props.defaultValue || []) as Ref<T[]>;

function handleUpdateChecked(item: MenuOptionData<T>, checked: boolean) {
  if (checked) {
    checkValue.value = [...checkValue.value, item.value];
  } else {
    checkValue.value = checkValue.value.filter(v => v !== item.value);
  }

  const action: CheckAction = checked ? 'check' : 'uncheck';

  emit('update:modelValue', checkValue.value, item, action);
}

watch(
  () => props.modelValue,
  value => {
    checkValue.value = value || [];
  }
);
</script>

<template>
  <MenuGroup :class="props.class || ui?.group">
    <template v-for="item in items" :key="item.value">
      <SMenuLabel v-if="item.isGroupLabel" :size="size" :ui="ui" :label="item.label" :icon="item.icon">
        <template v-for="(slotKey, slotName) in itemSlotMap" :key="slotKey" #[slotName]>
          <slot :name="slotKey" v-bind="item" />
        </template>
      </SMenuLabel>
      <SMenuCheckboxItem
        v-else
        :size="size"
        :ui="ui"
        :label="item.label"
        :icon="item.icon"
        :shortcut="item.shortcut"
        :disabled="item.disabled"
        :text-value="item.textValue || item.label"
        :model-value="checkValue.includes(item.value)"
        @update:model-value="handleUpdateChecked(item, $event)"
      >
        <template #icon>
          <slot name="item-indicator-icon" v-bind="item" />
        </template>
        <template v-for="(slotKey, slotName) in itemSlotMap" :key="slotKey" #[slotName]>
          <slot :name="slotKey" v-bind="item" />
        </template>
      </SMenuCheckboxItem>
      <SMenuSeparator v-if="separator || item.separator" :class="ui?.separator" :size="size" />
    </template>
  </MenuGroup>
</template>
