<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../_icon/icon.vue';
import { useNavigationMenuUi } from './context.js';
import NavigationMenuItemSlot from './navigation-menu-item-slot-compact.vue';
import NavigationMenuItem from './navigation-menu-item.vue';
import NavigationMenuLink from './navigation-menu-link.vue';
import { useCommonSlotNames } from './shared.js';
import type {
  NavigationMenuSubOptionCompactProps,
  NavigationMenuSubOptionCompactEmits,
  NavigationMenuSubOptionCompactSlots
} from './types.js';

defineOptions({
  name: 'NavigationMenuSubOptionCompact'
});

const props = defineProps<NavigationMenuSubOptionCompactProps>();

const emit = defineEmits<NavigationMenuSubOptionCompactEmits>();

const slots = defineSlots<NavigationMenuSubOptionCompactSlots>();

const slotNames = useCommonSlotNames(slots);

const ui = useNavigationMenuUi();

const isLink = computed(() => Boolean(props.subItem.to || props.subItem.href));

const linkProps = computed(() =>
  isLink.value
    ? {
        ...props.linkProps,
        disabled: props.subItem.disabled,
        to: props.subItem.to,
        href: props.subItem.href,
        target: props.subItem.target,
        external: props.subItem.external
      }
    : {}
);
</script>

<template>
  <NavigationMenuItem v-bind="subItemProps" :value="subItem.value">
    <component
      :is="isLink ? NavigationMenuLink : 'div'"
      v-slot="slotProps"
      v-bind="linkProps"
      @select="emit('select', $event)"
    >
      <NavigationMenuItemSlot :icon="subItem.icon">
        <div :class="ui.subLinkContent">
          <span :class="ui.subLinkLabel">{{ subItem.label }}</span>
          <p :class="ui.subLinkDescription">{{ subItem.description }}</p>
        </div>
        <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
          <slot :name="slotName" :item="subItem" />
        </template>
        <template v-if="slotProps?.isHref" #link-icon>
          <slot name="item-link-icon" :item="subItem">
            <Icon icon="lucide:arrow-up-right" :class="ui.linkIcon" />
          </slot>
        </template>
      </NavigationMenuItemSlot>
    </component>
    <slot v-if="subItem.children?.length" name="item-children" :item="subItem" />
  </NavigationMenuItem>
</template>
