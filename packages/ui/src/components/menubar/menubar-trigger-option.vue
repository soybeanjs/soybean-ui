<script setup lang="ts">
import SMenuItemLinkIcon from '../menu/menu-item-link-icon.vue';
import SMenuShortcut from '../menu/menu-shortcut.vue';
import SMenubarTrigger from './menubar-trigger.vue';
import SMenubarTriggerLink from './menubar-trigger-link.vue';
import type { MenubarTriggerOptionProps } from './types';

defineOptions({
  name: 'SMenubarTriggerOption'
});

const props = defineProps<MenubarTriggerOptionProps>();
</script>

<template>
  <SMenubarTriggerLink v-if="item.linkProps" v-bind="item.linkProps" :class="props.class" :disabled="disabled">
    <slot name="trigger" v-bind="item">
      <slot name="trigger-leading" v-bind="item">
        <component :is="item.icon" v-if="item.icon" :class="itemIconClass" />
      </slot>
      <span>{{ item.label }}</span>
      <SMenuItemLinkIcon :class="itemLinkIconClass" :size="size" />
      <slot name="trigger-trailing" v-bind="item" />
    </slot>
  </SMenubarTriggerLink>
  <SMenubarTrigger v-else :class="props.class" :disabled="disabled">
    <slot name="trigger" v-bind="item">
      <slot name="trigger-leading" v-bind="item">
        <component :is="item.icon" v-if="item.icon" :class="itemIconClass" />
      </slot>
      <span>{{ item.label }}</span>
      <slot name="trigger-trailing" v-bind="item" />
      <SMenuShortcut v-if="item.shortcut" :class="shortcutClass" :value="item.shortcut" :size="size" />
    </slot>
  </SMenubarTrigger>
</template>
