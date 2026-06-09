<script setup lang="ts">
import Icon from '../_icon/icon.vue';
import type { IconValue } from '../_icon/types.js';
import { useNavigationMenuUi } from './context.js';

interface Props {
  icon?: IconValue;
}

defineOptions({
  name: 'NavigationMenuItemSlotCompact'
});

defineProps<Props>();

const ui = useNavigationMenuUi();

type Slots = {
  default: () => any;
  item?: () => any;
  'item-leading'?: () => any;
  'item-trailing'?: () => any;
  'link-icon'?: () => any;
  'trigger-icon'?: () => any;
};

defineSlots<Slots>();
</script>

<template>
  <slot name="item">
    <slot name="item-leading">
      <Icon v-if="icon" :icon="icon" :class="ui.itemIcon" />
    </slot>
    <slot />
    <slot name="link-icon" />
    <slot name="item-trailing" />
    <slot name="trigger-icon" />
  </slot>
</template>
