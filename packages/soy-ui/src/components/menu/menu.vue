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
import SMenuPortalContent from './menu-portal-content.vue';
import SMenuOption from './menu-option.vue';
import type { MenuEmits, MenuOptionData, MenuProps } from './types';

defineOptions({
  name: 'SMenu'
});

const props = defineProps<MenuProps<T>>();

const emit = defineEmits<MenuEmits<T>>();

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

const propKeys: (keyof MenuProps<T>)[] = [
  'size',
  'separator',
  'groupLabelClass',
  'itemClass',
  'itemIconClass',
  'itemLinkClass',
  'itemLinkIconClass',
  'separatorClass',
  'shortcutClass',
  'groupClass',
  'subContentClass',
  'subContentProps',
  'subTriggerClass',
  'subTriggerIconClass'
];

const forwardedPortalContentProps = useOmitForwardProps(props, propKeys.concat('items'));
const forwardedOptionProps = usePickForwardProps(props, propKeys);

const emitKeys: (keyof MenuEmits<T>)[] = [
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
  <SMenuPortalContent v-bind="forwardedPortalContent">
    <SMenuOption v-for="item in items" :key="String(item.value)" v-bind="forwardedOption" :item="item">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuOption>
  </SMenuPortalContent>
</template>
