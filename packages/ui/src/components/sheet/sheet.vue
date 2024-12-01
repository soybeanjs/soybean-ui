<script setup lang="ts">
import {
  DialogPortal,
  DialogRoot,
  DialogTrigger,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickForwardProps
} from '@soybean-ui/primitive';
import SSheetOverlay from './sheet-overlay.vue';
import SSheetContent from './sheet-content.vue';
import type { SheetEmits, SheetProps } from './types';

defineOptions({
  name: 'SSheet'
});

const props = defineProps<SheetProps>();

const emit = defineEmits<SheetEmits>();

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

const forwardedRootProps = usePickForwardProps(props, ['open', 'defaultOpen', 'modal']);

const forwardedContentProps = useOmitForwardProps(props, [
  'open',
  'defaultOpen',
  'modal',
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
  <DialogRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SSheetOverlay :force-mount="forceMountOverlay" :class="overlayClass" />
      <SSheetContent v-bind="forwardedContent">
        <template v-for="slotKey in cardSlotKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" />
        </template>
      </SSheetContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped></style>
