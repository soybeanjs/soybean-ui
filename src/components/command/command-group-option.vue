<script setup lang="ts">
import { computed } from 'vue';
import { ListboxGroup, ListboxGroupLabel, SeparatorRoot } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import SCommandSingleOption from './command-single-option.vue';
import { useCommandExtraUi } from './context';
import type { CommandBaseOptionData, CommandGroupOptionEmits, CommandGroupOptionProps } from './types';

defineOptions({
  name: 'SCommandGroupOption',
  inheritAttrs: false
});

const props = defineProps<CommandGroupOptionProps>();

const emit = defineEmits<CommandGroupOptionEmits>();

const forwardedProps = useOmitProps(props, [
  'item',
  'groupLabelProps',
  'itemProps',
  'itemLabelProps',
  'shortcutProps',
  'separatorProps'
]);

type Slots = {
  'item-leading': (props: { item: CommandBaseOptionData }) => any;
  'item-trailing': (props: { item: CommandBaseOptionData }) => any;
  'item-label': (props: { item: CommandBaseOptionData }) => any;
};

const slots = defineSlots<Slots>();

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const ui = useCommandExtraUi();
</script>

<template>
  <ListboxGroup v-bind="forwardedProps">
    <ListboxGroupLabel v-bind="groupLabelProps">{{ item.label }}</ListboxGroupLabel>
    <SCommandSingleOption
      v-for="child in item.items"
      :key="String(child.value)"
      v-bind="itemProps"
      :item="child"
      :item-label-props="itemLabelProps"
      :shortcut-props="shortcutProps"
      :separator-props="separatorProps"
      @select="emit('select', $event)"
    >
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]>
        <slot :name="slotKey" :item="child" />
      </template>
    </SCommandSingleOption>
  </ListboxGroup>
  <SeparatorRoot v-if="item.separator" v-bind="separatorProps" :class="ui?.separator" />
</template>
