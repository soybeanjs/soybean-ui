<script setup lang="ts">
import {
  DialogPortal,
  DialogRoot,
  DialogTrigger,
  Slot,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import {
  SDialogCloseIcon,
  SDialogDescription,
  SDialogFooter,
  SDialogHeader,
  SDialogOverlay,
  SDialogTitle
} from '../../dialog';
import type { SheetEmits, SheetProps } from '../types';
import SSheetContent from './sheet-content.vue';

defineOptions({
  name: 'SSheet'
});

const props = defineProps<SheetProps>();

const emit = defineEmits<SheetEmits>();

const forwardedRootProps = usePickForwardProps(props, ['open', 'defaultOpen', 'modal']);

const forwardedContentProps = usePickForwardProps(props, [
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
      <Slot :size="size">
        <slot name="trigger" />
      </Slot>
    </DialogTrigger>
    <DialogPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SDialogOverlay :force-mount="forceMountOverlay" :class="ui?.overlay" />
      <SSheetContent v-bind="forwardedContent" :class="props.class || ui?.content" :size="size">
        <SDialogHeader :class="ui?.header" :size="size">
          <SDialogTitle :class="ui?.title" :size="size">
            <slot name="title">{{ title }}</slot>
          </SDialogTitle>
          <SDialogDescription v-if="$slots.description || description" :class="ui?.description" :size="size">
            <slot name="description">{{ description }}</slot>
          </SDialogDescription>
        </SDialogHeader>
        <SDialogCloseIcon :class="ui?.closeIcon" :size="size" />
        <Slot class="flex-grow overflow-hidden">
          <slot />
        </Slot>
        <SDialogFooter v-if="$slots.footer" :class="ui?.footer" :size="size">
          <slot name="footer" />
        </SDialogFooter>
      </SSheetContent>
    </DialogPortal>
  </DialogRoot>
</template>
