<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import {
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitive';
import type { AcceptableValue } from '@soybean-ui/primitive';
import SMenuPortalContent from './menu-portal-content.vue';
import SMenuCheckboxGroup from './menu-checkbox-group.vue';
import type { MenuCheckboxEmits, MenuCheckboxProps, MenuOptionData } from './types';

defineOptions({
  name: 'SMenuCheckbox'
});

const props = defineProps<MenuCheckboxProps<T>>();

const emit = defineEmits<MenuCheckboxEmits<T>>();

type Slots = {
  item?: (props: MenuOptionData<T>) => any;
  itemLeading?: (props: MenuOptionData<T>) => any;
  itemTrailing?: (props: MenuOptionData<T>) => any;
  itemIndicatorIcon?: (props: MenuOptionData<T>) => any;
};

const slots = defineSlots<Slots>();
const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const propKeys: (keyof MenuCheckboxProps<T>)[] = [
  'items',
  'modelValue',
  'defaultValue',
  'size',
  'separator',
  'groupClass',
  'groupLabelClass',
  'itemClass',
  'itemIndicatorClass',
  'itemIconClass',
  'itemLinkClass',
  'itemLinkIconClass',
  'separatorClass',
  'shortcutClass'
];

const forwardedPortalContentProps = useOmitForwardProps(props, propKeys);
const forwardedCheckboxGroupProps = usePickForwardProps(props, propKeys);

const emitKeys: (keyof MenuCheckboxEmits<T>)[] = [
  'escapeKeyDown',
  'pointerDownOutside',
  'focusOutside',
  'interactOutside',
  'closeAutoFocus'
];

const forwardedPortalContentEmits = usePickEmitAsProps(emit, emitKeys);
const forwardedCheckboxGroupEmits = useOmitEmitAsProps(emit, emitKeys);

const forwardedPortalContent = useCombinedPropsEmits(forwardedPortalContentProps, forwardedPortalContentEmits);
const forwardedCheckboxGroup = useCombinedPropsEmits(forwardedCheckboxGroupProps, forwardedCheckboxGroupEmits);
</script>

<template>
  <SMenuPortalContent v-bind="forwardedPortalContent">
    <SMenuCheckboxGroup v-bind="forwardedCheckboxGroup">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuCheckboxGroup>
  </SMenuPortalContent>
</template>
