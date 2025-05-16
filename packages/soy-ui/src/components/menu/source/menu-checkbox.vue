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
import type { MenuCheckboxEmits, MenuCheckboxProps, MenuOptionData } from '../types';
import SMenuPortalContent from './menu-portal-content.vue';
import SMenuCheckboxGroup from './menu-checkbox-group.vue';

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

const propKeys: (keyof MenuCheckboxProps<T>)[] = ['items', 'modelValue', 'defaultValue', 'separator', 'ui'];

const forwardedPortalContentProps = useOmitForwardProps(props, propKeys.concat('class', 'size'));
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
  <SMenuPortalContent v-bind="forwardedPortalContent" :class="props.class || ui?.content" :arrow-class="ui?.arrow">
    <SMenuCheckboxGroup v-bind="forwardedCheckboxGroup" :size="size">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuCheckboxGroup>
  </SMenuPortalContent>
</template>
