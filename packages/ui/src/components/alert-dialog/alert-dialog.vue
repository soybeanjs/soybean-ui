<script setup lang="ts">
import {
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTrigger,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickForwardProps
} from '@soybean-ui/primitive';
import SAlertDialogContent from './alert-dialog-content.vue';
import SAlertDialogOverlay from './alert-dialog-overlay.vue';
import type { AlertDialogEmits, AlertDialogProps } from './types';

defineOptions({
  name: 'SAlertDialog'
});

const props = defineProps<AlertDialogProps>();

const emit = defineEmits<AlertDialogEmits>();

type Slots = {
  trigger: () => any;
  default: () => any;
  header: () => any;
  'title-root': () => any;
  title: () => any;
  'title-leading': () => any;
  'title-trailing': () => any;
  extra: () => any;
  close: () => any;
  footer: () => any;
};

const slots = defineSlots<Slots>();

const forwardedRootProps = usePickForwardProps(props, ['open', 'defaultOpen']);

const forwardedContentProps = useOmitForwardProps(props, [
  'open',
  'defaultOpen',
  'to',
  'disabledPortal',
  'forceMountPortal',
  'overlayClass',
  'forceMountOverlay'
]);

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:open']);

const forwardedContent = useCombinedPropsEmits(forwardedContentProps, forwardedContentEmits);

const cardSlotKeys = Object.keys(slots).filter(slot => slot !== 'trigger') as (keyof Slots)[];
</script>

<template>
  <AlertDialogRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <AlertDialogTrigger as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal :to :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SAlertDialogOverlay :force-mount="forceMountOverlay" :class="overlayClass" />
      <SAlertDialogContent v-bind="forwardedContent">
        <template v-for="slotKey in cardSlotKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" />
        </template>
      </SAlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style scoped></style>
