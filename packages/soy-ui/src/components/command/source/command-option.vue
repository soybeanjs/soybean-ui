<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { AcceptableValue } from '@soybean-ui/primitives';
import { isCommandGroupOption } from '../shared';
import type { CommandOptionData, CommandOptionEmits, CommandOptionProps } from '../types';
import SCommandGroup from './command-group.vue';
import SCommandGroupLabel from './command-group-label.vue';
import SCommandSeparator from './command-separator.vue';
import SCommandSingleOption from './command-single-option.vue';

defineOptions({
  name: 'SCommandOption'
});

defineProps<CommandOptionProps<T>>();

const emit = defineEmits<CommandOptionEmits<T>>();

type Slots = {
  default: (props: { item: CommandOptionData<T> }) => any;
};

defineSlots<Slots>();
</script>

<template>
  <template v-if="isCommandGroupOption(item)">
    <SCommandGroup :class="ui?.group">
      <SCommandGroupLabel :class="ui?.groupLabel">{{ item.label }}</SCommandGroupLabel>
      <SCommandSingleOption
        v-for="(opt, index) in item.items"
        :key="index"
        :size="size"
        :item="opt"
        :ui="ui"
        @select="emit('select', opt, $event)"
      >
        <slot :item="opt" />
      </SCommandSingleOption>
    </SCommandGroup>
    <SCommandSeparator v-if="item.separator" :class="ui?.separator" :size="size" />
  </template>
  <SCommandSingleOption v-else :size="size" :item="item" :ui="ui" @select="emit('select', item, $event)">
    <slot :item="item" />
  </SCommandSingleOption>
</template>
