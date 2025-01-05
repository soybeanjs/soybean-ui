<script setup lang="ts">
import {
  DialogPortal,
  DialogRoot,
  DialogTrigger,
  Slot,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitive';
import {
  SDialogClose,
  SDialogDescription,
  SDialogFooter,
  SDialogHeader,
  SDialogOverlay,
  SDialogTitle
} from '../dialog';
import SSheetContent from './sheet-content.vue';
import type { SheetEmits, SheetProps } from './types';

defineOptions({
  name: 'SSheet'
});

const props = defineProps<SheetProps>();

const emit = defineEmits<SheetEmits>();

const forwardedRootProps = usePickForwardProps(props, ['open', 'defaultOpen', 'modal']);

const forwardedContentProps = usePickForwardProps(props, [
  'class',
  'side',
  'forceMount',
  'trapFocus',
  'disableOutsidePointerEvents'
]);

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:open']);

const forwardedContent = useCombinedPropsEmits(forwardedContentProps, forwardedContentEmits);
</script>

<template>
  <DialogRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SDialogOverlay :force-mount="forceMountOverlay" :class="overlayClass" />
      <SSheetContent v-bind="forwardedContent">
        <SDialogHeader :class="headerClass">
          <SDialogTitle :class="titleClass">
            <slot name="title">{{ title }}</slot>
          </SDialogTitle>
          <SDialogDescription :class="descriptionClass">
            <slot name="description">{{ description }}</slot>
          </SDialogDescription>
        </SDialogHeader>
        <SDialogClose :class="closeClass" />
        <Slot class="flex-grow overflow-hidden">
          <slot />
        </Slot>
        <SDialogFooter :class="footerClass">
          <slot name="footer" />
        </SDialogFooter>
      </SSheetContent>
    </DialogPortal>
  </DialogRoot>
</template>
