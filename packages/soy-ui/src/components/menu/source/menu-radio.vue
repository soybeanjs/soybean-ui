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
import type { MenuOptionData, MenuRadioEmits, MenuRadioProps } from '../types';
import SMenuPortalContent from './menu-portal-content.vue';
import SMenuRadioGroup from './menu-radio-group.vue';

defineOptions({
  name: 'SMenuCheckbox'
});

const props = defineProps<MenuRadioProps<T>>();

const emit = defineEmits<MenuRadioEmits<T>>();

type Slots = {
  item?: (props: MenuOptionData<T>) => any;
  itemLeading?: (props: MenuOptionData<T>) => any;
  itemTrailing?: (props: MenuOptionData<T>) => any;
  itemIndicatorIcon?: (props: MenuOptionData<T>) => any;
};

const slots = defineSlots<Slots>();

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const propKeys: (keyof MenuRadioProps<T>)[] = ['items', 'modelValue', 'defaultValue', 'separator', 'ui'];

const forwardedPortalContentProps = useOmitForwardProps(props, propKeys.concat('class', 'size'));
const forwardedRadioGroupProps = usePickForwardProps(props, propKeys);

const emitKeys: (keyof MenuRadioEmits<T>)[] = [
  'escapeKeyDown',
  'pointerDownOutside',
  'focusOutside',
  'interactOutside',
  'closeAutoFocus'
];

const forwardedPortalContentEmits = usePickEmitAsProps(emit, emitKeys);
const forwardedRadioGroupEmits = useOmitEmitAsProps(emit, emitKeys);

const forwardedPortalContent = useCombinedPropsEmits(forwardedPortalContentProps, forwardedPortalContentEmits);
const forwardedRadioGroup = useCombinedPropsEmits(forwardedRadioGroupProps, forwardedRadioGroupEmits);
</script>

<template>
  <SMenuPortalContent v-bind="forwardedPortalContent" :class="props.class || ui?.content" :arrow-class="ui?.arrow">
    <SMenuRadioGroup v-bind="forwardedRadioGroup" :size="size">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuRadioGroup>
  </SMenuPortalContent>
</template>
