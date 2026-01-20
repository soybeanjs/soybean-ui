<script
  setup
  lang="ts"
  generic="
    T extends AcceptableBooleanValue = AcceptableBooleanValue,
    S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
  "
>
import { MenuGroupLabel, MenuItemIndicator, MenuRadioGroup, MenuRadioItem, MenuSeparator } from '@soybeanjs/headless';
import type { AcceptableBooleanValue } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import Icon from '../icon/icon.vue';
import Kbd from '../kbd/kbd.vue';
import SMenuItemSlot from './menu-item-slot.vue';
import { useCommonSlotKeys } from './shared';
import { useMenuExtraUi } from './context';
import type { MenuRadioOptionData, MenuRadioOptionsEmits, MenuRadioOptionsProps } from './types';

defineOptions({
  name: 'SMenuRadio'
});

const props = defineProps<MenuRadioOptionsProps<T, S>>();

const emit = defineEmits<MenuRadioOptionsEmits<T, S>>();

type Slots = {
  item: (props: S) => any;
  'item-leading': (props: S) => any;
  'item-trailing': (props: S) => any;
  'item-indicator-icon': (props: S) => any;
};

const slots = defineSlots<Slots>();

const commonSlotKeys = useCommonSlotKeys(slots);

const forwardedProps = useOmitProps(props, ['items', 'radioItemProps', 'groupLabelProps', 'indicatorProps']);

const ui = useMenuExtraUi();
</script>

<template>
  <MenuRadioGroup v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <template v-for="item in items" :key="item.value">
      <MenuGroupLabel v-if="item.isGroupLabel" v-bind="groupLabelProps">
        <SMenuItemSlot :icon="item.icon" :label="item.label">
          <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
            <slot :name="slotKey" v-bind="item" />
          </template>
        </SMenuItemSlot>
      </MenuGroupLabel>
      <MenuRadioItem
        v-else
        v-bind="radioItemProps"
        :value="item.value"
        :disabled="item.disabled"
        :text-value="item.textValue"
        @select="emit('select', item, $event)"
      >
        <SMenuItemSlot :icon="item.icon" :label="item.label">
          <template #indicator>
            <MenuItemIndicator v-bind="indicatorProps">
              <slot name="item-indicator-icon" v-bind="item">
                <Icon icon="icon-park-outline:dot" />
              </slot>
            </MenuItemIndicator>
          </template>
          <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
            <slot :name="slotKey" v-bind="item" />
          </template>
          <template #shortcut>
            <Kbd v-if="item.shortcut" v-bind="shortcutProps" :value="item.shortcut" :class="ui.shortcut" />
          </template>
        </SMenuItemSlot>
      </MenuRadioItem>
      <MenuSeparator v-if="item.separator" v-bind="separatorProps" />
    </template>
  </MenuRadioGroup>
</template>
