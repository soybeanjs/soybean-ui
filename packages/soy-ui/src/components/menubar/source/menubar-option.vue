<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { MenuGroup, MenuPortal, MenuSub, useEmitAsProps } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import SMenuLabel from '../../menu/source/menu-label.vue';
import SMenuSeparator from '../../menu/source/menu-separator.vue';
import SMenuItem from '../../menu/source/menu-item.vue';
import SMenuItemLink from '../../menu/source/menu-item-link.vue';
import type { MenuOptionData } from '../../menu/types';
import type { MenubarOptionEmits, MenubarOptionProps } from '../types';
import SMenubarSubTrigger from './menubar-sub-trigger.vue';
import SMenubarSubContent from './menubar-sub-content.vue';

defineOptions({
  name: 'SMenubarOption'
});

defineProps<MenubarOptionProps<T>>();

const emit = defineEmits<MenubarOptionEmits<T>>();

type Slots = {
  item: (props: MenuOptionData<T>) => any;
  'item-leading': (props: MenuOptionData<T>) => any;
  'item-trailing': (props: MenuOptionData<T>) => any;
  'item-trigger': (props: MenuOptionData<T>) => any;
  'sub-trigger-icon': (props: MenuOptionData<T>) => any;
  children: (props: MenuOptionData<T>) => any;
};

defineSlots<Slots>();

const forwardedEmits = useEmitAsProps(emit);

const itemSlotMap = {
  leading: 'item-leading',
  default: 'item',
  trailing: 'item-trailing'
} satisfies Record<string, keyof Slots>;
</script>

<template>
  <SMenuLabel v-if="item.isGroupLabel" :size="size" :ui="ui" :label="item.label" :icon="item.icon">
    <slot name="item" v-bind="item">
      <slot name="item-leading" v-bind="item">
        <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
      </slot>
      <span>{{ item.label }}</span>
      <slot name="item-trailing" v-bind="item" />
    </slot>
  </SMenuLabel>
  <SMenuItemLink
    v-else-if="item.linkProps"
    v-bind="item.linkProps"
    :size="size"
    :ui="ui"
    :label="item.label"
    :icon="item.icon"
    :disabled="item.disabled"
    :text-value="item.textValue || item.label"
    @select="emit('select', $event, item)"
  >
    <template v-for="(slotKey, slotName) in itemSlotMap" :key="slotKey" #[slotName]>
      <slot :name="slotKey" v-bind="item" />
    </template>
  </SMenuItemLink>
  <SMenuItem
    v-else-if="!item.children"
    :size="size"
    :ui="ui"
    :label="item.label"
    :icon="item.icon"
    :shortcut="item.shortcut"
    :disabled="item.disabled"
    :text-value="item.textValue || item.label"
    @select="emit('select', $event, item)"
  >
    <template v-for="(slotKey, slotName) in itemSlotMap" :key="slotKey" #[slotName]>
      <slot :name="slotKey" v-bind="item" />
    </template>
  </SMenuItem>
  <MenuSub
    v-else
    :default-open="item.defaultOpen"
    :open="item.open"
    @update:open="emit('update:subOpen', $event, item)"
  >
    <SMenubarSubTrigger
      :ui="ui"
      :size="size"
      :label="item.label"
      :icon="item.icon"
      :disabled="item.disabled"
      :text-value="item.textValue || item.label"
    >
      <template #leading>
        <slot name="item-leading" v-bind="item" />
      </template>
      <template #default>
        <slot name="item-trigger" v-bind="item" />
      </template>
      <template #trailing>
        <slot name="item-trailing" v-bind="item" />
      </template>
      <template #icon>
        <slot name="sub-trigger-icon" v-bind="item" />
      </template>
    </SMenubarSubTrigger>
    <SMenuSeparator v-if="separator || item.separator" :class="ui?.separator" :size="size" />
    <MenuPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SMenubarSubContent
        v-bind="subContentProps"
        :class="ui?.subContent"
        :size="size"
        @close-auto-focus="emit('closeAutoFocusSub', $event, item)"
        @entry-focus="emit('entryFocusSub', $event, item)"
        @escape-key-down="emit('escapeKeyDownSub', $event, item)"
        @focus-outside="emit('focusOutsideSub', $event, item)"
        @interact-outside="emit('interactOutsideSub', $event, item)"
        @open-auto-focus="emit('openAutoFocusSub', $event, item)"
        @pointer-down-outside="emit('pointerDownOutsideSub', $event, item)"
      >
        <MenuGroup :class="ui?.group">
          <slot name="children" v-bind="item">
            <SMenubarOption
              v-for="child in item.children"
              v-bind="forwardedEmits"
              :key="String(child.value)"
              :ui="ui"
              :item="child"
              :to="to"
              :size="size"
              :separator="separator"
              :disabled-portal="disabledPortal"
              :force-mount-portal="forceMountPortal"
              :sub-content-props="subContentProps"
            />
          </slot>
        </MenuGroup>
      </SMenubarSubContent>
    </MenuPortal>
  </MenuSub>
  <SMenuSeparator v-if="(separator || item.separator) && !item.children" :class="ui?.separator" :size="size" />
</template>
