<script setup lang="ts">
import { DropdownMenuWrapperCompact } from '@soybeanjs/headless';
import { useOmitProps, useForwardListeners } from '@soybeanjs/headless/composables';
import { provideMenuUi } from '../menu/context';
import type { DropdownMenuWrapperProps, DropdownMenuWrapperEmits } from './types';

defineOptions({
  name: 'SDropdownMenuWrapper'
});

const props = withDefaults(defineProps<DropdownMenuWrapperProps>(), {
  open: undefined,
  modal: true
});

const emit = defineEmits<DropdownMenuWrapperEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'indicatorPosition']);

const listeners = useForwardListeners(emit);

provideMenuUi(() => props);
</script>

<template>
  <DropdownMenuWrapperCompact v-bind="forwardedProps" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot />
  </DropdownMenuWrapperCompact>
</template>
