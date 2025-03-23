<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { MenuRadioGroup } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import SMenuLabel from './menu-label.vue';
import SMenuRadioItem from './menu-radio-item.vue';
import SMenuShortcut from './menu-shortcut.vue';
import SMenuSeparator from './menu-separator.vue';
import type { MenuOptionData, MenuRadioGroupEmits, MenuRadioGroupProps } from './types';

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
</script>

<template>
  <MenuRadioGroup v-model="radioValue" :class="props.class || ui?.group">
    <template v-for="item in items" :key="item.value">
      <SMenuLabel v-if="item.isGroupLabel" :class="ui?.label" :size="size">
        <slot name="item" v-bind="item">
          <slot name="item-leading" v-bind="item">
            <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
          </slot>
          <span>{{ item.label }}</span>
          <slot name="item-trailing" v-bind="item" />
        </slot>
      </SMenuLabel>
      <SMenuRadioItem
        v-else
        :class="ui?.item"
        :size="size"
        :disabled="item.disabled"
        :text-value="item.textValue || item.label"
        :value="item.value"
        :indicator-class="ui?.itemIndicator"
      >
        <template #indicatorIcon>
          <slot name="item-indicator-icon" v-bind="item" />
        </template>
        <slot name="item" v-bind="item">
          <slot name="item-leading" v-bind="item">
            <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
          </slot>
          <span>{{ item.label }}</span>
          <slot name="item-trailing" v-bind="item">
            <SMenuShortcut v-if="item.shortcut" :class="ui?.shortcut" :value="item.shortcut" :size="size" />
          </slot>
        </slot>
      </SMenuRadioItem>
      <SMenuSeparator v-if="separator || item.separator" :class="ui?.separator" />
    </template>
  </MenuRadioGroup>
</template>
