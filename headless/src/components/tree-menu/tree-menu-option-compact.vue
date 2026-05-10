<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { useOmitProps } from '../../composables';
import type { Placement } from '../../types';
import Link from '../link/link.vue';
import DropdownMenuCompact from '../dropdown-menu/dropdown-menu-compact.vue';
import TooltipCompact from '../tooltip/tooltip-compact.vue';
import { useTreeMenuRootContext, useTreeMenuUi } from './context';
import TreeMenuButton from './tree-menu-button.vue';
import TreeMenuCollapsible from './tree-menu-collapsible.vue';
import TreeMenuSlotCompact from './tree-menu-slot-compact.vue';
import TreeMenuItem from './tree-menu-item.vue';
import TreeMenuSub from './tree-menu-sub.vue';
import type { TreeMenuOptionCompactProps, TreeMenuOptionCompactEmits, TreeMenuBaseOptionData } from './types';

defineOptions({
  name: 'TreeMenuOptionCompact'
});

const props = withDefaults(defineProps<TreeMenuOptionCompactProps>(), {
  as: 'li'
});

const emit = defineEmits<TreeMenuOptionCompactEmits>();

type Slots = {
  item: (props: { item: TreeMenuBaseOptionData }) => any;
  leading: (props: { item: TreeMenuBaseOptionData }) => any;
  trailing: (props: { item: TreeMenuBaseOptionData }) => any;
};

const slots = defineSlots<Slots>();

const forwardedOptionProps = useOmitProps(props, ['as', 'item']);

const slotNames = computed(() => keysOf(slots));

const ui = useTreeMenuUi();

const { collapsed, modelValue, onModelValueChange } = useTreeMenuRootContext('TreeMenuCompactOption');

const children = computed(() => props.item.children ?? []);

const hasChildren = computed(() => Boolean(children.value.length));

const childActive = computed(() => {
  if (modelValue.value === props.item.value) {
    return false;
  }

  return Boolean(props.activePaths?.includes(props.item.value));
});

const isLink = computed(() => Boolean(props.item.to || props.item.href));

const linkProps = computed(() => {
  if (!isLink.value) {
    return {};
  }

  const { disabled, to, href, target, external } = props.item;

  return {
    ...props.linkProps,
    disabled,
    to,
    href,
    target,
    external
  };
});

const showDropdown = computed(() => collapsed.value && hasChildren.value);

const tooltip = computed(() => (collapsed.value && !showDropdown.value ? props.item.label : undefined));

const reversedSide = computed<Placement>(() => (props.side === 'left' ? 'right' : 'left'));

const tooltipProps = computed(() => ({
  ...props.item.tooltipProps,
  placement: props.item.tooltipProps?.placement ?? reversedSide.value
}));

const dropdownMenuProps = computed(() => ({
  ...props.item.dropdownMenuProps,
  placement: props.item.dropdownMenuProps?.placement ?? reversedSide.value,
  trigger: props.item.dropdownMenuProps?.trigger ?? 'hover'
}));

const handleActive = () => {
  if (props.item.disabled) return;

  onModelValueChange(props.item.value);
};

const handleDropdownMenuSelect = (item: TreeMenuBaseOptionData) => {
  if (props.item.disabled) return;

  onModelValueChange(item.value);
  emit('selectDropdown', item.value);
};
</script>

<template>
  <TreeMenuItem v-if="!hasChildren" v-bind="itemProps" :as="as" :value="item.value" :disabled="item.disabled">
    <TreeMenuButton v-if="isLink" v-bind="buttonProps" as-child>
      <Link v-slot="{ isHref }" v-bind="linkProps">
        <TreeMenuSlotCompact data-soybean-tree-menu-slot-compact :item="item" :show-link-icon="isHref">
          <template v-for="slotName in slotNames" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
          </template>
        </TreeMenuSlotCompact>
      </Link>
    </TreeMenuButton>
    <TreeMenuButton v-else v-bind="buttonProps">
      <TreeMenuSlotCompact data-soybean-tree-menu-slot-compact :item="item">
        <template v-for="slotName in slotNames" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </TreeMenuSlotCompact>
    </TreeMenuButton>
    <TooltipCompact data-soybean-tooltip-compact v-if="tooltip" v-bind="tooltipProps" :content="tooltip">
      <template #trigger>
        <Link v-if="isLink" v-bind="linkProps" :class="ui.itemAbsolute" @click="handleActive" />
        <div v-else :class="ui.itemAbsolute" @click="handleActive" />
      </template>
    </TooltipCompact>
  </TreeMenuItem>
  <TreeMenuItem v-else v-bind="itemProps" as-child :value="item.value" :disabled="item.disabled">
    <TreeMenuCollapsible v-bind="collapsibleProps" :as="as" :disabled-collapsible="collapsed">
      <template #trigger>
        <TreeMenuButton v-bind="buttonProps" disabled-active :data-child-active="childActive ? '' : undefined">
          <TreeMenuSlotCompact data-soybean-tree-menu-slot-compact :item="item">
            <template v-for="slotName in slotNames" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps" />
            </template>
          </TreeMenuSlotCompact>
        </TreeMenuButton>
      </template>
      <TreeMenuSub v-bind="subProps">
        <TreeMenuOptionCompact
          v-for="child in children"
          :key="child.value"
          v-bind="forwardedOptionProps"
          :item="child"
          :side="side"
          :active-paths="activePaths"
          @select-dropdown="emit('selectDropdown', $event)"
        >
          <template v-for="slotName in slotNames" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
          </template>
        </TreeMenuOptionCompact>
      </TreeMenuSub>
      <template #extra>
        <DropdownMenuCompact data-soybean-dropdown-menu-compact
          v-if="showDropdown"
          v-bind="dropdownMenuProps"
          :items="children"
          :disabled="item.disabled"
          :active-value="modelValue"
          :data-menu="item.label"
          @select="handleDropdownMenuSelect"
        >
          <template #trigger>
            <div :class="ui.itemAbsolute" />
          </template>
        </DropdownMenuCompact>
      </template>
    </TreeMenuCollapsible>
  </TreeMenuItem>
</template>
