<script setup lang="ts">
import type { ShallowRef } from 'vue';
import { computed, toRefs } from 'vue';
import { useControllableState } from '../../composables';
import { DialogRoot } from '../dialog';
import { provideDrawerRootContext } from './context';
import { CLOSE_THRESHOLD, SCROLL_LOCK_TIMEOUT } from './shared';
import type {
  BottomSheetRootProps,
  BottomSheetRootEmits,
  BottomSheetRootSlots,
  BottomSheetEmitHandlers
} from './types';

defineOptions({
  name: 'BottomSheetRoot'
});

const props = withDefaults(defineProps<BottomSheetRootProps>(), {
  open: undefined,
  defaultOpen: undefined,
  fixed: undefined,
  dismissible: true,
  activeSnapPoint: undefined,
  snapPoints: undefined,
  shouldScaleBackground: undefined,
  setBackgroundColorOnScale: true,
  closeThreshold: CLOSE_THRESHOLD,
  fadeFromIndex: undefined,
  nested: false,
  modal: true,
  scrollLockTimeout: SCROLL_LOCK_TIMEOUT,
  direction: 'bottom',
  handleOnly: false
});

const emit = defineEmits<BottomSheetRootEmits>();

defineSlots<BottomSheetRootSlots>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
) as ShallowRef<boolean>;

const activeSnapPoint = useControllableState(
  () => props.activeSnapPoint,
  value => {
    emit('update:activeSnapPoint', value!);
  },
  undefined
);

const fadeFromIndex = computed(() => props.fadeFromIndex ?? (props.snapPoints && props.snapPoints.length - 1));

const emitHandlers: BottomSheetEmitHandlers = {
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
