<script setup lang="ts">
import { DialogPortal, DialogRoot, DialogTrigger, useEmitAsProps, useForwardProps } from 'radix-vue';
import { computed } from 'vue';
import { computedOmit, computedOmitEmits, computedPick } from '../../shared';
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

const delegatedRootProps = computedPick(props, ['open', 'defaultOpen', 'modal']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = computedOmit(props, [
  'open',
  'defaultOpen',
  'modal',
  'to',
  'disabledPortal',
  'forceMountPortal',
  'overlayClass',
  'forceMountOverlay'
]);

const forwardedContentProps = useForwardProps(delegatedContentProps);

const forwardedEmits = useEmitAsProps(emit) as Record<keyof SheetEmits, any>;

const forwardedContentEmits = computedOmitEmits(forwardedEmits, ['update:open']);

const forwardedContent = computed(() => ({
  ...forwardedContentProps.value,
  ...forwardedContentEmits.value
}));

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
