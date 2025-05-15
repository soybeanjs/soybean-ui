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
import type { DialogEmits, DialogProps } from '../types';
import SDialogOverlay from './dialog-overlay.vue';
import SDialogContent from './dialog-content.vue';
import SDialogHeader from './dialog-header.vue';
import SDialogTitle from './dialog-title.vue';
import SDialogDescription from './dialog-description.vue';
import SDialogCloseIcon from './dialog-close-icon.vue';
import SDialogFooter from './dialog-footer.vue';

defineOptions({
  name: 'SDialog'
});

const props = defineProps<DialogProps>();

const emit = defineEmits<DialogEmits>();

const forwardedRootProps = usePickForwardProps(props, ['open', 'defaultOpen', 'modal']);

const forwardedContentProps = usePickForwardProps(props, ['forceMount', 'trapFocus', 'disableOutsidePointerEvents']);

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
      <SDialogContent v-bind="forwardedContent" :class="props.class || ui?.content" :size="size">
        <SDialogHeader :class="ui?.header" :size="size">
          <SDialogTitle :class="ui?.title" :size="size">
            <slot name="title">{{ title }}</slot>
          </SDialogTitle>
          <SDialogDescription v-if="$slots.description || description" :class="ui?.description" :size="size">
            <slot name="description">{{ description }}</slot>
          </SDialogDescription>
        </SDialogHeader>
        <SDialogCloseIcon :class="ui?.closeIcon" :size="size" />
        <slot />
        <SDialogFooter v-if="$slots.footer" :class="ui?.footer" :size="size">
          <slot name="footer" />
        </SDialogFooter>
      </SDialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
