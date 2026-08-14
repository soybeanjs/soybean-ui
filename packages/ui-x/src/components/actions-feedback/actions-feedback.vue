<script setup lang="ts">
import { computed } from 'vue';
import { actionsFeedbackVariants } from '../../styles/actions-feedback';
import type { FeedbackValue, ActionsFeedbackProps } from './types';

defineOptions({
  name: 'SxActionsFeedback'
});

const props = withDefaults(defineProps<ActionsFeedbackProps>(), {
  value: null,
  disabled: false,
  onChange: undefined
});

const emit = defineEmits<{
  change: [value: FeedbackValue | null];
}>();

const cls = computed(() => actionsFeedbackVariants(undefined, props.class));

function select(next: FeedbackValue): void {
  if (props.disabled) return;
  const value = props.value === next ? null : next;
  props.onChange?.(value);
  emit('change', value);
}
</script>

<template>
  <div :class="cls">
    <button
      type="button"
      :data-active="value === 'like' || undefined"
      :disabled="disabled"
      :aria-pressed="value === 'like'"
      aria-label="Like"
      class="inline-flex items-center gap-1"
      @click="select('like')"
    >
      <slot name="like-icon" :active="value === 'like'"><span aria-hidden="true">👍</span></slot>
    </button>
    <button
      type="button"
      :data-active="value === 'dislike' || undefined"
      :disabled="disabled"
      :aria-pressed="value === 'dislike'"
      aria-label="Dislike"
      class="inline-flex items-center gap-1"
      @click="select('dislike')"
    >
      <slot name="dislike-icon" :active="value === 'dislike'"><span aria-hidden="true">👎</span></slot>
    </button>
  </div>
</template>
