<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { ContextMenuCompact } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { provideMenuUi } from '../menu/context';
import type { ContextMenuProps, ContextMenuEmits, ContextMenuSlots } from './types';

defineOptions({
  name: 'SContextMenu'
});

const props = withDefaults(defineProps<ContextMenuProps<T>>(), {
  modal: true
});

const emit = defineEmits<ContextMenuEmits<T>>();

const slots = defineSlots<ContextMenuSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots).filter(key => key !== 'trigger'));

provideMenuUi(() => props);
</script>

<template>
  <ContextMenuCompact v-bind="forwardedProps" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </ContextMenuCompact>
</template>
