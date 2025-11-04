<script setup lang="ts">
import { DialogClose } from '@headless';
import { useSizeContext } from '@theme';
import Button from '../button/button.vue';
import type { AlertDialogActionProps } from './types';

defineOptions({
  name: 'SAlertDialogAction'
});

const props = withDefaults(defineProps<AlertDialogActionProps>(), {
  text: 'Confirm'
});

const { size } = useSizeContext('AlertDialogAction');
</script>

<template>
  <DialogClose as-child>
    <slot name="content">
      <Button v-bind="props" :size="size">
        <slot>{{ text }}</slot>
      </Button>
    </slot>
  </DialogClose>
</template>
