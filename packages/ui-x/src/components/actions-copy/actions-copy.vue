<script setup lang="ts">
import { computed, ref } from 'vue';
import { actionsCopyVariants } from '../../styles/actions-copy';
import type { ActionsCopyProps } from './types';

defineOptions({
  name: 'SxActionsCopy'
});

const props = withDefaults(defineProps<ActionsCopyProps>(), {
  text: '',
  label: 'Copy',
  disabled: false,
  onCopy: undefined
});

const copied = ref(false);

const cls = computed(() => actionsCopyVariants(undefined, props.class));

async function copy(): Promise<void> {
  if (props.disabled) return;
  const text = props.text;
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch {
    // Clipboard may be unavailable (permissions / SSR); ignore.
  }
  props.onCopy?.(text);
}
</script>

<template>
  <button
    type="button"
    :class="cls"
    :data-copied="copied || undefined"
    :disabled="disabled"
    :aria-label="label"
    @click="copy"
  >
    <slot name="icon" :copied="copied">
      <span aria-hidden="true">{{ copied ? '✓' : '📋' }}</span>
    </slot>
    <slot name="label" :copied="copied">{{ copied ? 'Copied' : 'Copy' }}</slot>
  </button>
</template>
