<script setup lang="ts">
import { computed } from 'vue';
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
import SCard from '../card/card.vue';
import type { AlertDialogContentProps } from './types';

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
      <template #title>
        <slot name="title" />
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
