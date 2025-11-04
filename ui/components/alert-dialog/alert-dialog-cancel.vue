<script setup lang="ts">
import { AlertDialogClose } from '@headless';
import { useSizeContext } from '@theme';
import Button from '../button/button.vue';
import type { AlertDialogCancelProps } from './types';

defineOptions({
  name: 'SAlertDialogCancel'
});

const props = withDefaults(defineProps<AlertDialogCancelProps>(), {
  text: 'Cancel',
  variant: 'plain'
});

const { size } = useSizeContext('AlertDialogCancel');
</script>

<template>
  <AlertDialogClose as-child>
    <slot name="content">
      <Button v-bind="props" :size="size">
        <slot>{{ text }}</slot>
      </Button>
    </slot>
  </AlertDialogClose>
</template>
