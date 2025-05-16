<script setup lang="ts">
import { computed } from 'vue';
import {
  DialogPortal,
  DialogRoot,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import { SDialogClose, SDialogContent, SDialogOverlay } from '../../dialog/index';
import type { CommandDialogEmits, CommandDialogProps } from '../types';

defineOptions({
  name: 'SCommandDialog'
});

const props = defineProps<CommandDialogProps>();

const emit = defineEmits<CommandDialogEmits>();

const forwardedRootProps = usePickForwardProps(props, ['open', 'defaultOpen', 'modal']);

const forwardedContentProps = usePickForwardProps(props, [
  'class',
  'forceMount',
  'trapFocus',
  'disableOutsidePointerEvents'
]);

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:open']);

const forwardedContent = useCombinedPropsEmits(forwardedContentProps, forwardedContentEmits);

const { dialog } = commandVariants();

const mergedContentCls = computed(() => cn(dialog(), props.class));
</script>

<template>
  <DialogRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <DialogPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SDialogOverlay :force-mount="forceMountOverlay" :class="overlayClass" />
      <SDialogContent v-bind="forwardedContent" :class="mergedContentCls">
        <SDialogClose :class="closeClass" />
        <slot />
      </SDialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
