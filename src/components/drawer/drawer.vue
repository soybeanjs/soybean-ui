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
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants, provideSizeContext } from '@/theme';
import { dialogVariants } from '@/variants/dialog';
import { drawerContentVariants, drawerScrollableVariants } from '@/variants/drawer';
import ButtonIcon from '../button/button-icon.vue';
import type { DrawerEmits, DrawerProps } from './types';

defineOptions({
  name: 'SDrawer'
});

const props = withDefaults(defineProps<DrawerProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
  closable: true,
  scrollable: true
});

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'side',
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

const emit = defineEmits<DrawerEmits>();

const slots = useSlots();

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = dialogVariants({
    size: props.size
  });

  const content = drawerContentVariants({
    size: props.size,
    side: props.side
  });

  variants.content = () => content;

  const scrollable = () =>
    drawerScrollableVariants({
      scrollable: props.scrollable
    });

  return mergeSlotVariants(
    {
      ...variants,
      scrollable
    },
    props.ui
  );
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
        <div :class="ui.scrollable">
          <slot v-bind="slotProps" />
        </div>
        <DialogFooter v-if="slots.footer" v-bind="footerProps">
          <slot name="footer" v-bind="slotProps" />
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
