<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed, shallowRef } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { getTreePaths } from '../../shared';
import type { DefinedValue } from '../../types';
import Icon from '../_icon/icon.vue';
import Button from '../button/button.vue';
import DropdownMenuCompact from '../dropdown-menu/dropdown-menu-compact.vue';
import Link from '../link/link.vue';
import type { MenuOptionData } from '../menu';
import { Primitive } from '../primitive/primitive';
import { useTreeNavUi } from './context';
import type { TreeNavCompactEmits, TreeNavCompactSlots, TreeNavTopProps } from './types';

defineOptions({
  name: 'TreeNavTop'
});

const props = defineProps<TreeNavTopProps<T>>();

const emit = defineEmits<TreeNavCompactEmits<T>>();

const slots = defineSlots<TreeNavCompactSlots<T>>();

const ui = useTreeNavUi();

// Selection ------------------------------------------------------------------

const innerValue = shallowRef<T | undefined>(props.defaultValue);

const isControlled = computed(() => props.modelValue !== undefined);

const selected = computed<T | undefined>(() => (isControlled.value ? props.modelValue : innerValue.value));

const setSelection = (value: T) => {
  if (!isControlled.value) innerValue.value = value;
  emit('update:modelValue', value);
};

// Highlight derivation -------------------------------------------------------

const activePaths = computed<T[]>(() =>
  selected.value === undefined ? [] : getTreePaths(selected.value, props.items)
);

/**
 * Branch triggers never carry `data-active` even in the edge case where their
 * value matches the selection (container nodes disable active, aligned with
 * TreeMenu); leaves always expose a constant `"true"`/`"false"` string.
 */
const markActive = (item: MenuOptionData<T>) => (selected.value === item.value ? 'true' : 'false');

const isChildActive = (item: MenuOptionData<T>) => activePaths.value.includes(item.value);

const markChildActive = (item: MenuOptionData<T>) => (isChildActive(item) ? '' : undefined);

// Items ----------------------------------------------------------------------

const resolveDisabled = (item: MenuOptionData<T>) => Boolean(props.disabled || item.disabled);

const hasChildren = (item: MenuOptionData<T>) => Boolean(item.children?.length);

const isLinkItem = (item: MenuOptionData<T>) => Boolean(item.to || item.href);

const resolveLinkProps = (item: MenuOptionData<T>) => ({
  ...props.linkProps,
  disabled: resolveDisabled(item) || props.linkProps?.disabled,
  to: item.to,
  href: item.href,
  target: item.target,
  external: item.external
});

const handleSelect = (item: MenuOptionData<T>, event: Event) => {
  if (resolveDisabled(item)) return;

  setSelection(item.value);
  emit('select', item, event);
};

// Popup config ---------------------------------------------------------------

const branchPopupProps = computed(() => ({
  dir: props.dir,
  trigger: props.trigger ?? 'hover',
  delayDuration: props.delayDuration,
  skipDelayDuration: props.skipDelayDuration,
  placement: props.placement,
  showArrow: props.showArrow,
  portalProps: props.portalProps,
  popupProps: props.popupProps,
  arrowProps: props.arrowProps
}));

const popupOptionsProps = computed(() => ({
  activeValue: selected.value,
  itemProps: props.itemProps,
  linkProps: props.linkProps,
  groupLabelProps: props.groupLabelProps,
  shortcutProps: props.shortcutProps,
  separatorProps: props.separatorProps,
  subTriggerProps: props.subTriggerProps,
  subContentProps: props.subContentProps,
  portalProps: props.portalProps
}));

// More trigger ---------------------------------------------------------------

const moreEntry = computed(() => ({
  label: props.moreLabel ?? 'More',
  icon: props.moreIcon ?? 'lucide:ellipsis'
}));

const moreTriggerProps = computed(() => ({
  ...props.moreProps,
  disabled: props.disabled || props.moreProps?.disabled
}));

const moreItemsCount = computed(() => props.moreItems?.length ?? 0);

const moreList = computed(() => props.moreItems ?? []);

// Slots ----------------------------------------------------------------------

const optionSlotNames = computed(() => keysOf(slots).filter(key => key !== 'more-trigger'));
</script>

<template>
  <Primitive :as="as" :as-child="asChild" data-soybean-tree-nav :class="ui.root">
    <template v-for="item in items" :key="item.value">
      <!-- A. Top-level link leaf -->
      <Link
        v-if="isLinkItem(item)"
        v-slot="{ isHref }"
        v-bind="resolveLinkProps(item)"
        :class="ui.item"
        :data-active="markActive(item)"
        @click="handleSelect(item, $event)"
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

      <!-- B. Top-level branch with a DropdownMenu popup -->
      <DropdownMenuCompact
        v-else-if="hasChildren(item)"
        v-bind="{ ...branchPopupProps, ...popupOptionsProps }"
        :items="item.children ?? []"
        :disabled="resolveDisabled(item)"
        @select="handleSelect"
      >
        <template #trigger>
          <Button
            :class="ui.item"
            data-active="false"
            :data-child-active="markChildActive(item)"
            :disabled="resolveDisabled(item)"
          >
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
        </template>
        <template v-for="slotName in optionSlotNames" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </DropdownMenuCompact>

      <!-- C. Top-level plain leaf -->
      <Button
        v-else
        :class="ui.item"
        :data-active="markActive(item)"
        :data-child-active="undefined"
        :disabled="resolveDisabled(item)"
        @click="handleSelect(item, $event)"
      >
        <slot name="item" :item="item">
          <slot name="item-leading" :item="item">
            <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
          </slot>
          <span>{{ item.label }}</span>
          <slot name="item-trailing" :item="item" />
        </slot>
      </Button>
    </template>

    <!-- D. Trailing "more" branch for collapsed overflow items -->
    <DropdownMenuCompact
      v-if="moreItemsCount > 0"
      v-bind="{ ...branchPopupProps, ...popupOptionsProps }"
      :items="moreList"
      :disabled="disabled"
      @select="handleSelect"
    >
      <template #trigger>
        <slot name="more-trigger" :label="moreEntry.label" :icon="moreEntry.icon">
          <Button v-bind="moreTriggerProps" :class="ui.item" data-active="false">
            <Icon v-if="moreEntry.icon" :icon="moreEntry.icon" :class="ui.itemIcon" />
            <span v-if="moreEntry.label">{{ moreEntry.label }}</span>
          </Button>
        </slot>
      </template>
      <template v-for="slotName in optionSlotNames" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps" />
      </template>
    </DropdownMenuCompact>
  </Primitive>
</template>
