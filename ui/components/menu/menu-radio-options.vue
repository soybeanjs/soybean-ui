<script
  setup
  lang="ts"
  generic="
    T extends AcceptableValue = AcceptableValue,
    S extends MenuRadioOptionData<NonNullable<T>> = MenuRadioOptionData<NonNullable<T>>
  "
>
import { MenuGroupLabel, MenuItemIndicator, MenuRadioGroup, MenuRadioItem, MenuSeparator } from '@headless';
import type { AcceptableValue } from '@headless';
import { useOmitProps } from '@headless/composables';
import Icon from '../icon/icon.vue';
import Kbd from '../kbd/kbd.vue';
import SMenuItemSlot from './menu-item-slot.vue';
import { useCommonSlotKeys } from './shared';
import type { MenuRadioOptionData, MenuRadioOptionsEmits, MenuRadioOptionsProps } from './types';

defineOptions({
  name: 'SMenuRadio'
});

const props = defineProps<MenuRadioOptionsProps<T, S>>();

const emit = defineEmits<MenuRadioOptionsEmits<NonNullable<T>, S>>();

type Slots = {
  item: (props: S) => any;
  'item-leading': (props: S) => any;
  'item-trailing': (props: S) => any;
  'item-indicator-icon': (props: S) => any;
};

const slots = defineSlots<Slots>();

const commonSlotKeys = useCommonSlotKeys(slots);

const forwardedProps = useOmitProps(props, ['ui', 'items', 'radioItemProps', 'groupLabelProps', 'indicatorProps']);
</script>

<template>
  <MenuRadioGroup
    v-bind="forwardedProps"
    :class="ui?.radioGroup"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template v-for="item in items" :key="item.value">
      <MenuGroupLabel v-if="item.isGroupLabel" v-bind="groupLabelProps" :class="ui?.groupLabel">
        <SMenuItemSlot :icon="item.icon" :label="item.label">
          <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
            <slot :name="slotKey" v-bind="item" />
          </template>
        </SMenuItemSlot>
      </MenuGroupLabel>
      <MenuRadioItem
        v-else
        v-bind="radioItemProps"
        :class="ui?.radioItem"
        :value="item.value"
        :disabled="item.disabled"
        :text-value="item.textValue"
        @select="emit('select', item, $event)"
      >
        <SMenuItemSlot :icon="item.icon" :label="item.label">
          <template #indicator>
            <MenuItemIndicator v-bind="indicatorProps" :class="ui?.itemIndicator">
              <slot name="item-indicator-icon" v-bind="item">
                <Icon icon="icon-park-outline:dot" :class="ui?.radioIndicatorIcon" />
              </slot>
            </MenuItemIndicator>
          </template>
          <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
            <slot :name="slotKey" v-bind="item" />
          </template>
          <template #shortcut>
            <Kbd v-if="item.shortcut" v-bind="shortcutProps" :value="item.shortcut" :class="ui?.shortcut" />
          </template>
        </SMenuItemSlot>
      </MenuRadioItem>
      <MenuSeparator v-if="item.separator" v-bind="separatorProps" :class="ui?.separator" />
    </template>
  </MenuRadioGroup>
</template>
