<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { MenuGroup } from '@soybean-ui/primitives';
import type { AcceptableValue, CheckAction } from '@soybean-ui/primitives';
import SMenuLabel from './menu-label.vue';
import SMenuCheckboxItem from './menu-checkbox-item.vue';
import SMenuShortcut from './menu-shortcut.vue';
import SMenuSeparator from './menu-separator.vue';
import type { MenuCheckboxGroupEmits, MenuCheckboxGroupProps, MenuOptionData } from './types';

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
      <SMenuLabel v-if="item.isGroupLabel" :class="ui?.label" :size="size">
        <slot name="item" v-bind="item">
          <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
          <slot name="item-leading" v-bind="item" />
          <span>{{ item.label }}</span>
          <slot name="item-trailing" v-bind="item" />
        </slot>
      </SMenuLabel>
      <SMenuCheckboxItem
        v-else
        :class="ui?.item"
        :size="size"
        :disabled="item.disabled"
        :text-value="item.textValue || item.label"
        :model-value="checkValue.includes(item.value)"
        :indicator-class="ui?.itemIndicator"
        @update:model-value="handleUpdateChecked(item, $event)"
      >
        <template #indicatorIcon>
          <slot name="item-indicator-icon" v-bind="item" />
        </template>
        <slot name="item" v-bind="item">
          <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
          <slot name="item-leading" v-bind="item" />
          <span>{{ item.label }}</span>
          <slot name="item-trailing" v-bind="item" />
          <SMenuShortcut v-if="item.shortcut" :class="ui?.shortcut" :value="item.shortcut" :size="size" />
        </slot>
      </SMenuCheckboxItem>
      <SMenuSeparator v-if="separator || item.separator" :class="ui?.separator" />
    </template>
  </MenuGroup>
</template>
