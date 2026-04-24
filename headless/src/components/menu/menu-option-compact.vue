<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { useForwardListeners, useOmitProps } from '../../composables';
import type { DefinedValue } from '../../types';
import Icon from '../_icon/icon.vue';
import Kbd from '../kbd/kbd.vue';
import Link from '../link/link.vue';
import MenuSeparator from '../separator/separator-root.vue';
import { useMenuOptionsCompactContext, useMenuUi } from './context';
import { useCommonSlotNames } from './hooks';
import MenuGroup from './menu-group.vue';
import MenuGroupLabel from './menu-group-label.vue';
import MenuItem from './menu-item.vue';
import MenuItemSlotCompact from './menu-item-slot-compact.vue';
import MenuPortal from '../portal/portal.vue';
import MenuSub from './menu-sub.vue';
import MenuSubContent from './menu-sub-content.vue';
import MenuSubTrigger from './menu-sub-trigger.vue';
import type { MenuOptionCompactProps, MenuOptionCompactEmits, MenuOptionCompactSlots } from './types';

defineOptions({
  name: 'MenuOptionCompact',
  inheritAttrs: false
});

const props = defineProps<MenuOptionCompactProps<T>>();

const emit = defineEmits<MenuOptionCompactEmits<T>>();

const forwardedListeners = useForwardListeners(emit);

const slots = defineSlots<MenuOptionCompactSlots<T>>();

const forwardedItemProps = useOmitProps(props, ['item']);

const slotNames = computed(() => keysOf(slots));

const commonSlotNames = useCommonSlotNames(slots);

const ui = useMenuUi();

const { activeValue, activePaths } = useMenuOptionsCompactContext('MenuOptionCompact');

const dataActive = computed(() => activeValue.value === props.item.value);

const childActive = computed(() => activePaths.value.includes(props.item.value));
</script>

<template>
  <MenuGroupLabel v-if="item.isGroupLabel" v-bind="groupLabelProps">
    <MenuItemSlotCompact :icon="item.icon" :label="item.label">
      <template v-for="slotName in commonSlotNames">
        <slot :name="slotName" :item="item" />
      </template>
    </MenuItemSlotCompact>
  </MenuGroupLabel>
  <MenuItem
    v-else-if="item.to || item.href"
    v-bind="itemProps"
    as-child
    :disabled="item.disabled"
    :text-value="item.textValue"
    :data-active="dataActive"
    @select="emit('select', item, $event)"
  >
    <Link
      v-slot="{ isHref }"
      v-bind="linkProps"
      :disabled="item.disabled"
      :to="item.to"
      :href="item.href"
      :target="item.target"
      :external="item.external"
    >
      <MenuItemSlotCompact :icon="item.icon" :label="item.label">
        <template v-for="slotName in commonSlotNames">
          <slot :name="slotName" :item="item" />
        </template>
        <template v-if="isHref" #link-icon>
          <slot name="item-link-icon" :item="item">
            <Icon icon="lucide:arrow-up-right" :class="ui.itemLinkIcon" />
          </slot>
        </template>
      </MenuItemSlotCompact>
    </Link>
  </MenuItem>
  <MenuItem
    v-else-if="!item.children?.length"
    v-bind="itemProps"
    :disabled="item.disabled"
    :text-value="item.textValue"
    :data-active="dataActive"
    @select="emit('select', item, $event)"
  >
    <MenuItemSlotCompact :icon="item.icon" :label="item.label">
      <template v-for="slotName in commonSlotNames">
        <slot :name="slotName" :item="item" />
      </template>
      <template #shortcut>
        <Kbd v-if="item.shortcut" v-bind="shortcutProps" :value="item.shortcut" :class="ui.shortcut" />
      </template>
    </MenuItemSlotCompact>
  </MenuItem>
  <MenuSub v-else v-bind="subProps" @update:open="emit('update:open', $event)">
    <MenuSubTrigger
      v-bind="subTriggerProps"
      :disabled="item.disabled"
      :text-value="item.textValue"
      :data-child-active="childActive ? '' : undefined"
    >
      <MenuItemSlotCompact :icon="item.icon" :label="item.label">
        <template v-for="slotName in commonSlotNames">
          <slot :name="slotName" :item="item" />
        </template>
        <template #trigger-icon>
          <slot name="item-trigger-icon" :item="item">
            <Icon icon="lucide:chevron-right" :class="ui.subTriggerIcon" />
          </slot>
        </template>
      </MenuItemSlotCompact>
    </MenuSubTrigger>
    <MenuSeparator v-if="item.separator" v-bind="separatorProps" />
    <MenuPortal v-bind="portalProps">
      <MenuSubContent v-bind="subContentProps" v-on="forwardedListeners">
        <MenuGroup v-bind="groupProps">
          <MenuOptionCompact
            v-for="child in item.children"
            :key="child.value"
            v-bind="forwardedItemProps"
            :item="child"
            v-on="forwardedListeners"
          >
            <template v-for="slotName in slotNames" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps" />
            </template>
          </MenuOptionCompact>
        </MenuGroup>
      </MenuSubContent>
    </MenuPortal>
  </MenuSub>
  <MenuSeparator v-if="item.separator && !item.children?.length" v-bind="separatorProps" />
</template>
