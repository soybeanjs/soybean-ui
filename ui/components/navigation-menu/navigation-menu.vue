<script setup lang="ts">
import { computed } from 'vue';
import {
  NavigationMenuIndicator,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuViewport,
  provideNavigationMenuThemeContext
} from '@headless';
import { useForwardListeners, useOmitProps, usePickProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { navigationMenuVariants } from '@variants/navigation-menu';
import NavigationMenuOption from './navigation-menu-option.vue';
import type { NavigationMenuEmits, NavigationMenuOptionData, NavigationMenuProps } from './types';

defineOptions({
  name: 'SNavigationMenu'
});

const props = withDefaults(defineProps<NavigationMenuProps>(), {
  modelValue: undefined
});

const emit = defineEmits<NavigationMenuEmits>();

type Slots = {
  item: (props: { item: NavigationMenuOptionData; isTrigger?: boolean }) => any;
  'item-leading': (props: { item: NavigationMenuOptionData }) => any;
  'item-trailing': (props: { item: NavigationMenuOptionData }) => any;
  'item-trigger-icon': (props: { item: NavigationMenuOptionData }) => any;
  'item-link-icon': (props: { item: NavigationMenuOptionData }) => any;
};

const slots = defineSlots<Slots>();

const forwardedRootProps = useOmitProps(props, [
  'size',
  'items',
  'ui',
  'itemProps',
  'triggerProps',
  'contentProps',
  'subProps',
  'viewportProps',
  'indicatorProps',
  'listProps'
]);
const forwardedOptionProps = usePickProps(props, [
  'itemProps',
  'triggerProps',
  'contentProps',
  'subProps',
  'viewportProps',
  'indicatorProps',
  'listProps'
]);

const forwardedListeners = useForwardListeners(emit);

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const ui = computed(() => {
  const variants = navigationMenuVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

provideNavigationMenuThemeContext({
  ui
});
</script>

<template>
  <NavigationMenuRoot v-bind="forwardedRootProps" @update:model-value="emit('update:modelValue', $event)">
    <NavigationMenuList>
      <NavigationMenuOption
        v-for="item in items"
        :key="item.value"
        v-bind="forwardedOptionProps"
        :item="item"
        :ui="ui"
        v-on="forwardedListeners"
      >
        <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
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
