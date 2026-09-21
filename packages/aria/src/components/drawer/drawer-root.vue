<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useControllableState } from '../../composables';
import { DialogRoot } from '../dialog';
import { provideDrawerRootContext } from './context';
import type { DrawerRootProps, DrawerRootEmits, DrawerRootSlots } from './types';

defineOptions({
  name: 'DrawerRoot'
});

const props = withDefaults(defineProps<DrawerRootProps>(), {
  open: undefined,
  defaultOpen: undefined,
  fixed: undefined,
  dismissible: true,
  snapPoint: undefined,
  defaultSnapPoint: undefined,
  snapPoints: undefined,
  snapToSequentialPoints: false,
  swipeDirection: undefined,
  closeThreshold: 0.25,
  nested: false,
  modal: true,
  side: 'bottom',
  handleOnly: false
});

const emit = defineEmits<DrawerRootEmits>();

defineSlots<DrawerRootSlots>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value);
  },
  props.defaultOpen ?? false
);

const snapPoints = computed(() => props.snapPoints);

const defaultSnapPoint = computed(() => props.defaultSnapPoint ?? props.snapPoints?.[0] ?? null);

const snapPoint = useControllableState(
  () => props.snapPoint,
  value => {
    emit('update:snapPoint', value);
  },
  defaultSnapPoint.value
);

/**
 * Open-state requests branch on controlled mode: a controlled drawer reports
 * the intent via `update:open` and waits for the parent, an uncontrolled one
 * flips the internal state directly. Shared by the dialog wiring and the
 * swipe area's open gesture, so both respect the same contract.
 */
function requestOpenState(openState: boolean) {
  if (props.open !== undefined) {
    emit('update:open', openState);
    return;
  }

  open.value = openState;
}

const emitHandlers = {
  emitDrag: (percentageDragged: number) => emit('drag', percentageDragged),
  emitRelease: (openState: boolean) => emit('release', openState),
  emitClose: () => emit('close'),
  emitOpenChange: requestOpenState,
  emitSnapPointChange: (value: DrawerRootProps['snapPoint']) => {
    emit('update:snapPoint', value ?? null);
  }
};

const { isOpen, closeDrawer } = provideDrawerRootContext({
  ...emitHandlers,
  ...toRefs(props),
  open,
  snapPoints,
  snapPoint,
  defaultSnapPoint
});

function handleOpenChange(openState: boolean) {
  requestOpenState(openState);
}
</script>

<template>
  <!--
 The dialog binds the internal `isOpen` mirror: swipe dismissal closes the
       drawer immediately, in uncontrolled mode too, without waiting for a
       parent `update:open` round-trip. 
-->
  <DialogRoot :open="isOpen" :modal="modal" @update:open="handleOpenChange">
    <slot :open="isOpen" :close="closeDrawer" />
  </DialogRoot>
</template>
