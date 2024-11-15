<script setup lang="ts" generic="T extends DropdownMenuItemOption = DropdownMenuItemOption">
import { DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, useEmitAsProps } from 'reka-ui';
import SDropdownMenuLabel from './dropdown-menu-label.vue';
import SDropdownMenuSeparator from './dropdown-menu-separator.vue';
import SDropdownMenuItem from './dropdown-menu-item.vue';
import SDropdownMenuShortcut from './dropdown-menu-shortcut.vue';
import SDropdownMenuSubTrigger from './dropdown-menu-sub-trigger.vue';
import SDropdownMenuSubContent from './dropdown-menu-sub-content.vue';
import { createOptionKey, isGroupOption, isSubOption } from './shared';
import type { DropdownMenuItemOption, DropdownMenuOptionEmits, DropdownMenuOptionProps } from './types';

defineOptions({
  name: 'SDropdownMenuOption'
});

defineProps<DropdownMenuOptionProps<T>>();

const emit = defineEmits<DropdownMenuOptionEmits<T>>();

const forwardedEmits = useEmitAsProps(emit);
</script>

<template>
  <DropdownMenuGroup v-if="isGroupOption(option)" :class="groupClass">
    <SDropdownMenuLabel :class="groupLabelClass" :size="size">{{ option.label }}</SDropdownMenuLabel>
    <SDropdownMenuSeparator v-if="separator || option.separator" :class="separatorClass" />
    <SDropdownMenuOption
      v-for="item in option.items"
      :key="createOptionKey(item)"
      :option="item"
      :to="to"
      :size="size"
      :separator="separator"
      :disabled-portal="disabledPortal"
      :force-mount-portal="forceMountPortal"
      :group-class="groupClass"
      :group-label-class="groupLabelClass"
      :sub-trigger-class="subTriggerClass"
      :sub-trigger-icon-class="subTriggerIconClass"
      :sub-content-class="subContentClass"
      :sub-content-props="subContentProps"
      :item-class="itemClass"
      :item-icon-class="itemIconClass"
      :separator-class="separatorClass"
      :shortcut-class="shortcutClass"
      v-bind="forwardedEmits"
    />
  </DropdownMenuGroup>
  <DropdownMenuSub
    v-else-if="isSubOption(option)"
    :default-open="option.defaultOpen"
    :open="option.open"
    @update:open="emit('update:subOpen', $event, option)"
  >
    <SDropdownMenuSubTrigger
      :class="subTriggerClass"
      :size="size"
      :trigger-icon-class="subTriggerIconClass"
      :disabled="option.disabled"
      :text-value="option.textValue || option.label"
    >
      <component :is="option.icon" v-if="option.icon" :class="itemIconClass" />
      <slot name="subTrigger">
        <span>{{ option.label }}</span>
      </slot>
      <template #icon>
        <slot name="subTriggerIcon" />
      </template>
    </SDropdownMenuSubTrigger>
    <SDropdownMenuSeparator v-if="separator || option.separator" :class="separatorClass" />
    <DropdownMenuPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SDropdownMenuSubContent
        :class="subContentClass"
        v-bind="subContentProps"
        @close-auto-focus="emit('closeAutoFocusSub', $event, option)"
        @entry-focus="emit('entryFocusSub', $event, option)"
        @escape-key-down="emit('escapeKeyDownSub', $event, option)"
        @focus-outside="emit('focusOutsideSub', $event, option)"
        @interact-outside="emit('interactOutsideSub', $event, option)"
        @open-auto-focus="emit('openAutoFocusSub', $event, option)"
        @pointer-down-outside="emit('pointerDownOutsideSub', $event, option)"
      >
        <SDropdownMenuOption
          v-for="item in option.items"
          :key="createOptionKey(item)"
          :option="item"
          :to="to"
          :size="size"
          :separator="separator"
          :disabled-portal="disabledPortal"
          :force-mount-portal="forceMountPortal"
          :group-class="groupClass"
          :group-label-class="groupLabelClass"
          :sub-trigger-class="subTriggerClass"
          :sub-trigger-icon-class="subTriggerIconClass"
          :sub-content-class="subContentClass"
          :sub-content-props="subContentProps"
          :item-class="itemClass"
          :item-icon-class="itemIconClass"
          :separator-class="separatorClass"
          :shortcut-class="shortcutClass"
          v-bind="forwardedEmits"
        />
      </SDropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
  <template v-else>
    <SDropdownMenuItem
      :class="itemClass"
      :size="size"
      :disabled="option.disabled"
      :text-value="option.textValue || option.label"
      @select="emit('select', option, $event)"
    >
      <slot name="item" v-bind="option">
        <component :is="option.icon" v-if="option.icon" :class="itemIconClass" />
        <span>{{ option.label }}</span>
        <SDropdownMenuShortcut v-if="option.shortcut" :class="shortcutClass" :size="size">
          {{ option.shortcut }}
        </SDropdownMenuShortcut>
      </slot>
    </SDropdownMenuItem>
    <SDropdownMenuSeparator v-if="separator || option.separator" :class="separatorClass" />
  </template>
</template>

<style scoped></style>
