<script setup lang="ts">
import { NavigationMenuItem, NavigationMenuLink } from '@soybeanjs/headless';
import Icon from '../icon/icon.vue';
import SNavigationMenuItemSlot from './navigation-menu-item-slot.vue';
import { useNavigationMenuExtraUi } from './context';
import { useCommonSlotKeys } from './shared';
import type { NavigationMenuOptionData, NavigationMenuSubOptionEmits, NavigationMenuSubOptionProps } from './types';

defineOptions({
  name: 'SNavigationMenuSubOption'
});

defineProps<NavigationMenuSubOptionProps>();

const emit = defineEmits<NavigationMenuSubOptionEmits>();

type Slots = {
  item: (props: { item: NavigationMenuOptionData; isTrigger?: boolean }) => any;
  'item-leading': (props: { item: NavigationMenuOptionData }) => any;
  'item-trailing': (props: { item: NavigationMenuOptionData }) => any;
  'item-children': (props: { item: NavigationMenuOptionData }) => any;
  'item-link-icon': (props: { item: NavigationMenuOptionData }) => any;
};

const slots = defineSlots<Slots>();

const commonSlotKeys = useCommonSlotKeys(slots);

const ui = useNavigationMenuExtraUi();
</script>

<template>
  <NavigationMenuItem v-bind="subItemProps" :value="subItem.value">
    <component
      :is="subItem.linkProps ? NavigationMenuLink : 'div'"
      v-bind="subItem.linkProps"
      :disabled="subItem.linkProps ? subItem.disabled : undefined"
      @select="emit('select', $event)"
    >
      <SNavigationMenuItemSlot :icon="subItem.icon">
        <div :class="ui.subLinkContent">
          <span :class="ui.subLinkLabel">{{ subItem.label }}</span>
          <p :class="ui.subLinkDescription">{{ subItem.description }}</p>
        </div>
        <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" :item="subItem" />
        </template>
        <template v-if="subItem.linkProps" #link-icon>
          <slot name="item-link-icon" :item="subItem">
            <Icon icon="lucide:arrow-up-right" :class="ui.linkIcon" />
          </slot>
        </template>
      </SNavigationMenuItemSlot>
    </component>
    <slot v-if="subItem.children?.length" name="item-children" :item="subItem" />
  </NavigationMenuItem>
</template>
