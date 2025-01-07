<script setup lang="ts">
import {
  DialogPortal,
  DialogRoot,
  DialogTrigger,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import SDialogOverlay from './dialog-overlay.vue';
import SDialogContent from './dialog-content.vue';
import SDialogHeader from './dialog-header.vue';
import SDialogTitle from './dialog-title.vue';
import SDialogDescription from './dialog-description.vue';
import SDialogClose from './dialog-close.vue';
import SDialogFooter from './dialog-footer.vue';
import type { DialogEmits, DialogProps } from './types';

defineOptions({
  name: 'SDialog'
});

const props = defineProps<DialogProps>();

const emit = defineEmits<DialogEmits>();

const forwardedRootProps = usePickForwardProps(props, ['open', 'defaultOpen', 'modal']);

const forwardedContentProps = usePickForwardProps(props, [
  'class',
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
      <SDialogContent v-bind="forwardedContent">
        <SDialogHeader :class="headerClass">
          <SDialogTitle :class="titleClass">
            <slot name="title">{{ title }}</slot>
          </SDialogTitle>
          <SDialogDescription :class="descriptionClass">
            <slot name="description">{{ description }}</slot>
          </SDialogDescription>
        </SDialogHeader>
        <SDialogClose :class="closeClass" />
        <slot />
        <SDialogFooter :class="footerClass">
          <slot name="footer" />
        </SDialogFooter>
      </SDialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
