<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { ThemeSize } from '../../../types';
import type { MenuOptionData } from '../../menu/types';
import type { ContextMenuEmits, ContextMenuProps } from '../types';
import SContextMenuPortalContent from './context-menu-portal-content.vue';
import SContextMenuOption from './context-menu-option.vue';

defineOptions({
  name: 'SContextMenu'
});

const props = defineProps<ContextMenuProps<T>>();

const emit = defineEmits<ContextMenuEmits<T>>();

type Slots = {
  trigger?: (props?: { size?: ThemeSize }) => any;
  item?: (props: MenuOptionData<T>) => any;
  itemLeading?: (props: MenuOptionData<T>) => any;
  itemTrailing?: (props: MenuOptionData<T>) => any;
  itemTrigger?: (props: MenuOptionData<T>) => any;
  subTriggerIcon?: (props: MenuOptionData<T>) => any;
  children?: (props: MenuOptionData<T>) => any;
};

const slots = defineSlots<Slots>();
const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const forwardedPortalContentProps = useOmitForwardProps(props, [
  'ui',
  'size',
  'separator',
  'subContentProps',
  'dir',
  'modal',
  'items'
]);
const forwardedOptionProps = usePickForwardProps(props, ['ui', 'separator', 'subContentProps']);

const emitKeys: (keyof ContextMenuEmits<T>)[] = [
  'escapeKeyDown',
  'pointerDownOutside',
  'focusOutside',
  'interactOutside',
  'closeAutoFocus'
];

const forwardedPortalContentEmits = usePickEmitAsProps(emit, emitKeys);
const forwardedOptionEmits = useOmitEmitAsProps(emit, emitKeys.concat('update:open'));

const forwardedPortalContent = useCombinedPropsEmits(forwardedPortalContentProps, forwardedPortalContentEmits);
const forwardedOption = useCombinedPropsEmits(forwardedOptionProps, forwardedOptionEmits);
</script>

<template>
  <ContextMenuRoot :dir="dir" :modal="modal" @update:open="emit('update:open', $event)">
    <ContextMenuTrigger as-child>
      <slot name="trigger" />
    </ContextMenuTrigger>
    <SContextMenuPortalContent v-bind="forwardedPortalContent" :ui="ui">
      <SContextMenuOption
        v-for="item in items"
        :key="String(item.value)"
        v-bind="forwardedOption"
        :size="size"
        :item="item"
      >
        <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </SContextMenuOption>
    </SContextMenuPortalContent>
  </ContextMenuRoot>
</template>
