<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { useForwardListeners } from '../../composables';
import Icon from '../_icon/icon.vue';
import { useNavigationMenuUi } from './context';
import NavigationMenuSubOption from './navigation-menu-sub-option-compact.vue';
import NavigationMenuItemSlot from './navigation-menu-item-slot-compact.vue';
import NavigationMenuContent from './navigation-menu-content.vue';
import NavigationMenuItem from './navigation-menu-item.vue';
import NavigationMenuLink from './navigation-menu-link.vue';
import NavigationMenuSubList from './navigation-menu-sub-list.vue';
import NavigationMenuTrigger from './navigation-menu-trigger.vue';
import { useCommonSlotNames } from './shared';
import type {
  NavigationMenuOptionCompactProps,
  NavigationMenuOptionCompactEmits,
  NavigationMenuOptionCompactSlots
} from './types';

defineOptions({
  name: 'NavigationMenuOptionCompact'
});

const props = defineProps<NavigationMenuOptionCompactProps>();

const emit = defineEmits<NavigationMenuOptionCompactEmits>();

const slots = defineSlots<NavigationMenuOptionCompactSlots>();

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const commonSlotNames = useCommonSlotNames(slots);

const ui = useNavigationMenuUi();

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
        <template v-for="slotName in commonSlotNames" :key="slotName" #[slotName]>
          <slot :name="slotName" :item="item" />
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
            <template v-for="slotName in commonSlotNames" :key="slotName" #[slotName]>
              <slot :name="slotName" :item="item" :is-trigger="true" />
            </template>
            <template #trigger-icon>
              <slot name="item-trigger-icon" :item="item">
                <Icon icon="lucide:chevron-down" :class="ui.triggerIcon" />
              </slot>
            </template>
          </NavigationMenuItemSlot>
        </component>
      </NavigationMenuTrigger>
      <NavigationMenuContent v-bind="contentProps" v-on="listeners">
        <NavigationMenuSubList v-bind="subListProps">
          <NavigationMenuSubOption
            v-for="child in item.children"
            :key="child.value"
            :sub-item="child"
            :sub-item-props="subItemProps"
            @select="emit('select', $event)"
          >
            <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
              <slot :name="slotName" :item="child" />
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
