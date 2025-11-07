<script setup lang="ts">
import Icon from '../icon/icon.vue';
import type { MenuOptionData } from './types';

interface Props {
  icon: MenuOptionData['icon'];
  label: MenuOptionData['label'];
}

defineProps<Props>();

defineOptions({
  name: 'SMenuItemSlot'
});

type Slots = {
  indicator: () => any;
  item: () => any;
  'item-leading': () => any;
  'item-trailing': () => any;
  'link-icon': () => any;
  'trigger-icon': () => any;
  shortcut: () => any;
};

defineSlots<Slots>();
</script>

<template>
  <slot name="indicator" />
  <slot name="item">
    <slot name="item-leading">
      <Icon v-if="icon" :icon="icon" />
    </slot>
    <span>{{ label }}</span>
    <slot name="link-icon" />
    <slot name="item-trailing" />
    <slot name="trigger-icon" />
    <slot name="shortcut" />
  </slot>
</template>
