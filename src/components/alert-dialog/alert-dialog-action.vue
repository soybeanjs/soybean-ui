<script setup lang="ts">
import { AlertDialogClose } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { useSizeContext } from '@/theme';
import Button from '../button/button.vue';
import type { AlertDialogActionProps } from './types';

defineOptions({
  name: 'SAlertDialogAction'
});

const props = withDefaults(defineProps<AlertDialogActionProps>(), {
  text: 'Confirm'
});

const forwardedProps = useOmitProps(props, ['text']);

const { size } = useSizeContext('AlertDialogAction');
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
