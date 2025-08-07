<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import {
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPortal,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger
} from '@headless';
import type { DefinedValue } from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import Link from '../link/link.vue';
import Icon from '../icon/icon.vue';
import Kbd from '../kbd/kbd.vue';
import SMenuItemSlot from './menu-item-slot.vue';
import { useCommonSlotKeys } from './shared';
import type { MenuOptionData, MenuOptionEmits, MenuOptionProps } from './types';

defineOptions({
  name: 'SMenuOption',
  inheritAttrs: false
});

const props = defineProps<MenuOptionProps<T>>();

const emit = defineEmits<MenuOptionEmits<MenuOptionData<T>>>();

type Slots = {
  item: (props: { item: MenuOptionData<T>; isTrigger?: boolean }) => any;
  'item-leading': (props: { item: MenuOptionData<T> }) => any;
  'item-trailing': (props: { item: MenuOptionData<T> }) => any;
  'item-trigger-icon': (props: { item: MenuOptionData<T> }) => any;
  'item-link-icon': (props: { item: MenuOptionData<T> }) => any;
};

const slots = defineSlots<Slots>();

const forwardedItemProps = useOmitProps(props, ['item']);

const forwardedListeners = useForwardListeners(emit);

const commonSlotKeys = useCommonSlotKeys(slots);
</script>

<template>
  <MenuGroupLabel v-if="item.isGroupLabel" v-bind="groupLabelProps" :class="ui?.groupLabel">
    <SMenuItemSlot :icon="item.icon" :label="item.label">
      <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
        <slot :name="slotKey" :item="item" />
      </template>
    </SMenuItemSlot>
  </MenuGroupLabel>
  <MenuItem
    v-else-if="item.linkProps"
    v-bind="itemProps"
    as-child
    :disabled="item.disabled"
    :text-value="item.textValue"
    @select="emit('select', item, $event)"
  >
    <Link v-bind="item.linkProps" :disabled="item.disabled" :class="ui?.item">
      <SMenuItemSlot :icon="item.icon" :label="item.label">
        <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" :item="item" />
        </template>
        <template #link-icon>
          <slot name="item-link-icon" :item="item">
            <Icon icon="lucide:arrow-up-right" :class="ui?.itemLinkIcon" />
          </slot>
        </template>
      </SMenuItemSlot>
    </Link>
  </MenuItem>
  <MenuItem
    v-else-if="!item.children"
    v-bind="itemProps"
    :disabled="item.disabled"
    :text-value="item.textValue"
    :class="ui?.item"
    @select="emit('select', item, $event)"
  >
    <SMenuItemSlot :icon="item.icon" :label="item.label">
      <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
        <slot :name="slotKey" :item="item" />
      </template>
      <template #shortcut>
        <Kbd v-if="item.shortcut" v-bind="shortcutProps" :value="item.shortcut" :class="ui?.shortcut" />
      </template>
    </SMenuItemSlot>
  </MenuItem>
  <MenuSub v-else v-bind="subProps" @update:open="emit('update:open', $event)">
    <MenuSubTrigger
      v-bind="subTriggerProps"
      :disabled="item.disabled"
      :text-value="item.textValue"
      :class="ui?.subTrigger"
    >
      <SMenuItemSlot :icon="item.icon" :label="item.label">
        <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" :item="item" :is-trigger="true" />
        </template>
        <template #trigger-icon>
          <slot name="item-trigger-icon" :item="item">
            <Icon icon="lucide:chevron-right" :class="ui?.subTriggerIcon" />
          </slot>
        </template>
      </SMenuItemSlot>
    </MenuSubTrigger>
    <MenuSeparator v-if="item.separator" :class="ui?.separator" />
    <MenuPortal v-bind="portalProps">
      <MenuSubContent v-bind="subContentProps" :class="ui?.subContent" v-on="forwardedListeners">
        <MenuGroup v-bind="groupProps" :class="ui?.group">
          <SMenuOption
            v-for="child in item.children"
            :key="child.value"
            v-bind="forwardedItemProps"
            :item="child"
            v-on="forwardedListeners"
          />
        </MenuGroup>
      </MenuSubContent>
    </MenuPortal>
  </MenuSub>
  <MenuSeparator v-if="item.separator && !item.children" v-bind="separatorProps" :class="ui?.separator" />
</template>
