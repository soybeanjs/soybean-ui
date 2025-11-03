<script setup lang="ts">
import { computed } from 'vue';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuSubList,
  NavigationMenuTrigger
} from '@headless';
import { useForwardListeners } from '@headless/composables';
import Icon from '../icon/icon.vue';
import NavigationMenuItemSlot from './navigation-menu-item-slot.vue';
import NavigationMenuSubOption from './navigation-menu-sub-option.vue';
import { useNavigationMenuExtraThemeContext } from './context';
import { useCommonSlotKeys } from './shared';
import type { NavigationMenuOptionData, NavigationMenuOptionEmits, NavigationMenuOptionProps } from './types';

defineOptions({
  name: 'SNavigationMenuOption'
});

defineProps<NavigationMenuOptionProps>();

const emit = defineEmits<NavigationMenuOptionEmits>();

type Slots = {
  item: (props: { item: NavigationMenuOptionData; isTrigger?: boolean }) => any;
  'item-leading': (props: { item: NavigationMenuOptionData }) => any;
  'item-trailing': (props: { item: NavigationMenuOptionData }) => any;
  'item-children': (props: { item: NavigationMenuOptionData }) => any;
  'item-trigger-icon': (props: { item: NavigationMenuOptionData }) => any;
  'item-link-icon': (props: { item: NavigationMenuOptionData }) => any;
};

const slots = defineSlots<Slots>();

const forwardedListeners = useForwardListeners(emit);

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const commonSlotKeys = useCommonSlotKeys(slots);

const { ui } = useNavigationMenuExtraThemeContext('NavigationMenuOption');
</script>

<template>
  <NavigationMenuItem v-bind="itemProps" :value="item.value">
    <NavigationMenuLink
      v-if="!item.children?.length"
      v-bind="item.linkProps"
      :disabled="item.disabled"
      @select="emit('select', $event)"
    >
      <NavigationMenuItemSlot :icon="item.icon">
        <span>{{ item.label }}</span>
        <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" :item="item" />
        </template>
        <template #link-icon>
          <slot name="item-link-icon" :item="item">
            <Icon icon="lucide:arrow-up-right" :class="ui.linkIcon" />
          </slot>
        </template>
      </NavigationMenuItemSlot>
    </NavigationMenuLink>
    <template v-else>
      <NavigationMenuTrigger v-bind="triggerProps" :disabled="item.disabled" :as-child="Boolean(item.linkProps)">
        <component
          :is="item.linkProps ? NavigationMenuLink : 'template'"
          v-bind="item.linkProps"
          @select="emit('select', $event)"
        >
          <NavigationMenuItemSlot :icon="item.icon">
            <span>{{ item.label }}</span>
            <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
              <slot :name="slotKey" :item="item" :is-trigger="true" />
            </template>
            <template #trigger-icon>
              <slot name="item-trigger-icon" :item="item">
                <Icon icon="lucide:chevron-down" :class="ui.triggerIcon" />
              </slot>
            </template>
          </NavigationMenuItemSlot>
        </component>
      </NavigationMenuTrigger>
      <NavigationMenuContent v-bind="contentProps" v-on="forwardedListeners">
        <NavigationMenuSubList v-bind="subListProps">
          <NavigationMenuSubOption
            v-for="child in item.children"
            :key="child.value"
            :sub-item="child"
            :sub-item-props="subItemProps"
            @select="emit('select', $event)"
          >
            <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]>
              <slot :name="slotKey" :item="child" />
            </template>
            <template #item-children="slotProps">
              <slot name="item-children" :item="slotProps.item" />
            </template>
          </NavigationMenuSubOption>
        </NavigationMenuSubList>
      </NavigationMenuContent>
    </template>
  </NavigationMenuItem>
</template>
