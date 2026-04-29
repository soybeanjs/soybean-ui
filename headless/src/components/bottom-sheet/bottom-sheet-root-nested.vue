<script setup lang="ts">
import { useForwardListeners } from '../../composables';
import { injectDrawerRootContext } from './context';
import BottomSheetRoot from './bottom-sheet-root.vue';
import type { BottomSheetRootEmits, BottomSheetRootProps } from './types';

defineOptions({
  name: 'BottomSheetRootNested'
});

const props = defineProps<BottomSheetRootProps>();

const emit = defineEmits<BottomSheetRootEmits>();

const listeners = useForwardListeners(emit);

const { onNestedDrag, onNestedOpenChange, onNestedRelease } = injectDrawerRootContext('BottomSheetRootNested');

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
  <BottomSheetRoot
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
  </BottomSheetRoot>
</template>
