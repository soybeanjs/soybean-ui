<script setup lang="ts">
import { useControllableState } from '../../composables';
import { provideAlertRootContext, useAlertUi } from './context';
import type { AlertRootEmits, AlertRootProps } from './types';

defineOptions({
  name: 'AlertRoot'
});

const props = withDefaults(defineProps<AlertRootProps>(), {
  open: undefined
});

const emit = defineEmits<AlertRootEmits>();

const cls = useAlertUi('root');

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  true
);

provideAlertRootContext({
  open
});
</script>

<template>
  <div v-if="open" :class="cls">
    <slot />
  </div>
</template>
