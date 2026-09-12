<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useControllableState } from '../../composables';
import { DialogRoot } from '../dialog';
import { CLOSE_THRESHOLD, SCROLL_LOCK_TIMEOUT } from './shared';
import { provideDrawerRootContext } from './context';
import type { DrawerRootProps, DrawerRootEmits, DrawerRootSlots, DrawerEmitHandlers } from './types';

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
  shouldScaleBackground: undefined,
  setBackgroundColorOnScale: true,
  closeThreshold: CLOSE_THRESHOLD,
  fadeFromIndex: undefined,
  nested: false,
  modal: true,
  scrollLockTimeout: SCROLL_LOCK_TIMEOUT,
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

const snapPoint = useControllableState(
  () => props.snapPoint,
  value => {
    emit('update:snapPoint', value);
  },
  props.defaultSnapPoint ?? null
);

const fadeFromIndex = computed(() => {
  if (props.fadeFromIndex !== undefined) {
    return props.fadeFromIndex;
  }

  if (!props.snapPoints?.length) {
    return undefined;
  }

  return props.snapPoints.length - 1;
});

const emitHandlers: DrawerEmitHandlers = {
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
  snapPoint,
  fadeFromIndex,
  open
});

function handleOpenChange(openState: boolean) {
  if (props.open !== undefined) {
    emitHandlers.emitOpenChange(openState);
    return;
  }

  isOpen.value = openState;

  if (openState) {
    hasBeenOpened.value = true;
  } else {
    closeDrawer();
  }
}
</script>

<template>
  <DialogRoot :open="isOpen" :modal="modal" @update:open="handleOpenChange">
    <slot :open="isOpen" />
  </DialogRoot>
</template>
