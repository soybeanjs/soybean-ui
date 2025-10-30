<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState } from '../../composables';
import { provideAlertRootContext, useAlertThemeContext } from './context';
import type { AlertRootEmits, AlertRootProps } from './types';

defineOptions({
  name: 'AlertRoot'
});

const props = withDefaults(defineProps<AlertRootProps>(), {
  open: undefined
});

const emit = defineEmits<AlertRootEmits>();

const themeContext = useAlertThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

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
