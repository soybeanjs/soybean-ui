<script
  setup
  lang="ts"
  generic="T extends DefinedValue = DefinedValue, S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>"
>
import { computed } from 'vue';
import {
  MenuCheckboxGroup,
  MenuCheckboxItem,
  MenuGroupLabel,
  MenuItemIndicator,
  MenuSeparator
} from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import Icon from '../icon/icon.vue';
import Kbd from '../kbd/kbd.vue';
import SMenuItemSlot from './menu-item-slot.vue';
import { useCommonSlotKeys } from './shared';
import { useMenuExtraThemeContext } from './context';
import type { MenuCheckboxOptionData, MenuCheckboxOptionsEmits, MenuCheckboxOptionsProps } from './types';

defineOptions({
  name: 'SMenuCheckboxOptions'
});

const props = defineProps<MenuCheckboxOptionsProps<T, S>>();

const emit = defineEmits<MenuCheckboxOptionsEmits<T, S>>();

type Slots = {
  item: (props: S) => any;
  'item-leading': (props: S) => any;
  'item-trailing': (props: S) => any;
  'item-indicator-icon': (props: S) => any;
};

const slots = defineSlots<Slots>();

const commonSlotKeys = useCommonSlotKeys(slots);

const forwardedProps = useOmitProps(props, ['items', 'checkboxItemProps', 'groupLabelProps', 'indicatorProps']);

const themeContext = useMenuExtraThemeContext();

const ui = computed(() => ({ ...themeContext?.ui?.value }));
</script>

<template>
  <MenuCheckboxGroup v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <template v-for="item in items" :key="item.value">
      <MenuGroupLabel v-if="item.isGroupLabel" v-bind="groupLabelProps">
        <SMenuItemSlot :icon="item.icon" :label="item.label">
          <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
            <slot :name="slotKey" v-bind="item" />
          </template>
        </SMenuItemSlot>
      </MenuGroupLabel>
      <MenuCheckboxItem
        v-else
        v-bind="checkboxItemProps"
        :value="item.value"
        :disabled="item.disabled"
        :text-value="item.textValue"
        @select="emit('select', item, $event)"
      >
        <SMenuItemSlot :icon="item.icon" :label="item.label">
          <template #indicator>
            <MenuItemIndicator v-bind="indicatorProps">
              <slot name="item-indicator-icon" v-bind="item">
                <Icon icon="lucide:check" />
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
      </MenuCheckboxItem>
      <MenuSeparator v-if="item.separator" v-bind="separatorProps" />
    </template>
  </MenuCheckboxGroup>
</template>
