<script setup lang="ts">
import { computed } from 'vue';
import type { FunctionalComponent } from 'vue';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-vue-next';
import type { LucideProps } from 'lucide-vue-next';
import {
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTrigger,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import SAlertDialogOverlay from './alert-dialog-overlay.vue';
import SAlertDialogContent from './alert-dialog-content.vue';
import SAlertDialogHeader from './alert-dialog-header.vue';
import SAlertDialogTitle from './alert-dialog-title.vue';
import SAlertDialogDescription from './alert-dialog-description.vue';
import SAlertDialogFooter from './alert-dialog-footer.vue';
import type { AlertDialogEmits, AlertDialogProps, AlertType } from './types';

defineOptions({
  name: 'SAlertDialog'
});

const props = defineProps<AlertDialogProps>();

const emit = defineEmits<AlertDialogEmits>();

const forwardedRootProps = usePickForwardProps(props, ['open', 'defaultOpen']);

const forwardedContentProps = usePickForwardProps(props, [
  'class',
  'forceMount',
  'trapFocus',
  'disableOutsidePointerEvents'
]);

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:open']);

const forwardedContent = useCombinedPropsEmits(forwardedContentProps, forwardedContentEmits);

const iconRecord: Record<AlertType, { icon: FunctionalComponent<LucideProps>; class: string }> = {
  destructive: {
    icon: CircleX,
    class: 'text-destructive'
  },
  success: {
    icon: CircleCheck,
    class: 'text-success'
  },
  warning: {
    icon: CircleAlert,
    class: 'text-warning'
  },
  info: {
    icon: Info,
    class: 'text-info'
  }
};

const iconProps = computed(() => {
  if (!props.type) {
    return null;
  }

  return iconRecord[props.type];
});
</script>

<template>
  <AlertDialogRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <AlertDialogTrigger as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SAlertDialogOverlay :class="overlayClass" :force-mount="forceMountOverlay" />
      <SAlertDialogContent v-bind="forwardedContent">
        <SAlertDialogHeader :class="headerClass">
          <SAlertDialogTitle :class="titleClass">
            <component :is="iconProps.icon" v-if="iconProps" :class="iconProps.class" />
            <slot name="title">{{ title }}</slot>
          </SAlertDialogTitle>
          <SAlertDialogDescription :class="descriptionClass">
            <slot name="description">{{ description }}</slot>
          </SAlertDialogDescription>
        </SAlertDialogHeader>
        <slot />
        <SAlertDialogFooter :class="footerClass">
          <slot name="footer" />
        </SAlertDialogFooter>
      </SAlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
