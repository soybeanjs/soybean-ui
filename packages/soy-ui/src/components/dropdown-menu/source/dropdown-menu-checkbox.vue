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
import SMenuCheckbox from '../../menu/source/menu-checkbox.vue';
import type { MenuOptionData } from '../../menu/types';
import type { DropdownMenuCheckboxEmits, DropdownMenuCheckboxProps } from '../types';

defineOptions({
  name: 'SDropdownMenuCheckbox'
});

const props = defineProps<DropdownMenuCheckboxProps<T>>();

const emit = defineEmits<DropdownMenuCheckboxEmits<T>>();

type Slots = {
  trigger?: (props?: { size?: ThemeSize }) => any;
  item?: (props: MenuOptionData<T>) => any;
  itemLeading?: (props: MenuOptionData<T>) => any;
  itemTrailing?: (props: MenuOptionData<T>) => any;
  itemIndicatorIcon?: (props: MenuOptionData<T>) => any;
};

const slots = defineSlots<Slots>();
const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const propKeys = ['open', 'defaultOpen', 'dir', 'modal'] satisfies (keyof DropdownMenuCheckboxProps<T>)[];

const forwardedRootProps = usePickForwardProps(props, propKeys);
const forwardedMenuCheckboxProps = useOmitForwardProps(props, [...propKeys, 'size', 'disabledTrigger']);

const emitKeys = ['update:open'] satisfies (keyof DropdownMenuCheckboxEmits<T>)[];

const forwardedRootEmits = usePickEmitAsProps(emit, emitKeys);
const forwardedMenuCheckboxEmits = useOmitEmitAsProps(emit, emitKeys);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, forwardedRootEmits);
const forwardedMenuCheckbox = useCombinedPropsEmits(forwardedMenuCheckboxProps, forwardedMenuCheckboxEmits);
</script>

<template>
  <DropdownMenuRoot v-bind="forwardedRoot">
    <DropdownMenuTrigger as-child :disabled="disabledTrigger">
      <Slot :size="size">
        <slot name="trigger" />
      </Slot>
    </DropdownMenuTrigger>
    <SMenuCheckbox v-bind="forwardedMenuCheckbox" :size="size">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuCheckbox>
  </DropdownMenuRoot>
</template>
