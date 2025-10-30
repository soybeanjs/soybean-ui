<script setup lang="ts">
import { computed } from 'vue';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
  provideDialogThemeContext
} from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { dialogVariants } from '@variants/dialog';
import ButtonIcon from '../button/button-icon.vue';
import { provideDialogSizeContext } from './context';
import type { DialogPureEmits, DialogPureProps } from './types';

defineOptions({
  name: 'SDialogPure'
});

const props = withDefaults(defineProps<DialogPureProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
  closable: true
});

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'closable',
  'triggerProps',
  'contentProps',
  'overlayProps',
  'portalProps'
]);

const emit = defineEmits<DialogPureEmits>();

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = dialogVariants({
    size: props.size,
    pure: true
  });

  return mergeSlotVariants(variants, props.ui);
});

provideDialogThemeContext({
  ui
});

provideDialogSizeContext({
  size: computed(() => props.size ?? 'md')
});
</script>

<template>
  <DialogRoot v-slot="slotProps" v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <DialogTrigger v-bind="triggerProps" :size="size" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal v-bind="portalProps">
      <DialogOverlay v-bind="overlayProps" />
      <DialogContent v-bind="contentProps" v-on="listeners">
        <DialogClose v-if="closable" as-child>
          <slot name="close">
            <ButtonIcon :size="size" icon="lucide:x" />
          </slot>
        </DialogClose>
        <slot v-bind="slotProps" />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
