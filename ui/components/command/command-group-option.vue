<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { DividerRoot, ListboxGroup, ListboxGroupLabel } from '@headless';
import type { DefinedValue } from '@headless';
import { useOmitProps } from '@headless/composables';
import SCommandSingleOption from './command-single-option.vue';
import { useCommandExtraThemeContext } from './context';
import type { CommandGroupOptionEmits, CommandGroupOptionProps, CommandSingleOptionData } from './types';

defineOptions({
  name: 'SCommandGroupOption',
  inheritAttrs: false
});

const props = defineProps<CommandGroupOptionProps<T>>();

const emit = defineEmits<CommandGroupOptionEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'item',
  'groupLabelProps',
  'itemProps',
  'itemLabelProps',
  'shortcutProps',
  'separatorProps'
]);

type Slots = {
  'item-leading': (props: { item: CommandSingleOptionData<T> }) => any;
  'item-trailing': (props: { item: CommandSingleOptionData<T> }) => any;
  'item-label': (props: { item: CommandSingleOptionData<T> }) => any;
};

const slots = defineSlots<Slots>();

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const themeContext = useCommandExtraThemeContext();

const ui = computed(() => themeContext?.ui?.value);
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
  <DividerRoot v-if="item.separator" v-bind="separatorProps" :class="ui?.separator" />
</template>
