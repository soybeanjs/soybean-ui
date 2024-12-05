<script setup lang="ts">
import { computed, toRefs } from 'vue';
import type { WritableComputedRef } from 'vue';
import { useVModel } from '@vueuse/core';
import { DialogRoot } from '../dialog';
import { provideDrawerRootContext } from './context';
import { CLOSE_THRESHOLD, SCROLL_LOCK_TIMEOUT } from './shared';
import type { DialogEmitHandlers, DrawerRootEmits, DrawerRootProps } from './types';

defineOptions({
  name: 'DrawerRoot'
});

const props = withDefaults(defineProps<DrawerRootProps>(), {
  open: undefined,
  defaultOpen: undefined,
  fixed: undefined,
  dismissible: true,
  activeSnapPoint: undefined,
  snapPoints: undefined,
  shouldScaleBackground: undefined,
  closeThreshold: CLOSE_THRESHOLD,
  fadeFromIndex: undefined,
  nested: false,
  modal: true,
  scrollLockTimeout: SCROLL_LOCK_TIMEOUT,
  direction: 'bottom'
});

const emit = defineEmits<DrawerRootEmits>();

type Slots = {
  default: (props: { open: boolean }) => any;
};

defineSlots<Slots>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
}) as WritableComputedRef<boolean>;

const activeSnapPoint = useVModel(props, 'activeSnapPoint', emit, {
  passive: (props.activeSnapPoint === undefined) as false
});

const fadeFromIndex = computed(() => props.fadeFromIndex ?? (props.snapPoints && props.snapPoints.length - 1));

const emitHandlers: DialogEmitHandlers = {
  emitDrag: (percentageDragged: number) => emit('drag', percentageDragged),
  emitRelease: (openState: boolean) => emit('release', openState),
  emitClose: () => emit('close'),
  emitOpenChange: (openState: boolean) => {
    emit('update:open', openState);
  }
};

const { closeDrawer, hasBeenOpened, modal, isOpen } = provideDrawerRootContext({
  ...emitHandlers,
  ...toRefs(props),
  activeSnapPoint,
  fadeFromIndex,
  open
});

function handleOpenChange(openState: boolean) {
  if (open.value !== undefined) {
    emitHandlers.emitOpenChange(openState);
    return;
  }
  if (!openState) {
    closeDrawer();
  } else {
    hasBeenOpened.value = true;
    isOpen.value = openState;
  }
}

defineExpose({
  open: isOpen
});
</script>

<template>
  <DialogRoot :open="isOpen" :modal="modal" @update:open="handleOpenChange">
    <slot :open="isOpen" />
  </DialogRoot>
</template>
