<script
  setup
  lang="ts"
  generic="T extends DefinedValue = DefinedValue, S extends MenuOptionData<T> = MenuOptionData<T>"
>
import { computed } from 'vue';
import { MenuGroup } from '@headless';
import type { DefinedValue } from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import SMenuOption from './menu-option.vue';
import type { MenuOptionData, MenuOptionsEmits, MenuOptionsProps } from './types';

defineOptions({
  name: 'SMenuOptions',
  inheritAttrs: false
});

const props = defineProps<MenuOptionsProps<T, S>>();

const emit = defineEmits<MenuOptionsEmits<S>>();

type Slots = {
  item: (props: { item: MenuOptionData<T>; isTrigger?: boolean }) => any;
  'item-leading': (props: { item: MenuOptionData<T> }) => any;
  'item-trailing': (props: { item: MenuOptionData<T> }) => any;
  'item-trigger-icon': (props: { item: MenuOptionData<T> }) => any;
  'item-link-icon': (props: { item: MenuOptionData<T> }) => any;
};

const slots = defineSlots<Slots>();

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const forwardedItemProps = useOmitProps(props, ['items']);

const forwardedListeners = useForwardListeners(emit);
</script>

<template>
  <MenuGroup v-bind="groupProps">
    <SMenuOption
      v-for="item in items"
      :key="item.value"
      v-bind="forwardedItemProps"
      :item="item"
      v-on="forwardedListeners"
    >
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuOption>
  </MenuGroup>
</template>
