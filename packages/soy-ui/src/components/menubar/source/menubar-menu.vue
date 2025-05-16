<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { MenubarMenu, useCombinedPropsEmits, useEmitAsProps, useOmitForwardProps } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { MenuOptionData } from '../../menu/types';
import type { MenubarMenuEmits, MenubarMenuProps } from '../types';
import SMenubarTriggerOption from './menubar-trigger-option.vue';
import SMenubarItem from './menubar-item.vue';

defineOptions({
  name: 'SMenubarMenu'
});

const props = defineProps<MenubarMenuProps<T>>();

const emit = defineEmits<MenubarMenuEmits<T>>();

type TriggerSlots = {
  trigger?: (props: MenuOptionData<T>) => any;
  triggerLeading?: (props: MenuOptionData<T>) => any;
  triggerTrailing?: (props: MenuOptionData<T>) => any;
};
type ItemSlots = {
  item?: (props: MenuOptionData<T>) => any;
  itemLeading?: (props: MenuOptionData<T>) => any;
  itemTrailing?: (props: MenuOptionData<T>) => any;
  itemTrigger?: (props: MenuOptionData<T>) => any;
  subTriggerIcon?: (props: MenuOptionData<T>) => any;
  children?: (props: MenuOptionData<T>) => any;
};

type Slots = TriggerSlots & ItemSlots;

const slots = defineSlots<Slots>();

const slotKeys = computed(() => {
  const all = Object.keys(slots) as (keyof Slots)[];

  const trigger = all.filter(key => key.startsWith('trigger'));
  const item = all.filter(key => !key.startsWith('trigger'));

  return {
    trigger,
    item
  };
});
const forwardedMenuProps = useOmitForwardProps(props, ['value', 'item']);

const forwardedMenuEmits = useEmitAsProps(emit);

const forwardedMenu = useCombinedPropsEmits(forwardedMenuProps, forwardedMenuEmits);
</script>

<template>
  <MenubarMenu :value="value">
    <SMenubarTriggerOption :disabled="item.disabled" :size="size" :ui="ui" :item="item">
      <template v-for="slotKey in slotKeys.trigger" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenubarTriggerOption>
    <SMenubarItem v-bind="forwardedMenu" :items="item.children">
      <template v-for="slotKey in slotKeys.item" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenubarItem>
  </MenubarMenu>
</template>
