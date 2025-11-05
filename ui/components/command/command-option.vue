<script setup lang="ts">
import { computed } from 'vue';
import SCommandGroupOption from './command-group-option.vue';
import SCommandSingleOption from './command-single-option.vue';
import { isCommandGroupOption } from './shared';
import type { CommandOptionEmits, CommandOptionProps, CommandSingleOptionData } from './types';

defineOptions({
  name: 'SCommandOption',
  inheritAttrs: false
});

defineProps<CommandOptionProps>();

const emit = defineEmits<CommandOptionEmits>();

type Slots = {
  'item-leading': (props: { item: CommandSingleOptionData }) => any;
  'item-trailing': (props: { item: CommandSingleOptionData }) => any;
  'item-label': (props: { item: CommandSingleOptionData }) => any;
};

const slots = defineSlots<Slots>();

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);
</script>

<template>
  <SCommandGroupOption
    v-if="isCommandGroupOption(item)"
    v-bind="groupProps"
    :item="item"
    :group-label-props="groupLabelProps"
    :item-props="itemProps"
    :item-label-props="itemLabelProps"
    :shortcut-props="shortcutProps"
    :separator-props="separatorProps"
    @select="emit('select', $event)"
  >
    <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
      <slot :name="slotKey" :item="slotProps.item" />
    </template>
  </SCommandGroupOption>
  <SCommandSingleOption
    v-else
    v-bind="itemProps"
    :item="item"
    :item-label-props="itemLabelProps"
    :shortcut-props="shortcutProps"
    :separator-props="separatorProps"
    @select="emit('select', $event)"
  >
    <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]>
      <slot :name="slotKey" :item="item" />
    </template>
  </SCommandSingleOption>
</template>
