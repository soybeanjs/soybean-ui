<script setup lang="ts">
import { AlertDialogClose } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { useSizeContext } from '@/theme';
import Button from '../button/button.vue';
import type { AlertDialogCancelProps } from './types';

defineOptions({
  name: 'SAlertDialogCancel'
});

const props = withDefaults(defineProps<AlertDialogCancelProps>(), {
  text: 'Cancel',
  variant: 'plain'
});

const forwardedProps = useOmitProps(props, ['text']);

const { size } = useSizeContext('AlertDialogCancel');
</script>

<template>
  <AlertDialogClose as-child :before-close="beforeClose">
    <slot name="content">
      <Button v-bind="forwardedProps" :size="size">
        <slot>{{ text }}</slot>
      </Button>
    </slot>
  </AlertDialogClose>
</template>
