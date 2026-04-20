<script setup lang="ts">
import { computed } from 'vue';
import { DialogProvider, provideDialogUi } from '@soybeanjs/headless';
import { mergeSlotVariants, mergeBaseVariants, miniSizeMap } from '@/theme';
import { buttonVariants } from '../button/variants';
import { dialogVariants } from './variants';

defineOptions({
  name: 'SDialogProvider'
});

const ui = computed(() => {
  const size = 'md';

  const variants = mergeBaseVariants(
    dialogVariants({
      size
    }),
    {
      cancel: buttonVariants({
        variant: 'pure',
        size: miniSizeMap[size]
      }),
      confirm: buttonVariants({
        variant: 'solid',
        size: miniSizeMap[size]
      }),
      close: buttonVariants({
        variant: 'ghost',
        color: 'accent',
        size: miniSizeMap[size],
        shape: 'square',
        fitContent: true
      })
    }
  );

  return mergeSlotVariants(variants);
});

provideDialogUi(ui);
</script>

<template>
  <DialogProvider />
</template>
