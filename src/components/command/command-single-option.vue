<script setup lang="ts">
import { ListboxItem, SeparatorRoot } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import Icon from '../icon/icon.vue';
import Kbd from '../kbd/kbd.vue';
import { useCommandExtraUi } from './context';
import type { CommandSingleOptionEmits, CommandSingleOptionProps } from './types';

defineOptions({
  name: 'SCommandSingleOption',
  inheritAttrs: false
});

const props = defineProps<CommandSingleOptionProps>();

const emit = defineEmits<CommandSingleOptionEmits>();

const forwardedProps = useOmitProps(props, ['item', 'itemLabelProps', 'shortcutProps', 'separatorProps']);

const ui = useCommandExtraUi();
</script>

<template>
  <ListboxItem v-bind="forwardedProps" :value="item.value" :disabled="item.disabled" @select="emit('select', $event)">
    <slot name="item-leading">
      <Icon v-if="item.icon" :icon="item.icon" />
    </slot>
    <span :class="ui?.itemLabel" v-bind="itemLabelProps">
      <slot name="item-label">{{ item.label }}</slot>
    </span>
    <slot name="item-trailing" />
    <Kbd v-if="item.shortcut" v-bind="shortcutProps" :value="item.shortcut" :class="ui?.shortcut" />
  </ListboxItem>
  <SeparatorRoot v-if="item.separator" v-bind="separatorProps" :class="ui?.separator" />
</template>
