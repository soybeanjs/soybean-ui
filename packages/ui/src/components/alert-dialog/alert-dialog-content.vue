<script setup lang="ts">
import { computed } from 'vue';
import type { FunctionalComponent } from 'vue';
import { reactiveOmit, reactivePick } from '@vueuse/core';
import type { AlertDialogContentEmits } from 'radix-vue';
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  VisuallyHidden,
  useForwardProps,
  useForwardPropsEmits
} from 'radix-vue';
import { cn, dialogVariants } from '@soybean-unify/ui-variants';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-vue-next';
import type { LucideProps } from 'lucide-vue-next';
import SCard from '../card/card.vue';
import type { AlertDialogContentProps, AlertType } from './types';

defineOptions({
  name: 'SAlertDialogContent'
});

const props = defineProps<AlertDialogContentProps>();

const emit = defineEmits<AlertDialogContentEmits>();

const delegatedAlertDialogContentProps = reactivePick(props, [
  'forceMount',
  'trapFocus',
  'disableOutsidePointerEvents'
]);

const forwardedAlertDialogContentProps = useForwardPropsEmits(delegatedAlertDialogContentProps, emit);

const delegatedCardProps = reactiveOmit(props, [
  'as',
  'asChild',
  'class',
  'forceMount',
  'trapFocus',
  'disableOutsidePointerEvents',
  'footerProps'
]);

const forwardedCardProps = useForwardProps(delegatedCardProps);

const { content } = dialogVariants();

const footerProps = computed(() => {
  const { class: cls, ...rest } = props.footerProps || {};

  return {
    class: cn('justify-end gap-3', cls),
    ...rest
  };
});

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
    <SCard v-bind="forwardedCardProps" :class="cn(content(), props.class)" :footer-props="footerProps">
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
