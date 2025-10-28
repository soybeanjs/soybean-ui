<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { DividerRoot, ListboxItem } from '@headless';
import type { DefinedValue } from '@headless';
import { useOmitProps } from '@headless/composables';
import Icon from '../icon/icon.vue';
import Kbd from '../kbd/kbd.vue';
import { useCommandExtraThemeContext } from './context';
import type { CommandSingleOptionEmits, CommandSingleOptionProps } from './types';

defineOptions({
  name: 'SCommandSingleOption',
  inheritAttrs: false
});

const props = defineProps<CommandSingleOptionProps<T>>();

const emit = defineEmits<CommandSingleOptionEmits<T>>();

const forwardedProps = useOmitProps(props, ['item', 'itemLabelProps', 'shortcutProps', 'separatorProps']);

const themeContext = useCommandExtraThemeContext();

const ui = computed(() => themeContext?.ui?.value);
</script>

<template>
  <ListboxItem v-bind="forwardedProps" :value="item.value" :disabled="item.disabled" @select="emit('select', $event)">
    <slot name="item-leading">
      <Icon v-if="typeof item.icon === 'string'" :icon="item.icon" />
      <component :is="item.icon" v-else />
    </slot>
    <span :class="ui?.itemLabel" v-bind="itemLabelProps">
      <slot name="item-label">{{ item.label }}</slot>
    </span>
    <slot name="item-trailing" />
    <Kbd v-if="item.shortcut" v-bind="shortcutProps" :value="item.shortcut" :class="ui?.shortcut" />
  </ListboxItem>
  <DividerRoot v-if="item.separator" v-bind="separatorProps" :class="ui?.separator" />
</template>
