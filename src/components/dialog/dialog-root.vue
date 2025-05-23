<!-- <script setup lang="ts">
import { useTemplateRef } from 'vue';
import { useVModel } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { provideDialogRootContext } from './context';
import { DIALOG_CONSTANTS } from './shared';
import type { DialogRootEmits, DialogRootProps } from './types';

const props = withDefaults(defineProps<DialogRootProps>(), {
  defaultOpen: DIALOG_CONSTANTS.DEFAULT_OPEN,
  modal: DIALOG_CONSTANTS.DEFAULT_MODAL
});

const emit = defineEmits<DialogRootEmits>();

const rootElement = useTemplateRef('root');

// v-model for open state
const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: props.open === undefined
});

// Context methods
const onOpenChange = (value: boolean) => {
  open.value = value;
};

const onOpenToggle = () => {
  open.value = !open.value;
};

// Provide context
provideDialogRootContext({
  rootElement,
  open,
  onOpenChange,
  onOpenToggle,
  ...transformPropsToContext(props, ['modal'])
});
</script>

<template>
  <div ref="root" :class="props.class">
    <slot :open="open" />
  </div>
</template> -->
