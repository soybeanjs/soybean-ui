<script setup lang="ts">
import { DialogPortal, DialogRoot, DialogTrigger, useForwardProps, useForwardPropsEmits } from 'radix-vue';
import type { DialogContentEmits, DialogRootEmits } from 'radix-vue';
import { computedOmit, computedPick } from '../../shared';
import SDialogContent from './dialog-content.vue';
import SDialogOverlay from './dialog-overlay.vue';
import type { DialogProps } from './types';

defineOptions({
  name: 'SDialog'
});

const props = defineProps<DialogProps>();

const emit = defineEmits<DialogRootEmits & DialogContentEmits>();

const delegatedRootProps = computedPick(props, ['open', 'defaultOpen', 'modal']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = computedOmit(props, [
  'open',
  'defaultOpen',
  'modal',
  'disabledPortal',
  'forceMountPortal',
  'overlayClass',
  'forceMountOverlay'
]);

const forwardedContent = useForwardPropsEmits(delegatedContentProps, emit);
</script>

<template>
  <DialogRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SDialogOverlay :force-mount="forceMountOverlay" :class="overlayClass" />
      <SDialogContent v-bind="forwardedContent">
        <template #header>
          <slot name="header" />
        </template>
        <template #title-root>
          <slot name="title-root" />
        </template>
        <template #title>
          <slot name="title" />
        </template>
        <template #title-leading>
          <slot name="title-leading" />
        </template>
        <template #title-trailing>
          <slot name="title-trailing" />
        </template>
        <template #extra>
          <slot name="extra" />
        </template>
        <template #close>
          <slot name="close" />
        </template>
        <slot />
        <template v-if="$slots.footer" #footer>
          <slot name="footer" />
        </template>
      </SDialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped></style>
