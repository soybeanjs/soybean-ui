<script setup lang="ts">
import { computed } from 'vue';
import type { DialogContentEmits } from 'radix-vue';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  VisuallyHidden,
  useForwardProps,
  useForwardPropsEmits
} from 'radix-vue';
import { X } from 'lucide-vue-next';
import { cn, dialogVariants } from '@soybean-unify/ui-variants';
import { computedOmit, computedPick } from '../../shared';
import SCard from '../card/card.vue';
import SButtonIcon from '../button/button-icon.vue';
import type { DialogContentProps } from './types';

defineOptions({
  name: 'SDialogContent'
});

const props = withDefaults(defineProps<DialogContentProps>(), {
  showClose: true
});

const emit = defineEmits<DialogContentEmits>();

const delegatedDialogContentProps = computedPick(props, ['forceMount', 'trapFocus', 'disableOutsidePointerEvents']);

const forwardedDialogContentProps = useForwardPropsEmits(delegatedDialogContentProps, emit);

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
</script>

<template>
  <DialogContent as-child v-bind="forwardedDialogContentProps">
    <SCard v-bind="forwardedCardProps" :class="cn(content(), props.class)" :footer-class="footerCls">
      <VisuallyHidden>
        <DialogTitle />
        <DialogDescription />
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
        <slot name="title-leading" />
      </template>
      <template #title-trailing>
        <slot name="title-trailing" />
      </template>
      <template #extra>
        <slot name="extra">
          <DialogClose v-if="showClose" as-child>
            <slot name="close">
              <SButtonIcon size="sm">
                <X />
              </SButtonIcon>
            </slot>
          </DialogClose>
        </slot>
      </template>
      <slot />
      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </SCard>
  </DialogContent>
</template>

<style scoped></style>
