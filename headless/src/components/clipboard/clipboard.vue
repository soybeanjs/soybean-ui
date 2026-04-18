<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useOmitProps } from '../../composables';
import { Button } from '../button';
import IconRender from '../icon/icon-render.vue';
import type { ClipboardEmits, ClipboardProps, ClipboardSlotProps, ClipboardState } from './types';

defineOptions({
  name: 'Clipboard'
});

const props = withDefaults(defineProps<ClipboardProps>(), {
  copiedDuration: 2000,
  legacy: true,
  copyIcon: 'lucide:copy',
  copiedIcon: 'lucide:check',
  copyText: 'Copy',
  copiedText: 'Copied'
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

const forwardedProps = useOmitProps(props, [
  'value',
  'copiedDuration',
  'legacy',
  'disabled',
  'copyIcon',
  'copiedIcon',
  'copyText',
  'copiedText'
]);

const displayIcon = computed(() => (copied.value ? props.copiedIcon : props.copyIcon));

const displayText = computed(() => (copied.value ? props.copiedText : props.copyText));

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
  icon: displayIcon.value,
  supported: isSupported.value,
  state: dataState.value,
  text: displayText.value,
  copy: copyValue
}));

const onClick = async (event: MouseEvent) => {
  emit('click', event);

  await copyValue();
};
</script>

<template>
  <Button v-bind="forwardedProps" :disabled="disabled" :data-state="dataState" @click="onClick">
    <slot name="leading" v-bind="slotProps">
      <span aria-hidden="true">
        <IconRender :icon="displayIcon" />
      </span>
    </slot>
    <slot v-bind="slotProps">{{ displayText }}</slot>
    <slot name="trailing" v-bind="slotProps" />
  </Button>
</template>
