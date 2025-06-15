<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogClose } from '@headless';
import Button from '../button/button.vue';
import { useAlertDialogSizeContext } from './context';
import type { AlertDialogCancelProps } from './types';

defineOptions({
  name: 'SAlertDialogCancel'
});

const props = withDefaults(defineProps<AlertDialogCancelProps>(), {
  text: 'Cancel',
  variant: 'plain'
});

const sizeContext = useAlertDialogSizeContext();

const size = computed(() => sizeContext?.size?.value ?? 'md');
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
