<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import Icon from '../_icon/icon.vue';
import Button from '../button/button.vue';
import DropdownMenuCompact from '../dropdown-menu/dropdown-menu-compact.vue';
import Link from '../link/link.vue';
import type { MenuOptionCompactSlots, MenuOptionData } from '../menu';
import { RovingFocusItem } from '../roving-focus';
import {
  buildTreeNavLinkProps,
  createTreeNavBranchPopupBind,
  createTreeNavPopupSelectHandler,
  hasChildren,
  isLinkItem
} from './shared';
import { useTreeNavRootContext, useTreeNavUi } from './context';
import type { TreeNavOptionCompactProps } from './types';

defineOptions({
  name: 'TreeNavOptionCompact'
});

const props = defineProps<TreeNavOptionCompactProps>();

const slots = defineSlots<MenuOptionCompactSlots>();

const ui = useTreeNavUi();

const rootCtx = useTreeNavRootContext('TreeNavOptionCompact');

const { selected, onSelect, disabled, linkProps } = rootCtx;

// Shape ----------------------------------------------------------------------

const isDisabled = computed(() => disabled.value || Boolean(props.item.disabled));

const isSelected = computed(() => selected.value === props.item.value);

const hasChildSelected = computed(() =>
  !isLinkItem(props.item) && hasChildren(props.item) && props.childSelected ? '' : undefined
);

const linkBind = computed(() => buildTreeNavLinkProps(props.item, linkProps.value, isDisabled.value));

const branchPopupBind = createTreeNavBranchPopupBind(rootCtx);

// Pinned to `MenuOptionData<string>` so the generic dropdown compact resolves
// its `T` to string instead of falling back to `DefinedValue`.
const branchItems = computed<MenuOptionData<string>[]>(() => props.item.children ?? []);

const slotNames = computed(() => keysOf(slots));

function handleSelect(event: Event) {
  if (isDisabled.value) return;

  onSelect(props.item, event);
}

// Popup select events arrive as widened `MenuOptionData`; adapt them back.
const handlePopupSelect = createTreeNavPopupSelectHandler(onSelect);
</script>

<template>
  <!-- A. Top-level link leaf -->
  <RovingFocusItem v-if="isLinkItem(item)" as-child :tab-stop-id="item.value" :focusable="!isDisabled">
    <Link
      v-slot="{ isHref }"
      v-bind="linkBind"
      :class="ui.item"
      :data-selected="isSelected"
      @click="handleSelect($event)"
    >
      <slot name="item" :item="item">
        <slot name="item-leading" :item="item">
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
        </slot>
        <span>{{ item.label }}</span>
        <slot v-if="isHref" name="item-link-icon" :item="item">
          <Icon icon="lucide:arrow-up-right" :class="ui.itemLinkIcon" />
        </slot>
        <slot name="item-trailing" :item="item" />
      </slot>
    </Link>
  </RovingFocusItem>

  <!-- B. Top-level branch with a DropdownMenu popup -->
  <DropdownMenuCompact
    v-else-if="hasChildren(item)"
    v-bind="branchPopupBind"
    :items="branchItems"
    :disabled="isDisabled"
    @select="handlePopupSelect"
  >
    <template #trigger>
      <RovingFocusItem as-child :tab-stop-id="item.value" :focusable="!isDisabled">
        <Button :class="ui.item" :data-selected="false" :data-child-selected="hasChildSelected" :disabled="isDisabled">
          <slot name="item" :item="item">
            <slot name="item-leading" :item="item">
              <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
            </slot>
            <span>{{ item.label }}</span>
            <slot name="item-trigger-icon" :item="item">
              <Icon icon="lucide:chevron-down" :class="ui.itemChevron" />
            </slot>
            <slot name="item-trailing" :item="item" />
          </slot>
        </Button>
      </RovingFocusItem>
    </template>
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </DropdownMenuCompact>

  <!-- C. Top-level plain leaf -->
  <RovingFocusItem v-else as-child :tab-stop-id="item.value" :focusable="!isDisabled">
    <Button :class="ui.item" :data-selected="isSelected" :disabled="isDisabled" @click="handleSelect($event)">
      <slot name="item" :item="item">
        <slot name="item-leading" :item="item">
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
        </slot>
        <span>{{ item.label }}</span>
        <slot name="item-trailing" :item="item" />
      </slot>
    </Button>
  </RovingFocusItem>
</template>
