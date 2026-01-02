<script setup lang="ts">
import { computed } from 'vue';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
  provideDialogUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants, provideSizeContext } from '@/theme';
import { dialogVariants } from '@/variants/dialog';
import ButtonIcon from '../button/button-icon.vue';
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

provideDialogUi(ui);

provideSizeContext(() => props.size);
</script>

<template>
  <DialogRoot v-slot="slotProps" v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <DialogTrigger v-bind="triggerProps" :size="size" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal v-bind="portalProps">
      <DialogOverlay v-bind="overlayProps" />
      <DialogContent v-bind="contentProps" v-on="listeners">
        <slot v-bind="slotProps" />
        <DialogClose v-if="closable" :class="ui.closable" as-child>
          <slot name="close">
            <ButtonIcon :size="size" icon="lucide:x" />
          </slot>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
