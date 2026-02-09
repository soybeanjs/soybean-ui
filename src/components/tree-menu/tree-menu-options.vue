<script setup lang="ts" generic="T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData">
import { TreeMenuGroup, TreeMenuGroupLabel, TreeMenuGroupRoot, useTreeMenuRootContext } from '@soybeanjs/headless';
import { usePickProps } from '@soybeanjs/headless/composables';
import { getTreePaths } from '@soybeanjs/headless/shared';
import Icon from '../icon/icon.vue';
import TreeMenuOption from './tree-menu-option.vue';
import { provideTreeMenuOptionsContext } from './context';
import { filterHiddenMenus } from './shared';
import type { TreeMenuBaseOptionData, TreeMenuOptionsProps, TreeMenuOptionsEmits } from './types';

defineOptions({
  name: 'STreeMenuOptions'
});

const props = defineProps<TreeMenuOptionsProps<T>>();

const emit = defineEmits<TreeMenuOptionsEmits>();

type Slots = {
  'group-label': (props: { item: T }) => any;
  item: (props: { item: T }) => any;
  'item-leading': (props: { item: T }) => any;
  'item-trailing': (props: { item: T }) => any;
};

const slots = defineSlots<Slots>();

type SlotKey = keyof Slots;

const slotMap = {
  item: 'default',
  'item-leading': 'leading',
  'item-trailing': 'trailing'
} as Record<SlotKey, string>;

const slotKeys = computed(() => {
  const keys = Object.keys(slots).filter(key => key.startsWith('item')) as (keyof Slots)[];

  return keys.map(key => ({
    key,
    map: slotMap[key]
  }));
});

const forwardedOptionProps = usePickProps(props, [
  'itemProps',
  'buttonProps',
  'linkProps',
  'collapsibleProps',
  'subProps'
]);

const { modelValue } = useTreeMenuRootContext('TreeMenuOptions');

const items = computed(() => filterHiddenMenus(props.items));
const activePaths = computed(() => getTreePaths(modelValue.value, items.value));

provideTreeMenuOptionsContext({
  activePaths
});
</script>

<template>
  <template v-for="item in items" :key="item.value">
    <TreeMenuGroupRoot v-if="item.isGroup" v-bind="groupRootProps">
      <TreeMenuGroupLabel v-bind="groupLabelProps">
        <slot name="group-label" :item="item">
          <Icon v-if="showGroupIcon" :icon="item.icon" />
          <span>{{ item.label }}</span>
        </slot>
      </TreeMenuGroupLabel>
      <TreeMenuGroup v-bind="groupProps">
        <TreeMenuOption
          v-for="child in item.children"
          :key="child.value"
          v-bind="forwardedOptionProps"
          :item="child"
          @select-dropdown="emit('selectDropdown', $event)"
        >
          <template v-for="slot in slotKeys" :key="slot.key" #[slot.map]="slotProps">
            <slot :name="slot.key" v-bind="slotProps" />
          </template>
        </TreeMenuOption>
      </TreeMenuGroup>
    </TreeMenuGroupRoot>
    <TreeMenuOption
      v-else
      as="div"
      v-bind="forwardedOptionProps"
      :item="item"
      @select-dropdown="emit('selectDropdown', $event)"
    >
      <template v-for="slot in slotKeys" :key="slot.key" #[slot.map]="slotProps">
        <slot :name="slot.key" v-bind="slotProps" />
      </template>
    </TreeMenuOption>
  </template>
</template>
