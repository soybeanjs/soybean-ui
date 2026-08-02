<script setup lang="ts">
import { computed, shallowRef, toRef } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
import { useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import { Button } from '../button';
import { copyTextToClipboard, isClipboardWriteSupported } from './shared';
import type { ClipboardProps, ClipboardSlotProps, ClipboardEmits, ClipboardState } from './types';

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

defineSlots<{
  leading?: (props: ClipboardSlotProps) => unknown;
  default?: (props: ClipboardSlotProps) => unknown;
  trailing?: (props: ClipboardSlotProps) => unknown;
}>();

const copied = shallowRef(false);
const copiedDuration = toRef(() => props.copiedDuration);

const { start: resetCopiedState } = useTimeoutFn(
  () => {
    copied.value = false;
  },
  copiedDuration,
  { immediate: false }
);

const isSupported = computed(() => isClipboardWriteSupported() || props.legacy);

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
    await copyTextToClipboard(props.value, props.legacy);
    copied.value = true;
    resetCopiedState();
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

const onClick = async (event: PointerEvent) => {
  emit('click', event);

  await copyValue();
};
</script>

<template>
  <Button v-bind="forwardedProps" data-soybean-clipboard :disabled="disabled" :data-state="dataState" @click="onClick">
    <slot name="leading" v-bind="slotProps">
      <span aria-hidden="true">
        <Icon :icon="displayIcon" />
      </span>
    </slot>
    <slot v-bind="slotProps">{{ displayText }}</slot>
    <slot name="trailing" v-bind="slotProps" />
  </Button>
</template>
