<script lang="ts" setup generic="T extends AcceptableValue = AcceptableValue">
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { CommandSingleOptionEmits, CommandSingleOptionProps } from '../types';
import SCommandItem from './command-item.vue';
import SCommandShortcut from './command-shortcut.vue';
import SCommandSeparator from './command-separator.vue';

defineOptions({
  name: 'SCommandSingleOption',
  inheritAttrs: false
});

defineProps<CommandSingleOptionProps<T>>();

const emit = defineEmits<CommandSingleOptionEmits<T>>();
</script>

<template>
  <SCommandItem
    :class="ui?.item"
    :size="size"
    :value="item.value"
    :disabled="item.disabled"
    @select="emit('select', $event)"
  >
    <slot name="item">
      <component :is="item.icon" v-if="item.icon" :class="ui?.itemIcon" />
      <span>{{ item.label }}</span>
      <SCommandShortcut v-if="item.shortcut" :class="ui?.shortcut" :size="size" :value="item.shortcut" />
    </slot>
  </SCommandItem>
  <SCommandSeparator v-if="item.separator" :class="ui?.separator" :size="size" />
</template>
