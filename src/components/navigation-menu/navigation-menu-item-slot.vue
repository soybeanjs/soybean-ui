<script setup lang="ts">
import Icon from '../icon/icon.vue';
import type { NavigationMenuOptionData } from './types';

interface Props {
  icon: NavigationMenuOptionData['icon'];
}

defineProps<Props>();

defineOptions({
  name: 'SNavigationMenuItemSlot'
});

type Slots = {
  default: () => any;
  item: () => any;
  'item-leading': () => any;
  'item-trailing': () => any;
  'link-icon': () => any;
  'trigger-icon': () => any;
};

defineSlots<Slots>();
</script>

<template>
  <slot name="item">
    <slot name="item-leading">
      <Icon :icon="icon" />
    </slot>
    <slot />
    <slot name="link-icon" />
    <slot name="item-trailing" />
    <slot name="trigger-icon" />
  </slot>
</template>
