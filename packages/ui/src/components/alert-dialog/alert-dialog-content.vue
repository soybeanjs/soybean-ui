<script setup lang="ts">
import { computed } from 'vue';
import type { FunctionalComponent } from 'vue';
import type { AlertDialogContentEmits } from 'radix-vue';
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  VisuallyHidden,
  useForwardProps,
  useForwardPropsEmits
} from 'radix-vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-vue-next';
import type { LucideProps } from 'lucide-vue-next';
import { computedOmit, computedPick } from '../../shared';
import SCard from '../card/card.vue';
import type { AlertDialogContentProps, AlertType } from './types';

defineOptions({
  name: 'SAlertDialogContent'
});

const props = defineProps<AlertDialogContentProps>();

const emit = defineEmits<AlertDialogContentEmits>();

const delegatedAlertDialogContentProps = computedPick(props, [
  'forceMount',
  'trapFocus',
  'disableOutsidePointerEvents'
]);

const forwardedAlertDialogContentProps = useForwardPropsEmits(delegatedAlertDialogContentProps, emit);

const delegatedCardProps = computedOmit(props, [
  'as',
  'asChild',
  'class',
  'forceMount',
  'trapFocus',
  'disableOutsidePointerEvents',
  'footerClass'
]);

const forwardedCardProps = useForwardProps(delegatedCardProps);

const { content } = dialogVariants();

const footerCls = computed(() => cn('justify-end gap-3', props.footerClass));

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
  <AlertDialogContent as-child v-bind="forwardedAlertDialogContentProps">
    <SCard v-bind="forwardedCardProps" :class="cn(content(), props.class)" :footer-class="footerCls">
      <VisuallyHidden>
        <AlertDialogTitle />
        <AlertDialogDescription />
      </VisuallyHidden>
      <template #header>
        <slot name="header" />
      </template>
      <template #title-root>
        <slot name="title-root" />
      </template>
      <template #title>
        <slot name="title">{{ props.title }}</slot>
      </template>
      <template #title-leading>
        <slot name="title-leading">
          <template v-if="iconProps">
            <component :is="iconProps.icon" :class="iconProps.class" />
          </template>
        </slot>
      </template>
      <template #title-trailing>
        <slot name="title-trailing" />
      </template>
      <template #extra>
        <slot name="extra" />
      </template>
      <slot />
      <template #footer>
        <slot name="footer" />
      </template>
    </SCard>
  </AlertDialogContent>
</template>

<style scoped></style>
