<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogPortal, AlertDialogRoot, AlertDialogTrigger, useEmitAsProps, useForwardProps } from 'reka-ui';
import { computedOmit, computedOmitEmits, computedPick } from '../../shared';
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

const delegatedRootProps = computedPick(props, ['open', 'defaultOpen']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = computedOmit(props, [
  'open',
  'defaultOpen',
  'to',
  'disabledPortal',
  'forceMountPortal',
  'overlayClass',
  'forceMountOverlay'
]);

const forwardedContentProps = useForwardProps(delegatedContentProps);

const forwardedEmits = useEmitAsProps(emit) as Record<keyof AlertDialogEmits, any>;

const forwardedContentEmits = computedOmitEmits(forwardedEmits, ['update:open']);

const forwardedContent = computed(() => ({
  ...forwardedContentProps.value,
  ...forwardedContentEmits.value
}));

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
