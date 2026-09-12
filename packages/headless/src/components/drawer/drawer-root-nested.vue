<script setup lang="ts">
import { useForwardListeners } from '../../composables';
import { useDrawerRootContext } from './context';
import DrawerRoot from './drawer-root.vue';
import type { DrawerRootProps, DrawerRootEmits } from './types';

defineOptions({
  name: 'DrawerRootNested'
});

const props = defineProps<DrawerRootProps>();

const emit = defineEmits<DrawerRootEmits>();

const listeners = useForwardListeners(emit);

const { onNestedDrag, onNestedOpenChange, onNestedRelease } = useDrawerRootContext('DrawerRootNested');

function onClose() {
  onNestedOpenChange(false);
}

function onDrag(p: number) {
  onNestedDrag(p);
}

function onOpenChange(o: boolean) {
  if (o) onNestedOpenChange(o);
}
</script>

<template>
  <DrawerRoot
    v-slot="slotProps"
    v-bind="props"
    nested
    v-on="listeners"
    @close="onClose"
    @drag="onDrag"
    @release="onNestedRelease"
    @update:open="onOpenChange"
  >
    <slot v-bind="slotProps" />
  </DrawerRoot>
</template>
