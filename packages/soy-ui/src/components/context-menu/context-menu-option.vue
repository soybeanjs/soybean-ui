<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { ContextMenuGroup, ContextMenuPortal, ContextMenuSub, useEmitAsProps } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import SContextMenuLabel from '../menu/menu-label.vue';
import SContextMenuSeparator from '../menu/menu-separator.vue';
import SContextMenuItem from '../menu/menu-item.vue';
import SContextMenuItemLink from '../menu/menu-item-link.vue';
import SContextMenuItemLinkIcon from '../menu/menu-item-link-icon.vue';
import SContextMenuShortcut from '../menu/menu-shortcut.vue';
import SContextMenuSubTrigger from '../menu/menu-sub-trigger.vue';
import SContextMenuSubContent from './context-menu-sub-content.vue';
import type { ContextMenuOptionEmits, ContextMenuOptionProps } from './types';

defineOptions({
  name: 'SContextMenuOption'
});

defineProps<ContextMenuOptionProps<T>>();

const emit = defineEmits<ContextMenuOptionEmits<T>>();

const forwardedEmits = useEmitAsProps(emit);
</script>

<template>
  <SContextMenuLabel v-if="item.isGroupLabel" :class="ui?.label" :size="size">
    <slot name="item" v-bind="item">
      <slot name="item-leading" v-bind="item">
        <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
      </slot>
      <span>{{ item.label }}</span>
      <slot name="item-trailing" v-bind="item" />
    </slot>
  </SContextMenuLabel>
  <SContextMenuItemLink
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
      <SContextMenuItemLinkIcon :class="ui?.itemLinkIcon" :size="size" />
      <slot name="item-trailing" v-bind="item" />
    </slot>
  </SContextMenuItemLink>
  <SContextMenuItem
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
      <SContextMenuShortcut v-if="item.shortcut" :class="ui?.shortcut" :value="item.shortcut" :size="size" />
    </slot>
  </SContextMenuItem>
  <ContextMenuSub
    v-else
    :default-open="item.defaultOpen"
    :open="item.open"
    @update:open="emit('update:subOpen', $event, item)"
  >
    <SContextMenuSubTrigger
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
    </SContextMenuSubTrigger>
    <SContextMenuSeparator v-if="separator || item.separator" :class="ui?.separator" />
    <ContextMenuPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SContextMenuSubContent
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
        <ContextMenuGroup :class="ui?.group">
          <slot name="children" v-bind="item">
            <SContextMenuOption
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
        </ContextMenuGroup>
      </SContextMenuSubContent>
    </ContextMenuPortal>
  </ContextMenuSub>
  <SContextMenuSeparator v-if="(separator || item.separator) && !item.children" :class="ui?.separator" />
</template>
