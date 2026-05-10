<script setup lang="ts">
import { computed } from 'vue';
import { DialogProvider, provideDialogUi } from '@soybeanjs/headless/dialog';
import { mergeVariants, miniSizeMap } from '@/theme';
import { buttonVariants, buttonIconVariants } from '../button/variants';
import { dialogVariants } from './variants';

defineOptions({
  name: 'SDialogProvider'
});

const ui = computed(() => {
  const size = 'md';
  const miniSize = miniSizeMap[size];

  const variants = Object.assign(
    dialogVariants({
      size
    }),
    {
      $base: {
        cancel: buttonVariants({
          variant: 'pure',
          size: miniSize
        }),
        confirm: buttonVariants({
          variant: 'solid',
          size: miniSize
        }),
        close: buttonIconVariants({
          size: miniSize
        })
      }
    }
  );

  return mergeVariants(variants);
});

provideDialogUi(ui);
</script>

<template>
  <DialogProvider />
</template>
