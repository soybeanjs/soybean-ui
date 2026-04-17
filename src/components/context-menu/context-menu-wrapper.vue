<script setup lang="ts">
import { ContextMenuWrapperCompact } from '@soybeanjs/headless';
import { useOmitProps, useForwardListeners } from '@soybeanjs/headless/composables';
import { provideMenuUi } from '../menu/context';
import type { ContextMenuWrapperProps, ContextMenuWrapperEmits } from './types';

defineOptions({
  name: 'SContextMenuWrapper'
});

const props = withDefaults(defineProps<ContextMenuWrapperProps>(), {
  modal: true
});

const emit = defineEmits<ContextMenuWrapperEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'indicatorPosition']);

const listeners = useForwardListeners(emit);

provideMenuUi(() => props);
</script>

<template>
  <ContextMenuWrapperCompact v-bind="forwardedProps" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot />
  </ContextMenuWrapperCompact>
</template>
