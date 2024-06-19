<script lang="ts" setup>
import { DrawerContent, DrawerPortal } from 'vaul-vue';
import type { DialogContentEmits, DialogContentProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';
import type { HtmlHTMLAttributes } from 'vue';
import { cn } from '@ui/lib/utils';
import DrawerOverlay from './DrawerOverlay.vue';

const props = defineProps<DialogContentProps & { class?: HtmlHTMLAttributes['class'] }>();
const emit = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwarded"
      :class="
        cn(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
          props.class
        )
      "
    >
      <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
