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
import type { MenuEmits, MenuOptionData, MenuProps } from '../types';
import SMenuPortalContent from './menu-portal-content.vue';
import SMenuOption from './menu-option.vue';

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

const forwardedPortalContentProps = useOmitForwardProps(props, [
  'class',
  'size',
  'ui',
  'items',
  'separator',
  'subContentProps'
]);
const forwardedOptionProps = usePickForwardProps(props, ['separator', 'subContentProps', 'ui']);

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
  <SMenuPortalContent
    v-bind="forwardedPortalContent"
    :class="props.class || ui?.content"
    :size="size"
    :arrow-class="ui?.arrow"
  >
    <SMenuOption v-for="item in items" :key="String(item.value)" v-bind="forwardedOption" :size="size" :item="item">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuOption>
  </SMenuPortalContent>
</template>
