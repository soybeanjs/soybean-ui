<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger } from '@soybean-ui/primitives';
import SCollapsibleContent from '../collapsible/collapsible-content.vue';
import STreeMenuItem from './tree-menu-item.vue';
import STreeMenuItemLink from './tree-menu-item-link.vue';
import STreeMenuChildGroup from './tree-menu-child-group.vue';
import STreeMenuCollapsibleIcon from './tree-menu-collapsible-icon.vue';
import type { TreeMenuOptionProps } from './types';

defineOptions({
  name: 'STreeMenuOption'
});

const { size, ui, item } = defineProps<TreeMenuOptionProps>();
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
  />
  <template v-else>
    <CollapsibleRoot v-if="item.children" v-slot="{ open }">
      <CollapsibleTrigger as-child>
        <STreeMenuItem
          :size="size"
          :ui="ui"
          :label="item.label"
          :icon="item.icon"
          :value="item.value"
          :disabled="item.disabled"
        >
          <template #trailing>
            <STreeMenuCollapsibleIcon :class="ui?.collapsibleIcon" :open="open" />
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
    />
  </template>
</template>
