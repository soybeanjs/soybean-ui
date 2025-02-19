<script setup lang="ts">
import { computed } from 'vue';
import { DialogClose } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';
import SButtonIcon from '../button/button-icon.vue';
import type { DialogCloseProps } from './types';

defineOptions({
  name: 'SDialogClose'
});

const { class: cls } = defineProps<DialogCloseProps>();

const { close } = dialogVariants();

const mergedCls = computed(() => cn(close(), cls));
</script>

<template>
  <DialogClose :class="mergedCls" as-child>
    <slot name="close">
      <SButtonIcon size="xs">
        <X />
      </SButtonIcon>
    </slot>
  </DialogClose>
</template>
