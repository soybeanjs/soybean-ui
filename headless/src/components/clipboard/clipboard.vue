<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useOmitProps } from '../../composables';
import { Button } from '../button';
import type { ClipboardEmits, ClipboardProps, ClipboardSlotProps, ClipboardState } from './types';

defineOptions({
  name: 'Clipboard'
});

const props = withDefaults(defineProps<ClipboardProps>(), {
  copiedDuration: 2000,
  legacy: true
});

const emit = defineEmits<ClipboardEmits>();

const { copied, copy, isSupported } = useClipboard({
  copiedDuring: props.copiedDuration,
  legacy: props.legacy
});

const disabled = computed(() => props.disabled || !isSupported.value);

const dataState = computed<ClipboardState>(() => {
  if (!isSupported.value) {
    return 'unsupported';
  }

  return copied.value ? 'copied' : 'ready';
});

const forwardedProps = useOmitProps(props, ['value', 'copiedDuration', 'legacy', 'disabled']);

const copyValue = async () => {
  if (disabled.value) {
    return;
  }

  try {
    await copy(props.value);
    emit('copied', props.value);
  } catch (error) {
    emit('copyError', error);
  }
};

const slotProps = computed<ClipboardSlotProps>(() => ({
  copied: copied.value,
  disabled: disabled.value,
  supported: isSupported.value,
  state: dataState.value,
  copy: copyValue
}));

const onClick = async (event: MouseEvent) => {
  emit('click', event);

  await copyValue();
};
</script>

<template>
  <Button v-bind="forwardedProps" :disabled="disabled" :data-state="dataState" @click="onClick">
    <slot name="leading" v-bind="slotProps" />
    <slot v-bind="slotProps" />
    <slot name="trailing" v-bind="slotProps" />
  </Button>
</template>
