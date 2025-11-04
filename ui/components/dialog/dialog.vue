<script setup lang="ts">
import { computed, useSlots } from 'vue';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  provideDialogThemeContext
} from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import { mergeSlotVariants, provideSizeContext } from '@theme';
import { dialogVariants } from '@variants/dialog';
import ButtonIcon from '../button/button-icon.vue';
import type { DialogEmits, DialogProps } from './types';

defineOptions({
  name: 'SDialog'
});

const props = withDefaults(defineProps<DialogProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
  closable: true
});

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'title',
  'description',
  'closable',
  'triggerProps',
  'contentProps',
  'headerProps',
  'footerProps',
  'titleProps',
  'descriptionProps',
  'overlayProps',
  'portalProps'
]);

const emit = defineEmits<DialogEmits>();

const slots = useSlots();

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = dialogVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

provideDialogThemeContext({
  ui
});

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
        <DialogHeader v-bind="headerProps">
          <DialogTitle v-bind="titleProps">
            <slot name="title" v-bind="slotProps">{{ title }}</slot>
          </DialogTitle>
          <DialogDescription v-if="slots.description || description" v-bind="descriptionProps">
            <slot name="description" v-bind="slotProps">{{ description }}</slot>
          </DialogDescription>
          <DialogClose v-if="closable" :class="ui.closable" as-child>
            <slot name="close">
              <ButtonIcon :size="size" icon="lucide:x" />
            </slot>
          </DialogClose>
        </DialogHeader>
        <slot v-bind="slotProps" />
        <DialogFooter v-if="slots.footer" v-bind="footerProps">
          <slot name="footer" v-bind="slotProps" />
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
