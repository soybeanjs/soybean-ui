<script setup lang="ts">
import { computed } from 'vue';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuSubList,
  NavigationMenuTrigger
} from '@soybeanjs/headless';
import { useForwardListeners } from '@soybeanjs/headless/composables';
import Icon from '../icon/icon.vue';
import NavigationMenuItemSlot from './navigation-menu-item-slot.vue';
import NavigationMenuSubOption from './navigation-menu-sub-option.vue';
import { useNavigationMenuExtraUi } from './context';
import { useCommonSlotKeys } from './shared';
import type { NavigationMenuOptionData, NavigationMenuOptionEmits, NavigationMenuOptionProps } from './types';

defineOptions({
  name: 'SNavigationMenuOption'
});

const props = defineProps<NavigationMenuOptionProps>();

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

const ui = useNavigationMenuExtraUi();

const isLink = computed(() => Boolean(props.item.to || props.item.href));

const linkProps = computed(() =>
  isLink.value
    ? {
        ...props.linkProps,
        disabled: props.item.disabled,
        to: props.item.to,
        href: props.item.href,
        target: props.item.target,
        external: props.item.external
      }
    : {}
);
</script>

<template>
  <NavigationMenuItem v-bind="itemProps" :value="item.value">
    <NavigationMenuLink
      v-if="!item.children?.length"
      v-slot="{ isHref }"
      v-bind="linkProps"
      @select="emit('select', $event)"
    >
      <NavigationMenuItemSlot :icon="item.icon">
        <span>{{ item.label }}</span>
        <template v-for="slotKey in commonSlotKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" :item="item" />
        </template>
        <template v-if="isHref" #link-icon>
          <slot name="item-link-icon" :item="item">
            <Icon icon="lucide:arrow-up-right" :class="ui.linkIcon" />
          </slot>
        </template>
      </NavigationMenuItemSlot>
    </NavigationMenuLink>
    <template v-else>
      <NavigationMenuTrigger v-bind="triggerProps" :disabled="item.disabled" :as-child="isLink">
        <component :is="isLink ? NavigationMenuLink : 'template'" v-bind="linkProps" @select="emit('select', $event)">
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
