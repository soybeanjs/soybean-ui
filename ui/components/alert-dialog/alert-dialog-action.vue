<script setup lang="ts">
import { computed } from 'vue';
import { DialogClose } from '@headless';
import Button from '../button/button.vue';
import { useAlertDialogSizeContext } from './context';
import type { AlertDialogActionProps } from './types';

defineOptions({
  name: 'SAlertDialogAction'
});

const props = withDefaults(defineProps<AlertDialogActionProps>(), {
  text: 'Confirm'
});

const sizeContext = useAlertDialogSizeContext();

const size = computed(() => sizeContext?.size?.value ?? 'md');
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
