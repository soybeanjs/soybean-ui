<script setup lang="ts">
import { useForwardPropsEmits } from 'radix-vue';
import { DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue';
import type { DrawerRootEmits } from 'vaul-vue';
import { computedOmit } from '../../shared';
import SDrawerOverlay from './drawer-overlay.vue';
import SDrawerContent from './drawer-content.vue';
import type { DrawerProps } from './types';

defineOptions({
  name: 'SDrawer'
});

const props = defineProps<DrawerProps>();

const emit = defineEmits<DrawerRootEmits>();

const delegatedRootProps = computedOmit(props, [
  'to',
  'disabledPortal',
  'forceMountPortal',
  'overlayClass',
  'contentClass'
]);

const forwardedRoot = useForwardPropsEmits(delegatedRootProps, emit);
</script>

<template>
  <DrawerRoot v-bind="forwardedRoot">
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerPortal>
      <SDrawerOverlay :class="overlayClass" />
      <SDrawerContent :class="contentClass">
        <slot />
      </SDrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>

<style scoped></style>
