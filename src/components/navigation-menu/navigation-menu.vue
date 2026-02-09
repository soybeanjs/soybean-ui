<script setup lang="ts">
import { computed } from 'vue';
import {
  NavigationMenuIndicator,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuViewport,
  provideNavigationMenuUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps, usePickProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { provideNavigationMenuExtraUi } from './context';
import { navigationMenuVariants } from './variants';
import NavigationMenuOption from './navigation-menu-option.vue';
import type { NavigationMenuEmits, NavigationMenuOptionData, NavigationMenuProps } from './types';

defineOptions({
  name: 'SNavigationMenu'
});

const props = defineProps<NavigationMenuProps>();

const emit = defineEmits<NavigationMenuEmits>();

type Slots = {
  item: (props: { item: NavigationMenuOptionData; isTrigger?: boolean }) => any;
  'item-leading': (props: { item: NavigationMenuOptionData }) => any;
  'item-trailing': (props: { item: NavigationMenuOptionData }) => any;
  'item-children': (props: { item: NavigationMenuOptionData }) => any;
  'item-trigger-icon': (props: { item: NavigationMenuOptionData }) => any;
  'item-link-icon': (props: { item: NavigationMenuOptionData }) => any;
};

const slots = defineSlots<Slots>();

const optionPropKeys = [
  'itemProps',
  'linkProps',
  'triggerProps',
  'contentProps',
  'viewportProps',
  'indicatorProps',
  'listProps',
  'subListProps',
  'subItemProps'
] as const;

const forwardedRootProps = useOmitProps(props, ['class', 'size', 'ui', 'items', ...optionPropKeys]);

const forwardedOptionProps = usePickProps(props, [...optionPropKeys]);

const forwardedListeners = useForwardListeners(emit);

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const ui = computed(() => {
  const variants = navigationMenuVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideNavigationMenuUi(ui);
provideNavigationMenuExtraUi(ui);
</script>

<template>
  <NavigationMenuRoot v-bind="forwardedRootProps" @update:model-value="emit('update:modelValue', $event)">
    <NavigationMenuList v-bind="listProps">
      <NavigationMenuOption
        v-for="item in items"
        :key="item.value"
        v-bind="forwardedOptionProps"
        :item="item"
        v-on="forwardedListeners"
      >
        <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
        <template #item-children="slotProps">
          <slot name="item-children" :item="slotProps.item" />
        </template>
      </NavigationMenuOption>
    </NavigationMenuList>
    <NavigationMenuIndicator v-bind="indicatorProps">
      <div :class="ui?.arrow" />
    </NavigationMenuIndicator>
    <div :class="ui?.viewportRoot">
      <NavigationMenuViewport v-bind="viewportProps" />
    </div>
  </NavigationMenuRoot>
</template>
