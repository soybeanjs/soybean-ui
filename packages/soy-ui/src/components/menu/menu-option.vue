<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { MenuGroup, MenuPortal, MenuSub, useEmitAsProps } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import SMenuLabel from './menu-label.vue';
import SMenuSeparator from './menu-separator.vue';
import SMenuItem from './menu-item.vue';
import SMenuItemLink from './menu-item-link.vue';
import SMenuItemLinkIcon from './menu-item-link-icon.vue';
import SMenuShortcut from './menu-shortcut.vue';
import SMenuSubTrigger from './menu-sub-trigger.vue';
import SMenuSubContent from './menu-sub-content.vue';
import type { MenuOptionData, MenuOptionEmits, MenuOptionProps } from './types';

defineOptions({
  name: 'SMenuOption'
});

defineProps<MenuOptionProps<T>>();

const emit = defineEmits<MenuOptionEmits<T>>();

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
</script>

<template>
  <SMenuLabel v-if="item.isGroupLabel" :class="ui?.label" :size="size">
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
    :class="ui?.itemLink"
    :size="size"
    :disabled="item.disabled"
    :text-value="item.textValue || item.label"
    @select="emit('select', $event, item)"
  >
    <slot name="item" v-bind="item">
      <slot name="item-leading" v-bind="item">
        <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
      </slot>
      <span>{{ item.label }}</span>
      <SMenuItemLinkIcon :class="ui?.itemLinkIcon" :size="size" />
      <slot name="item-trailing" v-bind="item" />
    </slot>
  </SMenuItemLink>
  <SMenuItem
    v-else-if="!item.children"
    :class="ui?.item"
    :size="size"
    :disabled="item.disabled"
    :text-value="item.textValue || item.label"
    @select="emit('select', $event, item)"
  >
    <slot name="item" v-bind="item">
      <slot name="item-leading" v-bind="item">
        <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
      </slot>
      <span>{{ item.label }}</span>
      <slot name="item-trailing" v-bind="item" />
      <SMenuShortcut v-if="item.shortcut" :class="ui?.shortcut" :value="item.shortcut" :size="size" />
    </slot>
  </SMenuItem>
  <MenuSub
    v-else
    :default-open="item.defaultOpen"
    :open="item.open"
    @update:open="emit('update:subOpen', $event, item)"
  >
    <SMenuSubTrigger
      :class="ui?.subTrigger"
      :size="size"
      :icon-class="ui?.subTriggerIcon"
      :disabled="item.disabled"
      :text-value="item.textValue || item.label"
    >
      <slot name="item-trigger" v-bind="item">
        <slot name="item-leading" v-bind="item">
          <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
        </slot>
        <span>{{ item.label }}</span>
        <slot name="item-trailing" v-bind="item" />
      </slot>
      <template #icon>
        <slot name="sub-trigger-icon" v-bind="item" />
      </template>
    </SMenuSubTrigger>
    <SMenuSeparator v-if="separator || item.separator" :class="ui?.separator" />
    <MenuPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SMenuSubContent
        v-bind="subContentProps"
        :class="ui?.subContent"
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
            <SMenuOption
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
            />
          </slot>
        </MenuGroup>
      </SMenuSubContent>
    </MenuPortal>
  </MenuSub>
  <SMenuSeparator v-if="(separator || item.separator) && !item.children" :class="ui?.separator" />
</template>
