<script setup lang="ts">
import { computed } from 'vue';
import {
  TreeMenuButton,
  TreeMenuCollapsible,
  TreeMenuItem,
  TreeMenuSub,
  useTreeMenuRootContext
} from '@soybeanjs/headless';
import type { Placement } from '@soybeanjs/headless';
import Link from '../link/link.vue';
import Tooltip from '../tooltip/tooltip.vue';
import DropdownMenu from '../dropdown-menu/dropdown-menu.vue';
import { useTreeMenuContext, useTreeMenuExtraThemeContext } from './context';
import STreeMenuOptionSlot from './tree-menu-option-slot.vue';
import { isChildActive } from './shared';
import type { TreeMenuBaseOptionData, TreeMenuItemEmits, TreeMenuOptionProps } from './types';

defineOptions({
  name: 'STreeMenuOption'
});

const props = defineProps<TreeMenuOptionProps>();

const emit = defineEmits<TreeMenuItemEmits>();

type Slots = {
  default: (props: { item: TreeMenuBaseOptionData }) => any;
  leading: (props: { item: TreeMenuBaseOptionData }) => any;
  trailing: (props: { item: TreeMenuBaseOptionData }) => any;
};

const slots = defineSlots<Slots>();

const { collapsed, modelValue, onModelValueChange } = useTreeMenuRootContext('TreeMenuOption');
const { size, side } = useTreeMenuContext('TreeMenuOption');
const ui = useTreeMenuExtraThemeContext('TreeMenuOption');

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);
const hasChildren = computed(() => Boolean(props.item.children?.length));

const childActive = computed(() => isChildActive(props.item, modelValue.value));

const isLink = computed(() => Boolean(props.item.to || props.item.href));

const linkProps = computed(() => {
  const { disabled, to, href, target, external } = props.item;

  return isLink.value
    ? {
        disabled,
        to,
        href,
        target,
        external
      }
    : {};
});

const showDropdown = computed(() => collapsed.value && hasChildren.value);

const tooltip = computed(() => (collapsed.value && !showDropdown.value ? props.item.label : undefined));

const reversedSide = computed<Placement>(() => (side.value === 'left' ? 'right' : 'left'));

const tooltipProps = computed(() => ({
  ...props.item.tooltipProps,
  placement: props.item.tooltipProps?.placement ?? reversedSide.value
}));

const dropdownMenuProps = computed(() => ({
  ...props.item.dropdownMenuProps,
  trigger: props.item.dropdownMenuProps?.trigger ?? 'hover',
  placement: props.item.dropdownMenuProps?.placement ?? reversedSide.value
}));

const onActive = () => {
  if (props.item.disabled) return;
  onModelValueChange(props.item.value);
};

const onDropdownMenuSelect = (item: TreeMenuBaseOptionData) => {
  if (props.item.disabled) return;
  onModelValueChange(item.value);
  emit('selectDropdown', item.value);
};
</script>

<template>
  <TreeMenuItem v-if="!hasChildren" :value="item.value" :disabled="item.disabled">
    <TreeMenuButton v-if="isLink" as-child>
      <Link v-slot="{ isHref }" v-bind="linkProps">
        <STreeMenuOptionSlot :item="item" :show-link-icon="isHref">
          <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
            <slot :name="slotKey" v-bind="slotProps" />
          </template>
        </STreeMenuOptionSlot>
      </Link>
    </TreeMenuButton>
    <TreeMenuButton v-else>
      <STreeMenuOptionSlot :item="item">
        <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </STreeMenuOptionSlot>
    </TreeMenuButton>
    <Tooltip v-if="tooltip" v-bind="tooltipProps" :size="size" :content="tooltip">
      <template #trigger>
        <component :is="isLink ? Link : 'div'" v-bind="linkProps" :class="ui.itemAbsolute" @click="onActive" />
      </template>
    </Tooltip>
  </TreeMenuItem>
  <TreeMenuItem v-else as-child :value="item.value" :disabled="item.disabled">
    <TreeMenuCollapsible as="li" :disabled-collapsible="collapsed">
      <template #trigger>
        <TreeMenuButton disabled-active :data-child-active="childActive">
          <STreeMenuOptionSlot :item="item">
            <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
              <slot :name="slotKey" v-bind="slotProps" />
            </template>
          </STreeMenuOptionSlot>
        </TreeMenuButton>
      </template>
      <TreeMenuSub>
        <STreeMenuOption v-for="child in item.children" :key="child.value" :item="child">
          <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
            <slot :name="slotKey" v-bind="slotProps" />
          </template>
        </STreeMenuOption>
      </TreeMenuSub>
      <template #extra>
        <DropdownMenu
          v-if="showDropdown"
          v-bind="dropdownMenuProps"
          :items="item.children ?? []"
          :disabled="item.disabled"
          :size="size"
          :data-menu="item.label"
          @select="onDropdownMenuSelect"
        >
          <template #trigger>
            <div :class="ui.itemAbsolute"></div>
          </template>
        </DropdownMenu>
      </template>
    </TreeMenuCollapsible>
  </TreeMenuItem>
</template>
