<script setup lang="ts">
import { computed, defineSlots, useAttrs } from 'vue';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import Tooltip from '../tooltip/tooltip.vue';
import DropdownMenu from '../dropdown-menu/dropdown-menu.vue';
import { useTreeMenuContext } from './context';
import TreeMenuItemImpl from './tree-menu-item-impl.vue';
import type { TreeMenuBaseOptionData, TreeMenuItemEmits, TreeMenuItemProps } from './types';

defineOptions({
  name: 'STreeMenuItem',
  inheritAttrs: false
});

const props = defineProps<TreeMenuItemProps>();

const emit = defineEmits<TreeMenuItemEmits>();

type Slots = {
  default: () => any;
  leading: () => any;
  trailing: () => any;
};

const slots = defineSlots<Slots>();

const slotsKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const listeners = useForwardListeners(emit);

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['tooltipProps', 'dropdownMenuProps'], attrs);

const { collapsed } = useTreeMenuContext('TreeMenuItem');

const hasChildren = computed(() => Boolean(props.children?.length));

const showDropdown = computed(() => collapsed.value && hasChildren.value);

const tooltip = computed(() => (collapsed.value && !showDropdown.value ? props.label : undefined));

const tooltipProps = computed(() => ({
  placement: 'right' as const,
  ...props.tooltipProps
}));

const dropdownMenuProps = computed(() => ({
  trigger: 'hover' as const,
  contentProps: {
    placement: 'right' as const
  },
  ...props.dropdownMenuProps
}));

const onDropdownMenuSelect = (item: TreeMenuBaseOptionData) => {
  emit('selectDropdown', item.value);
};
</script>

<template>
  <DropdownMenu
    v-if="showDropdown"
    v-bind="dropdownMenuProps"
    :items="children ?? []"
    :disabled="disabled"
    @select="onDropdownMenuSelect"
  >
    <template #trigger>
      <TreeMenuItemImpl v-bind="forwardedProps" disabled-toggle v-on="listeners">
        <template v-for="slotKey in slotsKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" />
        </template>
      </TreeMenuItemImpl>
    </template>
  </DropdownMenu>
  <Tooltip v-else-if="tooltip" v-bind="tooltipProps" :content="tooltip">
    <template #trigger>
      <TreeMenuItemImpl v-bind="forwardedProps" v-on="listeners">
        <template v-for="slotKey in slotsKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" />
        </template>
      </TreeMenuItemImpl>
    </template>
  </Tooltip>
  <TreeMenuItemImpl v-else v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotKey in slotsKeys" :key="slotKey" #[slotKey]>
      <slot :name="slotKey" />
    </template>
  </TreeMenuItemImpl>
</template>
