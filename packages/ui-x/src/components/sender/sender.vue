<script setup lang="ts">
import { computed } from 'vue';
import { useSender } from '../../composables';
import type { Attachment } from '../../types';
import { SxAttachments } from '../attachments';
import { senderVariants } from '../../styles/sender';
import type { SenderProps } from './types';

defineOptions({
  name: 'SxSender'
});

const props = withDefaults(defineProps<SenderProps>(), {
  placeholder: '',
  loading: false,
  disabled: false,
  rows: 3,
  submitType: 'enter',
  slashSuggestions: undefined,
  mentionSuggestions: undefined,
  attachments: undefined
});

const emit = defineEmits<{
  submit: [text: string];
  removeAttachment: [attachment: Attachment];
}>();

const sender = useSender({
  slashSuggestions: props.slashSuggestions,
  mentionSuggestions: props.mentionSuggestions
});

const variants = senderVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  input: variants.input,
  actions: variants.actions,
  actionList: variants.actionList,
  submit: variants.submit,
  suggestions: variants.suggestions,
  suggestionItem: variants.suggestionItem
}));

const canSubmit = computed(() => sender.value.value.trim().length > 0 && !props.loading && !props.disabled);

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Enter' && !event.shiftKey) {
    const shouldSubmit = props.submitType === 'enter' || (props.submitType === 'shiftEnter' && event.ctrlKey);
    if (shouldSubmit && !event.isComposing) {
      event.preventDefault();
      submit();
    }
  } else if (event.key === 'Escape' && sender.open.value) {
    sender.close();
  }
}

function submit(): void {
  if (!canSubmit.value) return;
  emit('submit', sender.value.value);
  sender.setValue('');
  sender.close();
}
</script>

<template>
  <div :class="ui.root">
    <SxAttachments v-if="attachments?.length" :attachments="attachments" @remove="emit('removeAttachment', $event)" />
    <textarea
      :class="ui.input"
      :value="sender.value.value"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      @input="sender.setValue(($event.target as HTMLTextAreaElement).value)"
      @keydown="handleKeydown"
    />
    <div :class="ui.actions">
      <div :class="ui.actionList">
        <slot name="actions" />
      </div>
      <button type="button" :class="ui.submit" :disabled="!canSubmit" aria-label="Send" @click="submit">
        <slot name="submit-icon">
          <span aria-hidden="true">↑</span>
        </slot>
      </button>
    </div>

    <div v-if="sender.open.value" :class="ui.suggestions" role="listbox">
      <button
        v-for="suggestion in sender.suggestions.value"
        :key="suggestion.key"
        type="button"
        :class="ui.suggestionItem"
        role="option"
        @mousedown.prevent="sender.select(suggestion)"
      >
        <slot name="suggestion" :suggestion="suggestion">
          <span>{{ suggestion.icon }}</span>
          <span>{{ suggestion.label }}</span>
        </slot>
      </button>
    </div>
  </div>
</template>
