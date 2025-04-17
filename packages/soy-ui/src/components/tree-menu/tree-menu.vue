<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '../../types';
import STreeMenuRoot from './tree-menu-root.vue';
import STreeMenuRootOption from './tree-menu-root-option.vue';
import STreeMenuGroupLabel from './tree-menu-group-label.vue';
import STreeMenuGroup from './tree-menu-group.vue';
import type { TreeMenuEmits, TreeMenuProps } from './types';

defineOptions({
  name: 'STreeMenu'
});

const { class: cls, size, ui, items, ...delegatedProps } = defineProps<TreeMenuProps<T>>();

const emit = defineEmits<TreeMenuEmits<T>>();

const forwardedRootProps = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <STreeMenuRoot v-bind="forwardedRootProps" :class="cls" :size="size" :ui="ui" :data-collapsible="collapsible">
    <template v-for="item in items" :key="item.value">
      <template v-if="item.isGroupLabel">
        <STreeMenuGroupLabel :class="ui?.groupLabel" :size="size" :ui="ui" :label="item.label" :icon="item.icon" />
        <STreeMenuGroup v-if="item.children" :class="ui?.group" :size="size">
          <STreeMenuRootOption
            v-for="child in item.children"
            :key="String(child.value)"
            :size="size"
            :ui="ui"
            :item="child"
          />
        </STreeMenuGroup>
      </template>
      <STreeMenuRootOption v-else :size="size" :ui="ui" :item="item" />
    </template>
  </STreeMenuRoot>
</template>
