<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { DropdownMenuCheckboxCompact } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { provideMenuUi } from '../menu/context';
import type { DropdownMenuCheckboxProps, DropdownMenuCheckboxEmits, DropdownMenuCheckboxSlots } from './types';

defineOptions({
  name: 'SDropdownMenuCheckbox'
});

const props = withDefaults(defineProps<DropdownMenuCheckboxProps<T>>(), {
  open: undefined,
  modal: true,
  modelValue: undefined,
  defaultValue: () => []
});

const emit = defineEmits<DropdownMenuCheckboxEmits<T>>();

const slots = defineSlots<DropdownMenuCheckboxSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'indicatorPosition']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots).filter(key => key !== 'trigger'));

provideMenuUi(() => props);
</script>

<template>
  <DropdownMenuCheckboxCompact v-bind="forwardedProps" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </DropdownMenuCheckboxCompact>
</template>
