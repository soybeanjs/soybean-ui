<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Slot,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { ThemeSize } from '../../../types';
import SMenuRadio from '../../menu/source/menu-radio.vue';
import type { MenuOptionData } from '../../menu/types';
import type { DropdownMenuRadioEmits, DropdownMenuRadioProps } from '../types';

defineOptions({
  name: 'SDropdownMenuRadio'
});

const props = defineProps<DropdownMenuRadioProps<T>>();

const emit = defineEmits<DropdownMenuRadioEmits<T>>();

type Slots = {
  trigger?: (props?: { size?: ThemeSize }) => any;
  item?: (props: MenuOptionData<T>) => any;
  itemLeading?: (props: MenuOptionData<T>) => any;
  itemTrailing?: (props: MenuOptionData<T>) => any;
  itemIndicatorIcon?: (props: MenuOptionData<T>) => any;
};

const slots = defineSlots<Slots>();

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const propKeys = ['open', 'defaultOpen', 'dir', 'modal'] satisfies (keyof DropdownMenuRadioProps<T>)[];

const forwardedRootProps = usePickForwardProps(props, propKeys);
const forwardedMenuRadioProps = useOmitForwardProps(props, [...propKeys, 'size', 'disabledTrigger']);

const emitKeys = ['update:open'] satisfies (keyof DropdownMenuRadioEmits<T>)[];

const forwardedRootEmits = usePickEmitAsProps(emit, emitKeys);
const forwardedMenuRadioEmits = useOmitEmitAsProps(emit, emitKeys);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, forwardedRootEmits);
const forwardedMenuRadio = useCombinedPropsEmits(forwardedMenuRadioProps, forwardedMenuRadioEmits);
</script>

<template>
  <DropdownMenuRoot v-bind="forwardedRoot">
    <DropdownMenuTrigger as-child :disabled="disabledTrigger">
      <Slot :size="size">
        <slot name="trigger" />
      </Slot>
    </DropdownMenuTrigger>
    <SMenuRadio v-bind="forwardedMenuRadio" :size="size">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuRadio>
  </DropdownMenuRoot>
</template>
