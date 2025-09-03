<script setup lang="ts">
import { computed } from 'vue';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuSub,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import Icon from '../icon/icon.vue';
import SNavigationMenuSubItemSlot from './navigation-menu-sub-item-slot.vue';
import { useCommonSlotKeys } from './shared';
import type { NavigationMenuOptionData, NavigationMenuOptionEmits, NavigationMenuSubOptionProps } from './types';

defineOptions({
  name: 'SNavigationMenuSubOption'
});

const props = defineProps<NavigationMenuSubOptionProps>();

const emit = defineEmits<NavigationMenuOptionEmits>();

type Slots = {
  item: (props: { item: NavigationMenuOptionData; isTrigger?: boolean }) => any;
  'item-leading': (props: { item: NavigationMenuOptionData }) => any;
  'item-trailing': (props: { item: NavigationMenuOptionData }) => any;
  'item-trigger-icon': (props: { item: NavigationMenuOptionData }) => any;
  'item-link-icon': (props: { item: NavigationMenuOptionData }) => any;
};

const slots = defineSlots<Slots>();

const forwardedProps = useOmitProps(props, ['subItem']);

const forwardedListeners = useForwardListeners(emit);

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const commonSlotKeys = useCommonSlotKeys(slots);
</script>

<template>
  <NavigationMenuItem v-bind="subItemProps" :value="subItem.value">
    <NavigationMenuLink
      v-if="!subItem.children?.length"
      v-bind="subItem.linkProps"
      :disabled="subItem.disabled"
      @select="emit('select', $event)"
    >
      <SNavigationMenuSubItemSlot :icon="subItem.icon">
        <div :class="ui?.subLinkContent">
          <span :class="ui?.subLinkLabel">{{ subItem.label }}</span>
          <p :class="ui?.subLinkDescription">{{ subItem.description }}</p>
        </div>
        <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" :item="subItem" />
        </template>
      </SNavigationMenuSubItemSlot>
    </NavigationMenuLink>
    <template v-else>
      <NavigationMenuTrigger
        v-bind="subTriggerProps"
        :disabled="subItem.disabled"
        :as-child="Boolean(subItem.linkProps)"
      >
        <component
          :is="subItem.linkProps ? NavigationMenuLink : 'template'"
          v-bind="subItem.linkProps"
          @select="emit('select', $event)"
        >
          <SNavigationMenuSubItemSlot :icon="subItem.icon">
            <div :class="ui?.subLinkContent">
              <span :class="ui?.subLinkLabel">{{ subItem.label }}</span>
              <p :class="ui?.subLinkDescription">{{ subItem.description }}</p>
            </div>
            <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
              <slot :name="slotKey" :item="subItem" :is-trigger="true" />
            </template>
            <template #trigger-icon>
              <slot name="item-trigger-icon" :item="subItem">
                <Icon icon="lucide:chevron-down" :class="ui?.triggerIcon" />
              </slot>
            </template>
          </SNavigationMenuSubItemSlot>
        </component>
      </NavigationMenuTrigger>
      <NavigationMenuContent v-bind="subContentProps" v-on="forwardedListeners">
        <NavigationMenuSub v-bind="subProps" @update:model-value="emit('update:modelValue', $event)">
          <NavigationMenuList v-bind="subListProps">
            <NavigationMenuSubOption
              v-for="child in subItem.children"
              :key="child.value"
              v-bind="forwardedProps"
              :sub-item="child"
              v-on="forwardedListeners"
            >
              <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]>
                <slot :name="slotKey" :item="child" />
              </template>
            </NavigationMenuSubOption>
          </NavigationMenuList>
          <NavigationMenuViewport v-bind="subViewportProps" />
        </NavigationMenuSub>
      </NavigationMenuContent>
    </template>
  </NavigationMenuItem>
</template>
