<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { CollapsibleRoot, CollapsibleTrigger } from '@soybean-ui/primitives';
import { cn, sidebarMenuVariants } from '@soybean-ui/variants';
import type { AcceptableValue } from '../../../types';
import SDropdownMenu from '../../dropdown-menu/source/dropdown-menu.vue';
import SCollapsibleContent from '../../collapsible/source/collapsible-content.vue';
import { injectSidebarMenuRootContext } from '../context';
import type { SidebarMenuOptionData, SidebarMenuOptionProps } from '../types';
import SSidebarMenuItem from './sidebar-menu-item.vue';
import SSidebarMenuItemLink from './sidebar-menu-item-link.vue';
import SSidebarMenuChildGroup from './sidebar-menu-child-group.vue';
import SSidebarMenuCollapsibleIcon from './sidebar-menu-collapsible-icon.vue';

defineOptions({
  name: 'SSidebarMenuOption'
});

const { size, ui, item, root } = defineProps<SidebarMenuOptionProps<T>>();

const { modelValue, onModelValueChange, expandedKeys, onExpandedKeysChange, collapsed } =
  injectSidebarMenuRootContext();

const isChecked = computed(() => modelValue.value === item.value);

const isOpen = computed(() => expandedKeys.value.includes(item.value));

const collapsibleContentCls = computed(() => {
  const { collapsibleContent } = sidebarMenuVariants({ size });

  return cn(collapsibleContent(), ui?.collapsibleContent);
});

const tooltip = computed(() => (root && collapsed.value ? item.label : undefined));

function handleClickItem() {
  onModelValueChange(item.value);
}

function handleClickCollapsibleTrigger() {
  if (collapsed.value) return;

  if (isOpen.value) {
    const keys = expandedKeys.value.filter(key => key !== item.value);
    onExpandedKeysChange(keys);
  } else {
    const keys = Array.from(new Set([...expandedKeys.value, item.value]));
    onExpandedKeysChange(keys);
  }
}

const isChildChecked = computed(() => recurseCheckChild(item.children));

function recurseCheckChild(children?: SidebarMenuOptionData[]): boolean {
  if (!children) return false;

  return children.some(child => modelValue.value === child.value || recurseCheckChild(child.children));
}
</script>

<template>
  <SSidebarMenuItemLink
    v-if="item.linkProps"
    :size="size"
    :ui="ui"
    :label="item.label"
    :icon="item.icon"
    :value="item.value"
    :disabled="item.disabled"
    :link-props="item.linkProps"
    :checked="isChecked"
    :tooltip="tooltip"
    :actions="item.actions"
    :on-action-select="item.onActionSelect"
    :badge="item.badge"
    :chip="item.chip"
    @click="handleClickItem"
  >
    <template #leading>
      <slot name="leading" :item="item" />
    </template>
    <template #trailing>
      <slot name="trailing" :item="item" />
    </template>
  </SSidebarMenuItemLink>
  <template v-else>
    <CollapsibleRoot v-if="item.children" :open="!collapsed && isOpen">
      <CollapsibleTrigger as-child @click="handleClickCollapsibleTrigger">
        <SDropdownMenu v-if="root && collapsed" :items="item.children" side="right">
          <template #trigger>
            <SSidebarMenuItem
              :size="size"
              :ui="ui"
              :label="item.label"
              :icon="item.icon"
              :value="item.value"
              :disabled="item.disabled"
              :actions="item.actions"
              :on-action-select="item.onActionSelect"
              :badge="item.badge"
              :chip="item.chip"
              :data-contains-checked="isChildChecked"
            >
              <template #leading>
                <slot name="leading" :item="item" />
              </template>
              <template #trailing>
                <slot name="trailing" :item="item" />
                <SSidebarMenuCollapsibleIcon :class="ui?.collapsibleIcon" :open="isOpen" />
              </template>
            </SSidebarMenuItem>
          </template>
        </SDropdownMenu>
        <SSidebarMenuItem
          v-else
          :size="size"
          :ui="ui"
          :label="item.label"
          :icon="item.icon"
          :value="item.value"
          :disabled="item.disabled"
          :actions="item.actions"
          :on-action-select="item.onActionSelect"
          :badge="item.badge"
          :chip="item.chip"
          :data-contains-checked="isChildChecked"
        >
          <template #leading>
            <slot name="leading" :item="item" />
          </template>
          <template #trailing>
            <slot name="trailing" :item="item" />
            <SSidebarMenuCollapsibleIcon :class="ui?.collapsibleIcon" :open="isOpen" />
          </template>
        </SSidebarMenuItem>
      </CollapsibleTrigger>
      <SCollapsibleContent :class="collapsibleContentCls">
        <SSidebarMenuChildGroup :class="ui?.childGroup" :size="size">
          <SSidebarMenuOption
            v-for="child in item.children"
            :key="String(child.value)"
            :size="size"
            :ui="ui"
            :item="child"
          >
            <template #leading>
              <slot name="leading" :item="child" />
            </template>
            <template #trailing>
              <slot name="trailing" :item="child" />
            </template>
          </SSidebarMenuOption>
        </SSidebarMenuChildGroup>
      </SCollapsibleContent>
    </CollapsibleRoot>
    <SSidebarMenuItem
      v-else
      :size="size"
      :ui="ui"
      :label="item.label"
      :icon="item.icon"
      :value="item.value"
      :disabled="item.disabled"
      :checked="isChecked"
      :tooltip="tooltip"
      :actions="item.actions"
      :on-action-select="item.onActionSelect"
      :badge="item.badge"
      :chip="item.chip"
      @click="handleClickItem"
    >
      <template #leading>
        <slot name="leading" :item="item" />
      </template>
      <template #trailing>
        <slot name="trailing" :item="item" />
      </template>
    </SSidebarMenuItem>
  </template>
</template>
