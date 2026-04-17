<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { ContextMenuCheckboxCompact } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { provideMenuUi } from '../menu/context';
import type { ContextMenuCheckboxProps, ContextMenuCheckboxEmits, ContextMenuCheckboxSlots } from './types';

defineOptions({
  name: 'SContextMenuCheckbox'
});

const props = withDefaults(defineProps<ContextMenuCheckboxProps<T>>(), {
  modal: true,
  modelValue: undefined,
  defaultValue: () => []
});

const emit = defineEmits<ContextMenuCheckboxEmits<T>>();

const slots = defineSlots<ContextMenuCheckboxSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'indicatorPosition']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots).filter(key => key !== 'trigger'));

provideMenuUi(() => props);
</script>

<template>
  <ContextMenuCheckboxCompact v-bind="forwardedProps" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </ContextMenuCheckboxCompact>
</template>
