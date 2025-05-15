<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import {
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { MenuOptionData } from '../../menu/types';
import type { MenubarItemEmits, MenubarItemProps } from '../types';
import SMenubarPortalContent from './menubar-portal-content.vue';
import SMenubarOption from './menubar-option.vue';

defineOptions({
  name: 'SMenubarItem'
});

const props = defineProps<MenubarItemProps<T>>();

const emit = defineEmits<MenubarItemEmits<T>>();

type Slots = {
  item?: (props: MenuOptionData<T>) => any;
  itemLeading?: (props: MenuOptionData<T>) => any;
  itemTrailing?: (props: MenuOptionData<T>) => any;
  itemTrigger?: (props: MenuOptionData<T>) => any;
  subTriggerIcon?: (props: MenuOptionData<T>) => any;
  children?: (props: MenuOptionData<T>) => any;
};

const slots = defineSlots<Slots>();
const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const propKeys: (keyof MenubarItemProps<T>)[] = ['size', 'separator', 'subContentProps', 'ui'];

const forwardedPortalContentProps = useOmitForwardProps(props, propKeys.concat(['class', 'items']));
const forwardedOptionProps = usePickForwardProps(props, propKeys);

const emitKeys: (keyof MenubarItemEmits<T>)[] = [
  'escapeKeyDown',
  'pointerDownOutside',
  'focusOutside',
  'interactOutside',
  'closeAutoFocus'
];

const forwardedPortalContentEmits = usePickEmitAsProps(emit, emitKeys);
const forwardedOptionEmits = useOmitEmitAsProps(emit, emitKeys);

const forwardedPortalContent = useCombinedPropsEmits(forwardedPortalContentProps, forwardedPortalContentEmits);
const forwardedOption = useCombinedPropsEmits(forwardedOptionProps, forwardedOptionEmits);
</script>

<template>
  <SMenubarPortalContent v-bind="forwardedPortalContent" :class="props.class || ui?.content" :arrow-class="ui?.arrow">
    <SMenubarOption v-for="item in items" :key="String(item.value)" v-bind="forwardedOption" :item="item">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenubarOption>
  </SMenubarPortalContent>
</template>
