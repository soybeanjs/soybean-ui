<script setup lang="ts">
import { useVModel } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { provideDialogRootContext } from './context';
import type { DialogRootEmits, DialogRootProps } from './types';

defineOptions({
  inheritAttrs: false
});

const props = defineProps<DialogRootProps>();
const emit = defineEmits<DialogRootEmits>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: props.open === undefined
});

provideDialogRootContext({
  open,
  ...transformPropsToContext(props, ['modal'])
});
</script>

<template>
  <slot :open="open" />
</template>
