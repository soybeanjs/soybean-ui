<script setup lang="ts">
import { computed } from 'vue';
import { DialogClose } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';
import SButtonIcon from '../../button/source/button-icon.vue';
import type { DialogCloseIconProps } from '../types';

defineOptions({
  name: 'SDialogCloseIcon'
});

const { class: cls, size } = defineProps<DialogCloseIconProps>();

const mergedCls = computed(() => {
  const { closeIcon } = dialogVariants({ size });

  return cn(closeIcon(), cls);
});
</script>

<template>
  <DialogClose :class="mergedCls" as-child>
    <slot name="close">
      <SButtonIcon fit-content :size="size">
        <X />
      </SButtonIcon>
    </slot>
  </DialogClose>
</template>
