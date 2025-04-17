<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleRoot, CollapsibleTrigger } from '@soybean-ui/primitives';
import SCollapsibleContent from '../collapsible/collapsible-content.vue';
import STreeMenuItem from './tree-menu-item.vue';
import STreeMenuItemLink from './tree-menu-item-link.vue';
import STreeMenuChildGroup from './tree-menu-child-group.vue';
import STreeMenuCollapsibleIcon from './tree-menu-collapsible-icon.vue';
import { injectTreeMenuRootContext } from './context';
import type { TreeMenuOptionProps } from './types';

defineOptions({
  name: 'STreeMenuOption'
});

const { size, ui, item } = defineProps<TreeMenuOptionProps>();

const { modelValue, onModelValueChange, expandedKeys, onExpandedKeysChange, collapsible } = injectTreeMenuRootContext();

const isChecked = computed(() => modelValue.value === item.value);

const isOpen = computed(() => expandedKeys.value.includes(item.value));

function handleClickItem() {
  onModelValueChange(item.value);
}

function handleClickCollapsibleTrigger() {
  if (collapsible.value) return;

  if (isOpen.value) {
    const keys = expandedKeys.value.filter(key => key !== item.value);
    onExpandedKeysChange(keys);
  } else {
    const keys = Array.from(new Set([...expandedKeys.value, item.value]));
    onExpandedKeysChange(keys);
  }
}

const isChildChecked = computed(() => recurseCheckChild(item.children));

function recurseCheckChild(children: TreeMenuOptionProps['item']['children']): boolean {
  if (!children) return false;

  return children.some(child => modelValue.value === child.value || recurseCheckChild(child.children));
}
</script>

<template>
  <STreeMenuItemLink
    v-if="item.linkProps"
    :size="size"
    :ui="ui"
    :label="item.label"
    :icon="item.icon"
    :value="item.value"
    :disabled="item.disabled"
    :link-props="item.linkProps"
    :checked="isChecked"
    @click="handleClickItem"
  />
  <template v-else>
    <CollapsibleRoot v-if="item.children" :open="!collapsible && isOpen">
      <CollapsibleTrigger as-child @click="handleClickCollapsibleTrigger">
        <STreeMenuItem
          :size="size"
          :ui="ui"
          :label="item.label"
          :icon="item.icon"
          :value="item.value"
          :disabled="item.disabled"
          :data-contains-checked="isChildChecked"
        >
          <template #trailing>
            <STreeMenuCollapsibleIcon :class="ui?.collapsibleIcon" :open="isOpen" />
          </template>
        </STreeMenuItem>
      </CollapsibleTrigger>
      <SCollapsibleContent as-child>
        <STreeMenuChildGroup :class="ui?.childGroup" :size="size">
          <STreeMenuOption v-for="child in item.children" :key="String(child.value)" :item="child" />
        </STreeMenuChildGroup>
      </SCollapsibleContent>
    </CollapsibleRoot>
    <STreeMenuItem
      v-else
      :size="size"
      :ui="ui"
      :label="item.label"
      :icon="item.icon"
      :value="item.value"
      :disabled="item.disabled"
      :checked="isChecked"
      @click="handleClickItem"
    />
  </template>
</template>
