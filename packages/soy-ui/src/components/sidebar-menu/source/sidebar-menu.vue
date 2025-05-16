<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { SidebarMenuEmits, SidebarMenuProps } from '../types';
import SSidebarMenuRoot from './sidebar-menu-root.vue';
import SSidebarMenuOption from './sidebar-menu-option.vue';
import SSidebarMenuGroupLabel from './sidebar-menu-group-label.vue';
import SSidebarMenuGroup from './sidebar-menu-group.vue';

defineOptions({
  name: 'SSidebarMenu',
  inheritAttrs: false
});

const { class: cls, size, ui, items, ...delegatedProps } = defineProps<SidebarMenuProps<T>>();

const emit = defineEmits<SidebarMenuEmits<T>>();

const forwardedRootProps = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <SSidebarMenuRoot v-bind="forwardedRootProps" :class="cls" :size="size" :ui="ui">
    <template v-for="item in items" :key="item.value">
      <template v-if="item.isGroupLabel">
        <SSidebarMenuGroupLabel :class="ui?.groupLabel" :size="size" :ui="ui" :label="item.label" :icon="item.icon" />
        <SSidebarMenuGroup v-if="item.children" :class="ui?.group" :size="size">
          <SSidebarMenuOption
            v-for="child in item.children"
            :key="String(child.value)"
            :size="size"
            :ui="ui"
            root
            :item="child"
          >
            <template #leading="slotProps">
              <slot name="leading" v-bind="slotProps" />
            </template>
            <template #trailing="slotProps">
              <slot name="trailing" v-bind="slotProps" />
            </template>
          </SSidebarMenuOption>
        </SSidebarMenuGroup>
      </template>
      <SSidebarMenuOption v-else :size="size" :ui="ui" root :item="item">
        <template #leading="slotProps">
          <slot name="leading" v-bind="slotProps" />
        </template>
        <template #trailing="slotProps">
          <slot name="trailing" v-bind="slotProps" />
        </template>
      </SSidebarMenuOption>
    </template>
  </SSidebarMenuRoot>
</template>
