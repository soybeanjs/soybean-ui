<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { MenuOptionData } from '../../menu/types';
import type { MenubarTriggerOptionProps } from '../types';
import SMenubarTrigger from './menubar-trigger.vue';
import SMenubarTriggerLink from './menubar-trigger-link.vue';

defineOptions({
  name: 'SMenubarTriggerOption'
});

defineProps<MenubarTriggerOptionProps<T>>();

type Slots = {
  trigger: (props: MenuOptionData<T>) => any;
  'trigger-leading': (props: MenuOptionData<T>) => any;
  'trigger-trailing': (props: MenuOptionData<T>) => any;
};

defineSlots<Slots>();

const itemSlotMap = {
  leading: 'trigger-leading',
  default: 'trigger',
  trailing: 'trigger-trailing'
} satisfies Record<string, keyof Slots>;
</script>

<template>
  <SMenubarTriggerLink
    v-if="item.linkProps"
    v-bind="item.linkProps"
    :size="size"
    :ui="ui"
    :label="item.label"
    :icon="item.icon"
    :disabled="disabled"
  >
    <template v-for="(slotKey, slotName) in itemSlotMap" :key="slotKey" #[slotName]>
      <slot :name="slotKey" v-bind="item" />
    </template>
  </SMenubarTriggerLink>
  <SMenubarTrigger v-else :size="size" :ui="ui" :label="item.label" :icon="item.icon" :disabled="disabled">
    <template v-for="(slotKey, slotName) in itemSlotMap" :key="slotKey" #[slotName]>
      <slot :name="slotKey" v-bind="item" />
    </template>
  </SMenubarTrigger>
</template>
