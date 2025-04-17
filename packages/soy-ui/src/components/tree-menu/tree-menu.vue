<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { AcceptableValue } from '../../types';
import type { TreeMenuProps } from './types';
import STreeMenuRoot from './tree-menu-root.vue';
import STreeMenuOption from './tree-menu-option.vue';
import STreeMenuGroupLabel from './tree-menu-group-label.vue';
import STreeMenuGroup from './tree-menu-group.vue';

defineOptions({
  name: 'STreeMenu'
});

const { class: cls, size, ui, items } = defineProps<TreeMenuProps<T>>();
</script>

<template>
  <STreeMenuRoot :class="cls" :size="size" :ui="ui">
    <template v-for="item in items" :key="item.value">
      <template v-if="item.isGroupLabel">
        <STreeMenuGroupLabel :class="ui?.groupLabel" :size="size" :ui="ui" :label="item.label" :icon="item.icon" />
        <STreeMenuGroup v-if="item.children" :class="ui?.group" :size="size">
          <STreeMenuOption
            v-for="child in item.children"
            :key="String(child.value)"
            :size="size"
            :ui="ui"
            :item="child"
          />
        </STreeMenuGroup>
      </template>
      <STreeMenuOption v-else :size="size" :ui="ui" :item="item" />
    </template>
  </STreeMenuRoot>
</template>
