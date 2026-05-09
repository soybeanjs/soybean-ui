<script setup lang="ts" generic="T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { usePickProps } from '../../composables';
import { getTreePaths } from '../../shared';
import Icon from '../_icon/icon.vue';
import { useTreeMenuRootContext } from './context';
import { filterHiddenTreeMenuOptions } from './shared';
import TreeMenuOptionCompact from './tree-menu-option-compact.vue';
import TreeMenuGroup from './tree-menu-group.vue';
import TreeMenuGroupLabel from './tree-menu-group-label.vue';
import TreeMenuGroupRoot from './tree-menu-group-root.vue';
import type {
  TreeMenuBaseOptionData,
  TreeMenuOptionsCompactProps,
  TreeMenuOptionsCompactEmits,
  TreeMenuOptionData
} from './types';

defineOptions({
  name: 'TreeMenuCompactOptions'
});

const props = defineProps<TreeMenuOptionsCompactProps<T>>();

const emit = defineEmits<TreeMenuOptionsCompactEmits>();

type Slots = {
  'group-label': (props: { item: TreeMenuOptionData<T> }) => any;
  item: (props: { item: T }) => any;
  'item-leading': (props: { item: T }) => any;
  'item-trailing': (props: { item: T }) => any;
};

const slots = defineSlots<Slots>();

const optionSlotNames = computed(() => keysOf(slots).filter(slotName => slotName !== 'group-label'));

const forwardedOptionProps = usePickProps(props, [
  'itemProps',
  'buttonProps',
  'linkProps',
  'collapsibleProps',
  'subProps'
]);

const { modelValue } = useTreeMenuRootContext('TreeMenuCompactOptions');

const items = computed(() => filterHiddenTreeMenuOptions(props.items));

const activePaths = computed(() => getTreePaths(modelValue.value, items.value));
</script>

<template>
  <template v-for="item in items" :key="item.value">
    <TreeMenuGroupRoot v-if="item.isGroup" v-bind="groupRootProps">
      <TreeMenuGroupLabel v-bind="groupLabelProps">
        <slot name="group-label" :item="item">
          <Icon v-if="showGroupIcon && item.icon" :icon="item.icon" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </slot>
      </TreeMenuGroupLabel>
      <TreeMenuGroup v-bind="groupProps">
        <TreeMenuOptionCompact
          v-for="child in item.children"
          :key="child.value"
          v-bind="forwardedOptionProps"
          :item="child"
          :side="side"
          :active-paths="activePaths"
          @select-dropdown="emit('selectDropdown', $event)"
        >
          <template v-for="slotName in optionSlotNames" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
          </template>
        </TreeMenuOptionCompact>
      </TreeMenuGroup>
    </TreeMenuGroupRoot>
    <TreeMenuOptionCompact
      v-else
      as="div"
      v-bind="forwardedOptionProps"
      :item="item"
      :side="side"
      :active-paths="activePaths"
      @select-dropdown="emit('selectDropdown', $event)"
    >
      <template v-for="slotName in optionSlotNames" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps" />
      </template>
    </TreeMenuOptionCompact>
  </template>
</template>
